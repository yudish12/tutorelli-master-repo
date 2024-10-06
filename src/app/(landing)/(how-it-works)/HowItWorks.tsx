import { howItWorksStrings } from "@/lib/strings/landing";
import React from "react";
import HowItWorksCard from "./_components/how-it-works-card";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";

const HowItWorks = () => {
  return (
    <div
      id="how-it-works"
      className="bg-whitebg relative text-blue mt-6 p-10 w-full rounded-xl gap-24 h-full"
    >
      <Heading level={2}>How does it work</Heading>
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4 mt-8">
        {howItWorksStrings.cardData.map((item, index) => (
          <HowItWorksCard
            key={index}
            index={item.index}
            desc={item.desc}
            heading={item.heading}
            image={item.image}
          />
        ))}
      </div>
      <div className="bg-indigo flex flex-col w-2/3 p-10 mx-auto rounded-xl mt-12">
        <div className="items-center flex justify-center ">
          <Image src={"/eliLogo.svg"} alt="eli" width={200} height={100} />
          <div className="bg-gray-100 h-[100px] text-center rounded-xl p-4">
            {howItWorksStrings.eliDesc}
          </div>
        </div>
        <div className="bg-maths justify-self-end self-end flex justify-center w-44 rounded-full absol p-2">
          {howItWorksStrings.saving}
        </div>
      </div>
      <Image
        className="absolute bottom-[50px] left-[10%]"
        src={"/skinTriangle.svg"}
        alt="skintriangle"
        width={80}
        height={80}
      />
    </div>
  );
};

export default HowItWorks;
