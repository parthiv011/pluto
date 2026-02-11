'use client';

import { useEffect, useRef, useState } from 'react';
import ExpenseForm from './expense-form';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Column } from '@/app/lib/types/table.types';
import { Expense } from '@/app/lib/types/expense.types';
import { DashboardTable } from '@/app/dashboard/dashboard-table';

interface ExpenseProps {
  id: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}
export default function ExpensePage() {
  const ref = useRef(null);

  const [expense, setExpense] = useState<ExpenseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const response = await fetch('/api/expense', {
          headers: {
            'user-id': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setExpense(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
  }, []);

  console.log(expense);
  return (
    <section className="px-12 py-4">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-sans text-2xl font-bold">Expense Dashboard</h1>

        <Button onClick={() => setIsOpen(true)}>Add Expense</Button>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add Expense"
          >
            <ExpenseForm onSuccess={() => setIsOpen(false)} />
          </Modal>
        )}
      </div>
      <DashboardTable data={expense} columns={expenseColumns} />
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
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => `₹ ${value}`,
  },
];
