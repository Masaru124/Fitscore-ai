import React from "react";

// Micro-pill status badge with luminous indicators & glass finish
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "cyan";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-mono",
    md: "px-2.5 py-1 text-xs font-semibold",
  }[size];

  const variantStyles = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950/40",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-950/40",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30 shadow-sm shadow-red-950/40",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-950/40",
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/40",
    neutral: "bg-white/[0.04] text-slate-300 border border-white/[0.08]",
  }[variant];

  const dotColors = {
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    danger: "bg-red-400",
    info: "bg-blue-400",
    cyan: "bg-cyan-400",
    neutral: "bg-slate-400",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-md ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors} animate-pulse`} />}
      {children}
    </span>
  );
};
