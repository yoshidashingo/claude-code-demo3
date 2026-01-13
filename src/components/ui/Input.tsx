'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { classNames } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1 text-[var(--foreground)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={classNames(
            'w-full px-4 py-2 rounded-lg border bg-[var(--background)] text-[var(--foreground)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent',
            'placeholder:text-[var(--muted)]',
            error && 'border-[var(--error)]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--error)]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
