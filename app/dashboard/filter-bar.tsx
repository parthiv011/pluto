type FilterBarProps = {
  dateFilter: string;
  setDateFilter: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  order: 'asc' | 'desc';
  setOrder: (val: 'asc' | 'desc') => void;
  fromDate: string | null;
  setFromDate: (val: string) => void;
  toDate: string | null;
  setToDate: (val: string) => void;
  setPage: (val: number) => void;
};

export function FilterBar({
  dateFilter,
  setDateFilter,
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  setPage,
}: FilterBarProps) {
  return (
    <div className="m-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* Date Filter */}
      <select
        value={dateFilter}
        onChange={(e) => {
          setDateFilter(e.target.value);
          setPage(1);
        }}
        className="border-border bg-background rounded-md border px-3 py-2 text-sm focus:outline-none"
      >
        <option value="latest">Latest</option>
        <option value="currentMonth">Current Month</option>
        <option value="last90">Last 90 Days</option>
        <option value="custom">Custom</option>
      </select>

      {dateFilter === 'custom' && (
        <div className="flex gap-2">
          <input
            type="date"
            value={fromDate ?? ''}
            onChange={(e) => setFromDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-background border-border rounded-md border px-2 py-1 focus:outline-none"
          />
          <input
            type="date"
            value={toDate ?? ''}
            onChange={(e) => setToDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-background border-border rounded-md border px-2 py-1 focus:outline-none"
          />
        </div>
      )}

      {/* Sort */}
      <select
        value={`${sortBy}-${order}`}
        onChange={(e) => {
          const [field, ord] = e.target.value.split('-');
          setSortBy(field);
          setOrder(ord as 'asc' | 'desc');
          setPage(1);
        }}
        className="border-border bg-background rounded-md border px-3 py-2 text-sm focus:outline-none"
      >
        <option value="createdAt-desc">Newest</option>
        <option value="createdAt-asc">Oldest</option>
        <option value="amount-desc">Amount High → Low</option>
        <option value="amount-asc">Amount Low → High</option>
        <option value="category-asc">Category A → Z</option>
      </select>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border-border rounded-md border px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  );
}
