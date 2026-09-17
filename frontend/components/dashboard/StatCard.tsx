import React from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  accentColor?: "cyan" | "emerald" | "amber" | "violet" | "blue";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "cyan",
}) => {
  const iconGradients = {
    cyan: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
    emerald: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    amber: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    violet: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
    blue: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
  }[accentColor];

  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-xl shadow-black/40 hover:from-cyan-500/40 hover:to-blue-600/20 hover:shadow-cyan-950/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="h-full w-full rounded-[calc(1rem-1px)] bg-[#0D121F] p-5 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle top inset highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br border flex items-center justify-center shadow-sm ${iconGradients}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {value}
            </span>
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-mono font-bold px-1.5 py-0.5 rounded-full ${
                  trend.positive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                    : "bg-red-500/10 text-red-400 border border-red-500/25"
                }`}
              >
                {trend.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 leading-snug">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
