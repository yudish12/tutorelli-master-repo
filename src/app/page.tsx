import React from "react";
import HomeLanding from "./(landing)/(home)/Home";
import HowItWorks from "./(landing)/(how-it-works)/HowItWorks";
import Tutors from "./(landing)/(home)/Tutors";
import GroupTutoring from "./(landing)/(home)/GroupTutoring";
import Faq from "./(landing)/(home)/Faq";
import Testimonials from "./(landing)/(home)/Testimonials";
import Contact from "./(landing)/(contact)/Contact";
import HowAreWeDifferent from "./(landing)/how-we-different";
import PricingPage from "./(landing)/pricing/page";
import PricingContainer from "./(landing)/pricing/_components/PricingContainer";

export default function Home() {
  return (
    <div className="px-6 py-8 h-min-[91.5vh]">
      <HomeLanding />
      <Tutors />
      <HowItWorks />
      <PricingContainer className="mt-6" />
      <HowAreWeDifferent />
      <GroupTutoring />
      <Testimonials />
      <Faq />
      <Contact />
    </div>
  );
}
