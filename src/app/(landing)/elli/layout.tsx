import React from "react";

const EliLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="p-8">{children}</div>;
};

export default EliLayout;
