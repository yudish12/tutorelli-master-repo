"use server";

import { SessionStatus, join_statuses } from "@/config/contants";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { blockData } from "@/lib/types/action.types";

const client = getSupabaseServerActionClient();

export const getPreviousSessions = async (student_id: string) => {
  const { data, error } = await client
    .from("students_registered_session")
    .select(
      "student_id,sessions!inner(status,name,recording,from,id),session_block!inner(subject(id,name,class(name)),tutors(full_name)),join_url)"
    )
    .eq("sessions.status", SessionStatus.COMPLETED)
    .eq("student_id", student_id)
    .order("from", { referencedTable: "sessions", ascending: true })
    .limit(4);

  console.log(data, 19);
  if (error) {
    throw error;
  }
  return data;
};

export const upComingSessions = async (student_id: string) => {
  const { data, error } = await client.rpc("get_upcoming_sessions", {
    p_student_id: student_id,
  });
  if (data.length === 0) {
    return [];
  }
  let sessionData = [];
  sessionData = [
    {
      student_id: data[0].student_id,
      sessions: {
        status: data[0].session_status,
        join_url: data[0].join_url,

        id: data[0].session_id,
        from: data[0].session_from,
      },
      session_block: {
        subject: {
          id: data[0].session_subject_id,
          name: data[0].session_subject_name,
          class: {
            name: data[0].session_subject_class_name,
          },
        },

        tutors: {
          full_name: data[0].tutor_full_name,
        },
      } as unknown as blockData,
    },
  ];
  if (error) {
    throw error;
  }
  return sessionData;
};

export const getJoinedSessions = async (student_id: string) => {
  const { data, error } = await client
    .from("students_registered_session")
    .select("student_id,join_status,count(*)")
    .eq("student_id", student_id);
  if (error) {
    throw error;
  }
  return data;
};
