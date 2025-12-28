import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variantClasses = {
      primary: 'bg-[var(--accent-1)] hover:opacity-90 focus:ring-[var(--accent-1)]',
      secondary: 'bg-[var(--accent-2)] hover:opacity-90 focus:ring-[var(--accent-2)]',
      ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface)] focus:ring-[var(--accent-1)]',
      danger: 'bg-[var(--color-error)] hover:opacity-90 focus:ring-[var(--color-error)]',
    };
    
    // Text color based on variant (using CSS variables)
    // Ghost variant uses text-primary, others use text-on-accent (defined in theme)
    const textColorClass = variant === 'ghost' 
      ? 'text-[var(--text-primary)]' 
      : 'text-[var(--text-on-accent)]';
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${textColorClass} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

