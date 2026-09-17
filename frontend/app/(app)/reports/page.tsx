"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Activity,
  Cpu,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface ReportItem {
  id: string;
  title: string;
  period: string;
  generatedDate: string;
  avgScore: number;
  totalVolume: number;
  riskSummary: string;
}

const pastReports: ReportItem[] = [
  {
    id: "rep_w38",
    title: "Weekly Biomechanics Audit — Week 38 (Current)",
    period: "Sep 16 – Present",
    generatedDate: "Sep 17, 2026",
    avgScore: 90.2,
    totalVolume: 82,
    riskSummary: "Zero critical form flaws detected across 82 completed reps.",
  },
  {
    id: "rep_w37",
    title: "Weekly Biomechanics Audit — Week 37",
    period: "Sep 09 – Sep 15, 2026",
    generatedDate: "Sep 15, 2026",
    avgScore: 88.5,
    totalVolume: 153,
    riskSummary: "1 low-severity knee valgus incidence. 0 spine compromises.",
  },
  {
    id: "rep_m08",
    title: "Monthly Kinematic Intelligence — August 2026",
    period: "Aug 01 – Aug 31, 2026",
    generatedDate: "Sep 01, 2026",
    avgScore: 84.1,
    totalVolume: 610,
    riskSummary: "Form consistency improved by +6.8% across squat and deadlift.",
  },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false);
  const [reportList, setReportList] = useState<ReportItem[]>(pastReports);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newReport: ReportItem = {
        id: `rep_${Date.now()}`,
        title: `Comprehensive Kinematic Telemetry — Instant Export`,
        period: "Last 7 Days Rolling",
        generatedDate: "Just now",
        avgScore: 91.4,
        totalVolume: 114,
        riskSummary: "Synthesized MediaPipe coordinates across 114 reps with zero severe alerts.",
      };
      setReportList([newReport, ...reportList]);
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Title & Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="info" size="sm">
              Clinical Telemetry
            </Badge>
            <span className="text-xs font-mono text-slate-400">Clinical Biomechanics Validated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Biomechanics Audit &amp; Analytics Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Export clinical-grade PDF telemetry documents for personal athletic tracking or physiotherapist review.
          </p>
        </div>
      </div>

      {/* KPI Overview Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-2 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider font-mono text-[11px]">Average FitScore</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">88.4</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">+4.2% vs last wk</span>
          </div>
          <p className="text-[11px] text-slate-400">Tier 1: Excellent Biomechanics</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-2 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider font-mono text-[11px]">Injury Risk Exposure</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400 font-mono">4.0%</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">-8.1% improvement</span>
          </div>
          <p className="text-[11px] text-slate-400">Safe joint shear &amp; spinal neutrality</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-2 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider font-mono text-[11px]">Bilateral Symmetry</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">94.2%</span>
            <span className="text-xs font-bold text-slate-400 font-mono">Δ &lt; 2.4° mean</span>
          </div>
          <p className="text-[11px] text-slate-400">Optimal left-right load balance</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-2 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider font-mono text-[11px]">Verified Rep Volume</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-mono">1,420</span>
            <span className="text-xs font-bold text-cyan-400 font-mono">FSM Segmented</span>
          </div>
          <p className="text-[11px] text-slate-400">Zero false repetitions counted</p>
        </div>
      </div>

      {/* Generator Banner Card */}
      <Card hoverEffect className="bg-gradient-to-r from-[#141923] via-[#1A2234] to-[#141923] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Automated Synthesis
          </div>
          <h2 className="text-lg font-bold text-white">
            Generate Instant Biomechanical Audit Report
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Synthesizes joint angles, ROM distribution, tempo cadence, and risk warnings into a formal diagnostic summary.
          </p>
        </div>

        <Button
          onClick={handleGenerate}
          isLoading={generating}
          variant="primary"
          size="md"
          className="shadow-xl shadow-cyan-500/25 flex-shrink-0 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Generate New PDF Report</span>
        </Button>
      </Card>

      {/* Four Pillars & Clinical Angles Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Four Pillars Telemetry */}
        <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Four-Pillar Quality Balance
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-bold">CALIBRATED WEIGHTS</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Range of Motion (35% Weight)</span>
                <span className="font-mono font-bold text-emerald-400">92.0% (85° Depth)</span>
              </div>
              <div className="w-full bg-[#070B14] h-2 rounded-full overflow-hidden border border-white/[0.04]">
                <div className="bg-emerald-400 h-full w-[92%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Cadence &amp; Tempo (25% Weight)</span>
                <span className="font-mono font-bold text-cyan-400">85.4% (2.4s Eccentric)</span>
              </div>
              <div className="w-full bg-[#070B14] h-2 rounded-full overflow-hidden border border-white/[0.04]">
                <div className="bg-cyan-400 h-full w-[85.4%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Bilateral Symmetry (20% Weight)</span>
                <span className="font-mono font-bold text-cyan-400">89.0% (98% Balance)</span>
              </div>
              <div className="w-full bg-[#070B14] h-2 rounded-full overflow-hidden border border-white/[0.04]">
                <div className="bg-cyan-400 h-full w-[89%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Joint &amp; Spinal Stability (20% Weight)</span>
                <span className="font-mono font-bold text-emerald-400">84.2% (Rigid Core)</span>
              </div>
              <div className="w-full bg-[#070B14] h-2 rounded-full overflow-hidden border border-white/[0.04]">
                <div className="bg-emerald-400 h-full w-[84.2%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Joint Kinematics Deviation Analysis */}
        <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/[0.08] shadow-xl shadow-black/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[11px]">
              Clinical Angular Thresholds
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">ALL PASS</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Dynamic Knee Valgus Angle</span>
                <span className="text-[11px] text-slate-400">Clinical safety limit: &lt; 12.0° bilateral deviation</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-emerald-400 block">3.4° observed</span>
                <span className="text-[10px] text-emerald-500 uppercase font-bold font-mono">OPTIMAL</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Lumbar Lordosis Inclination</span>
                <span className="text-[11px] text-slate-400">Clinical flexion threshold: &gt; 65.0° sagittal tilt</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-emerald-400 block">82.1° observed</span>
                <span className="text-[10px] text-emerald-500 uppercase font-bold font-mono">NEUTRAL</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#070B14] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Parallel Squat Depth</span>
                <span className="text-[11px] text-slate-400">Target depth window: 80.0° – 90.0° knee flexion</span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-cyan-400 block">84.8° mean</span>
                <span className="text-[10px] text-cyan-400 uppercase font-bold font-mono">PARALLEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Archive List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono text-[11px]">
          Generated Diagnostic Archives
        </h3>

        <div className="space-y-3">
          {reportList.map((r) => (
            <Card key={r.id} hoverEffect className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#070B14] border border-white/[0.08] flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-inner">
                  <FileText className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{r.title}</h4>
                    <Badge variant="success" size="sm">
                      Score: {r.avgScore}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {r.period}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {r.totalVolume} Reps Evaluated
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{r.riskSummary}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-0 border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => alert(`Exporting ${r.title} telemetry summary...`)}
                  className="px-4 py-2 rounded-xl bg-[#131B30] border border-white/[0.08] hover:border-cyan-500/40 text-xs font-semibold text-slate-200 hover:text-white inline-flex items-center gap-2 transition-all cursor-pointer hover:bg-cyan-500/10 active:scale-98"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download PDF</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
