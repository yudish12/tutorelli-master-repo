"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const Sidebar = ({ links }: { links: Route[] }) => {
  const router = useRouter();
  const paths = usePathname();
  const { user } = useAuth();
  const index = links.findIndex((item) => item.path === paths);
  const [activeRoute, setActiveRoute] = React.useState(index);

  useEffect(() => {
    const index = links.findIndex((item) => item.path === paths);
    setActiveRoute(index);
  }, [links, paths]);

  return (
    <div className="flex flex-col w-1/5 gap-28 min-h-[90vh] px-2 items-center justify-between py-[0.6rem] mt-4">
      <div
        onClick={() => {
          router.replace(`/dashboard/${user?.role}`);
          setActiveRoute(0);
        }}
        className="cursor-pointer"
      >
        <Image
          src={"/logo-light.svg"}
          alt="logo-dark"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col px-2 h-full justify-center w-full">
        <div
          className="flex flex-col justify-center items-center gap-4"
          id="links"
        >
          {links.map((link, i) => (
            <>
              {i === activeRoute ? (
                <Link
                  href={link.path}
                  onClick={() => setActiveRoute(i)}
                  className="bg-primary text-center rounded-lg py-2 px-8"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  onClick={() => setActiveRoute(i)}
                  className="py-2 px-8 text-center"
                  href={link.path}
                >
                  {link.label}
                </Link>
              )}
            </>
          ))}
        </div>

        {/* <SidebarDropDown logoutFunc={logoutFunc} /> */}
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default Sidebar;
