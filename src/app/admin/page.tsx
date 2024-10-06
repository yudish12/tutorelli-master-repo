import React from "react";
import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import AdminUi from "./_components/AdminUi";
import AdminLogin from "./_components/AdminLogin";

const Page = async () => {
  return <AdminUi />;
};

export default Page;
