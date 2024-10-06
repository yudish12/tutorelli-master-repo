import { roles } from "@/config/contants";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const client = getSupabaseRouteHandlerClient();
    const body = await request.json();

    const userinfo = await client.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          role: roles.PARENT,
          phone_number: body.phone_number,
          full_name: body.full_name,
        },
      },
    });

    if (userinfo.error || !userinfo.data.user) {
      return NextResponse.json(
        { success: false, error: userinfo.error },
        { status: 500 }
      );
    }

    const { data, error } = await client.from("parents").insert([
      {
        user_id: userinfo?.data?.user.id,
        full_name: body.full_name,
        email: body.email,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, error: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
