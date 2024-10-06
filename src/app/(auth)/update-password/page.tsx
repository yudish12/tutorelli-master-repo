"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import ResetPasswordForm from "../_components/ResetPassForm";

const Page = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {}, [user]);

  return (
    <div className="w-[95vw] h-[87vh] p-8 rounded-2xl flex mx-auto mt-8 bg-white">
      {isLoading ? (
        <Skeleton className="max-h-[600px] bg-blue/10 w-[35%] rounded-2xl p-4 mx-auto" />
      ) : (
        <div className="scroll-container bg-blue w-[35%] rounded-2xl p-4 mx-auto text-white hover:overflow-y-scroll">
          <ResetPasswordForm />
        </div>
      )}
    </div>
  );
};

export default Page;
