"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { User } from "lucide-react";
import SessionTable from "./SessionTable";
import { useEffect, useState } from "react";
import {
  getSubjectData,
  getTutorsData,
  getYearGroupData,
} from "../server-actions/selectData";
import { optionsType } from "@/lib/types/global.types";
import { bookSession, Filters, getSessions } from "../server-actions/session";
import { SessionBookingData } from "@/lib/types/action.types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useAuth } from "@/context/AuthProvider";
import { roles } from "@/config/contants";
import DropDown from "@/app/dashboard/parent/_components/DropDown";
import { useToast } from "@/components/ui/use-toast";
import TableSkeleton from "@/app/_components/TableSkeleton";

export function SessionFilters() {
  const { toast } = useToast();
  const [yearGroup, setYearGroup] = useState<optionsType[] | []>([]);
  const [subject, setSubject] = useState<optionsType[] | []>([]);
  const [tutor, setTutor] = useState<optionsType[] | []>([]);

  const [selectedFilters, setSelectedFilters] = useState({
    selectedYearGroup: "",
    selectedSubject: "",
    selectedTutor: "",
  });
  const [selectedLabels, setSelectedLabels] = useState({
    selectedYearGroup: "",
    selectedSubject: "",
    selectedTutor: "",
  });
  const [optionsLoading, setOptionsLoading] = useState<boolean>(true);
  const [sessionsTableLoading, setSessionsTableLoading] =
    useState<boolean>(true);
  const [sessions, setSessions] = useState<SessionBookingData[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, user_info, isLoading } = useAuth();
  const isSuccess = searchParams.get("success") === "true";
  const blockId = searchParams.get("block_id");
  const studentId = searchParams.get("student_id");
  const email = searchParams.get("email");

  // if (isSuccess) {
  //   toast({
  //     variant: "default",
  //     title: "Session Booked Successfully",
  //   });
  //   bookSession(email ?? "", blockId ?? "", studentId ?? "");
  //   router.replace("/dashboard/book-session");
  // }

  const init = async () => {
    try {
      const yearGroupData = await getYearGroupData();
      setYearGroup(
        yearGroupData.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );

      const subjectData = await getSubjectData();

      setSubject(
        subjectData.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );

      const tutorData = await getTutorsData();
      setTutor(
        tutorData.map((item) => ({
          label: item.full_name,
          value: item.id,
        }))
      );
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot fetch data",
        description: error as string,
      });
      setOptionsLoading(false);
      setYearGroup([]);
    } finally {
      setOptionsLoading(false);
    }
  };

  const getFilteredSessions = async (filters: Filters, id?: string) => {
    setSessionsTableLoading(true);
    const sessionsData = await getSessions(filters, id);
    console.log(sessionsData);
    setSessions(sessionsData as unknown as SessionBookingData[]);
    setSessionsTableLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!user_info && !isLoading) {
      getFilteredSessions({
        "subject.class_id": selectedFilters.selectedYearGroup,
        subject_id: selectedFilters.selectedSubject,
        "tutors.full_name": selectedFilters.selectedTutor,
      });
      return;
    }
    getFilteredSessions(
      {
        "subject.class_id": selectedFilters.selectedYearGroup,
        subject_id: selectedFilters.selectedSubject,
        "tutors.full_name": selectedFilters.selectedTutor,
      },
      user_info?.id
    );
  }, [selectedFilters, isLoading]);

  const bookSessionAsync = async () => {
    await bookSession(email ?? "", blockId ?? "", studentId ?? "");
    if (studentId && !isLoading) {
      router.push("/dashboard");
    } else {
      router.replace("/auth/signup");
    }
  };

  useEffect(() => {
    console.log(isSuccess, blockId, email, 139);
    if (isSuccess && blockId && email && !isLoading) {
      toast({
        variant: "default",
        title: "Session Booked Successfully",
        description: !studentId
          ? "Signup on tutorelli as student view your sessions"
          : "You can view all your sessions on the dashboard",
      });
      bookSessionAsync();
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col overflow-none">
      <div className="flex gap-4">
        <Select
          onValueChange={(value) => {
            const label = yearGroup.find((item) => item.value === value);
            if (!label) return;
            setSelectedFilters({
              ...selectedFilters,
              selectedYearGroup: value,
            });

            setSelectedLabels({
              ...selectedLabels,
              selectedYearGroup: label.label,
            });
          }}
        >
          <SelectTrigger className="w-full bg-white border-[#979797] border-[1px] p-4 py-7 shadow-sm">
            <div className="flex items-center gap-4">
              <User />
              <div>
                <Label className="font-bold text-sm">
                  Choose your year group
                </Label>
                <p className="text-sm text-gray-200">
                  {selectedLabels.selectedYearGroup}
                </p>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Class</SelectLabel>
              {optionsLoading ? (
                <SelectItem value="apple">Loading...</SelectItem>
              ) : (
                yearGroup.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            const label = subject.find((item) => item.value === value);
            if (!label) return;
            setSelectedFilters({
              ...selectedFilters,
              selectedSubject: label.label,
            });
            setSelectedLabels({
              ...selectedLabels,
              selectedSubject: label.label,
            });
            setSelectedFilters({ ...selectedFilters, selectedSubject: value });
          }}
        >
          <SelectTrigger className="w-full border-[#979797] border-[1px] bg-white p-4 py-7 shadow-sm">
            <div className="flex items-center gap-4">
              <User />
              <div>
                <Label className="font-bold text-sm">Choose the subject</Label>
                <p className="text-sm text-gray-200">
                  {selectedLabels.selectedSubject}
                </p>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subjects</SelectLabel>
              {optionsLoading ? (
                <SelectItem value="apple">Loading...</SelectItem>
              ) : (
                subject.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            const label = tutor.find((item) => item.value === value);
            if (!label) return;
            setSelectedFilters({
              ...selectedFilters,
              selectedTutor: label.label,
            });
            setSelectedLabels({
              ...selectedLabels,
              selectedTutor: label.label,
            });
          }}
        >
          <SelectTrigger className="w-full border-[#979797] border-[1px] focus:border-[#979797] focus:border-[1px] bg-white p-4 py-7 shadow-sm">
            <div className="flex items-center gap-4">
              <User />
              <div>
                <Label className="font-bold text-sm">Choose your tutor</Label>
                <p className="text-sm text-gray-200">
                  {selectedLabels.selectedTutor}
                </p>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tutors</SelectLabel>
              {optionsLoading ? (
                <SelectItem value="loading">Loading...</SelectItem>
              ) : (
                tutor.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {user?.role === roles.PARENT && (
        <div className="mt-4">
          <DropDown />
        </div>
      )}
      {sessionsTableLoading ? (
        <TableSkeleton />
      ) : (
        <SessionTable sessions={sessions} />
      )}
    </div>
  );
}
