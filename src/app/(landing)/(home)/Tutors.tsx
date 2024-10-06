import BlueCheckBox from "@/app/_components/BlueCheckbox";
import { tutorsStrings } from "@/lib/strings/landing";
import Link from "next/link";
import React from "react";
import TutorCard from "./_components/TutorCard";
import { Heading } from "@/components/ui/heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Tutors = () => {
  return (
    <div className="bg-whitebg rounded-xl py-12 mt-6">
      <div className="flex gap-4 items-center justify-center sm:px-0 px-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-6">
            <Heading level={2} className="text-peach text-center">
              {tutorsStrings.header}
            </Heading>
          </div>
          <Heading
            level={6}
            className="text-darkgray text-center sm:text-left mt-6"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            omnis!
          </Heading>
          <div className="flex sm:flex-row flex-col gap-6 mt-6 items-center">
            <BlueCheckBox text={tutorsStrings.checkboxText1} />
            <BlueCheckBox text={tutorsStrings.checkboxText2} />
          </div>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mt-8 px-16"
      >
        <CarouselContent>
          {tutorsStrings.tutorData.map((item) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={item.id}>
              <TutorCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext variant={"default"} className="right-[8px]" />
        <CarouselPrevious variant={"default"} className="left-[8px]" />
      </Carousel>
    </div>
  );
};

export default Tutors;
