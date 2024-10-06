import React from "react";
import NotesCard from "./_components/notes-card";

const Page = async ({ params }: { params: { sessionid: string | number } }) => {
  const { sessionid } = params;
  return (
    <div>
      <h3 className="text-blue text-2xl font-semibold">Notes</h3>
      <NotesCard sessionid={sessionid} />
    </div>
  );
};

export default Page;
