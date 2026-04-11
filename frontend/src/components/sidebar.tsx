"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Star, 
  CreditCard, 
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  Zap,
  HelpCircle
} from "lucide-react";

import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "New Repurpose", href: "/new-repurpose", icon: PlusCircle },
    { name: "History", href: "/history", icon: History },
    { name: "Vault", href: "/favorites", icon: Star },
    { name: "Credits", href: "/pricing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 flex-col p-8 bg-surface border-r border-white/5 font-sans z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-4 mb-16 px-2">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] group cursor-pointer">
          <Sparkles size={24} fill="currentColor" className="group-hover:rotate-12 transition-transform duration-500" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white leading-none font-heading tracking-tighter">ContentForge</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 mt-1.5 font-black">AI Alchemy</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 px-4">Navigation</p>
        {navItems.map((item) => {
          const isActive = mounted && pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                isActive
                  ? "bg-white/5 text-white border border-white/5 shadow-xl"
                  : "text-zinc-500 hover:text-zinc-100 hover:bg-white/[0.03]"
              )}
            >
              <div className="flex items-center gap-4">
                <Icon 
                  size={20} 
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "text-indigo-400 scale-110" : "text-zinc-600 group-hover:text-zinc-400"
                  )} 
                />
                <span className="text-sm font-bold">{item.name}</span>
              </div>
              {isActive && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,1)]" />
              )}
              {isActive && <ChevronRight size={14} className="text-indigo-400/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="mt-auto space-y-6">
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-all" />
          <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
            <Zap size={12} fill="currentColor" /> Premium
          </div>
          <p className="text-xs font-bold text-zinc-300 mb-4 leading-relaxed">Unlock advanced AI models and faster synthesis.</p>
          <Link href="/pricing" className="block w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20">
            Upgrade Now
          </Link>
        </div>

        <div className="space-y-1">
          <Link
            href="/help"
            className="flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
          >
            <HelpCircle size={20} className="group-hover:text-indigo-400 transition-colors" />
            <span className="text-sm font-bold">Support Center</span>
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-4 px-4 py-3.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-2xl transition-all group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-all" />
            <span className="text-sm font-bold">Sign Out</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
