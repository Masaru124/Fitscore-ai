import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Dumbbell, ShieldAlert, CheckCircle } from "lucide-react";

// ponytail: Lean server-friendly session list table
interface SessionItem {
  id: string;
  exercise: string;
  date: string;
  duration: string;
  reps: number;
  avgScore: number;
  riskCount: number;
}

const recentSessions: SessionItem[] = [
  {
    id: "sess_01",
    exercise: "Barbell Back Squat",
    date: "Today, 10:30 AM",
    duration: "18m 42s",
    reps: 36,
    avgScore: 89,
    riskCount: 1,
  },
  {
    id: "sess_02",
    exercise: "Conventional Deadlift",
    date: "Yesterday, 4:15 PM",
    duration: "24m 10s",
    reps: 28,
    avgScore: 94,
    riskCount: 0,
  },
  {
    id: "sess_03",
    exercise: "Overhead Dumbbell Press",
    date: "Sep 14, 2026",
    duration: "15m 05s",
    reps: 40,
    avgScore: 78,
    riskCount: 3,
  },
  {
    id: "sess_04",
    exercise: "Bodyweight Push-Up",
    date: "Sep 12, 2026",
    duration: "12m 30s",
    reps: 55,
    avgScore: 91,
    riskCount: 0,
  },
];

export const RecentSessions: React.FC = () => {
  return (
    <Card hoverEffect className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Recent Biomechanics Sessions</h3>
          <p className="text-xs text-slate-400">Recorded motion evaluations and rep accuracy</p>
        </div>
        <Link
          href="/history"
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="border-b border-[#232D42] text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            <tr>
              <th className="pb-3 pl-2">Exercise</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Volume</th>
              <th className="pb-3">FitScore</th>
              <th className="pb-3">Safety Status</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#232D42]/60">
            {recentSessions.map((s) => (
              <tr key={s.id} className="hover:bg-[#1A2234]/50 transition-colors">
                <td className="py-3 pl-2 font-medium text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Dumbbell className="w-3.5 h-3.5" />
                  </div>
                  <span>{s.exercise}</span>
                </td>
                <td className="py-3 text-slate-400">{s.date}</td>
                <td className="py-3 font-mono font-medium">
                  {s.reps} reps <span className="text-slate-500 text-[10px]">({s.duration})</span>
                </td>
                <td className="py-3">
                  <Badge
                    variant={
                      s.avgScore >= 85
                        ? "success"
                        : s.avgScore >= 70
                        ? "warning"
                        : "danger"
                    }
                    size="sm"
                  >
                    {s.avgScore} / 100
                  </Badge>
                </td>
                <td className="py-3">
                  {s.riskCount > 0 ? (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-medium text-[11px]">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      {s.riskCount} Risk Warning{s.riskCount > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Zero Flaws
                    </span>
                  )}
                </td>
                <td className="py-3 text-right pr-2">
                  <Link
                    href={`/session/${s.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
