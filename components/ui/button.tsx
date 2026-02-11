import React from 'react';
import { cn } from '@/app/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outlined';

interface ButtonProps {
  /** Button contents */
  children: React.ReactNode;

  /** Visual style of the button */
  variant?: ButtonVariant;

  /** Additional Tailwind classes */
  className?: string;

  /** Native button type */
  type?: 'submit' | 'reset' | 'button';

  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /** Disabled state */
  disabled?: boolean;
}

/**
 * Standardized Button component.
 * Designed for consistency, accessibility, and reuse.
 */
export const Button = ({
  children,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

/* -----------------------------
 * Styles
 * ----------------------------- */

const baseStyles =
  'inline-flex items-center justify-center rounded-xl px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer duration-300' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-foreground) focus-visible:ring-offset-2';

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-(--color-foreground) text-(--color-background) hover:opacity-90',

  secondary:
    'border border-(--color-border) bg-(--color-surface) text-(--color-foreground) hover:bg-(--color-border)',

  ghost: 'bg-transparent text-(--color-foreground) hover:bg-(--color-border)',

  outlined:
    'border border-(--color-foreground) bg-transparent text-(--color-foreground) hover:bg-(--color-foreground) hover:text-(--color-background)',
};
