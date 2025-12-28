import { HTMLAttributes, forwardRef } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const variantStyles = {
      default: {
        backgroundColor: 'var(--surface)',
        color: 'var(--text-primary)',
      },
      success: {
        backgroundColor: 'var(--color-success)',
        color: 'white',
      },
      warning: {
        backgroundColor: 'var(--color-warning)',
        color: 'white',
      },
      error: {
        backgroundColor: 'var(--color-error)',
        color: 'white',
      },
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${className}`}
        style={variantStyles[variant]}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

