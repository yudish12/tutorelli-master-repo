"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { classFormSchema } from "@/lib/schemas/subject-form-schema";
import { createClass, updateClass } from "../server-action";
import { useToast } from "@/components/ui/use-toast";
import { getClass, getClassById } from "../../server/get";

const ClassForm = ({
  isEditing = false,
  className,
  id,
}: {
  isEditing?: boolean;
  className?: string;
  id?: string;
}) => {
  const [selectDataLoading, setSelectDataLoading] = useState(
    isEditing ? true : false
  );
  const { toast } = useToast();
  const form = useForm<z.infer<typeof classFormSchema>>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: isEditing ? className : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof classFormSchema>) => {
    let resp;
    if (isEditing) {
      resp = await updateClass(data, id);
    } else {
      resp = await createClass(data);
    }
    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Class updated successfully`,
      });
    } else {
      toast({
        variant: "destructive",
        title: resp.message,
        description: `Classid - ${resp?.data.id} ${resp.message}`,
      });
    }
  };

  const getData = useCallback(async () => {
    if (!id) return;
    const response = await getClassById(id);
    if (!response) {
      console.log(response);
      return;
    }
    form.setValue("name", response.name);
    setSelectDataLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (selectDataLoading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full shadow-xl p-6 rounded-2xl mx-auto justify-center gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {isEditing ? "Edit Class" : "Add Class"}
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="name"
                  placeholder="Enter class name"
                  className="bg-white py-6 rounded-xl shadow-none outline-none border-none text-slate-950"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-11/12 py-5">
          {isEditing ? "Update" : "Add Class"}
        </Button>
      </form>
    </Form>
  );
};

export default ClassForm;
