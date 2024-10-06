"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import {
  sessionFormSchema,
  subjectClassOptions,
} from "@/lib/schemas/session-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { optionsType } from "@/lib/types/global.types";
import SelectComp from "../../_components/SelectComp";
import { getSelectDataApi } from "../api";
import { DatePicker } from "@/components/ui/date-picker";
import { createMeeting } from "../server-actions";
import { useToast } from "@/components/ui/use-toast";
import { mergeDateAndTime } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
const Page = () => {
  const [selectDataLoading, setSelectDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  const router = useRouter();
  const { toast } = useToast();
  const [initSubjectSelect, setInitSubjectSelect] = useState<
    subjectClassOptions[] | []
  >([]);
  const form = useForm<z.infer<typeof sessionFormSchema>>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      name: "",
      subject: { label: "", value: "", class: { id: "" } },
      from: new Date(),
      price: 0,
      capacity: 0,
      block_id: { label: "", value: "" },
      tutor_id: { label: "", value: "" },
      class_id: { label: "", value: "" },
    },
  });

  const onSubmit = async (data: z.infer<typeof sessionFormSchema>) => {
    setLoading(true);
    data.from = new Date(mergeDateAndTime(data.from.toISOString(), time));
    console.log(data);
    const resp = await createMeeting(data);
    setLoading(false);
    toast({
      variant: "default",
      title: "Session created Successfully",
      description: "Session created Successfully",
    });
    router.replace("/admin/sessions");
  };

  const [tutorData, setTutorData] = useState<optionsType[] | []>([]);
  const [subjectData, setSubjectData] = useState<subjectClassOptions[] | []>(
    []
  );
  const [classData, setClassData] = useState<optionsType[] | []>([]);
  const [blockData, setBlockData] = useState<optionsType[] | []>([]);

  const getData = useCallback(async () => {
    const response = await getSelectDataApi();
    console.log(response.data);
    if (response.error) {
      console.log(response.error);
      return;
    }
    setTutorData(
      response.data.tutorData.map((item: any) => ({
        label: item.full_name,
        value: item.id,
      }))
    );
    setSubjectData(
      response.data.subjectData.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
        class: { id: item.class.id },
      }))
    );

    setInitSubjectSelect(
      response.data.subjectData.map((item: any) => ({
        label: `${item.name}`,
        value: item.id,
        class: { id: item.class.id },
      }))
    );

    setClassData(
      response.data.classData.map((item: any) => ({
        label: `${item.name} class`,
        value: item.id,
      }))
    );

    setBlockData(
      response.data?.blockData?.map((item: any) => ({
        label: `${item.id}`,
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
        className="flex flex-col items-center w-1/2 shadow-xl p-6 rounded-2xl mx-auto justify-center gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          Add Session
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter session name"
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
          name="block_id"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <SelectComp
                  selectDataLoading={selectDataLoading}
                  selectText="Select Block to which session belongs"
                  options={blockData}
                  selectedOption={field.value}
                  onValueChange={(value) => {
                    const item = blockData.find((item) => item.value === value);
                    if (!item) return;
                    form.setValue("block_id", item);
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
                    const item = classData.find((item) => item.value === value);
                    if (!item) return;
                    form.setValue("class_id", item);
                    form.setValue("subject", {
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
          name="subject"
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
                    form.setValue("subject", {
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

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your duration"
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
          name="price"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your price"
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
              <FormControl>
                <SelectComp
                  selectDataLoading={selectDataLoading}
                  selectText="Select Tutor"
                  options={tutorData}
                  selectedOption={field.value}
                  onValueChange={(value) => {
                    const item = tutorData.find((item) => item.value === value);
                    if (!item) return;
                    form.setValue("tutor_id", item);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-11/12 py-5 flex gap-2">
          Add Session
          {loading && (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#4fa94d"
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

export default Page;
