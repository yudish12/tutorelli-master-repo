"use client";
import { Flashcard } from "@/lib/types/global.types";
import React, { useEffect, useCallback } from "react";
import { deleteFlashcard, getFlashcards } from "./server-actions";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "@/components/ui/data-table";
import { flashcardAdminCols } from "@/components/columns/quiz-admin";
import DeleteButton from "../_components/delete-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { Edit2Icon } from "lucide-react";

const Page = () => {
  const { toast } = useToast();
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);
  const router = useRouter();

  const getFlashcardAsync = useCallback(async () => {
    const data = await getFlashcards();
    const flashcardTableData = data.map((item) => ({
      ...item,
      actions: (
        <div className="flex justify-center items-center gap-4">
          <Link
            className="border-2 border-gray-200 rounded-md p-1 flex justify-center items-center"
            href={`/admin/flashcards/edit/${item.id}`}
          >
            <Edit2Icon color="green" />
          </Link>
          <Button
            onClick={() =>
              router.push(`/dashboard/student/quiz?quiz_id=${item.id}`)
            }
          >
            View Flashcard
          </Button>
          <DeleteButton
            alertDesc="Are you sure you want to delete this flashcard?"
            alertTitle="Delete flashcard"
            deleteFunc={() => deleteFlashcardFunc(item.id.toString())}
          />
        </div>
      ),
    }));
    setFlashcards(flashcardTableData);
  }, []);

  const deleteFlashcardFunc = async (id: string) => {
    const resp = await deleteFlashcard(id);
    if (!resp.success) {
      console.log(resp.message);
      toast({
        variant: "destructive",
        title: "Cannot delete flashcard",
        description: resp.message,
      });
      return;
    }
    toast({
      variant: "default",
      title: "flashcard deleted successfully",
      description: `flashcard with id ${id} deleted successfully`,
    });
    getFlashcardAsync();
  };

  useEffect(() => {
    getFlashcardAsync();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-6">
      <DataTable
        tableCellClassName="text-center"
        columns={flashcardAdminCols}
        data={flashcards}
      />
    </div>
  );
};

export default Page;
