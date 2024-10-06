"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const supabase = getSupabaseServerActionClient();

export const getStudentData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getParentData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("parents")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getTutorData = async (user_id: string) => {
  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};
