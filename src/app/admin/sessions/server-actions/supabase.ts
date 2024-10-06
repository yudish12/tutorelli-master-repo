"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import {
  adminActionsResponse,
  SessionWithTutorAndSubject,
  ZoomMeetingCreate,
  updateSessionPayload,
} from "@/lib/types/action.types";

const supabase = getSupabaseServerActionClient();

export const getTutorById = async (tutor_id: string) => {
  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .eq("id", tutor_id);
  if (error) {
    throw error;
  }
  return data;
};

export const insertSession = async (
  payload: ZoomMeetingCreate,
  url: string
) => {
  console.log(payload, url, 27);
  const { data, error } = await supabase
    .from("sessions")
    .insert([
      {
        name: payload.name,
        price: payload.price,
        status: "upcoming",
        from: payload.from.toISOString(),
        url: url,
        recording: null,
        tutor_id: payload.tutor_id.value,
        capacity: payload.capacity,
        subject_id: payload.subject.value,
        zoom_id: payload.zoom_id,
      },
    ])
    .select("id");

  if (error) {
    throw error;
  }
  return data;
};

export const getSessionById = async (session_id: string) => {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", session_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getStudentById = async (student_id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", student_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getSessionWithTutorAndSubject = async (
  session_id: string
): Promise<SessionWithTutorAndSubject[]> => {
  const { data, error } = await supabase
    .from("sessions")
    .select("*,tutors(full_name,id),subject(id,name,class(id,name))")
    .eq("id", session_id);
  if (error) {
    throw error;
  }
  return data as unknown as SessionWithTutorAndSubject[];
};

export const updateSession = async (
  payload: updateSessionPayload,
  id: string
): Promise<adminActionsResponse> => {
  delete payload.class_id;
  const { data, error } = await supabase
    .from("sessions")
    .update(payload)
    .eq("id", id);
  if (error) {
    console.log(error);
    return { message: "Error updating session", success: false, data: error };
  }
  return { message: "Session updated successfully", success: true, data };
};

export const deleteSession = async (
  id: string
): Promise<adminActionsResponse> => {
  const { data, error } = await supabase.from("sessions").delete().eq("id", id);
  if (error) {
    return { message: "Error deleting session", success: false, data: error };
  }
  return { message: "Session deleted successfully", success: true, data };
};
