"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import EditButton from "../_components/edit-button";
import DeleteButton from "../_components/delete-button";
import { useToast } from "@/components/ui/use-toast";
import SessionEditForm from "./_components/edit-form";
import { deleteSession } from "./server-actions/supabase";
import { sessionAdminCols } from "@/components/columns/session-admin";
import { SessionWithTutorAndSubject } from "@/lib/types/action.types";
import Link from "next/link";
import { getSessionsWithTutorAndSubject } from "../server/get";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SessionStatus } from "@/config/contants";
import { Edit2Icon } from "lucide-react";
import { createTutorApi } from "./api";

const Page = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = React.useState<SessionWithTutorAndSubject[]>(
    []
  );

  const getSubjectsAsync = async () => {
    const data = await getSessionsWithTutorAndSubject();
    const subjectTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          {item.status === "upcoming" && (
            <>
              <Link href={`/admin/sessions/edit/${item.id}`}>
                <Edit2Icon color="green" />
              </Link>
            </>
          )}
          <DeleteButton
            alertDesc="Are you sure you want to delete this subject?"
            alertTitle="Delete Session"
            deleteFunc={() => deleteSessionFunc(item.id.toString())}
          />
        </div>
      ),
    }));
    setSessions(
      subjectTableData.map((item) => ({
        ...item,
        status: (
          <Badge
            className={cn(
              "bg-green-400 text-white",
              item.status?.toString() === SessionStatus.COMPLETED
                ? "bg-green-500"
                : "bg-primary"
            )}
          >
            {item.status}
          </Badge>
        ),
        action: (
          <div className="flex justify-center gap-4">
            {item.status === "upcoming" && (
              <>
                {console.log(item.status)}
                <EditButton
                  DialogTitle="Edit subject"
                  FormComp={() => <SessionEditForm id={item.id} />}
                />
              </>
            )}

            <DeleteButton
              alertDesc="Are you sure you want to delete this subject?"
              alertTitle="Delete subject"
              deleteFunc={() => deleteSessionFunc(item.id.toString())}
            />
          </div>
        ),
      }))
    );
  };

  const deleteSessionFunc = async (id: string) => {
    const resp = await deleteSession(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete subject",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "Subject deleted successfully",
      description: `Subject with id ${id} deleted successfully`,
    });
    getSubjectsAsync();
  };

  useEffect(() => {
    getSubjectsAsync();
    // createTutorApi({
    //   full_name: "saurabh",
    //   email: "saurabh@mindcase.co",
    //   password: "Test@12345",
    // });
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold">Sessions</h3>
        <Link
          href={"/admin/sessions/add"}
          className="bg-primary text-white flex justify-center items-center p-2 rounded-lg"
        >
          Add Session
        </Link>
      </div>
      <DataTable
        tableCellClassName="text-center"
        columns={sessionAdminCols}
        data={sessions}
      />
    </div>
  );
};

export default Page;
