"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const supabase = getSupabaseServerActionClient();

export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from("students_registered_session")
    .select("*");
  if (error) {
    throw error;
  }
  return data;
};
