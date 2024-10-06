"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { SessionWithTutorAndSubject } from "@/lib/types/action.types";
import {
  Class,
  optionsType,
  Session,
  Subject,
  Tutor,
} from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient();

export const getSubjects = async (): Promise<Subject[]> => {
  const { data, error } = await supabase.from("subject").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getTutors = async (): Promise<Tutor[]> => {
  const { data, error } = await supabase.from("tutors").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getClass = async (): Promise<Class[]> => {
  const { data, error } = await supabase.from("class").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getClassById = async (id: string): Promise<Class> => {
  const { data, error } = await supabase.from("class").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
};

export const getSessions = async (): Promise<Session[]> => {
  const { data, error } = await supabase.from("sessions").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getSessionsWithTutorAndSubject = async (): Promise<
  SessionWithTutorAndSubject[]
> => {
  const { data, error } = await supabase
    .from("sessions")
    .select(
      "*,tutors(full_name),subject(id,name,class(name,id)),quiz(id),flashcards(id)"
    );

  if (error) {
    throw error;
  }
  return data as unknown as SessionWithTutorAndSubject[];
};
