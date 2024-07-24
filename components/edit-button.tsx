import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiEditAlt } from "react-icons/bi";
import { cn } from "@/lib/utils";

type FlashFormProps = {
  children?: React.ReactNode;
  headerText?: string;
  descriptionText?: string;
  className?: string;
};
const EditButton: React.FC<FlashFormProps> = ({
  children,
  headerText,
  descriptionText,
  className
}) => {
  return (
    <Dialog>
      <DialogTrigger  className="px-3 rounded-md py-2  text-sm hover:bg-green-100 text-white">
        <BiEditAlt className="text-slate-900" />
      </DialogTrigger>
      <DialogContent className={cn([className])}>
        {headerText && <DialogHeader>{headerText}</DialogHeader>}
        {descriptionText && (
          <DialogDescription>{descriptionText}</DialogDescription>
        )}
        <div className="space-y-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
