"use client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  SessionData,
  SingleSessionData,
  TutorSessionData,
} from "@/lib/types/action.types";
import PrevSessionRow from "./PrevSessionRow";
import { roles, SessionStatus } from "@/config/contants";
import TutorPrevSessionRow from "./tutor-prev-session-row";

const PreviousSession = (props: {
  previousSessions: SessionData;
  id: string;
  role?: string;
}) => {
  //due to time constraints, ts error are not handled here with best practices

  return (
    <div className="bg-white p-6 w-full shadow-md rounded-md">
      <div className="flex justify-between mb-4">
        <h3 className="text-md font-bold">Previous Session</h3>
        <Link
          className="text-primary flex gap-2 items-center text-md min-w-[100px]"
          href={`/dashboard/allsessions?tab=${SessionStatus.COMPLETED}`}
        >
          show all sessions
          <ArrowRightIcon />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {props.previousSessions.map((item, index) => (
          <PrevSessionRow
            item={item as unknown as SingleSessionData}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousSession;
