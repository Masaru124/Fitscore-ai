import React from "react";

// ponytail: Reusable surface container with optional glassmorphic background
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = false,
  hoverEffect = false,
  className = "",
  ...props
}) => {
  const base = "rounded-xl border border-[#232D42] p-5 transition-all duration-200";
  const bg = glass
    ? "bg-[#141923]/80 backdrop-blur-md"
    : "bg-[#141923]";
  const hover = hoverEffect
    ? "hover:border-[#3B4B6E] hover:shadow-lg hover:shadow-cyan-950/20"
    : "";

  return (
    <div className={`${base} ${bg} ${hover} ${className}`} {...props}>
      {children}
    </div>
  );
};
