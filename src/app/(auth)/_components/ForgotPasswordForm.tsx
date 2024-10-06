"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  loginSchema,
} from "@/lib/schemas/login-form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider";
import { forgotPasswordStrings } from "@/lib/strings/auth";
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordForm = () => {
  const { isLoading, forgotPasswordFunc } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const resp = await forgotPasswordFunc(data.email);
    if (resp.success) {
      toast({
        variant: "default",
        title: "Password Reset Link Send Successfully",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col w-full h-full px-3 items-center justify-between gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {forgotPasswordStrings.header}
        </h3>
        <div className="w-full h-full flex flex-col justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{forgotPasswordStrings.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="bg-white py-6 text-slate-950"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full py-5 flex flex-col items-center">
          <Button className="w-full">{forgotPasswordStrings.reset}</Button>
          <Link href={"/auth/signup"} className="text-lime-100 mt-2 text-sm">
            {isLoading ? "Loading..." : "Login"}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
