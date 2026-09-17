import React, { forwardRef } from "react";

// Tactical hardware-style input wrapper with label, error states, and glowing focus ring
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{label}</span>
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-500 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl bg-[#090D15] border text-sm text-slate-100 placeholder:text-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 ${
              icon ? "pl-11 pr-4" : "px-4"
            } py-3 ${
              error
                ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                : "border-white/[0.08] focus:border-cyan-500 focus:ring-cyan-500/25 focus:shadow-lg focus:shadow-cyan-500/10"
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-[11px] text-red-400 font-medium">{error}</span>}
        {helperText && !error && (
          <span className="text-[11px] text-slate-500">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
