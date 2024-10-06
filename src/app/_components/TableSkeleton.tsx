import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = ({ heading }: { heading?: string }) => {
  return (
    <>
      {heading && <h2 className="text-3xl font-semibold mb-6">{heading}</h2>}
      <div className="flex flex-col mt-12 gap-8">
        {...Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="w-full h-[80px] bg-primary/10" />
        ))}
      </div>
    </>
  );
};

export default TableSkeleton;
