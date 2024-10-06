import { groupTutoringStrings } from "@/lib/strings/landing";
import React from "react";
import GroupTutorCard from "./_components/GroupTutorCard";
import { Heading } from "@/components/ui/heading";

const GroupTutoring = () => {
  return (
    <div className="bg-whitebg rounded-xl py-12 mt-6">
      <Heading level={2}>{groupTutoringStrings.header}</Heading>
      <div className="grid grid-cols-3 gap-x-8 gap-y-8 p-10">
        {groupTutoringStrings.cardData.map((item, index) => (
          <GroupTutorCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default GroupTutoring;
