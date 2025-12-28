import { HTMLAttributes, ReactNode } from 'react';
import { Button } from './Button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        {children}
      </div>
    </div>
  );
}

export const DialogHeader = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const DialogTitle = ({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={`text-xl font-semibold leading-none tracking-tight ${className}`} style={{ color: 'var(--text-primary)' }} {...props}>
    {children}
  </h2>
);

export const DialogContent = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const DialogFooter = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex justify-end gap-3 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

