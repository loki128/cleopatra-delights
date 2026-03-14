"use client";

import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Order } from "@prisma/client";
import StatusBadge from "./StatusBadge";

type OrderWithCustomer = Order & {
  customer?: { name: string; email: string } | null;
};

const PAGE_SIZE = 20;

export default function OrdersTable({
  orders,
  total,
  page,
  queryParams,
}: {
  orders: OrderWithCustomer[];
  total: number;
  page: number;
  queryParams: Record<string, string>;
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);

  const columns: ColumnDef<OrderWithCustomer>[] = [
    {
      id: "shortId",
      header: "Order",
      accessorFn: (row) => row.id.slice(-8),
      cell: ({ row }) => (
        <Link
          href={`/dashboard/orders/${row.original.id}`}
          className="font-semibold text-[var(--dash-text-primary)] hover:text-[var(--dash-gold)] transition-colors"
        >
          #{row.original.id.slice(-8)}
        </Link>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      accessorFn: (row) => row.customerName,
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-[var(--dash-text-primary)]">
            {row.original.customerName}
          </div>
          <div className="text-[var(--dash-text-xs)] text-[var(--dash-text-tertiary)] mt-0.5">
            {row.original.customerEmail}
          </div>
        </div>
      ),
    },
    {
      id: "orderType",
      header: "Type",
      accessorKey: "orderType",
      cell: ({ getValue }) => (
        <span className="text-[var(--dash-text-secondary)]">
          {(getValue() as string) ?? "---"}
        </span>
      ),
    },
    {
      id: "eventDate",
      header: "Event Date",
      accessorKey: "eventDate",
      cell: ({ getValue }) => {
        const d = getValue() as Date | null;
        if (!d || isNaN(new Date(d).getTime())) return <span className="text-[var(--dash-text-quaternary)]">---</span>;
        return (
          <span className="text-[var(--dash-text-secondary)]">
            {new Date(d).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <StatusBadge status={getValue() as Order["status"]} />
      ),
    },
    {
      id: "total",
      header: "Total",
      accessorKey: "total",
      cell: ({ getValue }) => {
        const v = getValue() as number | null;
        if (v == null)
          return <span className="text-[var(--dash-text-quaternary)]">---</span>;
        return (
          <span
            className="font-semibold text-[var(--dash-text-primary)]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            ${Number(v).toFixed(2)}
          </span>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ getValue }) => {
        const d = getValue() as Date;
        return (
          <span className="text-[var(--dash-text-tertiary)]">
            {formatDistanceToNow(new Date(d), { addSuffix: true })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Link
          href={`/dashboard/orders/${row.original.id}`}
          className="text-[var(--dash-text-sm)] font-medium text-[var(--dash-gold)] hover:text-[var(--dash-gold-hover)] transition-colors"
        >
          View
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--dash-border)]">
          <span className="text-[var(--dash-text-sm)] text-[var(--dash-text-tertiary)]">
            Page {page} of {totalPages}
            <span className="hidden sm:inline"> ({total} orders)</span>
          </span>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={`/dashboard/orders?${new URLSearchParams({ ...queryParams, page: String(page - 1) })}`}
                className="dash-btn-ghost !py-2 !px-3 !text-[13px]"
              >
                <ChevronLeft size={14} />
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/dashboard/orders?${new URLSearchParams({ ...queryParams, page: String(page + 1) })}`}
                className="dash-btn-ghost !py-2 !px-3 !text-[13px]"
              >
                Next
                <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
