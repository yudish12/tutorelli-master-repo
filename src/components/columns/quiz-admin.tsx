"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Flashcard, Quiz } from "@/lib/types/global.types";

export const quizAdminCols: ColumnDef<Quiz>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];

export const flashcardAdminCols: ColumnDef<Flashcard>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
