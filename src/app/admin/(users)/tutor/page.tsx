"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getTutors } from "../../server/get";
import EditButton from "../../_components/edit-button";
import DeleteButton from "../../_components/delete-button";
import TutorForm from "./_components/tutor-form";
import { tutorAdminCols } from "@/components/columns/tutor-admin";
import { deleteTutor } from "./server-actions";

const Page = () => {
  const { toast } = useToast();
  //change any to some type
  const [tutors, setTutors] = React.useState<any[]>([]);
  const getTutorsAsync = async () => {
    const data = await getTutors();
    const tutorTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center gap-4">
          <EditButton
            DialogTitle="Edit Tutor"
            FormComp={() => (
              <TutorForm id={item.id.toString()} tutorName={item.full_name} />
            )}
          />
          <DeleteButton
            alertDesc="Are you sure you want to delete this tutor?"
            alertTitle="Delete Tutor"
            deleteFunc={() => deleteTutorFunc(item.id.toString())}
          />
        </div>
      ),
      created_at: item.created_at ?? "", // Ensure created_at is a string
    }));
    setTutors(tutorTableData);
  };

  const deleteTutorFunc = async (id: string) => {
    const resp = await deleteTutor(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete tutor",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "Tutor deleted successfully",
      description: `Tutor with id ${id} deleted successfully`,
    });
    getTutorsAsync();
  };

  useEffect(() => {
    getTutorsAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <DataTable
        tableCellClassName="text-center"
        columns={tutorAdminCols}
        data={tutors}
      />
    </div>
  );
};

export default Page;
