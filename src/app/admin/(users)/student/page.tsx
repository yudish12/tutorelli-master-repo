"use client";
import { subjectAdminCols } from "@/components/columns/subject-admin";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import EditButton from "../../_components/edit-button";
import DeleteButton from "../../_components/delete-button";
import { useToast } from "@/components/ui/use-toast";
import { Student } from "@/lib/types/global.types";
import { deleteStudent, getStudents } from "./server-actions";
import { studentAdminCols } from "@/components/columns/student-admin";
import StudentForm from "./_components/student-form";

const Page = () => {
  const { toast } = useToast();
  const [students, setStudents] = React.useState<Student[]>([]);

  const getStudentsAsync = async () => {
    const data = await getStudents();
    const studentTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          <EditButton
            DialogTitle="Edit Student"
            FormComp={() => (
              <StudentForm
                id={item.id.toString()}
                studentName={item.full_name}
                email={item.email}
                currentClass={{
                  label: item.class ? item.class.name : "",
                  value: item.class ? item.class.id : "",
                }}
                currentParent={{
                  label: item.parents ? item.parents.full_name : "",
                  value: item.parents ? item.parents.id : "",
                }}
              />
            )}
          />
          <DeleteButton
            alertDesc="Are you sure you want to delete this student?"
            alertTitle="Delete Student"
            deleteFunc={() => deleteStudentFunc(item.id.toString())}
          />
        </div>
      ),
      created_at: item.created_at ?? "", // Ensure created_at is a string
    }));
    setStudents(studentTableData);
  };

  const deleteStudentFunc = async (id: string) => {
    const resp = await deleteStudent(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete student",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "student deleted successfully",
      description: `student deleted successfully`,
    });
    getStudentsAsync();
  };

  useEffect(() => {
    getStudentsAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <DataTable
        tableCellClassName="text-center"
        columns={studentAdminCols}
        data={students}
      />
    </div>
  );
};

export default Page;
