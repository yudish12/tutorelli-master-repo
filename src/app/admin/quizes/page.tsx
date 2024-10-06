"use client";
import { Quiz } from "@/lib/types/global.types";
import React, { useEffect, useCallback } from "react";
import { deleteQuiz, getQuizzes } from "./server-actions";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/ui/data-table";
import { quizAdminCols } from "@/components/columns/quiz-admin";
import DeleteButton from "../_components/delete-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { Edit2Icon } from "lucide-react";

const Page = () => {
  const { toast } = useToast();
  const [quizes, setQuizes] = React.useState<Quiz[]>([]);
  const router = useRouter();
  const getQuizAsync = useCallback(async () => {
    const data = await getQuizzes();
    const quizTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center items-center gap-4">
          <Link
            className="border-2 border-gray-200 rounded-md p-1 flex justify-center items-center"
            href={`/admin/quizes/edit/${item.id}`}
          >
            <Edit2Icon color="green" />
          </Link>
          <Button
            onClick={() =>
              router.push(`/dashboard/student/quiz?quiz_id=${item.id}`)
            }
          >
            View Quiz
          </Button>
          <DeleteButton
            alertDesc="Are you sure you want to delete this quiz?"
            alertTitle="Delete Quiz"
            deleteFunc={() => deleteQuizFunc(item.id.toString())}
          />
        </div>
      ),
    }));
    console.log(quizTableData);
    setQuizes(quizTableData);
  }, []);

  const deleteQuizFunc = async (id: string) => {
    const resp = await deleteQuiz(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete Quiz",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "Quiz deleted successfully",
      description: `Quiz with id ${id} deleted successfully`,
    });
    getQuizAsync();
  };

  useEffect(() => {
    getQuizAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <div className="flex justify-between">
        {/* <h3 className="text-3xl font-semibold">Class</h3>
    <AddButton
      FormComp={() => <ClassForm isEditing={false} />}
      DialogTitle="Add Class"
    /> */}
      </div>
      <DataTable
        tableCellClassName="text-center"
        columns={quizAdminCols}
        data={quizes}
      />
    </div>
  );
};

export default Page;
