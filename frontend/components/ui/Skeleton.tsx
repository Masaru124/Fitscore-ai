import React from "react";

// ponytail: Simple shimmer skeleton loader for zero-layout-shift Suspense fallbacks
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-[#1F2739]/60 ${className}`}
      {...props}
    />
  );
};
