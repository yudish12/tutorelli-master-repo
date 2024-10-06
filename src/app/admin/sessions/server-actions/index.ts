"use server";
import { ZoomMeetingCreate } from "@/lib/types/action.types";
import {
  getSessionById,
  getTutorById,
  insertSession,
  getStudentById,
} from "./supabase";
import { getRecurrenceType } from "@/lib/utils";

export const createZoomAccessToken = async () => {
  const url = "https://zoom.us/oauth/token";

  // Replace with your account ID, client ID, and client secret
  const accountId = process.env.ZOOM_ACCOUNT_ID ?? "";
  const clientId = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const params = new URLSearchParams();
    params.append("grant_type", "account_credentials");
    params.append("account_id", accountId);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error from Zoom API:", data);
      throw new Error(data.error || "Failed to obtain access token");
    }

    return data; // Ensure this is returning the access token data
  } catch (error) {
    console.error("Error:", error);
    return { error: "Internal Server Error" };
  }
};

export const createMeeting = async (payload: ZoomMeetingCreate) => {
  const url = `${process.env.ZOOM_BASE_URL}/users/me/meetings`;
  const accessTokenData = await createZoomAccessToken();

  if (accessTokenData.error) {
    return { error: accessTokenData.error };
  }

  const accessToken = accessTokenData.access_token;

  try {
    const zoomPayload = {
      topic: payload.name ?? "Session Name",
      agenda: payload.subject.label,
      type: 2,
      start_time: payload.from,
      default_password: true,
      settings: {
        approval_type: 0,
        join_before_host: true,
        auto_recording: "cloud",
        calendar_type: 2,
      },
      recurrence: payload.recur
        ? {
            type: getRecurrenceType(payload.recur?.repeat_interval),
          }
        : null,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zoomPayload),
    });

    const meetingData = await response.json();
    console.log(meetingData, 77);

    if (!response.ok) {
      console.log("Error from Zoom API:", meetingData);
      throw new Error(meetingData.error || "Failed to create meeting");
    }

    const sessionData = await insertSession(
      { ...payload, zoom_id: meetingData.id },
      meetingData.join_url
    );

    const tutorData = await getTutorById(payload.tutor_id.value);
    //todo save tutor data instead of hardcoded data
    const part = await fetch(
      `${process.env.ZOOM_BASE_URL}/meetings/${meetingData.id}/registrants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: tutorData[0].full_name, // Required
          last_name: "tutor",
          email: tutorData[0].email, // Required
        }),
      }
    );
    const partData = await part.json();
    console.log(partData);

    return { success: true, data: sessionData };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Internal Server Error" };
  }
};

export const addStudentToMeeting = async (
  session_id: string,
  email: string,
  student_id?: string
) => {
  console.log("adding student to meeting");
  try {
    const accessTokenData = await createZoomAccessToken();

    if (accessTokenData.error) {
      return { error: accessTokenData.error };
    }
    const accessToken = accessTokenData.access_token;

    const sessionData = await getSessionById(session_id);
    const meetingId =
      sessionData[0].zoom_id ?? sessionData[4].url.split("/").pop();

    let studentData;

    if (student_id) {
      studentData = await getStudentById(student_id);
    }

    console.log(sessionData, studentData, 139);
    const part = await fetch(
      `${process.env.ZOOM_BASE_URL}/meetings/${meetingId}/registrants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: studentData
            ? studentData[0].full_name
            : "Anonymous Student", // Required
          last_name: "student",
          email: studentData ? studentData[0].email : email, // Required
        }),
      }
    );
    const partData = await part.json();
    console.log(partData, part, 164);

    return { success: true, data: partData };
  } catch (error) {
    console.log("Error:", error);
    return { error: "Internal Server Error" };
  }
};
