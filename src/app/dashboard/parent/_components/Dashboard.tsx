"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import PreviousSession from "../../_components/PreviousSession";
import { ParentBookingType, SessionData } from "@/lib/types/action.types";
import SessionBreakdown from "./SessionBreakdown";
import { useParentContext } from "@/context/ParentProvider";
import { getPreviousSessions } from "../../student/server-actions/session";
import {
  getStudentsBookings,
  getSubjectCountsForStudent,
  getTutors,
} from "../server-actions/students-actions";
import TutorsCard from "./TutorsCard";
import Bookings from "./Bookings";
import { subjectBadgeColors } from "@/config/contants";

type SubjectCounts = {
  subject_name: string;
  subject_count: number;
};

const Dashboard = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<ParentBookingType[]>([]);
  const [previousSessions, setPreviousSessions] = useState<SessionData | []>(
    []
  );
  const [tutors, setTutors] = useState([]);
  const { selectedStudent } = useParentContext();
  const [subjectCounts, setSubjectCounts] = useState<SubjectCounts[]>([]);

  const init = async () => {
    try {
      const previousSessiondata = await getPreviousSessions(
        selectedStudent.value
      );
      const tutorsData = await getTutors(selectedStudent.value);
      setTutors(tutorsData);
      const subjectCounts = await getSubjectCountsForStudent(
        selectedStudent.value
      );
      setSubjectCounts(subjectCounts);
      const bookings = await getStudentsBookings(selectedStudent.value);
      console.log(bookings, 40);
      setBookings(bookings.data as unknown as ParentBookingType[]);
      setPreviousSessions(previousSessiondata as unknown as SessionData);
      setLoading(false);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  const createChartData = (subjectCounts: SubjectCounts[]) => {
    const chartData = subjectCounts.map((item: SubjectCounts) => ({
      browser: item.subject_name,
      visitors: item.subject_count,
      fill: subjectBadgeColors[item.subject_name],
    }));
    return chartData;
  };

  useEffect(() => {
    if (!selectedStudent.value) {
      setLoading(false);
      return;
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent]);

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
      <SessionBreakdown chartdata={createChartData(subjectCounts)} />
      <PreviousSession
        role={user?.role}
        id={selectedStudent.value!}
        previousSessions={previousSessions}
      />
      <TutorsCard tutors={tutors} />
      <Bookings bookings={bookings} />
    </div>
  );
};

export default Dashboard;
