import { cn } from '@/app/lib/utils';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: string;
  classname?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  role?: string;
}

export const Button = ({
  classname,
  children,
  onClick,
  variant,
  role,
  type = 'submit',
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-xl bg-neutral-600 px-4 py-2',
        classname
      )}
      onClick={onClick}
      type={type}
      role={role}
    >
      {children}
    </button>
  );
};
