"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle, History, Star, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "New", href: "/new-repurpose", icon: PlusCircle },
    { name: "Archive", href: "/history", icon: History },
    { name: "Vault", href: "/vault", icon: Star },
    { name: "Config", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-surface/80 backdrop-blur-2xl border border-white/10 flex items-center justify-around px-6 z-50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const isActive = mounted && pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300 relative group",
              isActive ? "text-indigo-400 scale-110" : "text-zinc-500"
            )}
          >
            <Icon 
              size={22}
              strokeWidth={isActive ? 2.5 : 2}
              className={cn(
                "transition-transform duration-300",
                isActive ? "drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "group-active:scale-90"
              )}
            />
            <span className="text-[9px] font-black uppercase tracking-widest">{item.name}</span>
            {isActive && (
              <div className="absolute -bottom-2 w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,1)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
