"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { SessionDataReturned } from "./response.types";
import { blockData } from "@/lib/types/action.types";

const client = getSupabaseServerActionClient();

export const getSessionsByStudentId = async (
  id: string
): Promise<SessionDataReturned[]> => {
  const { data, error } = (await client
    .from("students_registered_session")
    .select(
      "student_id,join_url,session_id,sessions(*,recording),session_block(tutors(full_name),subject(name))"
    )
    .eq("student_id", id)) as unknown as {
    data: {
      student_id: string;
      session_id: string;
      join_url: string;
      recording?: string;
      sessions: SessionDataReturned;
      session_block: blockData;
    }[];
    error: any;
  };

  if (error) {
    throw error;
  }

  const resp = data.map((item) => {
    const session = item.sessions;
    return {
      id: session.id,
      name: session.name,
      to: session.to,
      url: session.url,
      from: session.from,
      status: session.status,
      session_block: {
        ...item.session_block,
        tutors: item.session_block.tutors,
        subject: item.session_block.subject,
      },
      duration: session.duration,
      recording: session.recording,
      tutor_id: item.session_block.tutors.id, // Assuming `tutor_id` is derived from the first tutor
      join_url: item.join_url,
      created_at: session.created_at,
      subject_id: session.subject_id,
    };
  });

  return resp;
};

export const getSessionsByTutorId = async (
  id: string
): Promise<SessionDataReturned[]> => {
  const { data, error } = await client
    .from("sessions")
    .select("*,session_block!inner(tutors(id, full_name),subject(name))")
    .eq("session_block.tutor_id", id);
  if (error) {
    throw error;
  }

  const resp = data.map((session) => {
    return {
      id: session.id,
      name: session.name,
      to: session.to,
      url: session.url,
      from: session.from,
      status: session.status, // Adjust if you have a dynamic status
      session_block: {
        tutors: session.session_block.tutors,
        subject: session.session_block.subject,
      },
      duration: session.duration,
      recording: session.recording,
      tutor_id: Number(id), // Assuming `id` is a string, convert it to a number
      join_url: session.join_url, // Assuming `join_url` exists at this level
      created_at: session.created_at,
      subject_id: session.subject_id,
    };
  });

  return resp;
};
