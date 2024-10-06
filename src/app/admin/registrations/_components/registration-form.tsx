"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RegistrationForm({
  isEditing = false,
  id,
}: {
  isEditing?: boolean;
  id: string;
}) {
  const [selectDataLoading, setSelectDataLoading] = useState(true);
  return <></>;
}
