import { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 transition-colors ${className}`}
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--text-primary)',
          '--tw-ring-color': 'var(--accent-1)',
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

