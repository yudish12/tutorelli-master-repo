import { howItWorksStrings, subjectStrings } from "@/lib/strings/landing";
import React from "react";
import Image from "next/image";
import HowItWorks from "../(how-it-works)/HowItWorks";
import GroupTutoring from "../(home)/GroupTutoring";
import HowAreWeDifferent from "../how-we-different";
import LetsDiscover from "../lets-discover";
import PricingPage from "../pricing/page";
import PricingComp from "../pricing/_components/PricingComp";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

const Page = () => {
  return (
    <>
      <div className="text-blue bg-whitebg px-16 pl-28 h-full min-h-[80vh] gap-12 relative rounded-2xl flex py-28">
        <Image
          className="absolute bottom-0 left-0"
          src={"/eli-bg.png"}
          alt="eli"
          width={400}
          height={200}
        />
        <div className="w-[60%] self-start">
          {/* <h6 className="text-gray-500 text-xl">
            {howItWorksStrings.howItWorksStringsLandingSubHeading}
          </h6> */}
          <Heading level={1} className="mt-2">
            {howItWorksStrings.howItWorksStringsLandingHeading}
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
          className="rounded-2xl max-w-[400px] min-h-[300px] max-h-[400px]"
        />
      </div>
      <HowItWorks />
      <GroupTutoring />
      <div className="bg-whitebg rounded-2xl mt-6 p-10">
        <PricingComp pagename="how-it-works" />
      </div>
      <HowAreWeDifferent />
      <LetsDiscover />
    </>
  );
};

export default Page;
