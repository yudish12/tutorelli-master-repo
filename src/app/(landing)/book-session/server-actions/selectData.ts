"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export const getTutorsData = async () => {
  const { data, error } = await client.from("tutors").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getYearGroupData = async () => {
  const { data, error } = await client.from("class").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getSubjectData = async () => {
  const { data, error } = await client.from("subject").select("*");
  if (error) {
    throw error;
  }
  return data;
};
