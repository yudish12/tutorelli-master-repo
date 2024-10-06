import { ParentProvider } from "@/context/ParentProvider";
import React from "react";

const ParentLayout = (
  props: Readonly<{
    children: React.ReactNode;
  }>
) => {
  return <ParentProvider>{props.children}</ParentProvider>;
};

export default ParentLayout;
