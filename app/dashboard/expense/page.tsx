'use client';

import { useEffect, useState } from 'react';
import ExpenseForm from './expense-form';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Column } from '@/app/lib/types/table.types';
import { Expense } from '@/app/lib/types/expense.types';
import { DashboardTable } from '@/app/dashboard/dashboard-table';
import { FilterBar } from '../filter-bar';
import { formatDate } from '@/app/lib/constants';
import { Loader } from '@/components/ui/loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ExpenseProps {
  id: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

interface FetchExpenseProps {
  page: number;
  pageSize: number;
  sortBy: string;
  order: 'asc' | 'desc';
  search: string;
  from: string | null;
  to: string | null;
}

export default function ExpensePage() {
  const [isOpen, setIsOpen] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filtering states
  const [dateFilter, setDateFilter] = useState('latest');
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  // sorting states
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // debounce search
  const [debounceSearch, setDebounceSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Date computation logic
  const computeDateRange = () => {
    const now = new Date();

    if (dateFilter === 'currentMonth') {
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: first.toISOString(), to: now.toISOString() };
    }

    if (dateFilter === 'last90') {
      const past = new Date();
      past.setDate(now.getDate() - 90);
      return { from: past.toISOString(), to: now.toISOString() };
    }

    if (dateFilter === 'custom' && fromDate && toDate) {
      return { from: fromDate, to: toDate };
    }

    return { from: null, to: null };
  };

  const fetchExpense = async ({
    page,
    pageSize,
    sortBy,
    order,
    search,
    from,
    to,
  }: FetchExpenseProps) => {
    const userId = localStorage.getItem('userId');

    if (!userId) throw new Error('No user');

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      order,
      search,
    });

    if (from && to) {
      params.append('from', from);
      params.append('to', to);
    }

    const res = await fetch(`/api/expense?${params.toString()}`, {
      headers: {
        'user-id': userId,
      },
    });

    if (!res.ok) {
      throw new Error('failed to fetch');
    }

    return res.json();
  };

  const { from, to } = computeDateRange();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'expenses',
      page,
      pageSize,
      dateFilter,
      fromDate,
      toDate,
      debounceSearch,
      sortBy,
      order,
    ],
    queryFn: () =>
      fetchExpense({
        page,
        pageSize,
        sortBy,
        order,
        search: debounceSearch,
        from,
        to,
      }),
    placeholderData: (previousData) => previousData,
  });

  const queryClient = useQueryClient();

  const addExpenseMutation = useMutation({
    mutationFn: async (newExpense: {
      amount: number;
      category: string;
      date: string;
    }) => {
      const userId = localStorage.getItem('userId');

      if (!userId) throw new Error('No user');

      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify(newExpense),
      });

      if (!res.ok) throw new Error('Failed to add expense');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setIsOpen(false);
    },
  });
  return (
    <section className="px-4 py-4 md:px-8">
      <div className="mt-2 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">All Expenses</h1>

        <Button onClick={() => setIsOpen(true)}>Add Expense</Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Expense"
      >
        <ExpenseForm
          onSubmit={(data: any) => addExpenseMutation.mutate(data)}
          isSubmitting={addExpenseMutation.isPending}
        />
      </Modal>

      {isLoading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <div className="border-border relative w-full border">
          <FilterBar
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            setPage={setPage}
          />

          {isFetching && (
            <div className="absolute top-4 right-4 text-xs">Updating...</div>
          )}

          <DashboardTable
            data={data?.data ?? []}
            columns={expenseColumns}
            page={page}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 25, 50]}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      )}
    </section>
  );
}

export const expenseColumns: Column<Expense>[] = [
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'date',
    label: 'Expense Date',
    render: (value) => formatDate(value as string),
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: (value) => formatDate(value as string),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => `₹ ${value}`,
  },
];
