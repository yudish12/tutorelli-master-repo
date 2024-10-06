"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/schemas/login-form.schema";
import { signupStrings } from "@/lib/strings/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthProvider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { roles } from "@/config/contants";
import { globalStrings } from "@/lib/strings";

const SignupForm = () => {
  const { isLoading, signupFunc } = useAuth();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      role: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    signupFunc(
      data.email,
      data.password,
      data.full_name,
      data.role,
      data.phone_number
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center justify-between px-3 gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {signupStrings.header}
        </h3>
        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{signupStrings.fullName}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-white py-6 text-slate-950"
                    placeholder="Enter your full name"
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
              <FormItem className="w-full">
                <FormLabel>{signupStrings.email}</FormLabel>
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
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{signupStrings.phone_number}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="bg-white py-6 text-slate-950"
                    placeholder="(+44) Enter your phone number "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{signupStrings.password}</FormLabel>
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
        <div className="flex items-center justify-between w-full">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={roles.PARENT} id={roles.PARENT} />
                      <Label htmlFor={roles.PARENT}>
                        {globalStrings.parent}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={roles.STUDENT}
                        id={roles.STUDENT}
                      />
                      <Label htmlFor={roles.STUDENT}>
                        {globalStrings.student}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={roles.TUTOR} id={roles.TUTOR} />
                      <Label htmlFor={roles.TUTOR}>{globalStrings.tutor}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/forgot-password"}
            className="w-[200px] text-lime-100 text-sm text-end"
          >
            {signupStrings.forgotPassword}
          </Link>
        </div>
        {/* <FormField
          control={form.control}
          name="profile_pic"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel
                htmlFor="profile_pic"
                className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-5 text-sm p-2 rounded-md w-full font-medium"
              >
                {!field.value
                  ? " Upload Profile Picture "
                  : `change selected file`}
              </FormLabel>
              <FormControl>
                <Input
                  id="profile_pic"
                  accept="image/*"
                  {...field}
                  type="file"
                  className="hidden"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="w-full py-5 flex flex-col items-center">
          <Button className="w-full">{signupStrings.signup}</Button>
          <Link href={"/auth/login"} className="text-lime-100 mt-2 text-sm">
            {!isLoading ? signupStrings.login : globalStrings.loading}
          </Link>
        </div>
        {/* <Button
          variant={"outline"}
          className="w-full hover:bg-blue flex gap-4 hover:text-white py-5 bg-transparent"
        >
          <Image
            src={"/googleLogo.svg"}
            alt="google logo"
            width={20}
            height={20}
          />
          {signupStrings.googleSignup}
        </Button> */}
      </form>
    </Form>
  );
};

export default SignupForm;
