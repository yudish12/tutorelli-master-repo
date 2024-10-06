import { ZoomMeetingCreate } from "@/lib/types/action.types";

export async function getTutorById(tutor_id: string, supabase: any) {
  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .eq("id", tutor_id);

  if (error) {
    console.error("Error fetching tutor:", error);
    throw new Error("Failed to fetch tutor data");
  }

  return data;
}

export async function insertSession(
  payload: ZoomMeetingCreate,
  url: string,
  supabase: any,
  occurrence_id: string | null
) {
  const { data, error } = await supabase
    .from("sessions")
    .insert([
      {
        name: payload.name,
        block_id: payload.block_id,
        occurrence_id: occurrence_id,
        status: "upcoming",
        from: payload.from,
        url: url,
        recording: "not-yet",
        zoom_id: payload.zoom_id,
      },
    ])
    .select("id");
  console.log(data);
  if (error) {
    console.error("Error inserting session:", error);
    throw new Error("Failed to insert session");
  }

  return { data, error };
}

export async function createZoomAccessToken() {
  const url = "https://zoom.us/oauth/token";
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

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}
