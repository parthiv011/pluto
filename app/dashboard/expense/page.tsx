'use client';

import { useEffect, useRef, useState } from 'react';
import ExpenseForm from './expense-form';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

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
        console.log(expense);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExpense();
  }, []);

  return (
    <section className="px-12 py-8">
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
      <div className="flex flex-col gap-6">
        {expense &&
          expense.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-xl border px-4 py-2"
            >
              <div className="flex gap-2">
                <span className="font-semibold">{index + 1}.</span>
                <h4 className="font-semibold capitalize">{item.category}</h4>
              </div>
              <div className="flex gap-4">
                <p className="text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">{item.amount}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
