"use client";

import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { format } from "date-fns";
import type { Customer } from "@prisma/client";

type CustomerRow = Customer & { lastOrderAt?: Date | null };

export default function CustomersTable({
  customers,
}: { customers: CustomerRow[] }) {
  const columns: ColumnDef<CustomerRow>[] = [
    {
      id: "customer",
      header: "Customer",
      accessorFn: (row) => row.name,
      cell: ({ row }) => (
        <div>
          <Link
            href={`/dashboard/customers/${row.original.id}`}
            className="font-semibold text-[var(--dash-text-primary)] hover:text-[var(--dash-gold)] transition-colors"
          >
            {row.original.name}
          </Link>
          <div className="text-[var(--dash-text-xs)] text-[var(--dash-text-tertiary)] mt-0.5">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      id: "orderCount",
      header: "Orders",
      accessorKey: "orderCount",
      cell: ({ getValue }) => (
        <span
          className="font-semibold text-[var(--dash-text-primary)]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {getValue() as number}
        </span>
      ),
    },
    {
      id: "totalSpent",
      header: "Total Spent",
      accessorKey: "totalSpent",
      cell: ({ getValue }) => (
        <span
          className="font-semibold text-[var(--dash-text-primary)]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          ${Number(getValue() ?? 0).toFixed(2)}
        </span>
      ),
    },
    {
      id: "firstOrderAt",
      header: "First Order",
      accessorKey: "firstOrderAt",
      cell: ({ getValue }) => (
        <span className="text-[var(--dash-text-secondary)]">
          {format(new Date(getValue() as Date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      id: "lastOrderAt",
      header: "Last Order",
      accessorKey: "lastOrderAt",
      cell: ({ getValue }) => {
        const d = getValue() as Date | null | undefined;
        if (!d)
          return (
            <span className="text-[var(--dash-text-quaternary)]">---</span>
          );
        return (
          <span className="text-[var(--dash-text-secondary)]">
            {format(new Date(d), "MMM d, yyyy")}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="dash-card !p-0 overflow-hidden">
      <div className="overflow-x-auto dash-scroll">
        <table className="dash-table">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
