import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";

const QuizHeader = ({
  score,
  totalScore,
}: {
  score: number;
  totalScore: number;
}) => {
  return (
    <div className="flex mt-12 justify-between bg-white p-6 rounded-t-md border-[1.5px] border-gray-300 ">
      <div className="flex gap-4 w-full">
        <div className="bg-gray-400 flex justify-center items-center p-2 h-10 w-10 cursor-pointer rounded-md">
          <ArrowLeftIcon color="white" />
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-medium">Quiz Name</h4>
          <div className="flex gap-4">
            <span className="text-darkgray text-sm">
              Attempted on Dec 12, 2022
            </span>
            <span className="text-darkgray text-sm">Time Taken : 10 mins</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end gap-8 items-center">
        <h4 className="text-md text-darkgray">
          Score : {score} / {totalScore}
        </h4>
        <Progress value={66} className="w-1/3 text-blue h-[15px]" />
        <Button variant={"outline"}>Unflag All Questions</Button>
      </div>
    </div>
  );
};

export default QuizHeader;
