import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const supabase = getSupabaseRouteHandlerClient({ admin: true });
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }

    const { data, error } = await supabase.storage
      .from("course_materials")
      .download(name);

    if (error || !data) {
      console.error("Error downloading file:", error);
      return NextResponse.json(
        { error: "Error downloading file" },
        {
          status: 500,
        }
      );
    }

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${name}"`,
        "Content-Type": data.type,
      },
    });
  } catch (error) {
    console.error("Error in file download:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
