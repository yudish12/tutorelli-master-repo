import { NextResponse } from "next/server";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import crypto from "node:crypto";
import { headers } from "next/headers";
import { SessionStatus } from "@/config/contants";

export async function POST(request: Request) {
  const supabase = getSupabaseRouteHandlerClient();
  try {
    const headersList = headers();
    const x_zm_request_timestamp = headersList.get("x-zm-request-timestamp");
    const x_zm_signature = headersList.get("x-zm-signature");
    const body = await request.json();

    const message = `v0:${x_zm_request_timestamp}:${JSON.stringify(body)}`;
    const hashForVerify = crypto
      .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET_TOKEN!)
      .update(message)
      .digest("hex");
    const signature = `v0=${hashForVerify}`;

    if (x_zm_signature === signature) {
      if (body.event === "endpoint.url_validation") {
        const hashForValidate = crypto
          .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET_TOKEN!)
          .update(body.payload.plainToken)
          .digest("hex");
        const response = {
          message: {
            plainToken: body.payload.plainToken,
            encryptedToken: hashForValidate,
          },
          status: 200,
        };
        return NextResponse.json(response.message, {
          status: response.status,
        });
      } else {
        const zoom_id = body.payload.object.id;
        const { data: selectedRows, error: selectError } = await supabase
          .from("sessions")
          .select("id")
          .eq("zoom_id", zoom_id)
          .eq("status", SessionStatus.UPCOMING)
          .order("occurrence_id", { ascending: true })
          .limit(1);

        if (selectError) {
          throw selectError;
        }

        if (selectedRows.length === 0) {
          throw new Error("No matching sessions found to update");
        }

        const { data, error } = await supabase
          .from("sessions")
          .update({
            status: SessionStatus.COMPLETED,
          })
          .eq("id", selectedRows[0].id); // Update only the selected row

        if (error) {
          throw error;
        }

        console.log("Update successful:", data);
        if (error) {
          console.log(error, 50);
          const response = {
            message: "Error updating session",
            status: 500,
          };
          return NextResponse.json(response, { status: response.status });
        }
        return NextResponse.json(
          { message: "Session updated successfully" },
          {
            status: 200,
          }
        );
      }
    } else {
      const response = {
        message: "Unauthorized request to Zoom Webhook sample.",
        status: 401,
      };
      return NextResponse.json(response, { status: response.status });
    }
  } catch (error) {
    // Log the error
    console.error("Error processing Zoom Webhook:", error);
    const response = {
      message: "Internal server error",
      status: 500,
    };
    return NextResponse.json(response, { status: response.status });
  }
}
