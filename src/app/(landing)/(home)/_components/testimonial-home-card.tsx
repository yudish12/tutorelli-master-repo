import { Card, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const TestimonialHomeCard = () => {
  return (
    <Card className="flex mt-4 px-4 pb-12 bg-whitebg shadow-none border-none flex-col items-center gap-4">
      <CardHeader>
        <div className="flex">
          {...Array.from({ length: 5 }, (_, i) => (
            <Star key={i} fill={"#f56564"} strokeWidth={0} />
          ))}
        </div>
      </CardHeader>
      <p className="font-light text-center">
        Lorem ipsum dolor sit amet consectetur. Vitae urna volutpat nam viverra
        blandit magnis.
      </p>
      <div className="flex flex-col items-center">
        <Image src={"/SamplePFP.png"} alt="pfp" width={60} height={60} />
        <h3>John Doe</h3>
        <span>Parent</span>
      </div>
    </Card>
  );
};

export default TestimonialHomeCard;
