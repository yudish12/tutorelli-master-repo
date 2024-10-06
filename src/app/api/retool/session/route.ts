// \

import { NextRequest, NextResponse } from "next/server";
import { ZoomMeetingCreate } from "@/lib/types/action.types";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";
import {
  createZoomAccessToken,
  getTutorById,
  insertSession,
} from "../controllers/sessions";

async function createSessionBlock(supabase: any, payload: any) {
  const endDate = new Date(payload.from);
  endDate.setDate(endDate.getDate() + 7 * (payload.block_size - 1));
  const { data, error } = await supabase
    .from("session_block")
    .insert([
      {
        start_date: payload.from,
        price: payload.price,
        capacity: payload.capacity,
        block_size: payload.block_size,
        name: payload.name,
        tutor_id: payload.tutor_id.value,
        subject_id: payload.subject.value,
        end_date: endDate,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating session block:", error);
    throw new Error("Failed to create session block");
  }

  return data[0];
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseRouteHandlerClient();
  try {
    const payload: ZoomMeetingCreate = await request.json();
    console.log("payload", payload);
    const sessionBlock = await createSessionBlock(supabase, payload);

    const accessTokenData = await createZoomAccessToken();
    if (!accessTokenData || accessTokenData.error) {
      return NextResponse.json(
        { error: "Failed to create Zoom access token" },
        { status: 500 }
      );
    }
    const accessToken = accessTokenData.access_token;

    const tutorData = await getTutorById(payload.tutor_id.value, supabase);
    if (!tutorData || tutorData.length === 0) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 404 });
    }

    //create block

    const zoomUrl = `${process.env.ZOOM_BASE_URL}/users/me/meetings`;
    const allSessionData = [];

    const zoomPayload = {
      topic: `${payload.name}`,
      agenda: payload.subject.label,
      type: payload.recur ? 8 : 2,
      start_time: new Date(payload.from),
      default_password: true,
      settings: {
        approval_type: 0,
        join_before_host: true,
        auto_recording: "cloud",
        calendar_type: 2,
      },
      recurrence: payload.recur
        ? {
            type: 2,
            end_times: payload.block_size,
            weekly_days: new Date(payload.from).getDay() + 1,
          }
        : null,
    };

    const response = await fetch(zoomUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zoomPayload),
    });

    console.log(response);
    const meetingData = await response.json();
    if (!response.ok) {
      console.log("Error from Zoom API:", meetingData);
      return NextResponse.json(
        { error: "Failed to create meeting" },
        { status: 500 }
      );
    }

    // Register tutor for the meeting
    const registrationData = await fetch(
      `${process.env.ZOOM_BASE_URL}/meetings/${meetingData.id}/registrants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: tutorData[0].full_name,
          last_name: "tutor",
          email: tutorData[0].email,
        }),
      }
    );
    const regres = await registrationData.json();

    let sessionData;
    if (!payload.recur) {
      for (let i = 0; i < payload.block_size; i++) {
        sessionData = await insertSession(
          {
            ...payload,
            zoom_id: meetingData.id,
            name: `${payload.name} - Session ${i + 1}`,
            from: payload.from,
          },
          regres.join_url,
          supabase,
          null
        );
        allSessionData.push(sessionData);
      }
    } else {
      const blockSessionData = await Promise.all(
        meetingData.occurrences
          .slice(0, payload.block_size)
          .map(async (occurrence: any, i: number) => {
            return await insertSession(
              {
                ...payload,
                block_id: sessionBlock.id,
                zoom_id: meetingData.id,
                name: `${payload.name} - Session ${i + 1}`,
                from: occurrence.start_time,
              },
              regres.join_url,
              supabase,
              occurrence.occurrence_id
            );
          })
      );
      allSessionData.push(...blockSessionData);
    }

    console.log("All session data:", allSessionData);

    return NextResponse.json(
      { success: true, data: allSessionData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/zoom/create-meeting:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
