"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import {
  Activity,
  LayoutDashboard,
  Dumbbell,
  History,
  FileText,
  User,
  LogOut,
  Zap,
  BookOpen,
  Cpu,
  Radio,
  ArrowUpRight,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await logoutAction();
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // fallback
    }
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Start Workout", href: "/workout", icon: Dumbbell, highlight: true },
    { name: "Workout History", href: "/history", icon: History },
    { name: "Reports & Analytics", href: "/reports", icon: FileText },
    { name: "My Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="w-68 flex-shrink-0 bg-[#090D15]/90 backdrop-blur-2xl border-r border-white/[0.07] flex flex-col justify-between hidden md:flex min-h-screen relative z-40">
      {/* Brand Header */}
      <div>
        <div className="h-20 flex items-center px-6 gap-3.5 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20">
            <Activity className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              FitScore <span className="text-cyan-400 font-black">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-semibold">
              KINETIC INTELLIGENCE
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1.5">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 font-semibold">
            Telemetry Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-white border border-cyan-500/30 shadow-sm shadow-cyan-950/30 font-semibold"
                    : item.highlight
                    ? "text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 font-semibold"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                )}
                <Icon
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-cyan-400"
                      : item.highlight
                      ? "text-cyan-400"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span>{item.name}</span>

                {item.highlight && !isActive && (
                  <span className="ml-auto text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Live
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status & Session telemetry */}
      <div className="p-4 space-y-3 pb-8 border-t border-white/[0.06]">
        <div className="p-3.5 rounded-2xl bg-[#0F1524] border border-white/[0.06] shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-slate-200">Vision Engine</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
              60 FPS
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            MediaPipe BlazePose 3D keypoint inference online
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer text-left disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          <span>{signingOut ? "Signing out..." : "Sign Out Session"}</span>
        </button>
      </div>
    </aside>
  );
};
