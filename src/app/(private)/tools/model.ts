export enum Status {
  AVAILABLE = "Disponível",
  UNAVAILABLE = "Indisponível",
  LENDED = "Emprestada",
}

//TODO: averiguar mudança de id de string para number
export type Tool = {
  id: number;
  name: string;
  status: Status;
  brand: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  insertedAt?: string;
};

export const statusMap: Record<string, Status> = {
  AVAILABLE: Status.AVAILABLE,
  UNAVAILABLE: Status.UNAVAILABLE,
  LENDED: Status.LENDED,
};

export const statusSelectOptions: { label: string; value: string }[] =
  Object.entries(statusMap).map(([key, value]) => ({
    label: value,
    value: key,
  }));
