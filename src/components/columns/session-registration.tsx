"use client";
import { ColumnDef } from "@tanstack/react-table";

export const sessionRegistrationCols: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "students.full_name",
    header: "Student Name",
  },
  {
    accessorKey: "join_url",
    header: "Sesson Start URL",
  },
  {
    accessorKey: "actions",
  },
];
