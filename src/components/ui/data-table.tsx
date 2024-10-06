"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from "@/lib/types/table.types";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";

export function DataTable<TData, TValue>({
  columns,
  data,
  tableClassName,
  tableCellClassName,
  tableBodyClassName,
  tableHeaderClassName,
  TableRowClassName,
  tableContinerClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { toast } = useToast();

  return (
    <div className={cn("rounded-md w-full", tableContinerClassName)}>
      <Table
        className={cn("border-separate border-spacing-y-3", tableClassName)}
      >
        <TableHeader className={cn("border-0", tableHeaderClassName)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className={cn("border-0", TableRowClassName)}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={cn("text-center border-0", tableCellClassName)}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={cn("border-0", tableBodyClassName)}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn("hover:bg-white bg-white", TableRowClassName)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      className={cn(
                        "p-4 border-0 hover:bg-white text-lg font-normal",
                        tableCellClassName
                      )}
                      key={cell.id}
                    >
                      <div className="flex items-center max-w-[300px] mx-auto justify-center">
                        {cell.column.id === "url" && (
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                cell.row.getValue(cell.column.id)
                              );
                              toast({
                                variant: "default",
                                title: "Copied to clipboard",
                                description: `Copied to clipboard`,
                              });
                            }}
                          >
                            <CopyIcon
                              color="green"
                              className="w-5 h-5 flex-shrink-0 mr-2"
                            />
                          </div>
                        )}
                        <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                          {cell.row.getValue(cell.column.id)}
                        </span>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className={cn("h-24 text-center", tableCellClassName)}
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
