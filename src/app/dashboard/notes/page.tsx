"use client";
import React, { useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { notesDataColumns } from "@/components/columns/notes";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "nextjs-toploader/app";
import { NotesDataTableType } from "@/lib/types/table.types";
import { getNotesForStudent } from "./server-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TableSkeleton from "@/app/_components/TableSkeleton";

const Page = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [notesData, setNotesData] = React.useState<NotesDataTableType[]>([]);

  const get = async () => {
    const data = await getNotesForStudent(user_info?.id!);
    setNotesData(
      data.map((item: NotesDataTableType) => ({
        ...item,
        subject: (
          <Badge
            className={`w-full flex items-center justify-center rounded-md p-2 bg-maths text-amber-700 shadow-none hover:bg-maths`}
          >
            {item.subject}
          </Badge>
        ),
        action: (
          <Button
            onClick={() =>
              router.replace(`/dashboard/${item.session_id}/notes`)
            }
          >
            View Notes
          </Button>
        ),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    if (!user_info) return;
    get();
  }, [user_info]);

  if (loading) return <TableSkeleton heading="Your Notes" />;

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Your Notes</h2>
      <DataTable columns={notesDataColumns} data={notesData} />
    </>
  );
};

export default Page;
