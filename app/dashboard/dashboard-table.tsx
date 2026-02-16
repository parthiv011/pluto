import { DashboardTableProps } from '@/app/lib/types/table.types';
import { PaginationControls } from '@/components/pagination-controls';

export const DashboardTable = <T extends { id: string | number }>({
  columns,
  data,
  page,
  pageSize,
  pageSizeOptions,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: DashboardTableProps<T>) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="h-full w-full">
          <thead className="text-muted bg-surface text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className="px-4 py-2 capitalize"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-4 text-center">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-4 py-1.5 capitalize"
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col gap-4 p-4 md:hidden">
        {data.length === 0 ? (
          <div className="text-muted rounded-lg border p-6 text-center">
            No data available
          </div>
        ) : (
          data.map((row) => (
            <div
              key={row.id}
              className="bg-surface border-border rounded-lg border p-4 shadow-sm"
            >
              {columns.map((col) => (
                <div
                  key={String(col.key)}
                  className="flex justify-between gap-4"
                >
                  <span className="text-muted font-medium">{col.label}</span>
                  <span className="capitalize">
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};
