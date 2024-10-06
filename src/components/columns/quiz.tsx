"use client";
import { ColumnDef } from "@tanstack/react-table";
import { QuizDataTableType } from "@/lib/types/table.types";

export const quizDataColumns: ColumnDef<QuizDataTableType>[] = [
  {
    accessorKey: "quiz_name",
    header: "Quiz Name",
  },
  {
    accessorKey: "session_name",
    header: "Session Name",
  },

  {
    accessorKey: "subject",
    header: "Subject",
  },

  {
    accessorKey: "class",
    header: "Class",
  },

  {
    accessorKey: "action",
    header: "Action",
  },
];
