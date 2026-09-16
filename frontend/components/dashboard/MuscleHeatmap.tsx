"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Info } from "lucide-react";

// ponytail: Lean interactive muscle activation visualization
interface MuscleGroup {
  id: string;
  name: string;
  activation: number; // 0 - 100
  risk: "low" | "medium" | "high";
  fatigue: number; // 0 - 100
}

const muscleData: MuscleGroup[] = [
  { id: "quads", name: "Quadriceps", activation: 88, risk: "low", fatigue: 75 },
  { id: "glutes", name: "Gluteus Maximus", activation: 92, risk: "low", fatigue: 80 },
  { id: "lumbar", name: "Lumbar / Lower Back", activation: 42, risk: "medium", fatigue: 62 },
  { id: "core", name: "Core & Abdominals", activation: 70, risk: "low", fatigue: 50 },
  { id: "hamstrings", name: "Hamstrings", activation: 65, risk: "low", fatigue: 58 },
  { id: "knees", name: "Knee Joint Tendons", activation: 30, risk: "high", fatigue: 45 },
];

export const MuscleHeatmap: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>(muscleData[0]);

  return (
    <Card hoverEffect className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Biomechanical Heatmap</h3>
          <p className="text-xs text-slate-400">Muscle activation &amp; joint stress distribution</p>
        </div>
        <Badge variant="info" size="sm">
          Active Load
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Muscle group selector list */}
        <div className="space-y-2">
          {muscleData.map((m) => {
            const isSelected = selectedMuscle.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMuscle(m)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1A2234] border-cyan-500/50 shadow-md shadow-cyan-950/20"
                    : "bg-[#0B0E14] border-[#232D42] hover:border-[#3B4B6E]"
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200">{m.name}</p>
                  <p className="text-[10px] text-slate-400">
                    Activation: <span className="text-cyan-400 font-mono">{m.activation}%</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        m.risk === "high"
                          ? "bg-red-500"
                          : m.risk === "medium"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${m.activation}%` }}
                    />
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      m.risk === "high"
                        ? "bg-red-500 animate-ping"
                        : m.risk === "medium"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="bg-[#0B0E14] border border-[#232D42] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#232D42]">
              <span className="text-xs font-bold text-slate-200">
                {selectedMuscle.name}
              </span>
              <Badge
                variant={
                  selectedMuscle.risk === "high"
                    ? "danger"
                    : selectedMuscle.risk === "medium"
                    ? "warning"
                    : "success"
                }
                size="sm"
              >
                {selectedMuscle.risk.toUpperCase()} RISK
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Neuromuscular Recruitment</span>
                  <span className="font-mono text-cyan-400 font-bold">
                    {selectedMuscle.activation}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                    style={{ width: `${selectedMuscle.activation}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Cumulative Fatigue Rating</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {selectedMuscle.fatigue}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${selectedMuscle.fatigue}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-[#141923] border border-[#232D42] flex items-start gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <span>
              {selectedMuscle.risk === "high"
                ? "Warning: Lateral knee shift detected on concentric phase. Focus on pressing through heels."
                : selectedMuscle.risk === "medium"
                ? "Caution: Moderate lumbar flexion at bottom of squat ROM. Maintain neutral spine."
                : "Optimal motor recruitment with balanced bilateral symmetry."}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
