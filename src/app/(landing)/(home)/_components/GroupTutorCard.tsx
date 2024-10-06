import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { groupTutoringStrings } from "@/lib/strings/landing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const GroupTutorCard = ({
  data,
}: {
  data: (typeof groupTutoringStrings)["cardData"][0];
}) => {
  return (
    <Card
      className={cn(
        data.bg,
        data.mt,
        data.index === 6 && "col-start-2 col-end-3",
        data.height,
        "relative"
      )}
    >
      <CardHeader className="px-12 py-6 pt-8">
        <h3 className="text-xl font-semibold">{data.header}</h3>
      </CardHeader>
      <CardContent className="p-12 pt-0 pb-0">
        <p className="text-black/90">{data.desc}</p>
      </CardContent>
      <CardFooter className="absolute w-full bottom-0 p-12">
        <Image
          src={data.image}
          alt="image"
          width={300}
          className="mx-auto min-w-[320px]"
          height={200}
        />
      </CardFooter>
    </Card>
  );
};

export default GroupTutorCard;
