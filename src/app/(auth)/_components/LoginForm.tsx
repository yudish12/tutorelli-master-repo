"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/login-form.schema";
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
import { loginStrings } from "@/lib/strings/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const { isLoading, loginFunc, googleLogin } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const from = searchParams.get("from");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const loginRes = await loginFunc(data.email, data.password);
      const { role, success, error } = loginRes;
      if (success) {
        router.replace(`/dashboard/${role}`);
      } else {
        form.setError("password", { message: "Invalid login credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred",
      });
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!from) return;
      toast({
        variant: "destructive",
        title: "Cannot Book Session",
        description: "Login to book session",
      });
      router.replace("/auth/login");
    }, 0);

    return () => clearTimeout(timeout);
  }, [from, router, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col w-full h-full px-3 items-center justify-between gap-6"
      >
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {loginStrings.header}
        </h3>
        <div className="w-full h-full flex flex-col justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{loginStrings.email}</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{loginStrings.password}</FormLabel>
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
          <div className="flex items-center mt-4 justify-between w-full">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="w-full flex items-center gap-2">
                  <FormLabel className="text-sm">
                    {loginStrings.remember}
                  </FormLabel>
                  <FormControl>
                    <Checkbox style={{ marginTop: "0px" }} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href={"/auth/forgot-password"}
              className="w-[200px] text-lime-100 text-sm"
            >
              {loginStrings.forgotPassword}
            </Link>
          </div>
        </div>
        <div className="w-full py-5 flex flex-col items-center">
          <Button className="w-full">{loginStrings.login}</Button>
          <Link href={"/auth/signup"} className="text-lime-100 mt-2 text-sm">
            {isLoading ? "Loading..." : "Create An Account"}
          </Link>
        </div>

        {/* <Button
          variant={"outline"}
          type="button"
          onClick={handleGoogleLogin}
          className="w-11/12 hover:bg-blue flex gap-4 hover:text-white py-5 bg-transparent"
        >
          <Image
            src={"/googleLogo.svg"}
            alt="google logo"
            width={20}
            height={20}
          />
          {loginStrings.googleLogin}
        </Button> */}
      </form>
    </Form>
  );
};

export default LoginForm;
