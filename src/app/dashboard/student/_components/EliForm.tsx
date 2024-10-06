"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const EliForm = () => {
  const form = useForm({
    defaultValues: {
      request: "Hii I am Eli type here a request",
      prompt: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col w-full items-center rounded-lg bg-lightergreen p-4 justify-center gap-6">
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="text"
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
          name="prompt"
          render={({ field }) => (
            <FormItem className="w-11/12">
              <FormControl>
                <Input
                  type="text"
                  className="bg-white py-6 rounded-xl shadow-none outline-none border-none text-slate-950"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EliForm;
