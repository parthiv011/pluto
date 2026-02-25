'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import Modal from '@/components/ui/modal';
import { IncomeForm } from './income-form';
import { useMutation } from '@tanstack/react-query';

export default function IncomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const addIncomeMutation = useMutation({});

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
        <IncomeForm />
      </Modal>
    </Container>
  );
}
