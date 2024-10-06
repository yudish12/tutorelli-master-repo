import { homeStrings } from "@/lib/strings/landing";
import React, { Fragment } from "react";
import SessionSearchForm from "./_components/session-search-form";
import BlueCheckBox from "../../_components/BlueCheckbox";
import Image from "next/image";
import TestimonialHomeCard from "./_components/testimonial-home-card";
import { Heading } from "@/components/ui/heading";
import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import { SessionStatus } from "@/config/contants";
import UpcomingSessionCard from "./_components/upcoming-session-card";
import HowItWorksScroll from "./_components/scroll-how-itworks";
import { cn } from "@/lib/utils";

const HomeLanding = async () => {
  const supabase = getSupabaseServerComponentClient();

  const { data: upcomingSessions, error } = await supabase
    .from("session_block")
    .select(
      "tutors(full_name),subject(name,class(name)),start_date,end_date,capacity"
    )
    .gte("start_date", new Date().toISOString())
    .order("start_date", { ascending: false })
    .limit(5);

  console.log(upcomingSessions, error);

  return (
    <div className="bg-whitebg p-6 w-full rounded-xl gap-24 h-full">
      <div className="bg-whitebg border-indigo flex sm:flex-row flex-col justify-center ">
        <div className="flex max-w-[700px] flex-col self-start relative">
          <div
            style={{ lineHeight: 1.5 }}
            className="flex flex-col  font-extrabold text-4xl text-left text-blue mt-8"
          >
            <Heading level={1}>{homeStrings.heading1}</Heading>
          </div>
          <div className="homeball relative flex flex-col gap-2">
            {homeStrings.subHeadingList.map((item, i) => (
              <Heading
                key={i}
                level={6}
                className={cn("text-gray-400", i === 0 && "mt-4")}
              >
                {item}
              </Heading>
            ))}
          </div>
          <BlueCheckBox
            classes="mt-7 py-0 sm:w-2/3 w-full eli-logo-left relative"
            textArr={homeStrings.blueCheckBox}
          />

          <Image
            className="absolute hidden sm:block rotatey bottom-[40px] right-[20%]"
            src={"/eliLogo.svg"}
            alt="elli"
            width={80}
            height={80}
          />
          <HowItWorksScroll />
        </div>
        <SessionSearchForm />
      </div>

      <div className="flex mt-4 mb-6 sm:w-[85%] w-full mx-auto">
        {/* {Array.from({ length: 3 }, (_, i) => (
          <TestimonialHomeCard key={i} />
        ))} */}
        <UpcomingSessionCard sessions={upcomingSessions} />
      </div>
    </div>
  );
};

export default HomeLanding;
