import { toast } from "sonner";
import {
  CloudAlert,
  PackageCheck,
  PackageX,
  Shredder,
  Wrench,
} from "lucide-react";

//TODO: mover os toasters para uso global
export const showSuccessToast = () =>
  toast("Importação realizada com sucesso", { icon: <PackageCheck /> });

export const showErrorToast = () =>
  toast("Algo deu errado na importação", { icon: <PackageX /> });

export const showSuccesDelete = (name: string) =>
  toast(`Item de "${name}" foi deletado com sucesso`, { icon: <Shredder /> });

export const showSuccessInsert = () =>
  toast("Inserção de ferramenta realizada com sucesso", { icon: <Wrench /> });

export const showErrorGeneral = () =>
  toast("Operação não pode ser realizada", { icon: <CloudAlert /> });
