import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
} from "./ui/dialog";
import { ReactNode } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface CustomDialogProps extends DialogProps {
  children: ReactNode;
  trigger?: ReactNode;
  title: string;
  hasFooter?: boolean;
  handleOnSubmit?: (data?: any) => void;
}

export function CustomDialog({
  children,
  trigger = null,
  title,
  open,
  onOpenChange,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!!trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col justify-center">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
