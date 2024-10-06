import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import React from "react";
import AdminLogin from "./_components/AdminLogin";

//todo create protected admin route
const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const supabase = getSupabaseServerComponentClient();
  const user = await supabase.auth.getUser();
  if (user.data.user?.email === process.env.ADMIN_EMAIL) {
    return (
      <div className="bg-whitebg min-h-[80vh] rounded-xl m-12 p-16">
        {children}
      </div>
    );
  } else if (!!user.data.user?.email) {
    return <div>Please Logout and then login with admin account</div>;
  } else {
    return (
      <div className="bg-whitebg min-h-[80vh] rounded-xl m-12 p-16">
        <AdminLogin />
      </div>
    );
  }
};

export default Layout;
