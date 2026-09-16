"use client";

import React from "react";

// ponytail: Lean rep counter with phase indicators and tempo badge
interface RepCounterProps {
  reps: number;
  targetReps?: number;
  phase: "ECCENTRIC" | "CONCENTRIC" | "PEAK_HOLD" | "IDLE";
  tempoSeconds?: number;
}

export const RepCounter: React.FC<RepCounterProps> = ({
  reps,
  targetReps = 12,
  phase,
  tempoSeconds = 0,
}) => {
  const phaseMap = {
    ECCENTRIC: { text: "ECCENTRIC (DOWN)", color: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30" },
    CONCENTRIC: { text: "CONCENTRIC (DRIVE)", color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" },
    PEAK_HOLD: { text: "DEPTH HOLD", color: "text-amber-400 bg-amber-500/15 border-amber-500/30" },
    IDLE: { text: "READY / REST", color: "text-slate-400 bg-slate-800 border-slate-700" },
  }[phase];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#141923] border border-[#232D42] rounded-2xl">
      <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
        Reps Completed
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <span className="text-5xl font-black text-white font-mono tracking-tight transition-transform transform scale-100 hover:scale-105">
          {reps}
        </span>
        <span className="text-lg text-slate-500 font-bold font-mono">
          /{targetReps}
        </span>
      </div>

      {/* Phase indicator badge */}
      <div
        className={`mt-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${phaseMap.color}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        <span>{phaseMap.text}</span>
      </div>

      {tempoSeconds > 0 && (
        <span className="text-[10px] font-mono text-slate-400 mt-1.5">
          Rep Tempo: {tempoSeconds.toFixed(1)}s
        </span>
      )}
    </div>
  );
};
