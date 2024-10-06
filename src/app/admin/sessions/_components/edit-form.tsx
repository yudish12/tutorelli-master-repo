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
import { useToast } from "@/components/ui/use-toast";
import {
  getSessionWithTutorAndSubject,
  updateSession,
} from "../server-actions/supabase";
import {
  sessionEditFormSchema,
  subjectClassOptions,
} from "@/lib/schemas/session-form-schema";
import { getClass, getSubjects, getTutors } from "../../server/get";
import { Oval } from "react-loader-spinner";
import { DatePicker } from "@/components/ui/date-picker";
import { mergeDateAndTime } from "@/lib/utils";

const SessionEditForm = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [selectDataLoading, setSelectDataLoading] = useState(true);
  const [tutorData, setTutorData] = useState<optionsType[] | []>([]);
  const [subjectData, setSubjectData] = useState<subjectClassOptions[] | []>(
    []
  );
  const [initSubjectSelect, setInitSubjectSelect] = useState<
    subjectClassOptions[] | []
  >([]);
  const [classData, setClassData] = useState<optionsType[] | []>([]);
  const [time, setTime] = useState<string>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof sessionEditFormSchema>>({
    resolver: zodResolver(sessionEditFormSchema),
    defaultValues: {
      price: 0,
      capacity: 0,
      tutor_id: { label: "", value: "" },
      subject_id: { label: "", value: "" },
      from: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof sessionEditFormSchema>) => {
    setLoading(true);
    data.from = new Date(
      mergeDateAndTime(data.from.toISOString(), time ?? "18:00")
    );
    console.log(data.from);
    const resp = await updateSession(
      {
        id: id ?? "",
        price: Number(data.price),
        capacity: Number(data.capacity),
        tutor_id: data.tutor_id.value,
        subject_id: data.subject_id.value,
        from: data.from.toISOString(),
        class_id: data.class_id.value,
      },
      id ?? ""
    );
    setLoading(false);
    if (resp.success) {
      toast({
        variant: "default",
        title: resp.message,
        description: `Session Edited Successfully`,
      });
    } else {
      toast({
        variant: "destructive",
        title: resp.message,
        description: `Sorry Session Editing Failed`,
      });
    }
  };

  const getData = useCallback(async () => {
    const data = await getSessionWithTutorAndSubject(id ?? "");
    const timeString = data[0].from.split("T")[1].slice(0, 5); // Extracting only HH:MM
    setTime(timeString); // Set the time state with the correct format (HH:MM)

    form.setValue("subject_id", {
      label: data[0].subject.name,
      value: data[0].subject.id.toString(),
      class: { id: data[0].subject.class.id },
    });
    form.setValue("tutor_id", {
      label: data[0].tutors.full_name,
      value: data[0].tutors.id,
    });
    form.setValue("price", data[0].price);
    form.setValue("from", new Date(data[0].from));
    form.setValue("capacity", data[0].capacity);
    form.setValue("class_id", {
      label: data[0].subject.class.name,
      value: data[0].subject.class.id,
    });

    const tutors = await getTutors();
    setTutorData(
      tutors.map((item: any) => ({
        label: `${item.full_name}`,
        value: item.id,
      }))
    );
    const subjects = await getSubjects();
    setInitSubjectSelect(
      subjects.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
        class: { id: item.class_id },
      }))
    );
    setSubjectData(
      subjects.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
        class: { id: item.class_id },
      }))
    );
    const classes = await getClass();
    setClassData(
      classes.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
      }))
    );
    setSelectDataLoading(false);
  }, [form, id]);

  useEffect(() => {
    getData();
  }, []);

  if (selectDataLoading) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex overflow-auto flex-col items-center w-full shadow-xl p-6 rounded-2xl mx-auto justify-between gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          Edit Session
        </h3>
        <div className="w-full max-h-[60vh] p-6 overflow-auto">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-11/12">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter session's price"
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
            name="capacity"
            render={({ field }) => (
              <FormItem className="w-11/12">
                <FormLabel>Space Left</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of students for session"
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
            name="from"
            render={({ field }) => (
              <FormItem className="w-11/12">
                <FormControl>
                  <DatePicker
                    defaultValue={field.value}
                    onDateChange={(value: Date | undefined) =>
                      form.setValue("from", value ?? new Date())
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex text-gray-500 flex-col gap-2  w-[92%]">
            <div className="p-1 bg-white border-2 rounded-lg">
              Set the time:{" "}
              <input
                defaultValue={time}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="tutor_id"
            render={({ field }) => (
              <FormItem className="w-11/12">
                <FormLabel>Choose A Tutor</FormLabel>
                <FormControl>
                  <SelectComp
                    selectDataLoading={selectDataLoading}
                    selectText="Select Tutor"
                    options={tutorData}
                    selectedOption={field.value}
                    onValueChange={(value) => {
                      const item = tutorData.find(
                        (item) => item.value === value
                      );
                      if (!item) return;
                      form.setValue("tutor_id", item);
                    }}
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
                      const item = classData.find(
                        (item) => item.value === value
                      );
                      if (!item) return;
                      form.setValue("class_id", item);
                      form.setValue("subject_id", {
                        label: "",
                        value: "",
                        class: { id: "" },
                      });
                      const correspondingSubjects = initSubjectSelect.filter(
                        (subj) => subj.class.id === item.value
                      );
                      setSubjectData(correspondingSubjects);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject_id"
            render={({ field }) => (
              <FormItem className="w-11/12">
                <FormControl>
                  <SelectComp
                    selectDataLoading={selectDataLoading}
                    selectText="Select Subject"
                    options={subjectData}
                    selectedOption={field.value}
                    onValueChange={(value) => {
                      const item = subjectData.find(
                        (item) => item.value === value
                      );
                      if (!item) return;
                      form.setValue("subject_id", {
                        label: item.label,
                        value: item.value,
                        class: { id: item.class.id },
                      });
                      const currClass = classData.find(
                        (cls) => cls.value === item.class.id
                      );
                      if (!currClass) return;
                      form.setValue("class_id", currClass);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} className="w-11/12 flex gap-1 py-5">
          Update
          {loading && (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SessionEditForm;
