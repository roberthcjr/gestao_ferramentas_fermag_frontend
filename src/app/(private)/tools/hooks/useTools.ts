import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo } from "react";
import ToolsService from "../service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { csvSchema } from "../validators/csvInputValidator";
import { z } from "zod";
import { showErrorToast, showSuccessToast } from "../components/toaster";

type UseTools = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function useTools({ setOpen }: UseTools) {
  const queryClient = useQueryClient();
  const toolsService = useMemo(() => new ToolsService(), []);

  const query = useQuery({
    queryKey: ["tools"],
    queryFn: () => toolsService.getAll(),
  });

  const mutation = useMutation({
    mutationFn: (data: File) => toolsService.postCSV(data),
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      if (setOpen) setOpen(false);
    },
  });

  const form = useForm<z.infer<typeof csvSchema>>({
    resolver: zodResolver(csvSchema),
    defaultValues: { csv: "" },
  });

  const onSubmit = (values: z.infer<typeof csvSchema>) => {
    mutation.mutate(values.csv);
  };

  return { query, form, onSubmit };
}
