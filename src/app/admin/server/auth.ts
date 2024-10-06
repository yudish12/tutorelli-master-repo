"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { revalidatePath } from "next/cache";

const supabase = getSupabaseServerActionClient();

export const adminLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: "Invalid credentials. Please try again.",
      };
    }

    // Optionally revalidate the path after login
    revalidatePath("/admin");

    return {
      success: true,
      message: "Login successful!",
      user: data.session.user, // Optional: Return session data if needed
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};
