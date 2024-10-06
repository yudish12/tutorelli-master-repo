"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { Notes } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient({ admin: true });

export const getNotes = async (
  studentid: string | number
): Promise<Notes[]> => {
  const { data, error } = await supabase.rpc("get_student_notes", {
    p_student_id: studentid,
  });
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

export const getNotesForStudent = async (studentId: string) => {
  const { data, error } = await supabase.rpc("get_notes_for_student", {
    p_student_id: studentId,
  });
  if (error) {
    throw error;
  }
  return data;
};
