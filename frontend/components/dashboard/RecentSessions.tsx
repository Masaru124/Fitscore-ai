"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Dumbbell, ShieldAlert, CheckCircle, Camera, Loader2 } from "lucide-react";

interface SessionItem {
  id: string;
  exercise: string;
  date: string;
  timestamp: number;
  duration: string;
  reps: number;
  avgScore: number;
  riskCount: number;
}

export const RecentSessions: React.FC = () => {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      setIsLoading(true);
      const sessionMap = new Map<string, SessionItem>();

      // 1. Fetch from backend SQLite DB
      try {
        const res = await fetch("http://localhost:8000/api/v1/sessions/");
        if (res.ok) {
          const dbList = await res.json();
          if (Array.isArray(dbList)) {
            for (const item of dbList) {
              const createdAt = item.created_at ? new Date(item.created_at) : new Date();
              const dateStr = formatRelativeDate(createdAt);

              const durSec = item.duration_seconds || (item.total_reps * 3);
              const m = Math.floor(durSec / 60);
              const s = durSec % 60;
              const durLabel = m > 0 ? `${m}m ${s}s` : `${s}s`;

              sessionMap.set(String(item.id), {
                id: String(item.id),
                exercise: item.exercise_name || "Workout Session",
                date: dateStr,
                timestamp: createdAt.getTime(),
                duration: durLabel,
                reps: item.total_reps || 0,
                avgScore: Math.round(item.overall_fitscore || 90),
                riskCount: item.injury_risk_count || 0,
              });
            }
          }
        }
      } catch (err) {
        console.warn("Backend recent sessions fetch note:", err);
      }

      // 2. Fetch from localStorage saved sessions
      if (typeof window !== "undefined") {
        try {
          const rawSaved = localStorage.getItem("fitscore_saved_sessions");
          if (rawSaved) {
            const list = JSON.parse(rawSaved);
            if (Array.isArray(list)) {
              for (const item of list) {
                const key = item.dbId ? String(item.dbId) : (item.id || `local_${Date.now()}`);
                if (!sessionMap.has(key)) {
                  const createdAt = item.timestamp ? new Date(item.timestamp) : new Date();
                  const dateStr = formatRelativeDate(createdAt);
                  const repsCount = Array.isArray(item.reps) ? item.reps.length : (item.totalReps || 0);
                  const riskCnt = Array.isArray(item.reps) ? item.reps.filter((r: any) => r.status === "warning").length : 0;

                  sessionMap.set(key, {
                    id: item.id || key,
                    exercise: item.exercise || "Workout Session",
                    date: dateStr,
                    timestamp: createdAt.getTime(),
                    duration: item.duration || "2m 10s",
                    reps: repsCount,
                    avgScore: item.overallScore || 90,
                    riskCount: riskCnt,
                  });
                }
              }
            }
          }
        } catch (e) {
          console.warn("LocalStorage recent sessions parse note:", e);
        }
      }

      const merged = Array.from(sessionMap.values())
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

      setSessions(merged);
      setIsLoading(false);
    };

    fetchRecent();
  }, []);

  function formatRelativeDate(d: Date): string {
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear();

    const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (isToday) return `Today, ${timeStr}`;
    if (isYesterday) return `Yesterday, ${timeStr}`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <Card hoverEffect className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Recent Biomechanics Sessions</h3>
          <p className="text-xs text-slate-400">Recorded motion evaluations and real telemetry</p>
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
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Loading authentic sessions...</span>
                  </div>
                </td>
              </tr>
            ) : sessions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-slate-400">No workout sessions recorded yet.</p>
                    <Link
                      href="/workout"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-medium transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" /> Start First Workout
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              sessions.map((s) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
