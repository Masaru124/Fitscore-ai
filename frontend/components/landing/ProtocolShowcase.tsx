"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Protocol {
  name: string;
  category: "lower" | "posterior" | "upper" | "core";
  depth: string;
  level: string;
  target: string;
}

const protocols: Protocol[] = [
  { name: "Barbell Back Squat", category: "lower", depth: "85° Knee Flexion", level: "Intermediate", target: "Quadriceps & Glutes" },
  { name: "Conventional Deadlift", category: "posterior", depth: "180° Full Lockout", level: "Advanced", target: "Posterior Chain" },
  { name: "Overhead Dumbbell Press", category: "upper", depth: "175° Arm Extension", level: "Intermediate", target: "Deltoids & Trapezius" },
  { name: "Standard Push-Up", category: "upper", depth: "90° Elbow Flexion", level: "Beginner", target: "Pectorals & Triceps" },
  { name: "Front Squat", category: "lower", depth: "80° Knee Angle", level: "Advanced", target: "Anterior Core & Quads" },
  { name: "Romanian Deadlift (RDL)", category: "posterior", depth: "75° Hip Hinge", level: "Intermediate", target: "Hamstrings & Lower Back" },
  { name: "Isometric Forearm Plank", category: "core", depth: "180° Neutral Line", level: "Beginner", target: "Transverse Abdominis" },
  { name: "Dumbbell Lateral Raise", category: "upper", depth: "90° Shoulder Abduction", level: "Beginner", target: "Lateral Deltoids" },
];

export function ProtocolShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? protocols
      : protocols.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0F1524] border border-white/[0.08] overflow-x-auto w-fit">
        {[
          { id: "all", label: "All Models" },
          { id: "lower", label: "Lower Body" },
          { id: "posterior", label: "Posterior" },
          { id: "upper", label: "Upper Body" },
          { id: "core", label: "Core" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === tab.id
                ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Protocol Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((p, idx) => (
          <Card key={idx} hoverEffect className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                {p.category}
              </span>
              <Badge
                variant={
                  p.level === "Beginner"
                    ? "success"
                    : p.level === "Intermediate"
                    ? "cyan"
                    : "warning"
                }
              >
                {p.level}
              </Badge>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">{p.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{p.target}</p>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500">Benchmark:</span>
              <span className="text-slate-300 font-semibold">{p.depth}</span>
            </div>

            <Link
              href="/workout"
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1"
            >
              <span>Test Live in Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
