import { Heading } from "@/components/ui/heading";
import { subjectStrings, tutorsStrings } from "@/lib/strings/landing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import PopularSubjects from "../PopularSubjects";

const SubjectPage = () => {
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
          <Heading level={1} className="mt-2">
            {subjectStrings.header}
          </Heading>
          <div className="relative flex flex-col gap-2">
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
        </div>
        <Image
          src={"/samplecard1.png"}
          alt="samplecard1"
          width={500}
          height={400}
          className="rounded-2xl max-w-[400px] min-h-[300px] max-h-[400px]"
        />
      </div>
      <PopularSubjects />
    </>
  );
};

export default SubjectPage;
