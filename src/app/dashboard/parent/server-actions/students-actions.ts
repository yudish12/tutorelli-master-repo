"use server";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";
import { generateUUID } from "@/lib/utils";
import nodemailer from "nodemailer";
const supabase = getSupabaseServerActionClient();

export const getStudentsByParentId = async (parent_id: string) => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("parent_id", parent_id);
  if (error) {
    throw error;
  }
  return data;
};

export const getTutors = async (student_id: string) => {
  const { data, error } = await supabase.rpc("get_unique_tutors", {
    student_id_param: student_id,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getStudentsBookings = async (student_id: string) => {
  const { data, error } = await supabase.rpc(
    "get_completed_sessions_by_student",
    {
      student_uuid: student_id,
    }
  );
  if (error) {
    return { success: false, error: error };
  }
  return { success: true, data: data };
};

export const getSubjectCountsForStudent = async (student_id: string) => {
  const { data, error } = await supabase.rpc("get_subject_counts_for_student", {
    student_id_param: student_id,
  });

  if (error) {
    throw error;
  }

  const chartData = data.map((item: any) => {
    return {
      subject_name: item.subject_name,
      subject_count: item.subject_count,
      fill: "",
    };
  });

  return chartData;
};

export const inviteStudent = async (email: string, parent_id?: string) => {
  if (!parent_id) {
    return { success: false, error: "Parent id is required" };
  }

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("email", email);
  if (error) {
    throw error;
  }
  if (data.length === 0) {
    return { success: false, error: "Student not found" };
  }

  if (data[0].parent_id) {
    return { success: false, error: "Student already has a parent" };
  }

  const token = generateUUID();
  const insert_token_res = await supabase.from("invite").insert([
    {
      token: token,
      student_id: data[0].id,
      parent_id: parent_id,
    },
  ]);

  if (insert_token_res.error) {
    throw insert_token_res.error;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${data[0].full_name} wants to become your parent on Tutorelli`,
    text: `${process.env.NEXT_PUBLIC_URL}/invite/${token}`,
  };

  const maildata = await transporter.sendMail(mailOptions);
  console.log(maildata);
  return { success: true, error: null };
};
