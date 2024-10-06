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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { parentsFormSchema } from "@/lib/schemas/users-form.schema";
import { updateParent } from "../server-actions";

const ParentForm = ({
  parentName,
  id,
}: {
  parentName?: string;
  id?: string;
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof parentsFormSchema>>({
    resolver: zodResolver(parentsFormSchema),
    defaultValues: {
      full_name: parentName,
    },
  });

  const onSubmit = async (data: z.infer<typeof parentsFormSchema>) => {
    const resp = await updateParent(data, id ?? "");

    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Parentid information successfully updated`,
      });
    } else {
      toast({
        variant: "destructive",
        title: resp.message,
        description: `Parentid information not updated`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full shadow-xl p-6 rounded-2xl mx-auto justify-center gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          Edit Parent
        </h3>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Parent name"
                  className="bg-white py-6 rounded-xl shadow-none outline-none border-none text-slate-950"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-11/12 py-5">Update</Button>
      </form>
    </Form>
  );
};

export default ParentForm;
