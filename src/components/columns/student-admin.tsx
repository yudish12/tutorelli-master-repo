"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/lib/types/global.types";

export const studentAdminCols: ColumnDef<Student>[] = [
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "class.name",
    header: "Class",
  },
  {
    accessorKey: "parent_id",
    header: "Parent",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
