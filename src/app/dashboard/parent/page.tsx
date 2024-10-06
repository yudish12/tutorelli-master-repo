import Image from "next/image";
import React from "react";
import EliForm from "../student/_components/EliForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Feedback from "../_components/Feedback";
import Dashboard from "./_components/Dashboard";
import DropDown from "./_components/DropDown";
import DashboardHeader from "../_components/DashboardHeader";
import Parentheader from "./_components/parent-header";

const ParentPage = () => {
  return (
    <div className="bg-whitebg relative h-[100vh] overflow-auto w-full text-blue py-6 px-20">
      <Parentheader />
      <div className="flex justify-between mt-4 shadow-md items-center w-full bg-white px-6 py-4 rounded-md">
        <div className="w-1/4">
          <h3 className="text-xl font-semibold">Your Son&apos;s Practice</h3>
          <p className="text-sm text-gray-400">
            Check here how much you&apos;re using the flashcards
          </p>
        </div>
        <Progress className="w-1/2 text-blue h-[15px]" value={66} />
        <Link className="text-primary" href={"/student/practice"}>
          practice now
        </Link>
      </div>
      <Dashboard />
      {/* <Feedback /> */}
    </div>
  );
};

export default ParentPage;
