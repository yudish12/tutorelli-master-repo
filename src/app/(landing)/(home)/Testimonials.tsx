import { testimonialStrings } from "@/lib/strings/landing";
import React from "react";
import TestimonialCard from "./_components/TestimonialCard";
import { Heading } from "@/components/ui/heading";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  return (
    <div className="bg-whitebg rounded-xl py-12 mt-6">
      <Heading level={2} className="text-center">
        {testimonialStrings.header}
      </Heading>
      <div className="flex pl-14 justify-center mt-4 w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full pr-6"
        >
          <CarouselContent>
            {testimonialStrings.cardData.map((item) => (
              <TestimonialCard key={item.index} data={item} />
            ))}
          </CarouselContent>
          <CarouselPrevious variant={"default"} className="-left-[53px]" />
          <CarouselNext variant={"default"} className="right-[3px]" />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
