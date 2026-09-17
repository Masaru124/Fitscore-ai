import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Dumbbell,
  Clock,
  Flame,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScoreGauge } from "@/components/workout/ScoreGauge";

// ponytail: Server Component providing complete biomechanics session autopsy with zero client overhead
export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const sessionId = resolvedParams.id;

  const session = {
    id: sessionId,
    exercise: "Barbell Back Squat",
    date: "September 16, 2026 • 10:45 AM",
    duration: "14m 20s",
    totalReps: 12,
    overallScore: 88,
    caloriesBurned: 165,
    metrics: [
      { name: "Range of Motion (ROM)", score: 92, weight: "35%", note: "Hit 85° hip-crease depth consistently" },
      { name: "Rep Tempo & Cadence", score: 85, weight: "25%", note: "Controlled 2.4s eccentric descent" },
      { name: "Bilateral Symmetry", score: 89, weight: "20%", note: "98% weight balance across left/right feet" },
      { name: "Joint Stability", score: 84, weight: "20%", note: "Slight knee valgus on rep 6 & 9" },
    ],
    reps: [
      { rep: 1, score: 94, depth: "84°", tempo: "2.3s", status: "optimal" },
      { rep: 2, score: 92, depth: "85°", tempo: "2.4s", status: "optimal" },
      { rep: 3, score: 90, depth: "86°", tempo: "2.4s", status: "optimal" },
      { rep: 4, score: 88, depth: "87°", tempo: "2.5s", status: "optimal" },
      { rep: 5, score: 89, depth: "86°", tempo: "2.4s", status: "optimal" },
      { rep: 6, score: 79, depth: "91°", tempo: "2.8s", status: "warning", issue: "Minor knee valgus" },
      { rep: 7, score: 87, depth: "88°", tempo: "2.5s", status: "optimal" },
      { rep: 8, score: 86, depth: "87°", tempo: "2.4s", status: "optimal" },
      { rep: 9, score: 76, depth: "94°", tempo: "3.1s", status: "warning", issue: "Lumbar flexion bottom" },
      { rep: 10, score: 91, depth: "85°", tempo: "2.3s", status: "optimal" },
      { rep: 11, score: 93, depth: "84°", tempo: "2.2s", status: "optimal" },
      { rep: 12, score: 95, depth: "84°", tempo: "2.1s", status: "optimal" },
    ],
    aiCoaching: [
      "Outstanding bilateral foot symmetry — 98% balance minimizes rotational torque on the pelvis.",
      "Knee valgus collapse observed on rep 6 and 9 during fatigue buildup. Queue: 'Screw your feet into the floor' to cue external hip rotation.",
      "Lumbar spine maintained neutral lordosis across 92% of working volume.",
    ],
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4 text-slate-400" /> Share
          </Button>
          <Button variant="primary" size="sm">
            <Download className="w-4 h-4" /> Export PDF Summary
          </Button>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="rounded-3xl bg-[#0D121F] border border-white/[0.08] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/50 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">
              EVALUATION COMPLETE
            </Badge>
            <span className="text-xs text-slate-400 font-mono">{session.date}</span>
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight">{session.exercise}</h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 bg-[#070B14] px-3.5 py-1.5 rounded-xl border border-white/[0.08] font-mono">
              <Dumbbell className="w-3.5 h-3.5 text-cyan-400" /> {session.totalReps} Total Reps
            </span>
            <span className="flex items-center gap-1.5 bg-[#070B14] px-3.5 py-1.5 rounded-xl border border-white/[0.08] font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {session.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-[#070B14] px-3.5 py-1.5 rounded-xl border border-white/[0.08] font-mono">
              <Flame className="w-3.5 h-3.5 text-red-400" /> {session.caloriesBurned} kcal
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <ScoreGauge score={session.overallScore} size={150} strokeWidth={12} label="FitScore" />
          <span className="text-xs text-emerald-400 font-semibold font-mono mt-2">
            Tier 1: Excellent Biomechanics
          </span>
        </div>
      </div>

      {/* 4-Pillar Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {session.metrics.map((m) => (
          <Card key={m.name} hoverEffect className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">{m.name}</span>
              <span className="font-mono text-[10px] text-slate-500">{m.weight}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-white">{m.score}</span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-400">{m.note}</p>
          </Card>
        ))}
      </div>

      {/* AI Coaching Insights & Rep Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Coaching Card */}
        <Card hoverEffect className="lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold pb-2 border-b border-[#232D42]">
            <Sparkles className="w-4 h-4" />
            <span>AI Kinematic Coaching</span>
          </div>

          <div className="space-y-3">
            {session.aiCoaching.map((insight, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0B0E14] border border-[#232D42] text-xs text-slate-300 leading-relaxed flex gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Rep By Rep Table */}
        <Card hoverEffect className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#232D42]">
            <h3 className="text-sm font-bold text-white">Rep-by-Rep Precision Log</h3>
            <span className="text-xs text-slate-400 font-mono">12 Reps Evaluated</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-semibold text-slate-500 border-b border-[#232D42]">
                <tr>
                  <th className="pb-2">Rep #</th>
                  <th className="pb-2">FitScore</th>
                  <th className="pb-2">Hip Depth</th>
                  <th className="pb-2">Tempo</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232D42]/50">
                {session.reps.map((r) => (
                  <tr key={r.rep} className="hover:bg-[#1A2234]/40">
                    <td className="py-2.5 font-mono font-bold text-white">Rep {r.rep}</td>
                    <td className="py-2.5 font-mono font-bold">
                      <span className={r.score >= 85 ? "text-emerald-400" : "text-amber-400"}>
                        {r.score}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-400 font-mono">{r.depth}</td>
                    <td className="py-2.5 text-slate-400 font-mono">{r.tempo}</td>
                    <td className="py-2.5">
                      {r.status === "optimal" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Optimal
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> {r.issue}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
