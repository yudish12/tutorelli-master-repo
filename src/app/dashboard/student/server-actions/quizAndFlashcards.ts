"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
const client = getSupabaseServerActionClient();

export const getQuizzesStudents = async (student_id: string) => {
  const { data, error } = await client.rpc("get_quiz_count_student", {
    p_student_id: student_id,
  });
  console.log(data, 10);
  if (error) {
    throw error;
  }
  return data;
};

export const getFlashcardsStudents = async (student_id: string) => {
  const { data, error } = await client.rpc("get_flashcard_student", {
    p_student_id: student_id,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getQuizDataByStudentId = async (studentId: string) => {
  const { data, error } = await client.rpc("get_quiz_questions_for_student", {
    p_student_id: studentId,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getQuizById = async (id: string) => {
  const { data, error } = await client
    .from("quiz")
    .select("*,sessions(id,subject(name,class(name)))")
    .eq("id", id);
  if (error) {
    throw error;
  }
  console.log(data);
  return data.map((item: any) => ({
    quiz_id: item.id,
    quiz_name: item.name,
    subject: item.sessions.subject.name,
    class: item.sessions.subject.class.name,
    quiz_data: item.quiz_data,
  }));
};

export const getNotesCount = async (id: string) => {
  const { data, error } = await client.rpc("get_notes_count", {
    p_student_id: id,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getQuizzesByStudentId = async (p_student_id: string) => {
  const { data, error } = await client.rpc("get_quizzes_for_student", {
    p_student_id,
  });
  if (error) {
    throw error;
  }
  return data;
};
