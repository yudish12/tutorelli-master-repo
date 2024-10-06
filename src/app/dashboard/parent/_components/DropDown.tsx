"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useParentContext } from "@/context/ParentProvider";
import { Label } from "@/components/ui/label";
const DropDown = () => {
  const landingPage = window?.location.href.includes("/dashboard");
  const { selectedStudent, setSelectedStudent, loading, students } =
    useParentContext();
  if (loading) return <div>Loading Dropdown...</div>;

  if (!landingPage) return <></>;

  if (!students.length)
    return (
      <div> Please Register your student on TutorElli and send an invite</div>
    );

  return (
    <Select
      onValueChange={(value) => {
        const studentOption = students.find((item) => item.value === value);
        if (!studentOption) return;
        setSelectedStudent(studentOption);
      }}
    >
      <Label htmlFor="child" className="text-sm text-center">
        Choose your student
      </Label>
      <SelectTrigger id="child" className="w-[180px] bg-white mt-2">
        <SelectValue placeholder={`${selectedStudent.label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {students.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropDown;
