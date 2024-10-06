import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorksCard = ({
  index,
  desc,
  heading,
  image,
}: {
  index: number;
  desc: string;
  heading: string;
  image: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-12">
        <div className="bg-maths w-10 h-10 text-center rounded-md font-semibold p-2">
          {index}
        </div>
        <CardTitle>{heading}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-12">
        <p>{desc}</p>
        <Image src={image} alt="image" width={200} height={300} />
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
