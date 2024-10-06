"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

const BlueCheckBox = ({
  text,
  classes,
  textArr,
}: {
  text?: string;
  classes?: string;
  textArr?: string[];
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (!textArr) {
    return (
      <div
        className={cn(
          "flex h-20 items-center p-2 px-6 text-primary bg-[#DFE7FD] gap-6",
          classes
        )}
      >
        <Image
          className="max-h-[40px] min-h-[40px]"
          src={"/checkbox.svg"}
          alt="checkbox"
          width={20}
          height={40}
        />
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-20 items-center p-2 pl-6 text-primary bg-[#DFE7FD] gap-6",
        classes
      )}
    >
      <Image
        className="max-h-[40px] min-h-[40px]"
        src={"/checkbox.svg"}
        alt="checkbox"
        width={20}
        height={40}
      />

      <Carousel
        //@ts-ignore
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              {textArr[index] + "-" + (index + 1)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BlueCheckBox;
