import { Database } from "@/lib/supabase/database.types";

export type User = Database["auth"]["Tables"]["users"]["Row"];

export type Student = Database["public"]["Tables"]["students"]["Row"];

export type Parent = Database["public"]["Tables"]["parents"]["Row"];

export type Tutor = Database["public"]["Tables"]["tutors"]["Row"];

export type Session = Database["public"]["Tables"]["sessions"]["Row"];

export type Subject = Database["public"]["Tables"]["subject"]["Row"];

export type Class = Database["public"]["Tables"]["class"]["Row"];

export type Quiz = Database["public"]["Tables"]["quiz"]["Row"];

export type Flashcard = Database["public"]["Tables"]["flashcards"]["Row"];

export type Notes = Database["public"]["Tables"]["notes"]["Row"];

export type optionsType = {
  label: string;
  value: string;
};

export type QuizData = {
  question: string;
  options: string[];
  explanation: string;
  correct_answer: string;
};

export type FlashcardData = {
  front: string;
  back: string;
};
