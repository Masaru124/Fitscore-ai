"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, X } from "lucide-react";

// ponytail: Alert banner rendering real-time biomechanics risk feedback
export interface RiskWarning {
  id: string;
  type: "knee_valgus" | "lumbar_flexion" | "asymmetry" | "forward_lean" | "elbow_flare";
  title: string;
  message: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
}

interface InjuryAlertProps {
  activeWarning: RiskWarning | null;
  onDismiss?: () => void;
}

export const InjuryAlert: React.FC<InjuryAlertProps> = ({
  activeWarning,
  onDismiss,
}) => {
  if (!activeWarning) {
    return (
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium">
          Kinematic Form Safe: Joint angles and spine posture within optimal thresholds.
        </span>
      </div>
    );
  }

  const isHigh = activeWarning.severity === "high";

  return (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border animate-bounce-short ${
        isHigh
          ? "bg-red-500/15 border-red-500/40 text-red-300 shadow-lg shadow-red-500/10"
          : "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isHigh ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
        }`}
      >
        <AlertTriangle className="w-4 h-4 animate-pulse" />
      </div>

      <div className="flex-1 pr-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider">
            {activeWarning.title}
          </span>
          <span
            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
              isHigh ? "bg-red-500 text-white" : "bg-amber-500 text-black"
            }`}
          >
            {activeWarning.severity} DANGER
          </span>
        </div>
        <p className="text-xs mt-1 text-slate-200 font-normal leading-relaxed">
          {activeWarning.message}
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
