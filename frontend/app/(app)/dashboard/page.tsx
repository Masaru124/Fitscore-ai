import React from "react";
import Link from "next/link";
import { Activity, Flame, ShieldAlert, Zap, Dumbbell, ArrowRight, Sparkles, FileText, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { MuscleHeatmap } from "@/components/dashboard/MuscleHeatmap";
import { RecentSessions } from "@/components/dashboard/RecentSessions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Banner & CTA */}
      <div className="p-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-600/20 to-indigo-600/20 shadow-2xl shadow-cyan-950/20">
        <div className="rounded-[calc(1.5rem-1px)] bg-[#0C111E] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>BIOMECHANICS ENGINE ACTIVE</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Biomechanics Intelligence</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Real-time joint angle tracking calibrated. Your form precision average improved by <span className="text-emerald-400 font-bold font-mono">+4.2%</span> across 38 sessions with 98% bilateral symmetry.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-mono font-semibold text-[11px]">CALIBRATED PROTOCOLS:</span>
              <Link
                href="/workout"
                className="px-3 py-1.5 rounded-full bg-[#070A12] border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono transition-all"
              >
                Squat (85° Parallel)
              </Link>
              <Link
                href="/workout"
                className="px-3 py-1.5 rounded-full bg-[#070A12] border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono transition-all"
              >
                Deadlift (180° Lockout)
              </Link>
              <Link
                href="/workout"
                className="px-3 py-1.5 rounded-full bg-[#070A12] border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 font-mono transition-all"
              >
                Push-Up (45° Flare)
              </Link>
            </div>
          </div>

          <Link
            href="/workout"
            className="group z-10 inline-flex items-center gap-3 pl-6 pr-3 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 border border-cyan-300/30 transition-all active:scale-98 flex-shrink-0 cursor-pointer"
          >
            <span>Launch Camera Session</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <Dumbbell className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall FitScore"
          value="88.4"
          subtitle="Form precision average"
          icon={Activity}
          trend={{ value: "+4.2%", positive: true }}
          accentColor="cyan"
        />
        <StatCard
          title="Total Reps Logged"
          value="1,420"
          subtitle="Across 38 workouts"
          icon={Dumbbell}
          trend={{ value: "+15.8%", positive: true }}
          accentColor="emerald"
        />
        <StatCard
          title="Injury Risk Exposure"
          value="Low (4%)"
          subtitle="Joint shear safety rating"
          icon={ShieldAlert}
          trend={{ value: "-8.1%", positive: true }}
          accentColor="violet"
        />
        <StatCard
          title="Active Streak"
          value="5 Days"
          subtitle="Personal record: 14 days"
          icon={Flame}
          trend={{ value: "+2 days", positive: true }}
          accentColor="amber"
        />
      </div>

      {/* Analytics Row: Trajectory Chart & Muscle Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TrendChart />
        </div>
        <div className="lg:col-span-5">
          <MuscleHeatmap />
        </div>
      </div>

      {/* Recent Sessions Table */}
      <RecentSessions />
    </div>
  );
}
