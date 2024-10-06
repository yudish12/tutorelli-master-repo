import { Edit } from "lucide-react";
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

interface EditButtonProps {
  FormComp: React.ComponentType;
  DialogTitle: string;
}

const EditButton: React.FC<EditButtonProps> = ({ FormComp, DialogTitle }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Edit color="green" />
        </div>
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

export default EditButton;
