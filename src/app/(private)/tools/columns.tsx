"use client";

import { ActionsRow } from "@/components/data-table/actions-row";
import { DataTableColumnHeader } from "@/components/data-table/header-table";
import { SimpleTooltip } from "@/components/simple-tooltip";
import { ColumnDef, RowExpanding } from "@tanstack/react-table";
import { CircleCheckBig, CircleFadingArrowUp, CircleMinus } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { statusMap, Tool } from "./model";
import { getDeleteSubmit, getEditForm, getEditSubmit } from "./hooks/useTools";
import { set } from "zod";

const statusIconMap: Record<string, ReactNode> = {
  AVAILABLE: (
    <SimpleTooltip message={statusMap["AVAILABLE"]}>
      <CircleCheckBig />
    </SimpleTooltip>
  ),
  UNAVAILABLE: (
    <SimpleTooltip message={statusMap["UNAVAILABLE"]}>
      <CircleMinus />
    </SimpleTooltip>
  ),
  LENDED: (
    <SimpleTooltip message={statusMap["LENDED"]}>
      <CircleFadingArrowUp />
    </SimpleTooltip>
  ),
};

// Quando definir um columns e desejar ter ações,
// escrever o métodos onEdit e onDelete

const makeDeleteProps = ([toDelete, setToDelete]: [
  boolean,
  Dispatch<SetStateAction<boolean>>
]) => {
  return {
    onSubmit: getDeleteSubmit({ setOpen: setToDelete }),
    openDelete: toDelete,
    setDelete: setToDelete,
  };
};

const makeEditProps = ([toEdit, setToEdit]: [
  boolean,
  Dispatch<SetStateAction<boolean>>
]) => {
  return {
    ...getEditSubmit({ setOpen: setToEdit }),
    form:{},
    openEdit: toEdit,
    setEdit: setToEdit,
  };
}

export function useToolColumns(): ColumnDef<Tool>[] {
  const deleteProps = makeDeleteProps(useState<boolean>(false));
  const editProps = makeEditProps(useState<boolean>(false));
  console.log(editProps)

  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nome" />
      ),
    },
    {
      accessorKey: "category.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoria" />
      ),
    },
    {
      accessorKey: "brand.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Marca" />
      ),
    },
    {
      accessorKey: "inserted_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data de Compra" />
      ),
      cell: ({ row }) => {
        const dateFormatted = new Date(row.getValue("inserted_at"));
        return dateFormatted.toLocaleDateString("pt-BR");
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const statusRaw: string = row.getValue("status");
        return statusIconMap[statusRaw];
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const editForm = getEditForm(row.original);
        editProps.form = editForm
        return (
          <ActionsRow
            rowData={row.original}
            editProps={editProps}
            deleteProps={deleteProps}
            title="Ferramentas"
          />
        );
      },
    },
  ];
}
