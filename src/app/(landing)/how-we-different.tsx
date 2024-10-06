import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { howAreWeDifferentStrings } from "@/lib/strings/landing";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const Cards = ({
  title,
  bg,
  points,
}: {
  title: string;
  bg: string;
  points: string[];
}) => {
  return (
    <Card className={cn(bg, "p-4")}>
      <CardHeader className="gap-4">
        <Image src={"/notebook.svg"} alt="notebook" width={30} height={30} />
        <CardTitle className="text-3xl mt-6 font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {points.map((item, index) => (
          <div key={index} className="flex gap-4 items-center justify-start">
            <div>
              <CheckCircle className="h-[20px] w-[20px]" />
            </div>
            <p>{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const HowAreWeDifferent = () => {
  return (
    <div className="bg-whitebg text-blue rounded-xl py-20 px-40 mt-6">
      <Heading level={2}>{howAreWeDifferentStrings.header}</Heading>
      <div className="grid mt-12 w-full grid-cols-2 relative gap-x-8 gap-y-8 how-it-works-grid">
        {howAreWeDifferentStrings.cardData.map((item, index) => (
          <Cards
            key={index}
            title={item.title}
            bg={item.bg}
            points={item.points}
          />
        ))}
      </div>
    </div>
  );
};

export default HowAreWeDifferent;
