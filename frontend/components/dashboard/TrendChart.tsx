"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";

// ponytail: Pure SVG line & gradient area chart with zero third-party chart library dependencies
interface DataPoint {
  date: string;
  score: number;
  reps: number;
}

interface TrendChartProps {
  data?: DataPoint[];
}

const defaultData: DataPoint[] = [
  { date: "Mon", score: 72, reps: 35 },
  { date: "Tue", score: 76, reps: 42 },
  { date: "Wed", score: 81, reps: 50 },
  { date: "Thu", score: 79, reps: 45 },
  { date: "Fri", score: 88, reps: 55 },
  { date: "Sat", score: 85, reps: 48 },
  { date: "Sun", score: 92, reps: 60 },
];

export const TrendChart: React.FC<TrendChartProps> = ({ data = defaultData }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxScore = 100;
  const minScore = 50;
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index: number) =>
    paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) =>
    height -
    paddingY -
    ((val - minScore) / (maxScore - minScore)) * (height - paddingY * 2);

  // Generate SVG path for line
  const points = data.map((d, i) => `${getX(i)},${getY(d.score)}`).join(" ");

  // Generate SVG path for filled area
  const areaPoints = `${getX(0)},${height - paddingY} ${points} ${getX(
    data.length - 1
  )},${height - paddingY}`;

  return (
    <Card hoverEffect className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">FitScore Trajectory (7-Day)</h3>
          <p className="text-xs text-slate-400">Biomechanics precision score progression</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> FitScore
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            Avg: 81.8
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[60, 80, 100].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#232D42"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748B"
                  fontFamily="monospace"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Area under line */}
          <polygon points={areaPoints} fill="url(#scoreAreaGradient)" />

          {/* Main line */}
          <polyline
            fill="none"
            stroke="#00F2FE"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data interactive nodes */}
          {data.map((d, i) => {
            const x = getX(i);
            const y = getY(d.score);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "6" : "4"}
                  fill="#0B0E14"
                  stroke="#00F2FE"
                  strokeWidth={isHovered ? "3" : "2"}
                  className="transition-all duration-150"
                />

                {/* X Axis Labels */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill={isHovered ? "#00F2FE" : "#94A3B8"}
                  fontWeight={isHovered ? "700" : "500"}
                >
                  {d.date}
                </text>

                {/* Floating tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={x - 36}
                      y={y - 34}
                      width="72"
                      height="24"
                      rx="6"
                      fill="#1A2234"
                      stroke="#3B4B6E"
                    />
                    <text
                      x={x}
                      y={y - 18}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#F0F4FC"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {d.score} pts
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};
