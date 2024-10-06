"use client";
import { useAuth } from "@/context/AuthProvider";
import React, { useEffect } from "react";
import { getFlashCardsByStudentId } from "./server-actions";
import { DataTable } from "@/components/ui/data-table";
import { flashcardDataColumns } from "@/components/columns/flashcard";
import { FlashcardDataTableType } from "@/lib/types/table.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "nextjs-toploader/app";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/app/_components/TableSkeleton";

const Flashcards = () => {
  const { user_info, user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const [flashcardData, setFlashcardData] = React.useState<
    FlashcardDataTableType[]
  >([]);

  const get = async () => {
    const data = await getFlashCardsByStudentId(user_info?.id!);
    setFlashcardData(
      data.map((item: FlashcardDataTableType) => ({
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
                `/dashboard/${item.session_id}/flashcards?flashcard_id=${item.fc_id}`
              )
            }
          >
            View Flashcard
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

  if (loading) return <TableSkeleton heading="Your Flashcards" />;

  return (
    <>
      <h2 className="text-3xl font-semibold mb-6">Your Flashcards</h2>
      <DataTable columns={flashcardDataColumns} data={flashcardData} />
    </>
  );
};

export default Flashcards;
