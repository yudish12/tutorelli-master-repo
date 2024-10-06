import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-[80vh] p-6 ">{children}</div>;
};

export default Layout;
