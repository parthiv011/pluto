'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import React, { useState } from 'react';

type ExpenseFormValues = {
  amount: number;
  category: string;
  date: string;
};

type ExpenseFormProps = {
  onSubmit: (data: ExpenseFormValues) => void;
  isSubmitting?: boolean;
};

export default function ExpenseForm({
  onSubmit,
  isSubmitting = false,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      setError('All fields are required');
      return;
    }

    setError('');

    onSubmit({
      amount: Number(amount),
      category,
      date,
    });
  };

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
        max={new Date().toISOString().split('T')[0]}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Expense'}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
