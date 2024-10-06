import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle as DialogTitleComponent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const AddButton = ({
  FormComp,
  DialogTitle,
}: {
  FormComp: React.ComponentType;
  DialogTitle: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer gap-4">
          Create
          <PlusCircledIcon color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitleComponent>{DialogTitle}</DialogTitleComponent>
        </DialogHeader>
        <DialogDescription>
          <FormComp />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddButton;
