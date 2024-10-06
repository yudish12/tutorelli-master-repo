"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/clients/broswer.client";
import { Parent, Student, Tutor, User } from "@/lib/types/global.types";
import { signOut, signUp } from "@/app/(auth)/server-actions/auth-actions";
import { toast } from "sonner";
import {
  getParentData,
  getStudentData,
  getTutorData,
} from "@/app/(auth)/server-actions/get-user-data";
import { roles } from "@/config/contants";
import { useRouter } from "nextjs-toploader/app";

interface AuthContextType {
  user: User | null;
  forgotPasswordFunc: (
    email: string
  ) => Promise<{ success: boolean; data: any }>;
  updatePasswordFunc: (
    password: string
  ) => Promise<{ success: boolean; data: any }>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isAdmin: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user_info: Tutor | Parent | Student | null;
  getUserInfo: () => Promise<void>;
  loginFunc: (email: string, password: string) => Promise<any>;
  logoutFunc: () => Promise<void>;
  googleLogin: () => Promise<void>;
  setUserInfo: React.Dispatch<
    React.SetStateAction<Tutor | Parent | Student | null>
  >;
  signupFunc: (
    email: string,
    password: string,
    full_name: string,
    role: string,
    phone_number: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  setUser: () => {},
  setUserInfo: () => {},
  forgotPasswordFunc: async () => {
    return { success: false, data: null };
  },
  updatePasswordFunc: async () => {
    return { success: false, data: null };
  },
  isLoading: false,
  user_info: null,
  setIsLoading: () => {},
  googleLogin: async () => {},
  loginFunc: async () => {},
  getUserInfo: async () => {},
  logoutFunc: async () => {},
  signupFunc: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user_info, setUserInfo] = useState<Tutor | Parent | Student | null>(
    null
  );

  const client = getSupabaseBrowserClient();

  const loginFunc = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await client.auth.signInWithPassword({ email, password });
      if (!res.data.user) {
        return { success: false, error: res.error };
      }

      const { user_metadata } = res.data.user;

      setUser({
        id: res.data.user.id,
        created_at: res.data.user.created_at,
        email: res.data.user.email!,
        updated_at: res.data.user.updated_at!,
        phone: res.data.user.phone!,
        role: user_metadata.role!,
      });

      if (
        user_metadata.role === null ||
        user_metadata.role === roles.STUDENT ||
        user_metadata.role === undefined
      ) {
        const data = await getStudentData(res.data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.STUDENT } : null));
        setUserInfo(data[0]);
      } else if (user_metadata.role === roles.PARENT) {
        const data = await getParentData(res.data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.PARENT } : null));
        setUserInfo(data[0]);
      } else if (
        user_metadata.role === roles.TUTOR ||
        res.data.user.email === "yudi@gmail.com"
      ) {
        const data = await getTutorData(res.data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.TUTOR } : null));
        setUserInfo(data[0]);
      }
      return { success: true, role: user_metadata.role };
    } catch (error) {
      console.log(error);
      toast.error(error as string);
      return { success: false, error: error };
    } finally {
      setIsLoading(false);
    }
  };

  const signupFunc = async (
    email: string,
    password: string,
    full_name: string,
    role: string,
    phone_number: string
  ) => {
    setIsLoading(true);
    try {
      const { data: res, resp } = await signUp(
        email,
        password,
        full_name,
        role,
        phone_number
      );
      if (!res.user) {
        setUser(null);
        return;
      }
      setUser({
        id: res.user.id,
        created_at: res.user.created_at,
        email: res.user.email!,
        updated_at: res.user.updated_at!,
        phone: res.user.phone!,
        role: res.user.user_metadata.role!,
      });
      if (
        res.user.user_metadata.role === null ||
        res.user.user_metadata.role === roles.STUDENT ||
        res.user.user_metadata.role === undefined
      ) {
        const data = await getStudentData(res.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.STUDENT } : null));
        setUserInfo(data[0]);
      } else if (res.user.user_metadata.role === roles.PARENT) {
        const data = await getParentData(res.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.PARENT } : null));
        setUserInfo(data[0]);
      } else if (
        res.user.user_metadata.role === roles.TUTOR ||
        res.user.email === "yudi@gmail.com"
      ) {
        const data = await getTutorData(res.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.TUTOR } : null));
        setUserInfo(data[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async () => {
    const { data, error } = await client.auth.getUser();

    if (error) {
      toast.error(error.message);
    }
    if (data.user) {
      setUser({
        id: data.user.id,
        created_at: data.user.created_at,
        email: data.user.email!,
        updated_at: data.user.updated_at!,
        phone: data.user.phone!,
        role: data.user.user_metadata.role!,
      });
      if (data.user.user_metadata.role === roles.STUDENT) {
        const studentData = await getStudentData(data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.STUDENT } : null));
        setUserInfo(studentData[0]);
      } else if (data.user.user_metadata.role === roles.PARENT) {
        const parentData = await getParentData(data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.PARENT } : null));
        setUserInfo(parentData[0]);
      } else if (data.user.user_metadata.role === roles.TUTOR) {
        const tutorData = await getTutorData(data.user.id);
        setUser((prev) => (prev ? { ...prev, role: roles.TUTOR } : null));
        setUserInfo(tutorData[0]);
      } else if (data.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setUser((prev) => (prev ? { ...prev, role: roles.ADMIN } : null));
        setUserInfo({
          full_name: "admin",
          id: data.user.id,
          email: data.user.email!,
          user_id: data.user.id!,
          created_at: data.user.created_at!,
        });
      }
    }
    setIsLoading(false);
  };

  const googleLogin = async () => {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      return;
    }
    // setUser({
    //   id: data.user.id,
    //   created_at: data.user.created_at,
    //   email: data.user.email!,
    //   updated_at: data.user.updated_at!,
    //   phone: data.user.phone!,
    //   role: data.user.user_metadata.role!,
    // });
    // if (
    //   data.user.user_metadata.role === null ||
    //   data.user.user_metadata.role === roles.STUDENT ||
    //   data.user.user_metadata.role === undefined
    // ) {
    //   const studentData = await getStudentData(data.user.id);
    //   setUser((prev) => (prev ? { ...prev, role: roles.STUDENT } : null));
    //   setUserInfo(studentData[0]);
    // } else if (data.user.user_metadata.role === roles.PARENT) {
    //   const parentData = await getParentData(data.user.id);
    //   setUser((prev) => (prev ? { ...prev, role: roles.PARENT } : null));
    //   setUserInfo(parentData[0]);
    // } else if (data.user.user_metadata.role === roles.TUTOR) {
    //   const tutorData = await getTutorData(data.user.id);
    //   setUser((prev) => (prev ? { ...prev, role: roles.TUTOR } : null));
    //   setUserInfo(tutorData[0]);

    // }
  };

  const logoutFunc = async () => {
    const res = await signOut();
    const client = getSupabaseBrowserClient();
    client.auth.signOut();
    if (res) {
      localStorage.clear();
      setUser(null);
      setUserInfo(null);
    } else {
      toast.error("Logout Failed");
    }
  };

  const forgotPasswordFunc = async (email: string) => {
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      toast.error(error.message);
    }
    return { success: true, data };
  };

  const updatePasswordFunc = async (password: string) => {
    const { data, error } = await client.auth.updateUser({
      password: password,
      data: {
        password: password,
      },
    });
    if (error) {
      toast.error(error.message);
    }
    return { success: true, data };
  };

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    forgotPasswordFunc,
    updatePasswordFunc,
    user_info,
    setUserInfo,
    loginFunc,
    signupFunc,
    logoutFunc,
    googleLogin,
    getUserInfo,
    isAdmin,
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
