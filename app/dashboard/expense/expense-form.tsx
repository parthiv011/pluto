'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import React, { useEffect, useState } from 'react';

type ExpenseFormProps = {
  onSuccess: () => void;
};

export default function ExpenseForm({ onSuccess }: ExpenseFormProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'user-id': userId },
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          category: category.trim(),
          date: new Date(date).toISOString(),
        }),
      });

      if (!res.ok) {
        setError('Failed to add expense');
        return;
      }

      setAmount('');
      setCategory('');
      setDate('');
      setError('');
      onSuccess();
    } catch {
      setError('Network error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <FormInput
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button type="submit">Add Expense</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
