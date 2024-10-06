"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export const getQuizzes = async (tutor_id: string) => {
  const { data, error } = await client.rpc("get_quiz_tutor", {
    p_tutor_id: tutor_id,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getFlashcardsTutor = async (tutor_id: string) => {
  const { data, error } = await client.rpc("get_flashcard_tutor", {
    p_tutor_id: tutor_id,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getFlashCardCountByTutorId = async (tutorId: string) => {
  const { data, error } = await client.rpc("get_flashcards_count_tutor", {
    p_tutor_id: tutorId,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getQuizCountByTutorId = async (tutorId: string) => {
  const { data, error } = await client.rpc("get_quiz_count_tutor", {
    p_tutor_id: tutorId,
  });
  if (error) {
    throw error;
  }
  return data;
};
