import React, { forwardRef } from "react";

// ponytail: Native input wrapper with label, error text, and sleek dark styling
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg bg-[#0B0E14] border px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-[#232D42] focus:border-cyan-500"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-xs text-slate-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
