import { optionsType } from "./../types/global.types";
import { z } from "zod";

export const subjectFormSchema = z.object({
  name: z.string().min(1),
  class: z.custom<optionsType>(),
});

export const classFormSchema = z.object({
  name: z.string().min(1),
});