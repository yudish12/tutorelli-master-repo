import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingTabs } from "@/lib/strings/pricing";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const PricingCard = ({
  cardData,
  selectedTab,
}: {
  cardData: (typeof pricingTabs)[0]["cards"][0];
  selectedTab: (typeof pricingTabs)[0];
}) => {
  return (
    <Card className="max-w-[380px]">
      <CardHeader className="gap-2 p-0">
        <div className="flex px-8 justify-between">
          <CardTitle className="capitalize border p-2 border-t-0 text-2xl text-center tracking-wide">
            {cardData.name}
          </CardTitle>
          <Image src={cardData.icon} alt="icon" width={40} height={40} />
        </div>
        <CardTitle className="capitalize text-5xl font-bold text-center tracking-wide">
          {cardData.price}
        </CardTitle>
        <CardTitle className="capitalize text-sm italic text-center tracking-wide font-light">
          {cardData.subheader}
        </CardTitle>
        <CardTitle className="capitalize text-md italic text-center tracking-wide font-medium">
          Class Size: {cardData.class_size}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {selectedTab.features.map((feature) => (
            <div key={feature.name} className="flex gap-2">
              {feature.scope.find((item) => item === cardData.name) ? (
                <CheckIcon />
              ) : (
                <Cross2Icon />
              )}
              <div className="flex gap-2">
                <div className="text-sm font-medium">{feature.name}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"}>Select</Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
