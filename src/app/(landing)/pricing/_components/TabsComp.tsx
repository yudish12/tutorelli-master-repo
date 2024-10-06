"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTabs } from "@/lib/strings/pricing";
import PricingCard from "./PricingCard";

const TabsComp = () => {
  const [selectedTab, setSelectedTab] = React.useState(pricingTabs[0]);

  return (
    <>
      <Tabs
        defaultValue={selectedTab.name}
        onValueChange={(value) => {
          const foundTab = pricingTabs.find((tab) => tab.name === value);
          if (foundTab) {
            setSelectedTab(foundTab);
          }
        }}
        className="w-full mt-8 mx-auto flex flex-col justify-center"
      >
        <TabsList className="gap-6 bg-whitebg">
          {pricingTabs.map((tab) => (
            <TabsTrigger
              className="px-6 py-4 bg-white"
              value={tab.name}
              key={tab.name}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedTab.name}>
          <div className="mt-8 grid grid-cols-2 gap-x-4 w-[55%] mx-auto">
            {selectedTab.cards.map((card) => (
              <PricingCard
                selectedTab={selectedTab}
                key={card.name}
                cardData={card}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TabsComp;
