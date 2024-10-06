"use client";
import { subjectAdminCols } from "@/components/columns/subject-admin";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import EditButton from "../_components/edit-button";
import DeleteButton from "../_components/delete-button";
import { useToast } from "@/components/ui/use-toast";
import AddButton from "../_components/add-button";
import { deleteClass } from "./server-action";
import { getClass } from "../server/get";
import { Class } from "@/lib/types/global.types";
import ClassForm from "./_components/class-form";
import { classAdminCols } from "@/components/columns/class-admin";

const Page = () => {
  const { toast } = useToast();
  const [classes, setClasses] = React.useState<Class[]>([]);

  const getClassesAsync = async () => {
    const data = await getClass();
    const classTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          <EditButton
            DialogTitle="Edit subject"
            FormComp={() => (
              <ClassForm isEditing={true} id={item.id.toString()} />
            )}
          />
          <DeleteButton
            alertDesc="Are you sure you want to delete this subject?"
            alertTitle="Delete subject"
            deleteFunc={() => deleteClassFunc(item.id.toString())}
          />
        </div>
      ),
    }));
    setClasses(classTableData);
  };

  const deleteClassFunc = async (id: string) => {
    const resp = await deleteClass(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete class",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "Class deleted successfully",
      description: `Class with id ${id} deleted successfully`,
    });
    getClassesAsync();
  };

  useEffect(() => {
    getClassesAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold">Class</h3>
        <AddButton
          FormComp={() => <ClassForm isEditing={false} />}
          DialogTitle="Add Class"
        />
      </div>
      <DataTable
        tableCellClassName="text-center"
        columns={classAdminCols}
        data={classes}
      />
    </div>
  );
};

export default Page;
