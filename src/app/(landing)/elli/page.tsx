import { eliLandingPagestrings } from "@/lib/strings/eli";
import Image from "next/image";
import React from "react";
import MeetEli from "./_components/MeetEli";
import { Heading } from "@/components/ui/heading";

const EliPage = () => {
  return (
    <>
      <div className="bg-whitebg py-28 relative min-h-[80vh] rounded-xl w-full h-full">
        <Image
          className="absolute bottom-0 left-0"
          src={"/eli-bg.png"}
          alt="eli"
          width={400}
          height={200}
        />
        <div className="flex justify-center gap-8 w-4/5 mx-auto">
          <div className="flex eli-circle relative flex-col gap-6">
            <h5 className="text-darkgray text-2xl font-normal">
              {eliLandingPagestrings.subHeader}
            </h5>
            <Heading level={1} className="text-blue">
              {eliLandingPagestrings.header}
            </Heading>
          </div>
          <Image
            src={"/Preview.png"}
            alt="preview"
            width={1500}
            height={1200}
          />
        </div>
      </div>
      <MeetEli />
    </>
  );
};

export default EliPage;
