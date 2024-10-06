import { parent_routes } from "@/config/parent.config";
import { student_routes } from "@/config/student.config";
import { tutor_routes } from "@/config/tutor.config";
import { getSupabaseServerComponentClient } from "@/lib/supabase/clients/server-component.client";
import { redirect } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import { roles } from "@/config/contants";

export default async function DashboardLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { role: string };
  }>
) {
  const client = getSupabaseServerComponentClient();
  const user = await client.auth.getUser();
  if (!user.data.user) {
    redirect("/auth/login");
  }

  const role = user.data.user.user_metadata.role || roles.STUDENT;
  switch (role) {
    case roles.STUDENT:
      var links = student_routes;
      break;
    case roles.PARENT:
      var links = parent_routes;
      break;
    case roles.TUTOR:
      var links = tutor_routes;
      break;
    default:
      var links = student_routes;
      break;
  }

  // Example of role-based redirection

  return (
    <div className="flex min-h-[360px] max-h-screen w-screen bg-transparent text-white">
      <Sidebar links={links} />
      {props.children}
    </div>
  );
}
