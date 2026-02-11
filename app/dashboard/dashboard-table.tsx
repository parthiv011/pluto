import { DashboardTableProps } from '@/app/lib/types/table.types';
import { useMemo, useState } from 'react';

export const DashboardTable = <T extends { id?: string | number }>({
  columns,
  data,
  pageSizeOptions = [5, 10, 25, 50],
  defaultPageSize = 10,
}: DashboardTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  return (
    <div className="border-border w-full border">
      {/* Desktop/Tab Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="h-full w-full">
          <thead className="text-muted bg-surface text-left">
            <tr className="">
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-2 capitalize">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={(row as any).id ?? index}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-1.5 capitalize">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card */}
      <div className="flex flex-col gap-4 md:hidden">
        {paginatedData.map((row, index) => (
          <div key={(row as any).id ?? index}>
            {columns.map((col) => (
              <div key={String(col.key)}>
                <span>{col.label}</span>
                <span>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="my-4 flex items-center justify-between px-4">
        {/* Entries selector */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-md border px-2 py-1 text-sm"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="text-sm">entries</span>
          </div>
        </div>
        {/* Pagination controls */}
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
