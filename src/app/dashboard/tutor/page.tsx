import React from "react";
import Link from "next/link";
import { CirclePlay } from "lucide-react";
import Dashboard from "./_components/Dashboard";
import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import moment from "moment";
import { SessionStatus } from "@/config/contants";
import { Heading } from "@/components/ui/heading";

const TutorPage = async () => {
  const client = getSupabaseServerComponentClient();
  const userData = await client.auth.getUser();
  let sessionData;

  if (!userData.error && userData.data.user.user_metadata.approved) {
    const data = await client
      .from("session_block")
      .select("tutors!inner(email),sessions!inner(from,recording,id,status)")
      .eq("sessions.status", SessionStatus.COMPLETED)
      .eq("tutors.email", userData.data.user.email)
      .neq("sessions.recording", null)
      .order("from", { referencedTable: "sessions", ascending: false })
      .limit(1);

    sessionData = data as any;
  }

  const isApproved = userData.data.user?.user_metadata.approved;
  return (
    <div className="bg-whitebg relative h-[100vh] overflow-auto w-full text-blue py-6 px-20">
      {/* <DashboardHeader /> */}
      <h3 className="font-semibold text-2xl mt-6 capitalize">
        Hello, {userData.data.user?.user_metadata.full_name}
      </h3>
      <div className="flex justify-between mt-6 shadow-md items-center w-full bg-white p-6 rounded-md">
        {sessionData?.data?.length ? (
          <>
            <div className="w-1/3">
              <h3 className="text-xl font-semibold">Last Session Recording</h3>
              <p className="text-2xl font-light leading-3 mt-6">
                {moment(sessionData?.data?.[0]?.sessions.from).format(
                  "DD MMM, hh:mm A (ddd)"
                )}
              </p>
            </div>
            <Link
              href={sessionData.data[0]?.sessions[0]?.recording ?? ""}
              className="flex items-center gap-4"
            >
              <CirclePlay className="w-12 h-12 text-peach" />
              <p className="text-xl font-medium">Play Recording</p>
            </Link>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/${sessionData.data[0]?.sessions[0]?.id}/notes`}
                className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/80"
              >
                notes
              </Link>
              <Link
                href={`/dashboard/${sessionData.data[0]?.sessions[0].id}/flashcards`}
                className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/80"
              >
                flashcards
              </Link>
              <Link
                href={`/dashboard/${sessionData.data[0]?.sessions[0].id}/quiz`}
                className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/80"
              >
                quizzes
              </Link>
            </div>
          </>
        ) : (
          <div className="p-4">
            <Heading level={5}>
              {!isApproved
                ? "Your tutor account is not approved yet. It may take upto 48 hours to get approved."
                : "No session recording is available at the moment."}
            </Heading>
          </div>
        )}
      </div>
      <Dashboard />
    </div>
  );
};

export default TutorPage;
