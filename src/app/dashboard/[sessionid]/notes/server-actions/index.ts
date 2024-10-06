"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { Notes } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient({ admin: true });

export const getNotes = async (
  sessionid: string | number
): Promise<Notes[]> => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("session_id", sessionid);
  if (error) {
    throw error;
  }
  return data;
};

export const downloadFile = async (name: string) => {
  try {
    const { data, error } = await supabase.storage
      .from("course_materials")
      .download(name);

    if (error) {
      console.error("Error downloading file:", error.message);
      throw error;
    }

    console.log("File downloaded successfully:", data);
    return data;
  } catch (error) {
    console.error("Download failed:", error);
  }
};
