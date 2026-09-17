import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  trailingIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  trailingIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2.5",
    lg: "px-7 py-3.5 text-base gap-3",
  }[size];

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/20",
    glow:
      "bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/30 border border-cyan-300/40 font-bold",
    secondary:
      "bg-[#141A28] text-slate-200 border border-white/10 hover:bg-[#1A2234] hover:border-cyan-500/40 hover:text-white shadow-md shadow-black/30",
    danger:
      "bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white shadow-md shadow-red-500/20",
    ghost:
      "bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white",
    outline:
      "bg-transparent border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </span>
      ) : (
        <>
          <span>{children}</span>
          {trailingIcon && (
            <span className="w-6 h-6 rounded-full bg-white/15 dark:bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
