import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthProvider";
import moment from "moment";
import {
  BookOpenIcon,
  FileQuestion,
  NotebookIcon,
  PlaySquare,
  UploadIcon,
  Video,
} from "lucide-react";
import { CardStackIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import { roles } from "@/config/contants";
import { useRouter } from "nextjs-toploader/app";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
  blockData,
  SessionData,
  SingleSessionData,
} from "@/lib/types/action.types";

const PrevSessionRow = ({ item }: { item: SingleSessionData }) => {
  const { user } = useAuth();
  const router = useRouter();
  console.log(30, item);

  const Node = (
    <div className="flex gap-2">
      <div
        className=" cursor-pointer"
        onClick={() => router.push(item.sessions.recording ?? "")}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Video className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent className="bg-blue/80 text-white mb-1 rounded-md py-1 px-2">
              <p className="text-sm">Recording</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className="cursor-pointer"
        onClick={() =>
          router.push(`/dashboard/${item.sessions.id}/notes` ?? "")
        }
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <NotebookIcon className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent className="bg-blue/80 text-white mb-1 rounded-md py-1 px-2">
              <p className="text-sm">Notes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className=" cursor-pointer"
        onClick={() =>
          router.push(`/dashboard/${item.sessions.id}/flashcards` ?? "")
        }
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <BookOpenIcon className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent className="bg-blue/80 text-white mb-1 rounded-md py-1 px-2">
              <p className="text-sm">Flashcards</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        className=" cursor-pointer"
        onClick={() => router.push(`/dashboard/${item.sessions.id}/quiz`)}
      >
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <FileQuestion className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent className="bg-blue/80 text-white mb-1 rounded-md py-1 px-2">
              <p className="text-sm">Quiz</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
  console.log(item);
  return (
    <div
      key={item.sessions.id}
      className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-4 justify-between w-full"
    >
      <span className="inline-block text-ellipsis whitespace-nowrap overflow-hidden">
        {item.session_block.subject.class.name}
      </span>
      <Badge className="w-1/6 flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths">
        {item.session_block.subject.name}
      </Badge>
      <span className="text-sm text-gray-500">
        {moment(item.sessions.from).format("DD MMM, hh:mm A (ddd)")}
      </span>
      {Node}
    </div>
  );
};

export default PrevSessionRow;
