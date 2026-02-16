type PaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function PaginationControls({
  page,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  if (totalPages === 0) return null;

  return (
    <div className="border-border flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">Show</span>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-background rounded-md border px-2 py-1 text-sm"
          aria-label="Select page size"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <span className="text-sm">entries</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Previous page"
          aria-disabled={page === 1}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          aria-label="Next page"
          aria-disabled={page === totalPages}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
