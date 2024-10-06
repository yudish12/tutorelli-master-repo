"use server";

import { updateClass } from "@/app/admin/class/server-action";
import { roles } from "@/config/contants";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { revalidatePath } from "next/cache";

const supabase = getSupabaseServerActionClient();

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  revalidatePath("/dashboard");
  return data;
};

export const signUp = async (
  email: string,
  password: string,
  full_name: string,
  role: string,
  phone_number: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
          full_name: full_name,
          phone_number: phone_number,
          approved: role !== roles.TUTOR ? true : false,
        },
      },
    });

    if (error) {
      console.error("Error during sign up:", error);
      throw new Error("Signup Failed");
    }

    if (!data.user) {
      throw new Error("Signup Failed: User not created");
    }

    let resp;

    if (role === roles.PARENT) {
      resp = await supabase
        .from("parents")
        .insert([
          {
            user_id: data.user.id,
            full_name: full_name,
          },
        ])
        .select("*");
    } else if (role === roles.STUDENT) {
      resp = await supabase
        .from("students")
        .insert([
          {
            user_id: data.user.id,
            full_name: full_name,
            email: data.user.email,
          },
        ])
        .select("*");
      if (!resp.error && resp.data[0].email) {
        const updateBooking = await supabase
          .from("students_registered_session")
          .update({
            student_id: resp.data[0].id,
          })
          .eq("registered_email", resp.data[0].email);
      }
    } else {
      resp = await supabase
        .from("tutors")
        .insert([
          {
            user_id: data.user.id,
            full_name: full_name,
            email: data.user.email,
            approved: false,
          },
        ])
        .select("*");
    }

    if (resp.error) {
      console.error("Error inserting into table:", resp.error);
      throw new Error("Insertion Failed");
    }

    return { data, resp };
  } catch (err) {
    console.error("Unhandled error:", err);
    throw err;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return false;
  }
  revalidatePath("/auth/login");
  return true;
};
