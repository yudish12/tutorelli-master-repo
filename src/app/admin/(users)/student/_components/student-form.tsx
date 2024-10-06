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
import { studentFormSchema } from "@/lib/schemas/users-form.schema";
import { updateStudnet } from "../server-actions";
import { optionsType } from "@/lib/types/global.types";
import SelectComp from "@/app/admin/_components/SelectComp";
import { getClass } from "@/app/admin/server/get";
import { getParents } from "../../parent/server-actions";

const StudentForm = ({
  id,
  studentName,
  email,
  currentClass,
  currentParent,
}: {
  id?: string;
  studentName?: string;
  email?: string;
  currentClass?: optionsType;
  currentParent?: optionsType;
}) => {
  const { toast } = useToast();
  const [selectDataLoading, setSelectDataLoading] = useState(true);
  const [classData, setClassData] = useState<optionsType[] | []>([]);
  const [parentData, setParentData] = useState<optionsType[] | []>([]);

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      full_name: studentName,
      email: email,
      class_id: currentClass ?? { label: "", value: "" },
      parent_id: currentParent ?? { label: "", value: "" },
    },
  });

  const init = useCallback(async () => {
    try {
      const classResponse = await getClass();
      const parentResponse = await getParents();
      setClassData(
        classResponse.map((item: any) => ({
          label: `${item.name}`,
          value: item.id,
        }))
      );
      setParentData(
        parentResponse.map((item: any) => ({
          label: `${item.full_name}`,
          value: item.id,
        }))
      );
      setSelectDataLoading(false);
    } catch (error) {
      console.log(error);
      return;
    }
  }, [form, id]);

  const onSubmit = async (data: z.infer<typeof studentFormSchema>) => {
    const resp = await updateStudnet(data, id ?? "");

    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Student information successfully updated`,
      });
    } else {
      toast({
        variant: "destructive",
        title: resp.message,
        description: `Student information not updated`,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full shadow-xl p-6 rounded-2xl mx-auto justify-center gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          Edit Student
        </h3>
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter student's full name"
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter student's Email"
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
          name="class_id"
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
                    form.setValue("class_id", item);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <SelectComp
                  selectDataLoading={selectDataLoading}
                  selectText="Select Parent"
                  options={parentData}
                  selectedOption={field.value}
                  onValueChange={(value) => {
                    const item = parentData.find(
                      (item) => item.value === value
                    );
                    if (!item) return;
                    form.setValue("parent_id", item);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-11/12 py-5">Edit Student</Button>
      </form>
    </Form>
  );
};

export default StudentForm;
