"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { headerLinks } from "@/config/header.config";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Close } from "@radix-ui/react-toast";
import { MenuIcon, X } from "lucide-react";

export function Header() {
  const { user, logoutFunc } = useAuth();
  const [showHeader, setShowHeader] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const paths = usePathname();
  const router = useRouter();

  React.useLayoutEffect(() => {
    let shouldShowHeader = !paths.includes("/dashboard");
    if (paths.includes("/auth")) {
      shouldShowHeader = false;
    }
    console.log(shouldShowHeader, user?.email, 22);
    setShowHeader(shouldShowHeader);
  }, [paths, user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={cn(
        "text-white mt-7 w-full px-8 gap-4",
        !showHeader && "hidden"
      )}
    >
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="mr-8">
          <Image
            onClick={() => router.replace("/")}
            className="cursor-pointer"
            src={"/logo-light.svg"}
            alt="logo"
            width={150}
            height={50}
            priority
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          {!menuOpen && (
            <button
              onClick={toggleMenu}
              className="text-white z-50 focus:outline-none"
            >
              <MenuIcon className="h-8 w-8 mt-2" />
            </button>
          )}
        </div>

        {/* Links for desktop */}
        <div className="hidden md:flex gap-12 overflow-auto">
          {headerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-ellipsis whitespace-nowrap overflow-hidden"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Action buttons for desktop */}
        <div className="hidden md:flex gap-4 items-center">
          <Button onClick={() => router.replace("/auth/login")} className="p-6">
            Login
          </Button>
          <Button
            variant={"ghost"}
            className="p-6 border-2 border-primary hover:bg-blue hover:text-white px-10"
          >
            Become a tutor
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 w-full h-screen z-40 bg-blue text-white flex flex-col items-center justify-center gap-8 transition-all duration-300",
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        {menuOpen && (
          <button
            onClick={toggleMenu}
            className="text-white absolute top-10 right-8 z-50 focus:outline-none"
          >
            <X className="h-8 w-8" />
          </button>
        )}
        {headerLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-2xl"
            onClick={() => setMenuOpen(false)} // Close menu on link click
          >
            {link.title}
          </Link>
        ))}

        {/* Mobile action buttons */}
        <div className="flex gap-6 justify-center">
          <Button
            onClick={() => router.replace("/auth/login")}
            className="p-6 min-w-[200px]"
          >
            Login
          </Button>
          <Button
            variant={"ghost"}
            className="p-6 border-2 border-primary hover:bg-blue hover:text-white px-10 min-w-[200px]"
          >
            Become a tutor
          </Button>
        </div>
      </div>
    </div>
  );
}
