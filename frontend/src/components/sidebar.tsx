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
  Sparkles
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
    { name: "Favorites", href: "/favorites", icon: Star },
    { name: "Credits & Billing", href: "/pricing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col p-6 bg-surface-container h-screen w-64 border-r border-white/5 font-sans text-sm font-medium z-50">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
          <Sparkles size={20} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-lg font-black text-white leading-none font-heading tracking-tight">ContentForge</h1>
          <p className="text-[10px] uppercase tracking-widest text-indigo-400 mt-1 font-bold">AI Alchemy</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = mounted && pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 group relative",
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              )}
              <Icon 
                size={18} 
                className={cn(
                  "transition-colors duration-300",
                  isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                )} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/5 pt-6">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-100 hover:bg-white/5 rounded-xl transition-colors duration-300 group"
        >
          <LogOut size={18} className="group-hover:text-red-400 transition-colors" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
