import React from "react";
import Link from "next/link";
import { Dumbbell, Calendar, ArrowRight, ShieldCheck, ShieldAlert, Filter, Activity, CheckCircle2, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// ponytail: Server Component rendering full workout history with search, KPI summary & filters
const historicalSessions = [
  {
    id: "sess_01",
    exercise: "Barbell Back Squat",
    category: "Lower Body",
    date: "Sep 16, 2026 • 10:45 AM",
    duration: "14m 20s",
    reps: 36,
    score: 89,
    status: "safe",
    notes: "Parallel depth achieved (84.2°), minor knee valgus under fatigue in set 3",
  },
  {
    id: "sess_02",
    exercise: "Conventional Deadlift",
    category: "Posterior Chain",
    date: "Sep 15, 2026 • 4:15 PM",
    duration: "24m 10s",
    reps: 28,
    score: 94,
    status: "optimal",
    notes: "Strict neutral spine maintained, synchronous 180° hip lockout with zero lumbar rounding",
  },
  {
    id: "sess_03",
    exercise: "Overhead Dumbbell Press",
    category: "Upper Body",
    date: "Sep 14, 2026 • 5:00 PM",
    duration: "15m 05s",
    reps: 40,
    score: 78,
    status: "risk",
    notes: "Lumbar hyperextension compensation on final set (spinal angle deviation > 14°)",
  },
  {
    id: "sess_04",
    exercise: "Standard Push-Up",
    category: "Upper Body",
    date: "Sep 12, 2026 • 8:30 AM",
    duration: "12m 30s",
    reps: 55,
    score: 91,
    status: "optimal",
    notes: "Tucked elbows (45°), full scapular protraction, rigid core plank maintained",
  },
  {
    id: "sess_05",
    exercise: "Barbell Back Squat",
    category: "Lower Body",
    date: "Sep 10, 2026 • 11:00 AM",
    duration: "20m 15s",
    reps: 30,
    score: 82,
    status: "safe",
    notes: "Consistent cadence, slightly rapid eccentric tempo (1.4s vs recommended 2.5s)",
  },
  {
    id: "sess_06",
    exercise: "Romanian Deadlift (RDL)",
    category: "Posterior Chain",
    date: "Sep 08, 2026 • 3:30 PM",
    duration: "18m 45s",
    reps: 32,
    score: 93,
    status: "optimal",
    notes: "75° hip hinge achieved with knee flexion frozen at 18°, pure hamstring loading",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
            <Activity className="w-3 h-3" />
            <span>KINETIC EVENT ARCHIVE</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Workout History &amp; Audit Logs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete chronological ledger of validated skeletal tracking sessions, rep counts, and joint deviations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/workout"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all"
          >
            <Dumbbell className="w-4 h-4" /> Start New Session
          </Link>
        </div>
      </div>

      {/* Quick Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-lg shadow-black/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Reps</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-mono font-black text-white">221</span>
            <span className="text-[10px] text-cyan-400 font-semibold font-mono">Logged</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-lg shadow-black/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Avg FitScore</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-mono font-black text-cyan-400">87.8</span>
            <span className="text-[10px] text-emerald-400 font-semibold font-mono">Tier 1</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-lg shadow-black/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Safe Form Ratio</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-mono font-black text-emerald-400">96.4%</span>
            <span className="text-[10px] text-slate-400 font-mono">Zero Critical</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-lg shadow-black/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Highest Score</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-mono font-black text-amber-400">94</span>
            <span className="text-[10px] text-slate-400 font-mono">Deadlift</span>
          </div>
        </div>
      </div>

      {/* History List Cards */}
      <div className="space-y-3">
        {historicalSessions.map((session) => (
          <Card
            key={session.id}
            hoverEffect
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Dumbbell className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white">{session.exercise}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#131B30] text-slate-300 border border-white/[0.06]">
                    {session.category}
                  </span>
                  <Badge
                    variant={
                      session.score >= 88
                        ? "success"
                        : session.score >= 75
                        ? "warning"
                        : "danger"
                    }
                    size="sm"
                  >
                    FitScore: {session.score}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {session.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span>{session.reps} reps ({session.duration})</span>
                </div>

                <p className="text-xs text-slate-400">{session.notes}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-white/[0.06]">
              <div>
                {session.status === "risk" ? (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium font-mono">
                    <ShieldAlert className="w-3.5 h-3.5" /> Risk Noted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Form
                  </span>
                )}
              </div>

              <Link
                href={`/session/demo-session-12`}
                className="px-3.5 py-1.5 rounded-xl bg-[#131B30] border border-white/[0.08] hover:border-cyan-500/40 text-xs font-semibold text-cyan-400 hover:text-white flex items-center gap-1.5 transition-all active:scale-98"
              >
                <span>View Full Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
