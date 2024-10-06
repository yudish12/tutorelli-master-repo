import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = getSupabaseRouteHandlerClient();
  //   const { data:userData, error:authErr } = await supabase.auth.getUser();
  //   if (!userData.user) {
  //     return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  //   }
  //   if (authErr) {
  //     throw authErr;
  //   }
  const tutorData = await supabase.from("tutors").select("full_name,id");
  const subjectData = await supabase
    .from("subject")
    .select("name,id,class_id,class(name,id)");
  const classData = await supabase.from("class").select("name,id");
  const blockData = await supabase.from("block").select("id");

  return NextResponse.json({
    data: {
      tutorData: tutorData.data,
      subjectData: subjectData.data,
      classData: classData.data,
      blockData: blockData.data,
    },
  });
}
