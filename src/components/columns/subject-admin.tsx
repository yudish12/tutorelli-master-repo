"use client";
import { ColumnDef } from "@tanstack/react-table";
import { SubjectWithClass } from "@/lib/types/action.types";

export const subjectAdminCols: ColumnDef<SubjectWithClass>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "class.name",
    header: "Class",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
