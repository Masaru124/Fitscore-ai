import Link from "next/link";
import { Activity, ShieldAlert, Sparkles, ArrowRight, Video, BarChart3, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Navigation Header */}
      <header className="h-20 border-b border-[#232D42]/60 px-6 sm:px-12 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Activity className="w-5 h-5 text-white stroke-[2.5]" aria-hidden="true" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            FitScore <span className="text-cyan-400">AI</span>
          </span>
        </div>

        <nav aria-label="Main Navigation" className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors min-h-[44px] inline-flex items-center justify-center"
          >
            Sign In
          </Link>
          {/* Usability Fix #2: Secondary outline/ghost styling to establish clear visual hierarchy over hero CTA */}
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-cyan-400 hover:text-white bg-transparent hover:bg-cyan-500/10 border border-cyan-500/40 hover:border-cyan-400 px-5 py-2.5 rounded-xl transition-all min-h-[44px] inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl text-center z-10">
          {/* Usability Fix #4: Increased bottom margin for breathing room before H1 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>Next-Gen AI Biomechanics</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-6">
            Real-Time Exercise Quality &amp; Injury Prevention in Your Browser
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Zero special hardware. Point your standard webcam and get millisecond skeletal tracking,
            CNN-LSTM form classification, instant rep scoring (0–100), and proactive injury guards.
          </p>

          {/* Usability Fix #1 & #3: Explicit min-h-[48px], h-12, border-box alignment, and identical vertical center axis */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/workout"
              className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 border border-transparent box-border inline-flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0B0E14]"
            >
              <Video className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span>Start Live Workout</span>
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-xl bg-[#141923] hover:bg-[#1A2234] text-slate-200 hover:text-white border border-[#232D42] hover:border-[#3B4B6E] font-semibold text-base box-border inline-flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-[#0B0E14]"
            >
              <BarChart3 className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
              <span>Explore Analytics</span>
            </Link>
          </div>

          {/* Usability Fix #5: Increased vertical clearance (mt-16 sm:mt-20 pt-10) to eliminate bottom-viewport clutter */}
          <section
            aria-label="Core Capabilities"
            className="mt-16 sm:mt-20 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#232D42]/60"
          >
            <div className="p-5 rounded-xl bg-[#141923]/60 border border-[#232D42]">
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold mb-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>&lt;100ms Latency</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                MediaPipe on-device inference combined with lightweight WebSocket streaming.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141923]/60 border border-[#232D42]">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-1.5">
                <Activity className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>FitScore 0–100</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-metric weighted scoring: ROM, tempo, symmetry, and joint stability.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141923]/60 border border-[#232D42]">
              <div className="flex items-center gap-2 text-amber-400 text-sm font-bold mb-1.5">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Injury Risk Warning</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detects knee valgus, lumbar rounding, and dangerous joint shear force.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-[#232D42]/50 text-center text-xs text-slate-500">
        FitScore AI Biomechanics Platform • Built with Next.js 16 App Router &amp; FastAPI
      </footer>
    </div>
  );
}
