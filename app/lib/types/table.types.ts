export type DashboardTableProps<T> = {
  columns: Column<T>[];
  data: T[];

  // pagination
  pageSizeOptions?: number[];
  defaultPageSize?: number;
};

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};
