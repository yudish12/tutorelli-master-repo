import { Card, CardContent } from "@/components/ui/card";
import { tutorsStrings } from "@/lib/strings/landing";
import Image from "next/image";
import React from "react";

const TutorCard = ({
  data,
}: {
  data: (typeof tutorsStrings)["tutorData"][0];
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col justify-center items-center gap-2 pt-6">
        <Image
          className="rounded-full mx-auto"
          src={data.image}
          alt="tutor"
          width={100}
          height={100}
        />
        <h3 className="text-xl mt-6 font-semibold">{data.name}</h3>
        <div className="flex gap-2 text-darkgray">
          <Image src={"/math.svg"} alt="math" width={20} height={20} />
          <span>{data.subject}</span>
        </div>
        <p className="text-sm text-center">{data.description}</p>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
