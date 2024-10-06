"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { StudentsInSessionTableType } from "@/lib/types/table.types";

const supabase = getSupabaseServerActionClient();

export const getStudentsInSession = async (session_id: string) => {
  const { data, error } = await supabase
    .from("students_registered_session")
    .select("student_id,students!inner(full_name,email,class_id,parent_id)")
    .eq("session_id", session_id);
  if (error) {
    throw error;
  }
  return data as unknown as StudentsInSessionTableType[];
};
