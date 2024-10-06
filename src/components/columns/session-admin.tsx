"use client";

import { SessionWithTutorAndSubject } from "@/lib/types/action.types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const sessionAdminCols: ColumnDef<SessionWithTutorAndSubject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tutors.full_name",
    header: "Taught By",
  },
  {
    accessorKey: "subject.name",
    header: "Subject",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "subject.class.name",
    header: "Class",
  },
  {
    accessorKey: "from",
    header: "From",
    accessorFn: (row) => moment(row.from).format("DD MMM, hh:mm A (ddd)"),
  },
  {
    accessorKey: "url",
    header: "Session URL",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "quiz",
    header: "Quiz",
    accessorFn: (row) => row.quiz[0]?.id,
  },
  {
    accessorKey: "flashcards",
    header: "Flashcards",
    accessorFn: (row) => row.flashcards[0]?.id,
  },
  {
    accessorKey: "actions",
  },
];
