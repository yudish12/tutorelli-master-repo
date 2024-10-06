"use client";
import { subjectAdminCols } from "@/components/columns/subject-admin";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import EditButton from "../_components/edit-button";
import DeleteButton from "../_components/delete-button";
import { deleteSubject, getSubjects } from "./server-actions.ts";
import { useToast } from "@/components/ui/use-toast";
import SubjectForm from "./_components/subject-form";
import { SubjectWithClass } from "@/lib/types/action.types";
import { Button } from "@/components/ui/button";
import AddButton from "../_components/add-button";

const Page = () => {
  const { toast } = useToast();
  const [subjects, setSubjects] = React.useState<SubjectWithClass[]>([]);

  const getSubjectsAsync = async () => {
    const data = await getSubjects();
    const subjectTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          <EditButton
            DialogTitle="Edit subject"
            FormComp={() => (
              <SubjectForm
                isEditing={true}
                id={item.id.toString()}
                subjectName={item.name}
                currentClass={{
                  label: item.class.name,
                  value: item.class.id,
                }}
              />
            )}
          />
          <DeleteButton
            alertDesc="Are you sure you want to delete this subject?"
            alertTitle="Delete subject"
            deleteFunc={() => deleteSubjectFunc(item.id.toString())}
          />
        </div>
      ),
    }));
    setSubjects(subjectTableData);
  };

  const deleteSubjectFunc = async (id: string) => {
    const resp = await deleteSubject(id);
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
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold">Subjects</h3>
        <AddButton
          FormComp={() => <SubjectForm isEditing={false} />}
          DialogTitle="Add subject"
        />
      </div>
      <DataTable
        tableCellClassName="text-center"
        columns={subjectAdminCols}
        data={subjects}
      />
    </div>
  );
};

export default Page;
