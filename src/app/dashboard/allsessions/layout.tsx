import { ParentProvider } from "@/context/ParentProvider";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <ParentProvider>{children}</ParentProvider>;
};

export default Layout;
