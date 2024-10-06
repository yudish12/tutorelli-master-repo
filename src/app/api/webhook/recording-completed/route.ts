import { NextResponse } from "next/server";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import crypto from "node:crypto";
import { headers } from "next/headers";
import { SessionStatus } from "@/config/contants";

export async function POST(request: Request) {
  const supabase = getSupabaseRouteHandlerClient();
  try {
    console.log("10");
    const headersList = headers();
    const x_zm_request_timestamp = headersList.get("x-zm-request-timestamp");
    const x_zm_signature = headersList.get("x-zm-signature");
    const body = await request.json();
    console.log(body, 15);
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
        const files = body.payload.object.recording_files;
        const recording_url = files.find(
          (file: any) =>
            file.recording_type === "shared_screen_with_speaker_view"
        ).play_url;

        const { data, error } = await supabase.rpc("update_recording_url", {
          zoom_id_input: zoom_id,
          recording_url_input: recording_url,
          recording_passcode: body.payload.object.recording_play_passcode,
        });

        if (error) {
          console.log(error, 57);
          const response = {
            message: "Error updating session",
            status: 500,
          };
          return NextResponse.json(response, { status: response.status });
        }
        return NextResponse.json(
          { message: "Recording URL updated successfully" },
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
