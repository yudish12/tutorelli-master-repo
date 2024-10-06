"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/lib/schemas/login-form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Oval } from "react-loader-spinner";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthProvider";
import { forgotPasswordStrings } from "@/lib/strings/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { acceptInvite } from "./action";
const FormComp = ({
  email,
  token,
  student_id,
  parent_id,
}: {
  email: string;
  token: string;
  student_id: string;
  parent_id: string;
}) => {
  const { isLoading, loginFunc } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    const resp = await loginFunc(email, data.password);
    if (!resp.success) {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "An unexpected error occurred",
      });
      return;
    }
    const inviteResp = await acceptInvite(token, student_id, parent_id);
    if (inviteResp.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
      return;
    }
    toast({
      variant: "default",
      title: "Parent Invite Accepted Successfully",
    });
    setTimeout(() => {
      router.replace("/dashboard/student");
    }, 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col w-1/3 my-auto rounded-lg px-3 bg-white mx-auto gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {forgotPasswordStrings.enter}
        </h3>
        <div className="w-full h-full flex flex-col justify-center">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{forgotPasswordStrings.password}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    showPasswordToggle
                    className="bg-white py-6 text-slate-950"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full py-5 flex flex-col items-center">
          <Button className="w-full">
            {forgotPasswordStrings.Submit}
            {isLoading && (
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
        </div>
      </form>
    </Form>
  );
};

export default FormComp;
