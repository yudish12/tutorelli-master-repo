"use client";
import { globalStrings } from "@/lib/strings";
import { Facebook, LinkedinIcon, Twitter } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [showFooter, setShowFooter] = React.useState(true);
  const paths = usePathname();

  React.useLayoutEffect(() => {
    const shouldShowHeader = !paths.includes("/dashboard");
    setShowFooter(shouldShowHeader);
  }, [paths]);
  return (
    <footer
      className={cn(
        "flex flex-col  items-center text-white pt-5 pb-4 w-full h-full",
        !showFooter && "hidden"
      )}
    >
      <h6>{globalStrings.footerCopyright}</h6>
      <div className="flex gap-6 mt-4">
        <div className="w-8 h-8 flex justify-center items-center bg-primary rounded-full">
          <Facebook />
        </div>
        <div className="w-8 h-8 flex justify-center items-center bg-primary rounded-full">
          <Twitter />
        </div>
        <div className="w-8 h-8 flex justify-center items-center bg-primary rounded-full">
          <LinkedinIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
