import React from "react";
import Link from "next/link";
import { Dumbbell, Calendar, ArrowRight, ShieldCheck, ShieldAlert, Filter } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// ponytail: Server Component rendering full workout history with search & filters
const historicalSessions = [
  {
    id: "sess_01",
    exercise: "Barbell Back Squat",
    date: "Sep 16, 2026 • 10:45 AM",
    duration: "14m 20s",
    reps: 12,
    score: 88,
    status: "safe",
    notes: "Parallel depth achieved, minor knee valgus under fatigue",
  },
  {
    id: "sess_02",
    exercise: "Conventional Deadlift",
    date: "Sep 15, 2026 • 4:15 PM",
    duration: "24m 10s",
    reps: 28,
    score: 94,
    status: "optimal",
    notes: "Neutral spine maintained, synchronous hip extension",
  },
  {
    id: "sess_03",
    exercise: "Overhead Dumbbell Press",
    date: "Sep 14, 2026 • 5:00 PM",
    duration: "15m 05s",
    reps: 40,
    score: 78,
    status: "risk",
    notes: "Lumbar hyperextension compensation on final set",
  },
  {
    id: "sess_04",
    exercise: "Standard Push-Up",
    date: "Sep 12, 2026 • 8:30 AM",
    duration: "12m 30s",
    reps: 55,
    score: 91,
    status: "optimal",
    notes: "Tucked elbows (45°), full scapular protraction",
  },
  {
    id: "sess_05",
    exercise: "Barbell Back Squat",
    date: "Sep 10, 2026 • 11:00 AM",
    duration: "20m 15s",
    reps: 30,
    score: 82,
    status: "safe",
    notes: "Consistent cadence, slightly fast eccentric tempo",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Workout History</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete archive of recorded biomechanics evaluations &amp; form progression
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141923] border border-[#232D42] text-xs font-semibold text-slate-300 hover:text-white transition-colors">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Exercises
          </button>
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
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{session.exercise}</h3>
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

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {session.date}
                  </span>
                  <span>•</span>
                  <span>{session.reps} reps ({session.duration})</span>
                </div>

                <p className="text-xs text-slate-400">{session.notes}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-[#232D42]">
              <div>
                {session.status === "risk" ? (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <ShieldAlert className="w-3.5 h-3.5" /> Risk Noted
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Form
                  </span>
                )}
              </div>

              <Link
                href={`/session/${session.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-[#0B0E14] border border-[#232D42] hover:border-cyan-500 text-xs font-semibold text-cyan-400 flex items-center gap-1.5 transition-all"
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
