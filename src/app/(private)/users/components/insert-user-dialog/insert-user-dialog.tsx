import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dispatch,
  SetStateAction,
} from "react";
import { UseFormReturn } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import InsertUserFormField from "./form-field-user";
import { UserType } from "../../types/user-type";

interface InsertUserProps {
  form: UseFormReturn<UserType>;
  onSubmit: (values: UserType) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function InsertUserDialog({ form, open, setOpen, onSubmit }: InsertUserProps) {
  const insertFormFields = {
    name: "Nome",
    surname: "Sobrenome",
    job: "Ofício",
    section: "Seção",
    username: "Nome de usuário",
    password: "Senha",
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2">
          Inserir <PlusCircle />
        </Button>
      }
      title="Inserir Usuário"
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
            {(Object.keys(insertFormFields) as Array<keyof UserType>).map(
              (key) => {
                return (
                  <InsertUserFormField
                    formControl={form.control}
                    fieldName={key}
                    label={insertFormFields[key]}
                    // state={state}
                    key={key}
                  />
                );
              },
            )}
            <div className="flex justify-between">
              <Button
                type="submit"
                className="cursor-pointer"
                // disabled={isPending}
              >
                Inserir
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                // disabled={isPending}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>

    </CustomDialog>
  );
}
