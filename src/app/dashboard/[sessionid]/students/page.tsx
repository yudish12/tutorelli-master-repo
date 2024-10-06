"use client";
import TableSkeleton from "@/app/_components/TableSkeleton";
import { roles } from "@/config/contants";
import { useAuth } from "@/context/AuthProvider";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { getStudentsInSession } from "./server-actions";
import { DataTable } from "@/components/ui/data-table";
import { StudentsInSessionTableType } from "@/lib/types/table.types";
import { studentSessionDataColumns } from "@/components/columns/student-session";

const Page = () => {
  const { user } = useAuth();
  const { sessionid } = useParams<{ sessionid: string }>();
  const searchParams = useSearchParams();
  const session_name = searchParams.get("session_name");

  const [loading, setLoading] = React.useState(true);
  const [studentData, setStudentData] = React.useState<
    StudentsInSessionTableType[]
  >([]);

  const get = async () => {
    const data = await getStudentsInSession(sessionid ?? "");
    console.log(data);
    setStudentData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (!sessionid) {
      setLoading(false);
      return;
    }
    get();
  }, [sessionid]);

  if (user?.role !== roles.TUTOR) {
    return <div>You are not authorized to view this page</div>;
  }

  if (loading)
    return <TableSkeleton heading={`Students enrolled in ${session_name}`} />;

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">
        Students enrolled in {session_name}
      </h2>
      <DataTable data={studentData} columns={studentSessionDataColumns} />
    </>
  );
};

export default Page;
