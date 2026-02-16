'use client';

import { cn } from '@/app/lib/utils';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <svg
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      className={cn('animate-spin', sizeMap[size], className)}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="60"
        strokeDashoffset="20"
        fill="none"
        className="text-muted-foreground"
      />
    </svg>
  );
}
