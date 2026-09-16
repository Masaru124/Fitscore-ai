"use client";

import React, { useState } from "react";
import { FileText, Download, Sparkles, CheckCircle2, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ponytail: Lean interactive reports center with simulated PDF export
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
        title: "Weekly Biomechanics Audit — Week 38 (Current)",
        period: "Sep 16 – Present",
        generatedDate: "Just now",
        avgScore: 90.2,
        totalVolume: 82,
        riskSummary: "Zero critical form flaws detected across 82 completed reps.",
      };
      setReportList([newReport, ...reportList]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Biomechanics Audit Reports
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Export clinical-grade PDF telemetry documents for personal tracking or athletic coaching.
        </p>
      </div>

      {/* Generator Banner Card */}
      <Card hoverEffect className="bg-gradient-to-r from-[#141923] via-[#1A2234] to-[#141923] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Automated Synthesis
          </div>
          <h2 className="text-lg font-bold text-white">
            Generate Comprehensive Weekly Report
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Synthesizes joint angles, ROM distribution, tempo cadence, and risk warnings into a
            formal diagnostic summary.
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

      {/* Report Archive List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Generated Diagnostic Archives
        </h3>

        <div className="space-y-3">
          {reportList.map((r) => (
            <Card key={r.id} hoverEffect className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B0E14] border border-[#232D42] flex items-center justify-center text-cyan-400 flex-shrink-0">
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
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {r.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {r.totalVolume} Reps Evaluated
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{r.riskSummary}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-0 border-[#232D42]">
                <Button
                  onClick={() => {
                    alert(`Downloading ${r.title} PDF format (generated on demand)...`);
                  }}
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
