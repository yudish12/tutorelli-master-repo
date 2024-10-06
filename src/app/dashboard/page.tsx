import { roles } from "@/config/contants";
import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import { redirect } from "next/navigation";

const Page = async () => {
  const client = getSupabaseServerComponentClient();
  const user = await client.auth.getUser();

  if (
    user.data.user?.user_metadata.role === roles.STUDENT ||
    user.data.user?.user_metadata.role === undefined ||
    user.data.user?.user_metadata.role === null
  ) {
    redirect("/dashboard/student");
  } else if (user.data.user?.user_metadata.role === roles.PARENT) {
    redirect("/dashboard/parent");
  } else if (user.data.user.user_metadata.role === roles.TUTOR) {
    redirect("/dashboard/tutor");
  }
};

export default Page;
