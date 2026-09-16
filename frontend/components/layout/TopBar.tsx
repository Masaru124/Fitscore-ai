"use client";

import React from "react";
import Link from "next/link";
import { Bell, ShieldCheck, Flame } from "lucide-react";

// ponytail: TopBar displaying real-time system status and user indicators
export const TopBar: React.FC = () => {
  return (
    <header className="h-16 border-b border-[#232D42] bg-[#0E121A]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile brand header fallback */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
          <span className="font-extrabold text-white text-xs">FS</span>
        </div>
        <span className="font-bold text-sm text-white">FitScore AI</span>
      </div>

      {/* Breadcrumb / status indicator */}
      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141923] border border-[#232D42]">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-medium">Kinematic Guard:</span>
          <span className="text-emerald-400 font-semibold">Active</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141923] border border-[#232D42]">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300 font-medium">Streak:</span>
          <span className="text-amber-400 font-bold">5 Days</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="w-9 h-9 rounded-lg bg-[#141923] border border-[#232D42] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#3B4B6E] transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
        </button>

        {/* User avatar badge */}
        <Link
          href="/profile"
          className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl bg-[#141923] border border-[#232D42] hover:border-[#3B4B6E] transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            JD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">John Doe</p>
            <p className="text-[10px] text-cyan-400 leading-tight font-mono">PRO MEMBER</p>
          </div>
        </Link>
      </div>
    </header>
  );
};
