import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import React from "react";
import Form from "./form";

const Page = async ({ params }: { params: any }) => {
  const token = params.token;
  const client = getSupabaseServerComponentClient();
  const { data, error } = await client
    .from("invite")
    .select("*,students(*)")
    .eq("token", token);
  console.log(data, error);
  if (!data?.length || error) {
    return (
      <div className="bg-whitebg h-full w-full rounded-lg">Invalid token</div>
    );
  }

  return (
    <div className="bg-whitebg flex justify-center h-full w-full rounded-lg">
      <Form
        parent_id={data[0].parent_id}
        token={token}
        student_id={data[0].students.id}
        email={data[0].students.email}
      />
    </div>
  );
};

export default Page;
