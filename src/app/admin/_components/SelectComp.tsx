import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
} from "@/components/ui/select";
import { optionsType } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";
import React from "react";

const SelectComp = ({
  selectText,
  options,
  selectedOption,
  onValueChange,
  disabled,
  selectDataLoading,
}: {
  selectText: string;
  options: optionsType[];
  selectedOption: optionsType;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  selectDataLoading: boolean;
}) => {
  return (
    <Select disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "w-full bg-white border-[#979797] border-[1px] p-4 rounded-lg shadow-sm",
          disabled && "bg-[#dddddd] border-gray-400"
        )}
      >
        {!selectedOption.value ? selectText : selectedOption.label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectDataLoading ? (
            <SelectItem value="apple">Loading...</SelectItem>
          ) : (
            options?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComp;
