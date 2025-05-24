import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { statusSelectOptions } from "../model";

interface ImportToolProps {
  form: any;
  onSubmit: (values: any) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function InsertToolDialog({
  form,
  onSubmit,
  open,
  setOpen,
}: ImportToolProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className="cursor-pointer m-2" variant="default">
          <CirclePlus />
          Inserir
        </Button>
      }
      title="Inserir nova ferramenta"
    >
      <Form {...form} className="w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4 w-96"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Nome da ferramenta</FormDescription>
                <FormControl>
                  <Input className="p-2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Status da ferramenta</FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusSelectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand.name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Marca</FormDescription>
                <FormControl>
                  <Input className="p-2" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category.name"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Categoria da ferramenta</FormDescription>
                <FormControl>
                  <Input {...field} className="p-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Inserir</Button>
        </form>
      </Form>
    </CustomDialog>
  );
}
