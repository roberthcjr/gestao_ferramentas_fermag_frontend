import { DataTable } from "@/components/data-table/data-table";
import { columns } from "../columns";
import { Tool } from "../model";

export function ToolsTable({ data }: { data: Tool[] }) {
  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
