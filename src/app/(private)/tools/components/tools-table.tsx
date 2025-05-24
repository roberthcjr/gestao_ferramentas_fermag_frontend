import { DataTable } from "@/components/data-table/data-table";
import { useToolColumns } from "../columns";
import { Tool } from "../model";

export function ToolsTable({ data }: { data: Tool[] }) {
  return (
    <div className="container mx-auto pr-5">
      <DataTable columns={useToolColumns()} data={data} />
    </div>
  );
}
