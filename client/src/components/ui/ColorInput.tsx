import { InputHTMLAttributes, forwardRef } from 'react';

export interface ColorInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="color"
      className={`h-10 w-12 rounded-md border cursor-pointer ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--color-border)',
      } as React.CSSProperties}
      {...props}
    />
  );
});

ColorInput.displayName = 'ColorInput';
