"use client";
import React, { useEffect, useState } from "react";
// import UpcomingSession from "./UpcomingSession";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPreviousSessions,
  upComingSessions,
} from "../server-actions/session";
import PreviousSession from "../../_components/PreviousSession";
// import { getFlashCardsByStudentId } from "../server-actions/misc";
import UpcomingSession from "../_components/UpcomingSession";
import {
  SessionData,
  TutorSessionData,
  UpcomingSessionDataType,
} from "@/lib/types/action.types";
import { roles } from "@/config/contants";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [upcomingSessions, setUpcomingSessions] = useState<
    UpcomingSessionDataType[] | []
  >([]);
  const [previousSessions, setPreviousSessions] = useState<SessionData | []>(
    []
  );
  const { toast } = useToast();
  const init = async () => {
    try {
      // Execute the API calls concurrently using Promise.all
      const [upcomingSessionData, previousSessionData] = await Promise.all([
        upComingSessions(user_info?.id!),
        getPreviousSessions(user_info?.id!),
      ]);

      // Handle the state updates
      console.log(previousSessionData, 30);
      setUpcomingSessions(
        upcomingSessionData as unknown as UpcomingSessionDataType[]
      );
      setPreviousSessions(previousSessionData as unknown as SessionData);

      setLoading(false); // Set loading to false after successful data fetch
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error as string,
      }); // Display error message
    } finally {
      setLoading(false); // Ensure loading state is updated regardless of success or failure
    }
  };

  useEffect(() => {
    if (!user_info) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_info]);

  if (loading)
    return (
      <div className="w-full flex flex-col gap-6">
        <div className="w-full grid grid-cols-2 gap-x-4 mt-4">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-4">
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
        </div> */}
      </div>
    );
  return (
    <div className="w-full grid grid-cols-2 gap-x-4 mt-4">
      <UpcomingSession upcomingSessions={upcomingSessions} />
      <PreviousSession
        role={
          user?.role || user?.email === "yudi@gmail.com"
            ? roles.TUTOR
            : "student"
        }
        id={user_info?.id!}
        previousSessions={
          Array.isArray(previousSessions) ? previousSessions : []
        }
      />
      {/* <Stats
        flashcards={count_flashcards}
        countQuiz={count_quiz}
        totlaSessions={previousSessions.length + upcomingSessions.length}
      /> */}
    </div>
  );
};
export default Dashboard;
