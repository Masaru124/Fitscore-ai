import React from "react";
import Link from "next/link";
import { Activity, Flame, ShieldAlert, Zap, Dumbbell, ArrowRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { MuscleHeatmap } from "@/components/dashboard/MuscleHeatmap";
import { RecentSessions } from "@/components/dashboard/RecentSessions";

// ponytail: Lean Server Component with zero useEffect hooks and instantaneous render
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Welcome Banner & CTA */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141923] via-[#1A2234] to-[#141923] border border-[#232D42] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> AI Engine Ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-cyan-400">Alex</span>!
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Your average FitScore increased by +4.2% this week. Form stability during concentric
            squatting is at an all-time peak.
          </p>
        </div>

        <Link
          href="/workout"
          className="z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 flex-shrink-0 cursor-pointer"
        >
          <Dumbbell className="w-4 h-4" />
          <span>Launch Live Workout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
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
          title="Injury Risk Score"
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

      {/* Analytics & Biomechanics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart />
        <MuscleHeatmap />
      </div>

      {/* Recent Sessions Table */}
      <RecentSessions />
    </div>
  );
}
