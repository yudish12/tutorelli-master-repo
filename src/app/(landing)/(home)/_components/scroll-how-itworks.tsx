"use client";
import React from "react";
import { scrollToSection } from "@/lib/utils";
const HowItWorksScroll = () => {
  return (
    <div className="flex mt-2">
      <p
        className="text-primary cursor-pointer font-semibold hover:underline text-center mt-1"
        onClick={() => scrollToSection("how-it-works")}
      >
        How it works?
      </p>
    </div>
  );
};

export default HowItWorksScroll;
