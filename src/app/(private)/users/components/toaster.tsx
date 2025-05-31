import { toast } from "sonner";
import { UserCheck, UserX } from "lucide-react";

export const showSuccessToast = () =>
  toast("Inserção realizada com sucesso", { icon: <UserCheck /> });

export const showErrorToast = () =>
  toast("Algo deu errado na inserção", { icon: <UserX /> });
