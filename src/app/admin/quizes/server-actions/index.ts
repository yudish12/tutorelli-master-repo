"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse } from "@/lib/types/action.types";
import { Quiz, QuizData } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient();

export const getQuizzes = async (): Promise<Quiz[]> => {
  const { data, error } = await supabase.from("quiz").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const deleteQuiz = async (id: string): Promise<adminActionsResponse> => {
  const { error } = await supabase.from("quiz").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot delete quiz", success: false };
  }
  return { message: "Quiz deleted successfully", success: true };
};

export const updateQuiz = async (
  quizData: QuizData[],
  quizName: string,
  id: string
) => {
  const { data, error } = await supabase
    .from("quiz")
    .update({
      name: quizName,
      quiz_data: quizData,
    })
    .eq("id", id)
    .select("*");
  if (error) {
    console.log(error);
    return { message: "cannot update quiz", success: false };
  }
  return { message: "Quiz updated successfully", success: true, data };
};

export const getQuizById = async (id: string) => {
  const { data, error } = await supabase
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
