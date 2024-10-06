import { z } from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const phoneNumberRegex = /^\d{10}$/;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
  remember: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export const updatePasswordSchema = z.object({
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
  full_name: z.string().min(1),
  role: z.string().min(1),
  phone_number: z
    .string()
    .regex(phoneNumberRegex, {
      message:
        "Phone number must be at least 10 characters long and include only digits",
    })
    .transform((v) => `+44-${v.replace(/\s/g, "")}`),
  profile_pic: z
    .custom<string | number | readonly string[] | undefined>()
    .optional(),
});
