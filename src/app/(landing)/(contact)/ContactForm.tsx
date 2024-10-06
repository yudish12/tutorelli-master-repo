"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const form = useForm();
  return (
    <div className="mt-6 relative form-circle flex flex-col justify-center h-full w-1/2 py-8 pt-4 px-12 bg-blue rounded-xl">
      <Form {...form}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12 mx-auto mt-4">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your name"
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
            <FormItem className="w-11/12 mx-auto mt-4">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
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
          name="name"
          render={({ field }) => (
            <FormItem className="w-11/12 mx-auto mt-4">
              <FormControl>
                <Textarea
                  className="bg-white"
                  placeholder="Type your message here"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Button className="mx-auto p-6 mt-6">Get In Contact</Button>
    </div>
  );
};

export default ContactForm;
