"use client";
import { ColumnDef } from "@tanstack/react-table";
import { FlashcardDataTableType } from "@/lib/types/table.types";

export const flashcardDataColumns: ColumnDef<FlashcardDataTableType>[] = [
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
