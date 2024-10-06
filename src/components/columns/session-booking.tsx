"use client";

import { SessionTableType } from "@/lib/types/table.types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const sessionBookingCols: ColumnDef<SessionTableType>[] = [
  {
    accessorKey: "yeargroup",
    header: "Year Group",
  },
  {
    accessorKey: "Tutor",
    header: "Tutor",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "from",
    header: "Date & Time",
  },
  {
    accessorKey: "capacity",
    header: "Slots Left",
  },
  {
    accessorKey: "sessionbooking",
    header: "",
  },
  {
    accessorKey: "block_size",
    header: "No of sessions",
    accessorFn: (row) => (
      <Badge
        className={cn(
          "w-full h-[30px] min-w-[40px] flex items-center justify-center rounded-md p-2 bg-amber-600 text-white shadow-none hover:bg-amber-600/90"
        )}
      >
        {row.block_size}
      </Badge>
    ),
  },
];
