import { Heading } from "@/components/ui/heading";
import { popularSubjectsStrings } from "@/lib/strings/landing";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ClassCards = ({
  name,
  color,
  icon,
  subjects,
}: {
  name: string;
  color: string;
  icon: string;
  subjects: any[];
}) => {
  return (
    <div className="flex flex-col">
      <div className={cn("p-6 flex justify-between gap-4 items-center", color)}>
        <div className="flex gap-8">
          <Image src={icon} alt="icon" width={40} height={40} />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{name}</h4>
            <span>{popularSubjectsStrings.searchClasses}</span>
          </div>
        </div>
        <ChevronRightIcon className="w-5 h-5" />
      </div>
      <div className="mt-6 flex flex-col gap-4 items-center w-full">
        {subjects.map((subject, index) => (
          <SubjectCards
            months={subject.months}
            subject={subject.subject}
            days={subject.days}
            age={subject.age}
            color={color}
            duration={subject.duration}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

const SubjectCards = ({
  months,
  subject,
  days,
  age,
  color,
  duration,
}: {
  months: string;
  subject: string;
  days: string;
  age: string;
  duration: string;
  color: string;
}) => {
  return (
    <div className={cn("rounded-lg p-4 shadow-md w-full", color)}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-black">{subject}</span>
        <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
          {months}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.104 0-2 .896-2 2v4c0 1.104.896 2 2 2s2-.896 2-2v-4c0-1.104-.896-2-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14h.01M16 14h1c1.104 0 2-.896 2-2s-.896-2-2-2h-4M12 6V4m0 2v2m-6 0h12M6 10h12M6 14h12"
              />
            </svg>
            <span>{age}</span>
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v7a2 2 0 002 2h3v2h8v-2h3a2 2 0 002-2V9a2 2 0 00-2-2h-3V5H8v2z"
            />
          </svg>
          <span>{days}</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8v8h18V8M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2M3 8l9 6 9-6"
            />
          </svg>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

const PopularSubjects = () => {
  return (
    <div className="bg-whitebg p-10 pb-14 px-12 mt-6 relative rounded-xl">
      <div className="w-10 h-10 bg-skin absolute top-[5%] lg:left-[30%] md:left-[30%] sm:left-[20%] left-[35%] rounded-full"></div>
      <Heading level={2} className="text-center">
        {popularSubjectsStrings.header}
      </Heading>
      <div className="grid grid-cols-3 gap-x-8 gap-y-8 mt-12">
        {popularSubjectsStrings.class.map((item, index) => (
          <ClassCards
            name={item.name}
            color={item.color}
            icon={item.image}
            key={index}
            subjects={item.subjects}
          />
        ))}
      </div>
      <div className="bg-indigo absolute top-[16%] right-3 w-6 h-6 rotate-45"></div>
    </div>
  );
};

export default PopularSubjects;
