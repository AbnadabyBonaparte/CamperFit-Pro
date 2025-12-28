import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
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

Textarea.displayName = 'Textarea';

