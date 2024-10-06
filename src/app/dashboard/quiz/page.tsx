"use client";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect } from "react";
import { QuizDataTableType } from "@/lib/types/table.types";
import { getQuizzesByStudentId } from "../student/server-actions/quizAndFlashcards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { quizDataColumns } from "@/components/columns/quiz";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/app/_components/TableSkeleton";

const Quizes = () => {
  const { user_info } = useAuth();
  const [quizData, setQuizData] = React.useState<QuizDataTableType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const get = async () => {
    let data = await getQuizzesByStudentId(user_info?.id!);
    setQuizData(
      data.map((item: QuizDataTableType) => ({
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
              router.replace(
                `/dashboard/${item.session_id}/quiz?quiz_id=${item.quiz_id}`
              )
            }
          >
            View Quiz
          </Button>
        ),
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    console.log(user_info);
    if (!user_info) return;
    get();
  }, [user_info]);

  if (loading) return <TableSkeleton heading="Your Quizzes" />;

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Your Quizzes</h2>
      <DataTable columns={quizDataColumns} data={quizData} />
    </>
  );
};

export default Quizes;
