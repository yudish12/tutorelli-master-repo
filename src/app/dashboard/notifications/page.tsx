import { Heading } from "@/components/ui/heading";
import { title } from "process";
import React from "react";
import NotificationRow from "./_components/notification-row";
import { Cross, Microscope } from "lucide-react";

const notificationData = [
  {
    time: "Most Recent",
    title:
      "New Session Booked, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, omnis!",
    type: "info",
  },
  {
    time: "Earlier",
    title:
      "New Session Booked, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, omnis!",
    type: "action",
  },
  {
    time: "Earlier",
    title:
      "New Session Booked, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, omnis!",
    type: "action",
  },
  {
    time: "Earlier",
    title:
      "New Session Booked, Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, omnis!",
    type: "action",
  },
];

const Page = () => {
  return (
    <div className="bg-whitebg relative h-[100vh] overflow-auto w-full text-blue py-12 px-20">
      <Heading className="text-left font-medium pb-0" level={2}>
        Notifications
      </Heading>
      <div className="flex flex-col gap-8 mt-6">
        <div>
          <Heading level={5}>Most Recent</Heading>
          <div className="flex flex-col gap-4 mt-6">
            {notificationData
              .filter((item) => item.time === "Most Recent")
              .map((item) => (
                <NotificationRow
                  key={item.time}
                  icon={
                    <div className="self-center">
                      {" "}
                      <Microscope />{" "}
                    </div>
                  }
                  title={item.title}
                  time={item.time}
                />
              ))}
          </div>
        </div>
        <div>
          <Heading level={5}>Earlier</Heading>
          <div className="flex flex-col gap-4 mt-6">
            {notificationData
              .filter((item) => item.time === "Earlier")
              .map((item) => (
                <NotificationRow
                  key={item.time}
                  icon={
                    <div className="self-center">
                      {" "}
                      <Cross />{" "}
                    </div>
                  }
                  title={item.title}
                  time={item.time}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
