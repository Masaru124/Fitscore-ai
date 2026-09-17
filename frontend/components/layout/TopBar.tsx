"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { Bell, ShieldCheck, Flame, ArrowUpRight, Sparkles, Activity, LogOut } from "lucide-react";

export const TopBar: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logoutAction();
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.href = "/login";
  };
  return (
    <header className="h-20 border-b border-white/[0.06] bg-[#090D15]/80 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile brand header */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="font-extrabold text-sm text-white tracking-tight">FitScore <span className="text-cyan-400">AI</span></span>
      </div>

      {/* Telemetry pill badges */}
      <div className="hidden md:flex items-center gap-3 text-xs">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1524] border border-white/[0.08] shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-medium">Kinematic Guard:</span>
          <span className="text-emerald-400 font-semibold font-mono">ENFORCING</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1524] border border-white/[0.08] shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400 font-medium">Streak:</span>
          <span className="text-amber-400 font-bold font-mono">5 DAYS</span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/workout"
          className="group inline-flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all duration-200 active:scale-98"
        >
          <span>Live Session</span>
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
            <Sparkles className="w-3 h-3 text-white" />
          </span>
        </Link>

        {/* User avatar badge */}
        <Link
          href="/profile"
          className="flex items-center gap-3 pl-2 pr-3.5 py-1.5 rounded-full bg-[#0F1524] border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-inner ring-2 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all">
            MV
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight">Dr. Marcus Vance</p>
            <p className="text-[9px] text-cyan-400 leading-tight font-mono font-semibold">BIOMECHANICS PRO</p>
          </div>
        </Link>

        {/* Quick Sign Out Action */}
        <button
          type="button"
          onClick={handleSignOut}
          title="Sign Out"
          className="w-8 h-8 rounded-full bg-[#0F1524] border border-white/[0.08] hover:border-red-500/40 hover:bg-red-500/10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
