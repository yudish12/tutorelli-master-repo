"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Parent } from "@/lib/types/global.types";

export const parentAdminCols: ColumnDef<Parent>[] = [
  {
    accessorKey: "full_name",
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
