import { optionsType } from "./../types/global.types";
import { z } from "zod";

export type subjectClassOptions = {
  label: string;
  value: string;
  class: { id: string };
};

export const sessionFormSchema = z.object({
  block_size: z.string().transform((v) => Number(v) || 0),
  name: z.string().min(1).optional(),
  subject: z.custom<subjectClassOptions>(),
  block_id: z.custom<optionsType>(),
  from: z.date() || z.string(),
  price: z.string().transform((v) => Number(v) || 0),
  capacity: z.string().transform((v) => Number(v) || 0),
  tutor_id: z.custom<optionsType>(),
  class_id: z.custom<optionsType>(),
});

export const sessionEditFormSchema = z.object({
  name: z.string().min(1).optional(),
  from: z.date() || z.string(),
  price: z.number(),
  capacity: z.number(),
  tutor_id: z.custom<optionsType>(),
  subject_id: z.custom<subjectClassOptions>(),
  class_id: z.custom<optionsType>(),
});
