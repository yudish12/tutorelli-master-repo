"use client";
import { getStudentsByParentId } from "@/app/dashboard/parent/server-actions/students-actions";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import { optionsType } from "@/lib/types/global.types";

interface ParentContextType {
  selectedStudent: {
    label: string;
    value: string;
  };
  setSelectedStudent: React.Dispatch<React.SetStateAction<optionsType>>;
  students: optionsType[];
  loading: boolean;
}

export const ParentContext = createContext<ParentContextType>({
  selectedStudent: {
    label: "",
    value: "",
  },
  setSelectedStudent: () => {},
  students: [],
  loading: true,
});

export const ParentProvider = ({ children }: { children: React.ReactNode }) => {
  const { user_info } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<optionsType>({
    label: "",
    value: "",
  });
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<optionsType[]>([]);

  const init = useCallback(async () => {
    try {
      const res = await getStudentsByParentId(user_info?.id!);
      setStudents(
        res.map((item) => ({ label: item.full_name, value: item.id }))
      );
      setSelectedStudent({
        label: res[0].full_name,
        value: res[0].id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user_info]);

  useEffect(() => {
    if (!user_info) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_info]);

  return (
    <ParentContext.Provider
      value={{ selectedStudent, setSelectedStudent, loading, students }}
    >
      {children}
    </ParentContext.Provider>
  );
};

export const useParentContext = () => {
  const context = useContext(ParentContext);

  if (!context) {
    throw new Error("useParent must be used within a ParentProvider");
  }

  return context;
};
