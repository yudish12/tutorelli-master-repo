"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Tutor } from "@/lib/types/global.types";

export const tutorAdminCols: ColumnDef<Tutor>[] = [
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
    accessorKey: "actions",
    header: "Actions",
  },
];
