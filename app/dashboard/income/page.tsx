'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { IncomeFormValues } from '@/app/lib/types/income.types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Modal from '@/components/ui/modal';
import { IncomeForm } from './income-form';

export default function IncomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const addIncomeMutation = useMutation({
    mutationFn: async (newIncome: IncomeFormValues) => {
      const userId = localStorage.getItem('userId');
      console.log(newIncome);

      if (!userId) throw new Error('No User');

      const res = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': userId,
        },
        body: JSON.stringify(newIncome),
      });

      if (!res.ok) throw new Error('Failed to add Income');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      setIsOpen(false);
    },
  });

  return (
    <Container>
      <div className="mt-2 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">All Income</h1>

        <Button onClick={() => setIsOpen(true)}>Add Income</Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Income"
      >
        <IncomeForm
          onSubmit={(data: IncomeFormValues) => addIncomeMutation.mutate(data)}
          isSubmitting={addIncomeMutation.isPending}
        />
      </Modal>
    </Container>
  );
}
