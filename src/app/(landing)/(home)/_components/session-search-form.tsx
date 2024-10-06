"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { searchSessionFormStrings } from "@/lib/strings/landing";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Form, useForm } from "react-hook-form";

const SessionSearchForm = () => {
  const form = useForm();
  const [selected, setSelected] = React.useState("");

  const handleRadioClick = (value: string) => {
    if (selected === value) setSelected("");
    else setSelected(value);
  };

  return (
    <Form style={{ minWidth: "300px" }} {...form}>
      <form className="bg-blue mt-6 text-white w-full rounded-2xl p-6 justify-center gap-6">
        <h3 className="font-semibold text-2xl text-center mb-8 mt-2">
          {searchSessionFormStrings.header}
        </h3>
        <Select>
          <SelectTrigger className="w-full text-blue bg-white border-[#979797] border-[1px] p-4 py-6 shadow-sm">
            <div className="flex items-center gap-4">
              <User />
              <div>
                <Label className="text-sm">
                  {searchSessionFormStrings.yearGroupSelectPlaceHolder}
                </Label>
                <p className="text-sm text-gray-200"></p>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Class</SelectLabel>
              <SelectItem value="apple">7th Grade</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full mt-4 text-blue bg-white border-[#979797] border-[1px] p-4 py-6 shadow-sm">
            <div className="flex items-center gap-4">
              <User />
              <div>
                <Label className="text-sm">
                  {searchSessionFormStrings.yearGroupSelectPlaceHolder}
                </Label>
                <p className="text-sm text-gray-200"></p>
              </div>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Class</SelectLabel>
              <SelectItem value="apple">7th Grade</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <h3 className="font-semibold text-lg text-center mt-4">
          {searchSessionFormStrings.selectTutor}
        </h3>
        <div className="flex gap-4 w-full mt-4">
          <Button
            onClick={() => handleRadioClick("student")}
            variant={"outline"}
            type="button"
            className={cn(
              "w-1/2 py-6 text-blue flex gap-1",
              selected === "student" &&
                "bg-primary hover:bg-primary/90 hover:text-white border-primary text-white"
            )}
          >
            <Image
              src={"/ph_student-light.svg"}
              alt="student"
              width={20}
              height={20}
            />
            Student
          </Button>
          <Button
            onClick={() => handleRadioClick("tutor")}
            variant={"outline"}
            type="button"
            className={cn(
              "w-1/2 py-6 text-blue flex gap-1",
              selected === "tutor" &&
                "bg-primary border-primary hover:bg-primary/90 hover:text-white text-white"
            )}
          >
            <Image
              src={"/ph_chalkboard-teacher-dark.svg"}
              alt="student"
              width={20}
              height={20}
            />
            Student
          </Button>
        </div>
        <Button className="w-full mt-4 p-6 bg-peach hover:bg-peach/90 text-white">
          {searchSessionFormStrings.start}
        </Button>
      </form>
    </Form>
  );
};

export default SessionSearchForm;
