"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { adminLogin } from "../server/auth";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser, setUserInfo } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await adminLogin({ email, password });
    if (!result.user) {
      toast({
        variant: "destructive",
        title: "Cannot login",
        description: result.message,
      });
      return;
    }
    setUser({
      id: result.user?.id!,
      created_at: result.user?.created_at!,
      email: result.user?.email!,
      updated_at: result.user?.updated_at!,
      phone: result.user?.phone!,
      role: result.user?.role!,
    });
    setUserInfo({
      id: result.user?.id!,
      created_at: result.user?.created_at!,
      email: result.user?.email!,
      full_name: "admin",
      user_id: result.user?.id!,
      class_id: null,
      parent_id: null,
    });

    if (result.success) {
      setMessage("Login successful!");
      // Redirect or handle successful login here
    } else {
      setMessage("Error: Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-1/3 h-[400px] border-2 border-gray-500 rounded-lg p-2 mx-auto gap-6"
    >
      <h3 className="text-xl text-center font-semibold">Admin Login</h3>
      <div className="gap-4 flex flex-col w-full h-[300px] mt-6 justify-between">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            className="border-2 rounded-lg p-2"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border-2 rounded-lg p-2"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <span>{message}</span>}
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default AdminLogin;
