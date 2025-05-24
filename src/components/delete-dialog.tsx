import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "./ui/button";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { DialogFooter } from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";

interface DeleteProps {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: (data?: any) => void;
}

export function DeleteDialog({ open, setOpen, title, onDelete }: DeleteProps) {
  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    onDelete();
  };
  return (
    <CustomDialog open={open} onOpenChange={setOpen} title={`Deletar ${title}`}>
      <form className="flex flex-col items-center" onSubmit={handleDelete}>
        <p className="text-base text-center">
          Tem certeza que deseja fazer essa ação? Uma vez feito não poderá ser
          desfeito.
        </p>

        <Button className="mt-6 w-full max-w-xs " type="submit">
          <Trash2 />
          Confirmar
        </Button>
      </form>
    </CustomDialog>
  );
}
