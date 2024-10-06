"use server";
import { roles } from "@/config/contants";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export const getFlashCardsByStudentId = async (studentId: string) => {
  const { data, error } = await client.rpc("get_flashcard_student", {
    p_student_id: studentId,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getFlashCardBySessionId = async (
  sessionId: string,
  role: string
) => {
  const query = client
    .from("flashcards")
    .select("*,sessions(id,session_block(subject(name,class(name))))")
    .eq("session_id", sessionId);

  if (role !== roles.TUTOR) {
    query.eq("published", true);
  }
  const { data, error } = await query;
  if (error) {
    throw error;
  }
  console.log(data, role);
  return data;
};

export const updateFlashcard = async (payload: any, id: string) => {
  const { data, error } = await client
    .from("flashcards")
    .update({
      front: payload.front,
      back: payload.rear,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  return { success: true };
};

export const publishFlashcards = async (id: string) => {
  const { data, error } = await client
    .from("flashcards")
    .update({
      published: true,
    })
    .eq("session_id", id);
  if (error) {
    throw error;
  }
  return { success: true };
};

export const addFlashcard = async (payload: any) => {
  const { data, error } = await client.from("flashcards").insert([
    {
      published: payload.published,
      id: payload.id,
      front: payload.front,
      back: payload.rear,
      session_id: payload.sessions,
    },
  ]);
  console.log(data, payload, 62);
  if (error) {
    throw error;
  }
  return { success: true };
};

export const deleteFlashcard = async (id: string) => {
  console.log(id, 70);
  const { data, error } = await client.from("flashcards").delete().eq("id", id);
  console.log(data, error, 72);
  if (error) {
    throw error;
  }
  return { success: true };
};
