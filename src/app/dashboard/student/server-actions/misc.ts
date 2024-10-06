"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
const client = getSupabaseServerActionClient();

export const getFlashCardsByStudentId = async (studentId: string) => {
  const { data, error } = await client.rpc("get_flashcard_count_student", {
    p_student_id: studentId,
  });
  if (error) {
    throw error;
  }
  return data;
};
