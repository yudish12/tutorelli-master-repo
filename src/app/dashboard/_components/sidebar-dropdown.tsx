import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { ExitIcon } from "@radix-ui/react-icons";

const SideBarDropDown = ({ logoutFunc }: { logoutFunc: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary py-6 px-2 flex justify-between items-center">
          <span className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="text-white">
            <ChevronsUpDown className="h-6 w-6" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ minWidth: "190px" }}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await logoutFunc();
            window.location.reload();
          }}
          className=" text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer rounded-lg"
        >
          Log Out
          <ExitIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SideBarDropDown;
