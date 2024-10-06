"use client";
import React, { useEffect, useState, useMemo } from "react";
import SessionCard from "./_components/SessionCard";
import {
  getSessionsByStudentId,
  getSessionsByTutorId,
} from "./server-actions/action";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "sonner";
import { SessionDataReturned } from "./server-actions/response.types";
import { roles, SessionStatus } from "@/config/contants";
import DropDown from "../parent/_components/DropDown";
import { useParentContext } from "@/context/ParentProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { emptyCols } from "@/components/columns/empty-cols";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

const Allsessions = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [allSessions, setAllSessions] = useState<SessionDataReturned[]>([]);
  const searchParams = useSearchParams();
  const { selectedStudent } = useParentContext();

  const tab = searchParams.get("tab");
  const [currentTab, setCurrentTab] = useState(tab || SessionStatus.UPCOMING);
  const router = useRouter();
  router.replace("/dashboard/allsessions");

  const fetchSessions = useCallback(async () => {
    try {
      let resp: SessionDataReturned[];
      if (roles.STUDENT === user?.role) {
        resp = await getSessionsByStudentId(user_info?.id!);
      } else if (roles.PARENT === user?.role) {
        resp = await getSessionsByStudentId(selectedStudent.value);
      } else {
        resp = await getSessionsByTutorId(user_info?.id!);
      }
      setAllSessions(resp);
      setLoading(false);
    } catch (error) {
      toast.error(error as string);
      setLoading(false);
    }
  }, [user, user_info, selectedStudent]);

  useEffect(() => {
    if (user_info) {
      fetchSessions();
    }
  }, [user_info, fetchSessions]);

  const filteredSessions = useMemo(() => {
    return allSessions.filter((item) => item.status === currentTab);
  }, [allSessions, currentTab]);

  if (!filteredSessions.length && !loading) {
    return (
      <div className="bg-whitebg relative h-[100vh] overflow-auto w-full text-blue py-6 px-20">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl text-center py-4 font-semibold ">
            Your Sessions
          </h2>
          <div className="flex gap-4">
            {/* {roles.PARENT === user?.role && <DropDown />} */}
            <Button
              onClick={() => setCurrentTab(SessionStatus.UPCOMING)}
              className={cn(
                currentTab === SessionStatus.COMPLETED && "bg-white text-black",
                "hover:text-white"
              )}
            >
              {SessionStatus.UPCOMING}
            </Button>
            <Button
              onClick={() => setCurrentTab(SessionStatus.COMPLETED)}
              className={cn(
                currentTab === SessionStatus.UPCOMING && "bg-white text-black",
                "hover:text-white"
              )}
            >
              {SessionStatus.COMPLETED}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-whitebg relative h-[100vh] overflow-auto w-full text-blue py-6 px-20">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl text-center py-4 font-semibold ">
          Your Sessions
        </h2>
        <div className="flex items-center gap-4">
          {roles.PARENT === user?.role && (
            <div className="flex flex-col">
              <DropDown />
            </div>
          )}
          <Button
            onClick={() => setCurrentTab(SessionStatus.UPCOMING)}
            className={cn(
              currentTab === SessionStatus.COMPLETED && "bg-white text-black",
              "hover:text-white"
            )}
          >
            {SessionStatus.UPCOMING}
          </Button>
          <Button
            onClick={() => setCurrentTab(SessionStatus.COMPLETED)}
            className={cn(
              currentTab === SessionStatus.UPCOMING && "bg-white text-black",
              "hover:text-white"
            )}
          >
            {SessionStatus.COMPLETED}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6">
        {!loading ? (
          filteredSessions.map((item, index) => (
            <SessionCard role={user?.role} sessionData={item} key={index} />
          ))
        ) : (
          <>
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="w-[500px] h-[300px] bg-primary/10" />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Allsessions;
