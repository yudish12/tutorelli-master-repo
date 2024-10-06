"use client";
import React from "react";
import EliForm from "../student/_components/EliForm";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import DropDown from "../parent/_components/DropDown";
import { useAuth } from "@/context/AuthProvider";
import { roles } from "@/config/contants";

const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <>{user?.role === roles.PARENT && <DropDown />}</>
    // <div id="top-bar" className="w-full flex gap-24 relative justify-end">
    //   <div
    //     className="flex gap-6 justify-self-start items-center p-4 w-[550px]"
    //     id="eli-form"
    //   >
    //     {user?.role !== roles.TUTOR && (
    //       <>
    //         <Image
    //           style={{ height: "80px", maxWidth: "100px" }}
    //           src={"/eli-img.png"}
    //           alt="eli"
    //           width={100}
    //           height={40}
    //         />
    //         <EliForm />
    //       </>
    //     )}
    //   </div>
    //   <div className="flex flex-col mt-4">
    //     <div className="flex h-[35px] gap-6 items-center">
    //       <div className="bg-white rounded-full p-2">
    //         <Image
    //           src="/radix-icons_question-mark.svg"
    //           alt="questionmark"
    //           width={20}
    //           height={20}
    //         />
    //       </div>
    //       <Image src="/bell.svg" alt="questionmark" width={20} height={20} />
    //       <Avatar>
    //         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    //         <AvatarFallback>CN</AvatarFallback>
    //       </Avatar>
    //       <span>Your Profile</span>
    //     </div>
    //     {user?.role === roles.PARENT && <DropDown />}
    //   </div>
    // </div>
  );
};

export default DashboardHeader;
