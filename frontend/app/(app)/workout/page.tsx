"use client";

import React, { useState, useMemo } from "react";
import {
  Dumbbell,
  Play,
  Shield,
  Flame,
  Info,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { LiveSession } from "@/components/workout/LiveSession";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ExerciseOption {
  id: string;
  name: string;
  category: "Lower Body" | "Posterior Chain" | "Upper Body" | "Arms & Shoulders" | "Core & Stability";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  primaryMuscles: string[];
  cameraPlacement: string;
  targetDepth: string;
  guardRule: string;
  description: string;
}

const exercises: ExerciseOption[] = [
  {
    id: "squat",
    name: "Barbell Back Squat",
    category: "Lower Body",
    difficulty: "Intermediate",
    primaryMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    cameraPlacement: "Side profile or 45° angle, full body visible",
    targetDepth: "85° Knee Flexion",
    guardRule: "Knee Valgus Collapse (Δ > 12°)",
    description: "Evaluates hip crease depth below knee level, bilateral knee tracking, and lumbar flexion.",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "Posterior Chain",
    difficulty: "Advanced",
    primaryMuscles: ["Hamstrings", "Erector Spinae", "Glutes", "Lats"],
    cameraPlacement: "Strict 90° side profile, barbell path in view",
    targetDepth: "180° Full Lockout",
    guardRule: "Lumbar Kyphosis (< 65°)",
    description: "Monitors neutral spine integrity, hip-to-shoulder synchronous drive, and lockout angle.",
  },
  {
    id: "overhead_press",
    name: "Overhead Dumbbell Press",
    category: "Upper Body",
    difficulty: "Intermediate",
    primaryMuscles: ["Anterior Deltoid", "Triceps", "Upper Traps"],
    cameraPlacement: "Front view, waist up to full overhead lockout",
    targetDepth: "175° Arm Extension",
    guardRule: "Lumbar Hyperextension Flag",
    description: "Evaluates bilateral symmetry, elbow flare angle, and core compensation during press drive.",
  },
  {
    id: "pushup",
    name: "Standard Push-Up",
    category: "Upper Body",
    difficulty: "Beginner",
    primaryMuscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"],
    cameraPlacement: "Side profile, ground plane clearly visible",
    targetDepth: "90° Elbow Flexion",
    guardRule: "Sagittal Core Sagging",
    description: "Tracks full chest lockout, 45° tucked elbow path, and coronal plank line stability.",
  },
  {
    id: "front_squat",
    name: "Front Squat",
    category: "Lower Body",
    difficulty: "Advanced",
    primaryMuscles: ["Quadriceps", "Upper Back", "Core"],
    cameraPlacement: "Side profile, upright torso in view",
    targetDepth: "80° Knee Angle",
    guardRule: "Thoracic Collapse Warning",
    description: "Enforces strict upright torso angle, deep knee flexion, and stable elbow positioning.",
  },
  {
    id: "romanian_deadlift",
    name: "Romanian Deadlift (RDL)",
    category: "Posterior Chain",
    difficulty: "Intermediate",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    cameraPlacement: "Side view, hip hinge clearly visible",
    targetDepth: "75° Hip Hinge",
    guardRule: "Spine Rounding & Knee Bend",
    description: "Monitors pure hip hinge mechanics with static knee flexion and flat spinal curvature.",
  },
  {
    id: "forward_lunge",
    name: "Forward Lunge",
    category: "Lower Body",
    difficulty: "Intermediate",
    primaryMuscles: ["Quadriceps", "Gluteus Medius", "Hamstrings"],
    cameraPlacement: "Front or 45° angle, tracking both knees",
    targetDepth: "90° Lead Knee Flexion",
    guardRule: "Coronal Knee Inward Drift",
    description: "Measures unilateral stability, torso uprightness, and lead knee coronal alignment.",
  },
  {
    id: "bicep_curl",
    name: "Standing Bicep Curl",
    category: "Arms & Shoulders",
    difficulty: "Beginner",
    primaryMuscles: ["Biceps Brachii", "Brachialis", "Forearms"],
    cameraPlacement: "Side or front view, torso & elbows visible",
    targetDepth: "35° Peak Contraction",
    guardRule: "Elbow Translation & Back Swing",
    description: "Penalizes torso momentum and forward elbow drift during concentric flexion.",
  },
  {
    id: "lateral_raise",
    name: "Dumbbell Lateral Raise",
    category: "Arms & Shoulders",
    difficulty: "Beginner",
    primaryMuscles: ["Lateral Deltoid", "Upper Trapezius"],
    cameraPlacement: "Front view, full wingspan visible",
    targetDepth: "90° Shoulder Abduction",
    guardRule: "Trapezius Shrug Compensation",
    description: "Tracks smooth coronal arm elevation to 90° without shoulder shrugging.",
  },
  {
    id: "plank",
    name: "Isometric Forearm Plank",
    category: "Core & Stability",
    difficulty: "Beginner",
    primaryMuscles: ["Rectus Abdominis", "Transverse Abdominis"],
    cameraPlacement: "Side profile, head-to-heel in frame",
    targetDepth: "180° Neutral Line",
    guardRule: "Hip Sag or Pike (> 10°)",
    description: "Real-time posture stability measuring sagittal spine angle and hip height variance.",
  },
  {
    id: "goblet_squat",
    name: "Goblet Squat",
    category: "Lower Body",
    difficulty: "Beginner",
    primaryMuscles: ["Quadriceps", "Core", "Glutes"],
    cameraPlacement: "Front-facing or 45° angle",
    targetDepth: "85° Parallel Depth",
    guardRule: "Knee Valgus & Heel Lift",
    description: "Accessible squat pattern focusing on stance width, knee drive, and anterior load balance.",
  },
  {
    id: "bent_over_row",
    name: "Barbell Bent-Over Row",
    category: "Upper Body",
    difficulty: "Intermediate",
    primaryMuscles: ["Latissimus Dorsi", "Rhomboids", "Biceps"],
    cameraPlacement: "Side view, torso angle in view",
    targetDepth: "45° Torso Tilt",
    guardRule: "Torso Jerk & Spinal Flexion",
    description: "Tracks rigid torso angle while evaluating scapular retraction during row pull.",
  },
];

const CATEGORIES = [
  "All Protocols",
  "Lower Body",
  "Posterior Chain",
  "Upper Body",
  "Arms & Shoulders",
  "Core & Stability",
];

export default function WorkoutPage() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOption>(exercises[0]);
  const [activeCategory, setActiveCategory] = useState<string>("All Protocols");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [targetReps, setTargetReps] = useState<number>(10);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesCategory =
        activeCategory === "All Protocols" || ex.category === activeCategory;
      const matchesSearch =
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.primaryMuscles.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (sessionStarted) {
    return (
      <div className="space-y-4 max-w-7xl mx-auto">
        <button
          onClick={() => setSessionStarted(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Protocol Selector</span>
        </button>
        <LiveSession
          exerciseName={selectedExercise.name}
          exerciseId={selectedExercise.id}
          exerciseCategory={selectedExercise.category}
          targetReps={targetReps}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#141923] via-[#10151E] to-[#141923] p-6 rounded-3xl border border-[#232D42]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              MediaPipe BlazePose 3D | 19 Validated Protocols
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Biomechanics Protocol Selection
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Select a movement pattern to calibrate joint angle vectors, set real-time clinical thresholds, and stream telemetry to FastAPI.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 font-bold"
                  : "bg-[#0E1422] text-slate-400 border border-white/[0.08] hover:border-cyan-500/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search exercise or muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0E1422] border border-white/[0.08] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map((ex) => {
          const isSelected = selectedExercise.id === ex.id;
          return (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className={`p-[1px] rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? "bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-blue-600 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/50 scale-[1.01]"
                  : "bg-gradient-to-b from-white/[0.10] to-white/[0.02] hover:from-cyan-500/30 hover:to-blue-600/20 shadow-lg shadow-black/40"
              }`}
            >
              <div className="h-full w-full rounded-[calc(1rem-1px)] bg-[#0C111E] p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                            : "bg-[#141B2B] text-slate-400 border border-white/[0.08] group-hover:text-cyan-400 group-hover:border-cyan-500/30"
                        }`}
                      >
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
                          {ex.category}
                        </span>
                        <h3 className="font-bold text-base text-white leading-tight">
                          {ex.name}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                        ex.difficulty === "Beginner"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : ex.difficulty === "Intermediate"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {ex.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {ex.description}
                  </p>

                  {/* Primary Muscle Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {ex.primaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-slate-300 text-[10px] font-medium border border-white/[0.06]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Specs */}
                <div className="pt-3.5 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Target Clinical Depth:</span>
                    <span className="font-mono font-bold text-white text-xs">{ex.targetDepth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Guard Rule:</span>
                    <span className="font-mono text-[11px] font-bold text-amber-400">
                      {ex.guardRule}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Reps and Floating Launch Bar */}
      <div className="sticky bottom-6 z-40 p-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/40 via-blue-600/30 to-indigo-600/40 shadow-2xl shadow-black/80">
        <div className="rounded-[calc(1.5rem-1px)] bg-[#0C111E]/95 backdrop-blur-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
                Target Working Volume
              </span>
              <div className="flex items-center gap-2">
                {[8, 10, 12, 15, 20].map((count) => (
                  <button
                    key={count}
                    onClick={() => setTargetReps(count)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      targetReps === count
                        ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-black"
                        : "bg-[#070A12] text-slate-300 border border-white/10 hover:border-cyan-500/40"
                    }`}
                  >
                    {count} reps
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block border-l border-white/[0.08] pl-6">
              <span className="text-[10px] text-slate-400 block font-mono">SELECTED PROTOCOL:</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">
                {selectedExercise.name}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSessionStarted(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-6 pr-3 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 border border-cyan-300/30 transition-all active:scale-98 cursor-pointer"
          >
            <span>Launch Camera Session</span>
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <Play className="w-3.5 h-3.5 fill-current" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
