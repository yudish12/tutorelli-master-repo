import { roles } from "@/config/contants";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const Stats = (props: {
  flashcards: number;
  countNotes: number;
  countQuiz: number;
  totalSessions: number;
  role?: string;
}) => {
  const router = useRouter();
  return (
    <div className="grid mt-4 gap-x-4 grid-cols-4 col-span-2">
      <div
        onClick={() => router.push("/dashboard/allsessions")}
        className="w-full cursor-pointer p-6 h-[200px] bg-white shadow-md rounded-lg"
      >
        <div className="h-full w-full flex flex-col justify-between">
          <h4 className="font-semibold text-lg">Sessions</h4>
          <div className="flex justify-center items-center h-full">
            <h2 className="font-bold text-5xl">{props.totalSessions}</h2>
          </div>
        </div>
      </div>
      {props.role !== roles.TUTOR && (
        <div
          onClick={() => router.push("/dashboard/notes")}
          className="font-semibold cursor-pointer text-lg p-6 bg-white shadow-md rounded-lg"
        >
          <div className="h-full w-full flex flex-col justify-between">
            <h4 className="font-semibold text-lg">Notes</h4>
            <div className="flex justify-center items-center h-full">
              <h2 className="font-bold text-5xl">{props.countNotes}</h2>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() => router.push("/dashboard/flashcards")}
        className="font-semibold cursor-pointer text-lg p-6 bg-white shadow-md rounded-lg"
      >
        <div className="h-full w-full flex flex-col justify-between">
          <h4 className="font-semibold text-lg">Flashcards</h4>
          <div className="flex justify-center items-center h-full">
            <h2 className="font-bold text-5xl">{props.flashcards}</h2>
          </div>
        </div>
      </div>
      <div
        onClick={() => router.push("/dashboard/quiz")}
        className="font-semibold text-lg p-6 cursor-pointer bg-white shadow-md rounded-lg"
      >
        <div className="h-full w-full flex flex-col justify-between">
          <h4 className="font-semibold text-lg">Quiz</h4>
          <div className="flex justify-center items-center h-full">
            <h2 className="font-bold text-5xl">{props.countQuiz}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
