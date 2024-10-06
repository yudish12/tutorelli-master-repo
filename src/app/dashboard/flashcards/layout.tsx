import React from "react";

const FlashcardsLayout = (
  props: Readonly<{
    children: React.ReactNode;
  }>
) => {
  return (
    <div className="py-12 px-20 w-full text-blue bg-whitebg h-screen overflow-auto">
      {props.children}
    </div>
  );
};

export default FlashcardsLayout;
