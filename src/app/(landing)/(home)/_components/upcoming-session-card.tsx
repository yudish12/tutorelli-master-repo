import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import moment from "moment";

export default function UpcomingSessionCard({
  sessions,
}: {
  sessions: any[] | null;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-8 px-8"
    >
      <CarouselContent>
        {sessions?.map((session, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="p-0 max-h-[500px] max-w-[400px] rounded-xl">
              <CardHeader className="flex-row justify-between pb-4">
                <Heading level={3} className="capitalize text-left">
                  {session.subject.name}
                </Heading>
                <Badge
                  className={`w-full flex items-center justify-center max-w-20 rounded-md p-2 bg-primary text-white capitalize shadow-none hover:bg-primary/90`}
                >
                  {session?.subject?.class.name} Class
                </Badge>
              </CardHeader>
              <hr className="w-full border-t border-gray-300" />
              <CardFooter className="pt-8 flex flex-col gap-2 items-start w-full px-0 pb-0">
                <div className="flex px-6 gap-3 text-center">
                  <span className="font-semibold text-primary">Date:</span>
                  {moment(session.start_date).format("DD MMM ")}-{" "}
                  {moment(session.end_date).format("DD MMM")}
                </div>
                <div className="flex px-6 gap-3 text-center">
                  <span className="font-semibold text-primary">Day:</span>
                  {moment(session.start_date).format("dddd")}
                </div>
                <div className="flex px-6 gap-3 text-center">
                  <span className="font-semibold text-primary">Time:</span>
                  {moment(session.start_date).format("hh:mm A")}
                </div>

                <div className="w-full relative">
                  <hr className="w-full border-t mt-6 border-gray-300" />
                  <div className="flex w-full gap-1 my-2 px-6 absolute top-[5px] justify-center font-semibold text-primary">
                    <Badge className="bg-indigo hover:bg-indigo/80">
                      {session.capacity} spaces left
                    </Badge>
                  </div>
                  <div className="flex px-6 py-4 justify-between items-center gap-6">
                    <Image
                      className="my-2"
                      src={"/SamplePFP.png"}
                      alt="sample"
                      width={60}
                      height={60}
                    />
                    <div className="w-full">
                      <div className="text-primary font-semibold">
                        {session.tutors.full_name}
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon
                            key={i}
                            fill={i === 4 ? "#D3D3D3" : "#FFD700"}
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"default"}
        className="md:-left-[30px] -left-[20px]"
      />
      <CarouselNext
        variant={"default"}
        className="md:-right-[30px] -right-[20px]"
      />
    </Carousel>
  );
}
