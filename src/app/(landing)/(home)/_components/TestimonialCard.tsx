import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Heading } from "@/components/ui/heading";
import { testimonialStrings } from "@/lib/strings/landing";
import Image from "next/image";
import React from "react";

const TestimonialCard = ({
  data,
}: {
  data: (typeof testimonialStrings.cardData)[0];
}) => {
  return (
    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
      <Card className="p-0 max-h-[500px] max-w-[400px] bg-primary/10">
        <CardHeader className="items-center">
          <Image src={"/qt-icon.png"} alt="qt" width={70} height={70} />
        </CardHeader>
        <CardContent>
          <CardDescription className="mt-4 text-center">
            {data.desc}
          </CardDescription>
          <Image
            className="rounded-full mt-4 min-h-[150px] min-w-[150px] mx-auto"
            src={data.image}
            objectFit="contain"
            alt="resource"
            width={100}
            height={100}
          />
          <Heading level={4} className="mt-4 text-center">
            {data.header}
          </Heading>
          <Heading
            level={6}
            className="text-sm font-semibold text-primary/70 text-center"
          >
            {data.designation}
          </Heading>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default TestimonialCard;
