import { DataTable } from "@/components/data-table/data-table";
import { columns } from "../columns";
import { UserType } from "../types/user-type";

export function UsersTable({ data }: { data: UserType[] }) {
  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
