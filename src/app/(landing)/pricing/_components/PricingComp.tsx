import { pricingStrings } from "@/lib/strings/pricing";
import React from "react";
import TabsComp from "./TabsComp";
import { howItWorksStrings } from "@/lib/strings/landing";

const PricingComp = ({ pagename }: { pagename?: string }) => {
  return (
    <>
      {pagename !== "how-it-works" && (
        <div className="bg-white rounded-lg px-4 py-2 w-1/4 ml-24">
          <p className="text-center">{pricingStrings.tagline}</p>
        </div>
      )}

      <h4 className="mt-8 font-semibold text-2xl text-center">
        {pagename !== "how-it-works"
          ? pricingStrings.header
          : howItWorksStrings.howItWorksPricingHeader}
      </h4>
      <TabsComp />
    </>
  );
};

export default PricingComp;
