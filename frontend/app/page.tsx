"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  Award,
  CheckCircle2,
  Play,
  FileText,
  Lock,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const protocols = [
    { name: "Barbell Back Squat", category: "lower", depth: "85° Knee Flexion", level: "Intermediate", target: "Quadriceps & Glutes" },
    { name: "Conventional Deadlift", category: "posterior", depth: "180° Full Lockout", level: "Advanced", target: "Posterior Chain" },
    { name: "Overhead Dumbbell Press", category: "upper", depth: "175° Arm Extension", level: "Intermediate", target: "Deltoids & Trapezius" },
    { name: "Standard Push-Up", category: "upper", depth: "90° Elbow Flexion", level: "Beginner", target: "Pectorals & Triceps" },
    { name: "Front Squat", category: "lower", depth: "80° Knee Angle", level: "Advanced", target: "Anterior Core & Quads" },
    { name: "Romanian Deadlift (RDL)", category: "posterior", depth: "75° Hip Hinge", level: "Intermediate", target: "Hamstrings & Lower Back" },
    { name: "Isometric Forearm Plank", category: "core", depth: "180° Neutral Line", level: "Beginner", target: "Transverse Abdominis" },
    { name: "Dumbbell Lateral Raise", category: "upper", depth: "90° Shoulder Abduction", level: "Beginner", target: "Lateral Deltoids" },
  ];

  const filteredProtocols =
    activeCategory === "all"
      ? protocols
      : protocols.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#06080D] text-slate-100 selection:bg-cyan-500 selection:text-black relative overflow-hidden">
      {/* Background Ambient Glow Meshes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-cyan-500/12 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-indigo-600/8 blur-[140px] pointer-events-none -z-10" />

      {/* Floating Island Navigation */}
      <header className="sticky top-6 z-50 max-w-6xl mx-auto px-4">
        <div className="h-16 rounded-full bg-[#0E1422]/80 backdrop-blur-2xl border border-white/[0.08] px-6 flex items-center justify-between shadow-2xl shadow-black/60">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              FitScore <span className="text-cyan-400 font-black">AI</span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                CLINICAL PRO
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#pillars" className="hover:text-cyan-400 transition-colors">Four Pillars</a>
            <a href="#protocols" className="hover:text-cyan-400 transition-colors">19 Protocols</a>
            <Link href="/workout" className="hover:text-cyan-400 transition-colors">Live Studio</Link>
            <a href="/login" className="hover:text-white transition-colors">Sign In</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-98"
            >
              <span>Launch App</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        {/* Micro-Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-8 shadow-sm shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>CLINICAL BIOMECHANICS &amp; DEEP LEARNING</span>
        </div>

        {/* Main Value Proposition Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto mb-6">
          Real-Time Exercise Quality &amp;{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Dynamic Injury Prevention
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
          Transform any standard webcam into a clinical-grade motion capture lab. Extract 33 3D anatomical landmarks via MediaPipe BlazePose, classify 19 movements with a CNN-BiLSTM sequence model, and enforce 4-pillar quality scoring with millisecond injury guards.
        </p>

        {/* Action Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/workout"
            className="group inline-flex items-center gap-3 pl-6 pr-3 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 border border-cyan-300/30 transition-all active:scale-98"
          >
            <span>Start Live Workout</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <Play className="w-4 h-4 fill-white" />
            </span>
          </Link>

          <Link
            href="/register"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F1524] hover:bg-[#141C30] text-slate-200 hover:text-white border border-white/10 hover:border-cyan-500/40 font-semibold text-sm shadow-lg shadow-black/40 transition-all active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </Link>

          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            <span>Explore Analytics Cockpit</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Machined Double-Bezel Holographic Simulator Preview */}
        <div className="max-w-5xl mx-auto p-[1px] rounded-3xl bg-gradient-to-b from-white/[0.15] via-white/[0.05] to-transparent shadow-2xl shadow-cyan-950/30">
          <div className="rounded-[calc(1.5rem-1px)] bg-[#0A0E18] border border-white/[0.08] overflow-hidden tactical-grid relative p-6 sm:p-8">
            {/* Top Mock Window Header */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                  FitScore AI • Biomechanics Live Kinematics (60 FPS)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  LATENCY: 52.8ms
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  FSM: CONCENTRIC (ASCENT)
                </span>
              </div>
            </div>

            {/* Simulated Live Viewport */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Skeleton Wireframe Canvas Mock */}
              <div className="lg:col-span-7 h-80 relative rounded-2xl bg-[#070A12] border border-white/[0.06] flex items-center justify-center scanline overflow-hidden">
                <svg className="w-full h-full p-4" viewBox="0 0 400 300" fill="none">
                  {/* Grid Lines */}
                  <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(0, 242, 254, 0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(0, 242, 254, 0.05)" strokeDasharray="4 4" />

                  {/* Skeletal Connections */}
                  <line x1="200" y1="70" x2="200" y2="110" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="160" y1="110" x2="240" y2="110" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="160" y1="110" x2="140" y2="150" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="140" y1="150" x2="135" y2="185" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="240" y1="110" x2="260" y2="150" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="260" y1="150" x2="265" y2="185" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="200" y1="110" x2="200" y2="180" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="175" y1="180" x2="225" y2="180" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="175" y1="180" x2="155" y2="235" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="155" y1="235" x2="160" y2="285" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="225" y1="180" x2="245" y2="235" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />
                  <line x1="245" y1="235" x2="240" y2="285" stroke="#00F2FE" strokeWidth="4" strokeLinecap="round" />

                  {/* Joint Landmark Spheres */}
                  <circle cx="200" cy="55" r="14" fill="#070A12" stroke="#00F2FE" strokeWidth="3" />
                  <circle cx="160" cy="110" r="5" fill="#FFFFFF" />
                  <circle cx="240" cy="110" r="5" fill="#FFFFFF" />
                  <circle cx="140" cy="150" r="4" fill="#FFFFFF" />
                  <circle cx="260" cy="150" r="4" fill="#FFFFFF" />
                  <circle cx="175" cy="180" r="5" fill="#FFFFFF" />
                  <circle cx="225" cy="180" r="5" fill="#FFFFFF" />
                  <circle cx="155" cy="235" r="6" fill="#00F2FE" />
                  <circle cx="245" cy="235" r="6" fill="#00F2FE" />
                  <circle cx="160" cy="285" r="5" fill="#FFFFFF" />
                  <circle cx="240" cy="285" r="5" fill="#FFFFFF" />
                </svg>

                {/* Floating Angle Overlays */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/30 text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400">Left Knee Flexion</p>
                  <p className="text-sm font-mono font-black text-cyan-400">84.2° <span className="text-[10px] text-emerald-400 font-bold">(Target: 80°–90°)</span></p>
                </div>

                <div className="absolute bottom-4 right-4 p-2 rounded-xl bg-black/70 backdrop-blur-md border border-emerald-500/30 text-right">
                  <p className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" /> Knee Valgus Guard: Passed (Δ 1.8°)
                  </p>
                </div>
              </div>

              {/* Real-Time Telemetry Breakdown */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <div className="p-4 rounded-2xl bg-[#0F1524] border border-white/[0.08]">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Repetition Quality Score
                  </p>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <span className="text-4xl font-black text-white font-mono">92.4 <span className="text-sm text-slate-400 font-normal">/ 100</span></span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Tier 1 Elite
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[92.4%]" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Range of Motion (35%)</span>
                    <span className="font-mono text-cyan-400 font-bold">96.0%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Cadence &amp; Tempo (25%)</span>
                    <span className="font-mono text-blue-400 font-bold">88.5% (2.4s)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Bilateral Symmetry (20%)</span>
                    <span className="font-mono text-emerald-400 font-bold">98.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Joint Stability (20%)</span>
                    <span className="font-mono text-amber-400 font-bold">87.0%</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 flex-shrink-0 text-cyan-400 mt-0.5" />
                  <span>
                    <strong className="text-white">Voice Coach:</strong> “Drive through mid-foot. Perfect hip-crease depth below parallel.”
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Biomechanical Pillars — Asymmetrical Bento Grid */}
      <section id="pillars" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
            CLINICAL METHODOLOGY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Four-Pillar FitScore Index
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Unlike binary repetition counters, FitScore AI evaluates the four fundamental components of human movement mechanics validated in clinical literature.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Bento Card 1: ROM (Span 7) */}
          <div className="col-span-12 lg:col-span-7">
            <Card hoverEffect className="h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <Badge variant="cyan" dot>35% Calibrated Weight</Badge>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Range of Motion (ROM) Score</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Evaluates joint angle inflection relative to target clinical thresholds. Applies Gaussian decay modeling to reward exact anatomical depth without damaging overextension.
              </p>

              <div className="p-4 rounded-xl bg-[#080C14] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Parallel Depth Gaussian Curve</span>
                  <span className="text-cyan-400 font-bold">σ = 12.0°</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[94%]" />
                </div>
              </div>
            </Card>
          </div>

          {/* Bento Card 2: Symmetry (Span 5) */}
          <div className="col-span-12 lg:col-span-5">
            <Card hoverEffect className="h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <Badge variant="success" dot>20% Weight</Badge>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Bilateral Symmetry Index</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Measures contralateral limb angular discrepancy. Flags unilateral pelvic tilting and uncompensated weight distribution before soft-tissue injury occurs.
              </p>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                Max Allowable Discrepancy: &lt; 5.0%
              </div>
            </Card>
          </div>

          {/* Bento Card 3: Cadence & Tempo (Span 5) */}
          <div className="col-span-12 lg:col-span-5">
            <Card hoverEffect className="h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <Badge variant="info" dot>25% Weight</Badge>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Cadence &amp; Eccentric Tempo</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Enforces a strict 2.0s–3.0s eccentric deceleration phase to maximize muscle fiber recruitment and eliminate dangerous ballistic momentum bounces.
              </p>

              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
                Optimal Eccentric Window: 2.5s ± 0.3s
              </div>
            </Card>
          </div>

          {/* Bento Card 4: Stability (Span 7) */}
          <div className="col-span-12 lg:col-span-7">
            <Card hoverEffect className="h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <Badge variant="warning" dot>20% Weight</Badge>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Spinal &amp; Joint Stability</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Penalizes second-derivative coronal wobble and sagittal spinal curvature. Immediately flags lumbar hyperextension or thoracic collapse.
              </p>

              <div className="p-4 rounded-xl bg-[#080C14] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Lumbar Lordosis Neutrality Threshold</span>
                  <span className="text-amber-400 font-bold">&gt; 65.0° Sagittal</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[88%]" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Protocols Showcase */}
      <section id="protocols" className="py-24 px-6 max-w-6xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
              EXERCISE PROTOCOLS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              19 Validated Biomechanical Models
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Trained on multi-angle kinetic video recordings with clinical ground truth.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0F1524] border border-white/[0.08] overflow-x-auto">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProtocols.map((p, idx) => (
            <Card key={idx} hoverEffect className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {p.level}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{p.depth}</span>
              </div>
              <h4 className="text-base font-bold text-white">{p.name}</h4>
              <p className="text-xs text-slate-400 leading-snug">{p.target}</p>
              <Link
                href="/workout"
                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1"
              >
                <span>Launch Protocol</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-white/[0.06] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-300">FitScore AI</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span>Real-Time Biomechanical Intelligence &amp; Injury Prevention</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/workout" className="hover:text-cyan-400 transition-colors">
            Live Protocols
          </Link>
          <Link href="/login" className="hover:text-cyan-400 transition-colors">
            Athlete Portal
          </Link>
          <Link href="/register" className="hover:text-cyan-400 transition-colors">
            Create Account
          </Link>
        </div>
      </footer>
    </div>
  );
}
