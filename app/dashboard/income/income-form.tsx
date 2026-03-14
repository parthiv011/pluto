'use client';

import { IncomeFormValues } from '@/app/lib/types/income.types';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import React, { useState } from 'react';

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
  const [customSource, setCustomSource] = useState('');
  const [platform, setPlatform] = useState('');
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [recievedAt, setRecievedAt] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !source || !recievedAt) {
      setError('All fields marked * are required');
      return;
    }

    setError('');

    onSubmit({
      amount: Number(amount),
      source,
      customSource,
      recievedAt,
      platform,
      brandName,
      description,
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
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="bg-background border-border rounded-xl border p-2"
      >
        <option value="">Select Source</option>
        <option value="ADS">Ads</option>
        <option value="SPONSORSHIP">Sponsorship</option>
        <option value="AFFILIATE">Affiliate</option>
        <option value="SUBSCRIPTION">Subscription</option>
        <option value="DONATION">Donation</option>
        <option value="OTHER">Other</option>
      </select>
      {source === 'OTHER' && (
        <FormInput
          type="text"
          placeholder="Enter custom source"
          value={customSource}
          onChange={(e) => setCustomSource(e.target.value)}
        />
      )}
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Income'}
      </Button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
};
