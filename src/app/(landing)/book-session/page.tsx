import Image from "next/image";
import React, { Suspense } from "react";
import { SessionFilters } from "./_component/SessionFilters";
import { Star } from "lucide-react";
import BlueCheckBox from "../../_components/BlueCheckbox";
import { Skeleton } from "@/components/ui/skeleton";

const BookSessionPage = () => {
  return (
    <div className="w-full p-8 px-6 text-blue">
      <div className="min-h-[80vh] overflow-auto w-full bg-whitebg rounded-2xl">
        <h2 className="text-3xl text-center font-semibold py-6">
          Find Your Session
        </h2>
        <div className="grid grid-cols-5 gap-x-8 px-4 h-full">
          <div className="col-span-4 overflow-auto w-full h-full">
            <Suspense fallback={<Skeleton className="h-[100px] " />}>
              <SessionFilters />
            </Suspense>
          </div>
          <div className="flex flex-col justify-center h-[97%]">
            <div
              id="testimonial"
              className="h-full col-span-1 p-4 w-full bg-lightyellow rounded-2xl"
            >
              <div className="flex gap-2 mt-4 justify-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} fill="#f56564" strokeWidth={0} />
                ))}
              </div>
              <p className="italic text-lg text-center font-light">
                “Lorem ipsum doloret sit amet”
              </p>
              <Image
                className="rounded-full mx-auto mt-4"
                src={"/SamplePFP.png"}
                alt="pfp"
                width={100}
                height={100}
              />
              <h3 className="text-center font-semibold text-lg">John Doe</h3>
              <h5 className="text-center text-lg font-light">Parent</h5>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6 items-center gap-4 col-start-2 col-span-3">
            <BlueCheckBox text={"Spread payments"} />
            <BlueCheckBox text={"Money back guarantee"} />
            <BlueCheckBox text={"N.1 tutoring platform in UK"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionPage;
