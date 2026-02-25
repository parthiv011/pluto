'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { useState } from 'react';

type IncomeFormValues = {
  amount: number;
  source: string;
  platform?: string;
  brandName?: string;
  description?: string;
  recievedAt: string;
};

type IncomeFormTypes = {
  onSubmit: (data: IncomeFormValues) => void;
  isSubmitting?: boolean;
};

export const IncomeForm = ({
  onSubmit,
  isSubmitting = false,
}: IncomeFormTypes) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [platform, setPlatform] = useState('');
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [recievedAt, setRecievedAt] = useState('');

  return (
    <form className="flex flex-col gap-4">
      <FormInput
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <FormInput
        type="text"
        placeholder="Description  "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormInput
        type="text  "
        placeholder="Brand Name "
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <FormInput
        type="date"
        placeholder="Recieved Date"
        value={recievedAt}
        onChange={(e) => setRecievedAt(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
