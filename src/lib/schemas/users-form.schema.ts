import { z } from "zod";
import { optionsType } from "../types/global.types";

export const parentsFormSchema = z.object({
  full_name: z.string().min(1),
});

export const studentFormSchema = z.object({
  full_name: z.string().min(1),
  class_id: z.custom<optionsType>(),
  parent_id: z.custom<optionsType>(),
  email: z.string().email({ message: "Invalid email" }),
});
