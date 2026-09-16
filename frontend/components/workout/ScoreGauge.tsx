"use client";

import React from "react";

// ponytail: Lean SVG circular gauge with dynamic color thresholds and zero external chart libs
interface ScoreGaugeProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label = "FitScore",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 85) return "#10B981"; // Emerald
    if (val >= 70) return "#06B6D4"; // Cyan
    if (val >= 50) return "#F59E0B"; // Amber
    return "#EF4444"; // Red
  };

  const currentColor = getColor(clampedScore);

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1F2739"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      {/* Center score readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-3xl font-black font-mono tracking-tight transition-colors duration-200"
          style={{ color: currentColor }}
        >
          {Math.round(clampedScore)}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {label}
        </span>
      </div>
    </div>
  );
};
