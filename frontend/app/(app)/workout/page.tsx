"use client";

import React, { useState } from "react";
import { Dumbbell, Play, Shield, Flame, Info } from "lucide-react";
import { LiveSession } from "@/components/workout/LiveSession";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ExerciseOption {
  id: string;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  primaryMuscles: string[];
  cameraPlacement: string;
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
    description: "Evaluates hip crease depth below knee level, knee valgus collapse, and lumbar flexion.",
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "Posterior Chain",
    difficulty: "Advanced",
    primaryMuscles: ["Hamstrings", "Erector Spinae", "Glutes", "Lats"],
    cameraPlacement: "Strict 90° side profile, barbell path in view",
    description: "Monitors neutral spine integrity, hip-to-shoulder synchronous drive, and lockout angle.",
  },
  {
    id: "overhead_press",
    name: "Overhead Dumbbell Press",
    category: "Upper Body Push",
    difficulty: "Intermediate",
    primaryMuscles: ["Anterior Deltoid", "Triceps", "Upper Traps"],
    cameraPlacement: "Front view, waist up to full overhead lockout",
    description: "Evaluates bilateral symmetry, elbow flare angle, and core hyperextension compensation.",
  },
  {
    id: "pushup",
    name: "Standard Push-Up",
    category: "Upper Body",
    difficulty: "Beginner",
    primaryMuscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"],
    cameraPlacement: "Side profile, ground plane clearly visible",
    description: "Tracks full chest lockout, elbow tucked angle (45°), and sagittal core plank alignment.",
  },
];

export default function WorkoutPage() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseOption>(exercises[0]);
  const [targetReps, setTargetReps] = useState<number>(10);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);

  if (sessionStarted) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSessionStarted(false)}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Exercise Selector
        </button>
        <LiveSession
          exerciseName={selectedExercise.name}
          targetReps={targetReps}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="info" size="sm">
            AI Vision Setup
          </Badge>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Select Biomechanics Protocol
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Choose an exercise to configure MediaPipe joint tracking thresholds and real-time form scoring.
        </p>
      </div>

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((ex) => {
          const isSelected = selectedExercise.id === ex.id;
          return (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-[#141923] border-cyan-500 shadow-xl shadow-cyan-950/30"
                  : "bg-[#0E121A] border-[#232D42] hover:border-[#3B4B6E] hover:bg-[#141923]/60"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                          : "bg-[#1A2234] text-slate-400 border border-[#232D42]"
                      }`}
                    >
                      <Dumbbell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{ex.name}</h3>
                      <span className="text-[11px] text-slate-400">{ex.category}</span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      ex.difficulty === "Beginner"
                        ? "success"
                        : ex.difficulty === "Intermediate"
                        ? "info"
                        : "warning"
                    }
                    size="sm"
                  >
                    {ex.difficulty}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {ex.description}
                </p>

                {/* Primary muscle tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ex.primaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="text-[10px] bg-[#1A2234] text-slate-300 px-2 py-0.5 rounded-md border border-[#232D42]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#232D42] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  {ex.cameraPlacement}
                </span>
                {isSelected && (
                  <span className="text-cyan-400 font-bold text-[11px]">SELECTED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Reps and Launch Panel */}
      <div className="bg-[#141923] border border-[#232D42] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Target Reps
            </label>
            <div className="flex items-center gap-2">
              {[8, 10, 12, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setTargetReps(count)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    targetReps === count
                      ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                      : "bg-[#0B0E14] text-slate-300 border border-[#232D42] hover:border-[#3B4B6E]"
                  }`}
                >
                  {count} reps
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block border-l border-[#232D42] pl-6">
            <span className="text-xs text-slate-400 block">Selected:</span>
            <span className="text-sm font-bold text-white">
              {selectedExercise.name}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setSessionStarted(true)}
          size="lg"
          variant="primary"
          className="w-full sm:w-auto font-bold shadow-xl shadow-cyan-500/30 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Launch Camera Session</span>
        </Button>
      </div>
    </div>
  );
}
