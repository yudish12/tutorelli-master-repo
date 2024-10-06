"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse } from "@/lib/types/action.types";
import { Parent } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient();
// export const getSubjects = async ():Promise<SubjectWithClass[]> => {
//     const { data, error } = await supabase.from("subject").select("*,class(name)");
//     if (error) {
//         throw error;
//     }
//     return data;
// };
export const getParents = async (): Promise<Parent[]> => {
  const { data, error } = await supabase.from("parents").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const deleteParent = async (
  id: string
): Promise<adminActionsResponse> => {
  const { error } = await supabase.from("parents").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot delete parent", success: false };
  }
  return { message: "Parent deleted successfully", success: true };
};

export const updateParent = async (data: any, id: string) => {
  const { data: resp, error } = await supabase
    .from("parents")
    .update(data)
    .eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot update parent", success: false };
  }
  return { message: "Parent updated successfully", success: true, data: resp };
};
