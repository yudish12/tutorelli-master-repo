"use server";
import { SessionStatus } from "@/config/contants";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export const getPreviousSessions = async (tutor_id: string) => {
  const { data, error } = await client
    .from("sessions")
    .select(
      "name,status,session_block!inner(tutor_id,subject(id,name,class(name))),id,from,recording"
    )
    .eq("status", SessionStatus.COMPLETED)
    .eq("session_block.tutor_id", tutor_id)
    .order("from", { ascending: false })
    .limit(4);

  if (error) {
    throw error;
  }

  const sessionData = data as unknown as any;

  return sessionData.map((item: any) => ({
    student_id: "",
    sessions: {
      name: item.name,
      recording: item.recording,
      status: item.status,
      join_url: "",
      id: item.id,
      from: item.from,
    },
    session_block: {
      tutor_id: item.session_block.tutor_id,
      subject: {
        id: item.session_block.subject.id,
        name: item.session_block.subject.name,
        class: {
          name: item.session_block.subject.class.name,
        },
        class_id: "",
        created_at: "",
        updated_at: "",
      },
    },
  }));
};

export const upComingSessions = async (tutor_id: string) => {
  const { data, error } = await client
    .from("sessions")
    .select(
      "status,session_block!inner(tutor_id,subject(id,name,class(name))),id,from,url,recording"
    )
    .eq("status", SessionStatus.UPCOMING)
    .eq("session_block.tutor_id", tutor_id)
    .order("from")
    .limit(4);
  if (error) {
    throw error;
  }
  return data;
};
