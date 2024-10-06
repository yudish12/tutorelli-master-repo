import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionFilters } from "@/app/(landing)/book-session/_component/SessionFilters";

const BookSessionPage = () => {
  return (
    <div className="min-h-screen w-full text-blue">
      <div className="h-screen w-full  bg-whitebg">
        <h2 className="text-2xl py-10 font-semibold px-20">
          Find Your Session
        </h2>
        <div className="px-20">
          <div className="col-span-3 overflow-auto w-full h-full">
            <Suspense fallback={<Skeleton className="h-[100px] " />}>
              <SessionFilters />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionPage;
