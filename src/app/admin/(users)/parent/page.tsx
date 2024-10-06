"use client";
import { subjectAdminCols } from "@/components/columns/subject-admin";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import EditButton from "../../_components/edit-button";
import DeleteButton from "../../_components/delete-button";
import { useToast } from "@/components/ui/use-toast";
import { Parent } from "@/lib/types/action.types";
import { deleteParent, getParents } from "./server-actions";
import { parentAdminCols } from "@/components/columns/parent-admin";
import ParentForm from "./_components/parent-form";

const Page = () => {
  const { toast } = useToast();
  const [parents, setParents] = React.useState<Parent[]>([]);

  const getParentsAsync = async () => {
    const data = await getParents();
    const parentaTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          <EditButton
            DialogTitle="Edit Parent"
            FormComp={() => (
              <ParentForm id={item.id.toString()} parentName={item.full_name} />
            )}
          />
          <DeleteButton
            alertDesc="Are you sure you want to delete this parent?"
            alertTitle="Delete Parent"
            deleteFunc={() => deleteParentFunc(item.id.toString())}
          />
        </div>
      ),
      created_at: item.created_at ?? "", // Ensure created_at is a string
    }));
    setParents(parentaTableData);
  };

  const deleteParentFunc = async (id: string) => {
    const resp = await deleteParent(id);
    if (!resp.success) {
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
    getParentsAsync();
  };

  useEffect(() => {
    getParentsAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <DataTable
        tableCellClassName="text-center"
        columns={parentAdminCols}
        data={parents}
      />
    </div>
  );
  return <div>Page</div>;
};

export default Page;
