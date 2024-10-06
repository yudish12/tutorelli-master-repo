"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
// import EditButton from "../_components/edit-button";
// import DeleteButton from "../_components/delete-button";
import { useToast } from "@/components/ui/use-toast";
// import SessionEditForm from "./_components/registration-form";
import { getRegistrations } from "./server-actions";

const Page = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = React.useState<any[]>([]);

  const getRegistrationsAsync = async () => {
    const data = await getRegistrations();
    const registrationTableData = data.map((item) => ({
      ...item,
      actions: <div className="flex justify-center gap-4"></div>,
    }));
    setRegistrations(registrationTableData);
  };

  return <div>Page</div>;
};

export default Page;
