import React from "react";

// Double-Bezel (Doppelrand) Architecture: Machine-level hardware finish
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverEffect?: boolean;
  doubleBezel?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = false,
  hoverEffect = true,
  doubleBezel = true,
  className = "",
  ...props
}) => {
  if (doubleBezel) {
    return (
      <div
        className={`p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-xl shadow-black/40 transition-all duration-300 ${
          hoverEffect
            ? "hover:from-cyan-500/40 hover:to-blue-600/20 hover:shadow-cyan-950/20 hover:-translate-y-0.5"
            : ""
        } ${className}`}
        {...props}
      >
        <div
          className={`h-full w-full rounded-[calc(1rem-1px)] p-5 relative overflow-hidden ${
            glass
              ? "bg-[#0B0F19]/80 backdrop-blur-xl"
              : "bg-[#0D121F]"
          }`}
        >
          {/* Subtle inset top highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          {children}
        </div>
      </div>
    );
  }

  const base = "rounded-2xl border border-white/[0.08] p-5 transition-all duration-200 relative overflow-hidden";
  const bg = glass ? "bg-[#0B0F19]/80 backdrop-blur-xl" : "bg-[#0D121F]";
  const hover = hoverEffect
    ? "hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/20 hover:-translate-y-0.5"
    : "";

  return (
    <div className={`${base} ${bg} ${hover} ${className}`} {...props}>
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
