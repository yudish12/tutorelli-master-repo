import { X } from "lucide-react";
import React from "react";

const NotificationRow = ({
  icon,
  title,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
}) => {
  return (
    <div className="flex justify-between bg-white p-6 rounded-lg">
      <div className="flex w-full gap-6  ">
        {icon}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationRow;
