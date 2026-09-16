"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  Dumbbell,
  History,
  FileText,
  User,
  LogOut,
  Zap,
} from "lucide-react";

// ponytail: Lean navigation sidebar with path matching and active states
export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Start Workout", href: "/workout", icon: Dumbbell, highlight: true },
    { name: "Workout History", href: "/history", icon: History },
    { name: "Reports & Analytics", href: "/reports", icon: FileText },
    { name: "My Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0E121A] border-r border-[#232D42] flex flex-col justify-between hidden md:flex min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-[#232D42]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Activity className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              FitScore <span className="text-cyan-400 font-bold">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Biomechanics Lab
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/15 to-blue-600/10 text-cyan-400 border border-cyan-500/30 font-semibold"
                    : item.highlight
                    ? "text-slate-200 hover:bg-[#1A2234] hover:text-white border border-dashed border-cyan-500/20"
                    : "text-slate-400 hover:bg-[#141923] hover:text-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
                {item.highlight && !isActive && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                    <Zap className="w-2.5 h-2.5" /> LIVE
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* System status & logout */}
      <div className="p-4 border-t border-[#232D42] space-y-3">
        <div className="bg-[#141923] p-3 rounded-xl border border-[#232D42] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">Vision Engine</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            READY
          </span>
        </div>

        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};
