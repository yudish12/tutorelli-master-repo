"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse } from "@/lib/types/action.types";

const supabase = getSupabaseServerActionClient();

export const deleteTutor = async (
  id: string
): Promise<adminActionsResponse> => {
  const { error } = await supabase.from("tutors").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot delete tutor", success: false };
  }
  return { message: "Tutor deleted successfully", success: true };
};
