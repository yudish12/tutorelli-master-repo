import { subjectStrings, tutorsStrings } from "@/lib/strings/landing";
import Image from "next/image";
import React from "react";
import Tutors from "../(home)/Tutors";
import { Heading } from "@/components/ui/heading";
import MeetEli from "../elli/_components/MeetEli";
import Testimonials from "../(home)/Testimonials";
import LetsDiscover from "../lets-discover";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <>
      <div className="text-blue bg-whitebg px-16 pl-28 gap-12 h-full min-h-[80vh] relative rounded-2xl flex py-28">
        <Image
          className="absolute bottom-0 left-0"
          src={"/eli-bg.png"}
          alt="eli"
          width={400}
          height={200}
        />
        <div className="w-[60%] self-start">
          {/* <h6 className="text-gray-500 text-xl">
            {tutorsStrings.tutorLandingSubHeading}
          </h6> */}
          <Heading level={1} className="mt-2">
            {tutorsStrings.tutorLanginHeading}
          </Heading>
          {subjectStrings.subheadings.map((item, i) => (
            <Heading
              key={i}
              level={6}
              className={cn("text-gray-400", i === 0 && "mt-4")}
            >
              {item}
            </Heading>
          ))}
        </div>
        <Image
          src={"/samplecard1.png"}
          alt="samplecard1"
          width={500}
          height={400}
          className="rounded-2xl max-w-[400px] min-h-[300px]"
        />
      </div>

      <Tutors />
      <MeetEli />
      <Testimonials />
      <LetsDiscover />
    </>
  );
};

export default Page;
