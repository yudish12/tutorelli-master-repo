import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = getSupabaseServerComponentClient();
  const user = await client.auth.getUser();
  const role = user.data.user?.user_metadata.role;

  if (user.data.user && user.data.user.email !== process.env.ADMIN_EMAIL) {
    redirect(`/dashboard/${role}`);
  } else if (
    user.data.user &&
    user.data.user.email === process.env.ADMIN_EMAIL
  ) {
    redirect("/admin");
  }

  return <div>{children}</div>;
}
