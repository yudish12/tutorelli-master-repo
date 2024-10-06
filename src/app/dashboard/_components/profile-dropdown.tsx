import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthProvider";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const ProfileDropdown = () => {
  const { user, user_info, logoutFunc } = useAuth();
  const router = useRouter();
  return (
    <div className="bg-primary w-full rounded-lg flex items-center justify-between p-2 text-white">
      <div
        onClick={() => router.replace(`/dashboard/${user?.role}`)}
        className="text-white cursor-pointer flex gap-2 items-center"
      >
        <Avatar>
          <AvatarImage
            height={100}
            width={100}
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className=" flex flex-col">
          <h3 className="text-sm capitalize">{user_info?.full_name}</h3>
          <h5 className="text-ellipsis uppercase text-[8px] overflow-hidden whitespace-nowrap w-[100px]">
            {user?.role}
          </h5>
        </div>
      </div>
      <div
        onClick={async () => {
          await logoutFunc();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
        className="text-white cursor-pointer"
      >
        <ExitIcon className="h-4 w-5" />
      </div>
    </div>
  );
};

export default ProfileDropdown;
