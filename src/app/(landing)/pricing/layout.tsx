import React from "react";

const PricingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="px-6 py-8">{children}</div>;
};

export default PricingLayout;
