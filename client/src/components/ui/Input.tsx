import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors ${className}`}
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--text-primary)',
          '--tw-ring-color': 'var(--accent-1)',
        } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

