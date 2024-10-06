"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export const getStudentByToken = async (token: string) => {
  const { data, error } = await client
    .from("invite")
    .select("*,students(*)")
    .eq("token", token);
  if (error) {
    throw error;
  }
  return data;
};

export const acceptInvite = async (
  token: string,
  student_id: string,
  parent_id: string
) => {
  const studentUpdate = await client
    .from("students")
    .update({
      parent_id: parent_id,
    })
    .eq("id", student_id);

  if (studentUpdate.error) {
    return { success: false, error: studentUpdate.error };
  }

  const deleteTokenResp = await client
    .from("invite")
    .delete()
    .eq("token", token);

  if (deleteTokenResp.error) {
    return { success: false, error: deleteTokenResp.error };
  }

  const { data, error } = await client
    .from("invite")
    .delete()
    .eq("token", token);

  if (error) {
    return { success: false, error: error };
  }
  return { success: true, data: data };
};
