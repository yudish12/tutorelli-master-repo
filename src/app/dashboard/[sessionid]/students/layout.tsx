import React from "react";

const StudentInSessionLayout = (
  props: Readonly<{
    children: React.ReactNode;
  }>
) => {
  return (
    <div className="p-12 w-full overflow-auto text-blue bg-whitebg min-h-screen">
      {props.children}
    </div>
  );
};

export default StudentInSessionLayout;
