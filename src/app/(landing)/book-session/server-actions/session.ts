"use server";
import { addStudentToMeeting } from "@/app/admin/sessions/server-actions";
import { getSupabaseServerActionClient } from "@/lib/supabase/clients/server-action.client";

const client = getSupabaseServerActionClient();

export type Filters = {
  "subject.class_id": string;
  subject_id: string;
  "tutors.full_name": string;
};

export const getSessions = async (filters?: Filters, studentId?: string) => {
  let registeredSessionIds: string[] = [];

  // Step 1: Fetch session IDs where the student is registered
  if (studentId) {
    const { data: registeredSessions, error: registeredSessionsError } =
      await client
        .from("students_registered_session")
        .select("block_id")
        .eq("student_id", studentId);

    if (registeredSessionsError) {
      throw registeredSessionsError;
    }

    registeredSessionIds = registeredSessions.map(
      (session) => session.block_id
    );
  }

  // Step 2: Query sessions, excluding registered ones
  let query = client
    .from("session_block")
    .select(
      `
      id,
      name,
      block_size,
      start_date,
      end_date,
      price,
      capacity,
      tutors!inner(
        full_name
      ),
      subject!inner(
        name,
        class_id,
        class!inner(
          name
        )
      )
    `
    )
    // Convert current date to ISO string (removing milliseconds)
    .gte("start_date", new Date().toISOString().split("T")[0]) // Get only the date portion
    .order("start_date", { ascending: false });

  // Apply filters dynamically
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;
      query = query.eq(key, value);
    }
  }

  let { data, error } = await query;
  console.log(data, 68);
  if (error) {
    throw error;
  }

  // Filter out registered sessions
  if (registeredSessionIds.length > 0) {
    data = (data ?? []).filter(
      (session) => !registeredSessionIds.includes(session.id)
    );
  }

  return data;
};

export const bookSession = async (
  email: string,
  block_id?: string,
  student_id?: string
) => {
  if (!block_id || !email) {
    return { success: false, data: "Invalid block_id or email" };
  }

  // Fetch the block and sessions
  const { data: block, error: sessionError } = await client
    .from("session_block")
    .select("sessions!inner(id)")
    .eq("id", block_id)
    .single();

  if (sessionError || !block) {
    return { success: false, data: sessionError || "Invalid block_id" };
  }

  const sessData: any[] = [];
  console.log(block, sessionError, 106);
  // Loop over sessions and process each one
  for (const session of block.sessions) {
    try {
      const response = await addStudentToMeeting(session.id, email, student_id);
      if (response.success === false) {
        return { success: false, data: response.error };
      }

      const { data: sessionData, error: insertError } = await client
        .from("students_registered_session")
        .insert({
          session_id: session.id,
          block_id: block_id,
          student_id: student_id === "" ? null : student_id,
          registered_email: email,
          join_url: response.data.join_url,
        });

      if (insertError) {
        console.log(insertError);
        return { success: false, data: insertError };
      }

      sessData.push(sessionData);
    } catch (err) {
      console.log(err);
      return { success: false, data: err };
    }
  }

  const decres = await client.rpc("decrease_capacity", {
    p_block_id: block_id,
  });
  console.log(decres, 129);

  console.log(sessData);

  return { success: true, data: sessData };
};
