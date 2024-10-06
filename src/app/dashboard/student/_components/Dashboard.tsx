"use client";
import React, { useEffect, useState } from "react";
import UpcomingSession from "./UpcomingSession";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getPreviousSessions,
  upComingSessions,
} from "../server-actions/session";
import { toast } from "sonner";
import PreviousSession from "../../_components/PreviousSession";
import { getFlashCardsByStudentId } from "../server-actions/misc";
import Stats from "../../_components/Stats";
import { blockData, SessionData } from "@/lib/types/action.types";
import {
  getNotesCount,
  getQuizzesStudents,
} from "../server-actions/quizAndFlashcards";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [upcomingSessions, setUpcomingSessions] = useState<SessionData | []>(
    []
  );
  const [blockData, setBlockData] = useState<blockData>();
  const [previousSessions, setPreviousSessions] = useState<SessionData | []>(
    []
  );
  const [count_flashcards, setCountFlashcards] = useState<number>(0);
  const [count_quiz, setCountQuiz] = useState<number>(0);
  const [count_notes, setCountNotes] = useState<number>(0);
  const { toast } = useToast();

  const init = async () => {
    try {
      // Execute all API calls simultaneously using Promise.all
      const [
        upcomingSessiondata,
        previousSessiondata,
        count_flashcards,
        count_quiz,
        count_notes,
      ] = await Promise.all([
        upComingSessions(user_info?.id!),
        getPreviousSessions(user_info?.id!),
        getFlashCardsByStudentId(user_info?.id!),
        getQuizzesStudents(user_info?.id!),
        getNotesCount(user_info?.id!),
      ]);

      console.log(previousSessiondata, upcomingSessiondata, 53);
      // Handle the state updates
      setCountFlashcards(count_flashcards);
      setCountQuiz(count_quiz);
      setPreviousSessions(previousSessiondata as unknown as SessionData);
      setCountNotes(count_notes);

      if (
        upcomingSessiondata[0]?.sessions &&
        upcomingSessiondata[0].session_block
      ) {
        setUpcomingSessions(
          upcomingSessiondata.map((item) => ({
            ...item,
            sessions: {
              ...item.sessions,
              join_url: item.sessions.join_url,
            },
          })) as unknown as SessionData
        );
        console.log(upcomingSessiondata[0]);
        setBlockData(upcomingSessiondata[0].session_block);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error as string,
      }); // Ensure loading state is updated in case of an error
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
        <div className="grid grid-cols-4">
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[200px] h-[200px]" />
        </div>
      </div>
    );
  return (
    <div className="w-full grid grid-cols-2 gap-x-4 mt-4">
      <UpcomingSession
        blockdata={blockData}
        upcomingSessions={upcomingSessions}
      />
      <PreviousSession
        role={user?.role}
        id={user_info?.id!}
        previousSessions={previousSessions}
      />
      <Stats
        role={user?.role}
        flashcards={count_flashcards}
        countQuiz={count_quiz}
        countNotes={count_notes}
        totalSessions={previousSessions.length + upcomingSessions.length}
      />
    </div>
  );
};

export default Dashboard;
