import { cn } from "@/lib/utils";
import React from "react";

import PricingComp from "./PricingComp";

const PricingContainer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-full bg-whitebg rounded-xl w-full p-10 text-blue",
        className
      )}
    >
      <PricingComp />
    </div>
  );
};

export default PricingContainer;
