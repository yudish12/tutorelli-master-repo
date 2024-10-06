import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import UpcomingSessionRow from "./UpcomingSessionRow";
import { UpcomingSessionDataType } from "@/lib/types/action.types";
import { SessionStatus } from "@/config/contants";

const UpcomingSession = ({
  upcomingSessions,
}: {
  upcomingSessions: UpcomingSessionDataType[];
}) => {
  console.log(upcomingSessions, 15);
  return (
    <div className="bg-white p-6 w-full shadow-md rounded-md">
      <div className="flex justify-between">
        <h3 className="text-md font-bold">Upcoming Session</h3>
        <Link
          className="text-primary flex gap-2 items-center text-md min-w-[100px]"
          href={`/dashboard/allsessions?tab=${SessionStatus.UPCOMING}`}
        >
          show all sessions
          <ArrowRightIcon />
        </Link>
      </div>
      {upcomingSessions.length > 0 ? (
        <div className="flex flex-col mt-4 gap-2">
          {upcomingSessions.map((item, i) => (
            //@ts-ignore
            <UpcomingSessionRow
              sessionData={{
                ...upcomingSessions[i],
                status: upcomingSessions[i]?.status,
                id: upcomingSessions[i]?.id,
                from: upcomingSessions[i]?.from,
                session_block: upcomingSessions[i]?.session_block,
              }}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col mt-4 gap-6">
          <div className="flex justify-center items-center gap-4">
            <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-4 justify-between w-full">
              <span>No upcoming sessions</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingSession;
