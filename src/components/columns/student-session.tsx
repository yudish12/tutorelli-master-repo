"use client";
import { ColumnDef } from "@tanstack/react-table";
import { StudentsInSessionTableType } from "@/lib/types/table.types";

export const studentSessionDataColumns: ColumnDef<StudentsInSessionTableType>[] =
  [
    {
      accessorKey: "students.full_name",
      header: "Student Name",
    },
    {
      accessorKey: "students.email",
      header: "Email",
    },
    {
      accessorKey: "join_status",
      header: "Join Status",
    },
  ];
