import { eliLandingPagestrings, meetEliCardsStrings } from "@/lib/strings/eli";
import React from "react";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";

const MeetEli = () => {
  return (
    <div className="bg-whitebg mt-6 rounded-xl py-10">
      <Heading level={2}>{eliLandingPagestrings.meetEli}</Heading>
      <Heading level={6} className="text-darkgray text-center mt-4">
        {eliLandingPagestrings.meetEliDescription}
      </Heading>
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="flex items-center justify-center mt-12 gap-16">
          <Image src={"/cardimg-1.png"} alt="eli" width={300} height={300} />
          <div className="w-1/3">
            <div className="font-semibold rounded-md text-lg bg-lightpuprple w-12 h-12 flex justify-center items-center p-4">
              1
            </div>
            <p className="text-2xl mt-6 ">{meetEliCardsStrings.card1}</p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-12 gap-16">
          <div className="w-1/3">
            <div className="font-semibold rounded-md text-lg bg-maths w-12 h-12 flex justify-center items-center p-4">
              2
            </div>
            <p className="text-2xl mt-6 ">{meetEliCardsStrings.card1}</p>
          </div>
          <Image src={"/cardimg-3.png"} alt="eli" width={300} height={300} />
        </div>
      </div>
    </div>
  );
};

export default MeetEli;
