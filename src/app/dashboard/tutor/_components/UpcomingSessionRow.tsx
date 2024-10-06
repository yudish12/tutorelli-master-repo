import { Badge } from "@/components/ui/badge";
import {
  blockData,
  SessionData,
  UpcomingSessionDataType,
} from "@/lib/types/action.types";
import moment from "moment";
import React from "react";

const UpcomingSessionRow = ({
  sessionData,
}: {
  sessionData: UpcomingSessionDataType;
}) => {
  console.log(sessionData, sessionData.session_block);
  if (!sessionData) {
    return;
  }
  return (
    <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2 justify-between w-full">
      <span>{sessionData?.session_block?.subject?.class?.name}</span>
      <Badge className="w-1/6 flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths">
        {sessionData?.session_block?.subject?.name}
      </Badge>
      <span className="text-sm min-w-[130px] text-gray-500">
        {moment(sessionData?.from).format("DD MMM, hh:mm A (ddd)")}
      </span>
      <span className="text-primary">Send Message</span>
    </div>
  );
};

export default UpcomingSessionRow;
