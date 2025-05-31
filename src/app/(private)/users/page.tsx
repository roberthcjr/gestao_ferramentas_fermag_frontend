"use client";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as crypto from "node:crypto";
import { useMemo, useState } from "react";
import UsersService from "./service";
import { UsersTable } from "./components/users-table";
import { InsertUserDialog } from "./components/insert-user-dialog/insert-user-dialog";
import { useForm } from "react-hook-form";
import { UserType } from "./types/user-type";
import { UserSchema } from "./schemas/user-input-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { showErrorToast, showSuccessToast } from "./components/toaster";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const userService = useMemo(() => new UsersService(), []);

  const query = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });

  const mutation = useMutation({
    mutationFn: (data: UserType) => userService.insertUser(data),
    onError: () => {
      showErrorToast();
    },
    onSuccess: () => {
      showSuccessToast();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      if (setOpen) setOpen(false);
    },
  });

  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      password: crypto.randomBytes(10).toString("hex"),
      job: "",
      section: "",
    },
  });

  const onSubmit = (values: UserType) => {
      mutation.mutate(values);
    };
  return (
    <>
      <div className="container">
        <UsersTable data={query.data ?? []} />
        <div className="flex items-end">
          <InsertUserDialog form={form} open={open} setOpen={setOpen} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
}
