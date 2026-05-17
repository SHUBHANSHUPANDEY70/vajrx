import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface SubmissionsTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function SubmissionsTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No submissions yet.",
}: SubmissionsTableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted text-sm border border-border rounded-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy border-b border-border">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left px-4 py-3 text-slate-300 font-semibold tracking-wide text-xs uppercase"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-slate-300 max-w-xs">
                  <div className="truncate">
                    {col.render ? col.render(row[col.key]) : String(row[col.key] ?? "")}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
