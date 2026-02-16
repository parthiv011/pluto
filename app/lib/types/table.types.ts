export type DashboardTableProps<T> = {
  columns: Column<T>[];
  data: T[];

  // pagination
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};
