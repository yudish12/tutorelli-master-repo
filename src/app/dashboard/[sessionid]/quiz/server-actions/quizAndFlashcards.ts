"use server";

import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
const client = getSupabaseServerActionClient();

export const getQuizzesStudents = async (student_id: string) => {
  const { data, error } = await client.rpc("get_quiz_count_student", {
    p_student_id: student_id,
  });
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
  const { data, error } = await client.rpc("get_quiz_student", {
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

export const getQuizBySessionId = async (sessionId: string) => {
  const { data, error } = await client
    .from("quiz")
    .select(
      "*,sessions(id,session_block(subject(name,class(name)))),questions!inner(questions,answer,options,explanation,id)"
    )
    .eq("session_id", sessionId)
    .eq("published", true);
  if (error) {
    throw error;
  }
  return data;
};

export const getQuizBySessionIdEdit = async (sessionId: string) => {
  const { data, error } = await client
    .from("quiz")
    .select(
      "*,sessions(id,session_block(subject(name,class(name)))),questions!inner(questions,answer,options,explanation,id)"
    )
    .eq("session_id", sessionId);
  if (error) {
    throw error;
  }
  console.log(data);
  return data;
};

export const updateQuestion = async (payload: any, id: string) => {
  const { data, error } = await client
    .from("questions")
    .update({
      questions: payload.question,
      options: payload.options,
      explanation: payload.explanation,
      answer: payload.correct_answer,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  return { success: true };
};

export const publishQuiz = async (id: string) => {
  const { data, error } = await client
    .from("quiz")
    .update({
      published: true,
    })
    .eq("id", id);
  if (error) {
    throw error;
  }
  return { success: true };
};

export const addQuestion = async (
  payload: any,
  id: string,
  quiz_id: string
) => {
  const { data, error } = await client
    .from("questions")
    .insert([
      {
        questions: payload.question,
        options: payload.options,
        explanation: payload.explanation,
        answer: payload.correct_answer,
        quiz_id: quiz_id,
      },
    ])
    .select("id");

  if (error) {
    throw error;
  }
  return { success: true };
};

export const deleteQuestion = async (id: string) => {
  const { data, error } = await client.from("questions").delete().eq("id", id);
  if (error) {
    throw error;
  }
  return { success: true };
};
