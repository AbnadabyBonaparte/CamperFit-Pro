import { HTMLAttributes, forwardRef } from 'react';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-[var(--surface)] border-[var(--color-border)] text-[var(--text-primary)]',
      success: 'bg-[var(--surface)] border-[var(--color-success)] text-[var(--color-success)]',
      warning: 'bg-[var(--surface)] border-[var(--color-warning)] text-[var(--color-warning)]',
      error: 'bg-[var(--surface)] border-[var(--color-error)] text-[var(--color-error)]',
    };
    
    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

