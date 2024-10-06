import { roles } from "@/config/contants";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import { Database } from "@/lib/supabase/database.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseRouteHandlerClient({ admin: true }); // Initialize within the request context
    const client = getSupabaseRouteHandlerClient();
    const { data: userData } = await client.auth.getUser();
    console.log(userData, userData.user);
    if (!userData.user || userData.user.user_metadata.role !== roles.TUTOR) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const sessionid = formData.get("sessionid");
    const files = formData.getAll("files") as File[];

    if (!sessionid || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const { success, data } = await uploadNotes(
      supabase,
      files,
      sessionid as string | number
    );

    return NextResponse.json(
      { success, data },
      { status: success ? 200 : 400 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const uploadNotes = async (
  supabase: SupabaseClient<Database, "public", any>,
  files: File[],
  sessionid: string | number
): Promise<{ success: boolean; data: any[] }> => {
  try {
    const storageData = await uploadFileToStorage(supabase, files);

    const insertPromises = storageData.map(async (item, index) => {
      const { data, error } = await supabase
        .from("notes")
        .insert([
          {
            session_id: sessionid,
            document_url: item?.path ?? files[index].name,
            title: files[index].name,
          },
        ])
        .select("*");

      if (error) {
        throw error;
      }
      return data;
    });

    const results = await Promise.all(insertPromises);

    return { success: true, data: results.flat() };
  } catch (error) {
    console.error("Error in uploadNotes:", error);
    return { success: false, data: [] };
  }
};

const uploadFileToStorage = async (
  supabase: SupabaseClient<Database, "public", any>,
  files: File[]
) => {
  try {
    const uploadfilesPromiseArr = files.map((file) =>
      supabase.storage.from("course_materials").upload(file.name, file)
    );

    const data = await Promise.all(uploadfilesPromiseArr);

    return data.map((result, index) => {
      if (result.error) {
        console.error(
          `Error uploading file ${files[index].name}:`,
          result.error.message
        );
        return null;
      }
      return result.data;
    });
  } catch (error) {
    console.error("Error in uploadFileToStorage:", error);
    throw error;
  }
};
