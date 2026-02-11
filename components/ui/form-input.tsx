import { cn } from '@/app/lib/utils';
import React from 'react';

interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  classname?: string;
}

export function FormInput({
  value,
  placeholder,
  onChange,
  type,
  classname,
}: FormInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn('border-border rounded-xl border p-2', classname)}
    />
  );
}
