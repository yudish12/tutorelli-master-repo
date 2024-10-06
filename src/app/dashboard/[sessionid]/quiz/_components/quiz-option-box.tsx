"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const QuizOptionBox = ({
  options,
  correctOption,
  isEditing,
  setCorrectOption,
  setOptions,
}: {
  options: string[];
  correctOption: string;
  isEditing: boolean;
  setCorrectOption: React.Dispatch<React.SetStateAction<string>>;
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [optionSelected, setOptionSelected] = React.useState<string>("");

  return (
    <>
      {isEditing ? (
        <div className="flex gap-1 w-[350px] flex-col rounded-md">
          {options.map((item, index) => (
            <Input
              key={index}
              type="text"
              placeholder="Enter option"
              className={cn(
                "flex items-center gap-4 p-4 border-b-[1.5px] border-gray-300",
                correctOption === item && "bg-green-500"
              )}
              value={item}
              onChange={(e) =>
                setOptions(
                  options.map((item, ind) => {
                    if (ind === index) return e.target.value;
                    return item;
                  })
                )
              }
            />
          ))}
          <Label className="font-bold text-sm mt-4">Enter Correct Option</Label>
          <Input
            type="text"
            placeholder="Enter option"
            className="flex items-center gap-4 p-4 border-b-[1.5px] border-gray-300"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          />
        </div>
      ) : (
        <RadioGroup
          onValueChange={(value) => {
            setOptionSelected(value);
          }}
          className="flex gap-0 w-[350px] flex-col border-[1.5px] border-gray-300 rounded-md"
        >
          {options.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-4 p-4 border-b-[1.5px] border-gray-300",
                optionSelected === item &&
                  (optionSelected === correctOption || isEditing
                    ? "bg-green-500"
                    : "bg-red-500"),
                optionSelected !== "" &&
                  item === correctOption &&
                  "bg-green-500"
              )}
            >
              <RadioGroupItem
                disabled={optionSelected !== ""}
                value={item}
                id={item}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </>
  );
};

export default QuizOptionBox;
