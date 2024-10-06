"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { adminActionsResponse } from "@/lib/types/action.types";
import { Flashcard } from "@/lib/types/global.types";

const supabase = getSupabaseServerActionClient();

export const getFlashcards = async (): Promise<Flashcard[]> => {
  const { data, error } = await supabase.from("flashcards").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const deleteFlashcard = async (
  id: string
): Promise<adminActionsResponse> => {
  const { error } = await supabase.from("flashcards").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { message: "cannot delete flashcard", success: false };
  }
  return { message: "Flashcard deleted successfully", success: true };
};

export const createFlashcard = async (
  payload: any
): Promise<adminActionsResponse> => {
  const { data, error } = await supabase
    .from("flashcards")
    .insert([
      {
        name: payload.name,
      },
    ])
    .select("id");

  if (error) {
    return { message: "cannot create flashcard", success: false };
  }
  return {
    message: "Flashcard created successfully",
    success: true,
    data: data,
  };
};

export const updateFlashcard = async (
  payload: any,
  id?: string
): Promise<adminActionsResponse> => {
  if (!id) {
    return { message: "id is required", success: false };
  }
  const { data, error } = await supabase
    .from("flashcards")
    .update({
      name: payload.name,
    })
    .eq("id", id);

  if (error) {
    return { message: "cannot update flashcard", success: false };
  }
  return {
    message: "Flashcard updated successfully",
    success: true,
    data: data,
  };
};

export const getFlashcardById = async (id: string) => {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
