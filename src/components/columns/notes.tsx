"use client";
import { ColumnDef } from "@tanstack/react-table";
import { NotesDataTableType } from "@/lib/types/table.types";

export const notesDataColumns: ColumnDef<NotesDataTableType>[] = [
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
