"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const supabase = getSupabaseServerActionClient();

export const getStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*,class(name,id),parents(id,full_name)");
  if (error) {
    throw error;
  }
  return data;
};

export const deleteStudent = async (id: string) => {
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot delete student", success: false };
  }
  return { message: "Student deleted successfully", success: true };
};

export const updateStudnet = async (data: any, id: string) => {
  const { data: resp, error } = await supabase
    .from("students")
    .update(data)
    .eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot update student", success: false };
  }
  return { message: "Student updated successfully", success: true, data: resp };
};

export const getParentFromStudent = async (id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("parents(id,full_name)")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

export const getClassFromStudent = async (id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("class(id,name)")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
