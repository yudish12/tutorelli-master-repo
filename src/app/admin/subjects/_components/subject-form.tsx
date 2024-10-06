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
import { optionsType } from "@/lib/types/global.types";
import SelectComp from "../../_components/SelectComp";
import { subjectFormSchema } from "@/lib/schemas/subject-form-schema";
import { createSubject, updateSubject } from "../server-actions.ts";
import { useToast } from "@/components/ui/use-toast";
import { getClass } from "../../server/get";

const SubjectForm = ({
  isEditing = false,
  subjectName,
  currentClass,
  id,
}: {
  isEditing?: boolean;
  subjectName?: string;
  currentClass?: optionsType;
  id?: string;
}) => {
  const [selectDataLoading, setSelectDataLoading] = useState(true);
  const [classData, setClassData] = useState<optionsType[] | []>([]);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof subjectFormSchema>>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      name: isEditing ? subjectName : "",
      class: currentClass ?? { label: "", value: "" },
    },
  });

  const onSubmit = async (data: z.infer<typeof subjectFormSchema>) => {
    let resp;
    if (isEditing) {
      resp = await updateSubject(data, id);
    } else {
      resp = await createSubject(data);
    }
    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Subjectid - ${resp?.data.id} ${resp.message}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: resp.message,
        description: `Subjectid - ${resp?.data.id} ${resp.message}`,
      });
    }
  };

  const getData = useCallback(async () => {
    const response = await getClass();
    if (!response) {
      console.log(response);
      return;
    }
    setClassData(
      response.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
      }))
    );
    setSelectDataLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full shadow-xl p-6 rounded-2xl mx-auto justify-center gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {isEditing ? "Edit Subject" : "Add Subject"}
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="name"
                  placeholder="Enter subject name"
                  className="bg-white py-6 rounded-xl shadow-none outline-none border-none text-slate-950"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <SelectComp
                  selectDataLoading={selectDataLoading}
                  selectText="Select Class"
                  options={classData}
                  selectedOption={field.value}
                  onValueChange={(value) => {
                    const item = classData.find((item) => item.value === value);
                    if (!item) return;
                    form.setValue("class", item);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-11/12 py-5">
          {isEditing ? "Update" : "Add Subject"}
        </Button>
      </form>
    </Form>
  );
};

export default SubjectForm;
