import { Button } from "@/components/ui/button";
import React from "react";

const LetsDiscover = () => {
  return (
    <div className="bg-maths h-[500px] text-blue justify-center items-center mt-6 rounded-xl flex flex-col">
      <h2 className="text-6xl tracking-wide font-bold text-center">
        <span>Let&apos;s discover the</span>
        <br />
        <span>right session for you</span>
      </h2>
      <Button className="mt-6 p-6">Search Sessions</Button>
    </div>
  );
};

export default LetsDiscover;
