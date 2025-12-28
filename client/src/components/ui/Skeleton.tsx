import { HTMLAttributes, forwardRef } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse rounded-md bg-[var(--color-border)] ${className}`}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

