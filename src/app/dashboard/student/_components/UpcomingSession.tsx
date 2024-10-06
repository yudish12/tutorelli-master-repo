"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OpenZoom from "../../../_components/OpenZoom";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blockData, SessionData } from "@/lib/types/action.types";
import moment from "moment";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const UpcomingSession = (props: {
  upcomingSessions: SessionData | [];
  blockdata?: blockData;
}) => {
  console.log(props.upcomingSessions);
  const session = props.upcomingSessions[0]?.sessions;
  const blockdata = props.blockdata;

  return (
    <div className="bg-white p-6 w-full shadow-md rounded-md">
      {session ? (
        <>
          <div className="flex justify-between">
            <h3 className="text-md font-bold">Upcoming Session</h3>
            <OpenZoom linkText="Open Zoom" zoomLink={session?.join_url ?? ""} />
          </div>
          <div id="session-info" className="flex flex-col mt-6 gap-4">
            <h4 className="text-2xl font-light">
              {moment(session?.from).format("DD MMM, hh:mm A (ddd)")}
            </h4>
            <Badge className="w-1/6 flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths">
              {blockdata?.subject?.name}
            </Badge>
            <div className="flex bg-gray-100 rounded-sm p-2 items-center gap-6 w-1/2  mt-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{blockdata?.tutors?.full_name}</span>
            </div>
            <Button className="p-7 rounded-lg font-semibold text-md w-1/2">
              Prepare For the Session
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="text-md font-bold">Upcoming Session</h3>
            <Link
              className="flex gap-2 items-center text-primary"
              href={"/dashboard/book-session"}
            >
              Book Session
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingSession;
