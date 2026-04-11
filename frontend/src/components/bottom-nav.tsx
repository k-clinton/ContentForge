"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PlusCircle, History, Star } from "lucide-react";
import { useState, useEffect } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "New", href: "/new-repurpose", icon: PlusCircle },
    { name: "History", href: "/history", icon: History },
    { name: "Favorites", href: "/favorites", icon: Star },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-surface-container border-t border-white/5 flex items-center justify-around px-8 z-50 pb-4">
      {navItems.map((item) => {
        const isActive = mounted && pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-2 transition-colors duration-300 relative group",
              isActive ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {isActive && (
              <div className="absolute -top-4 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm" />
            )}
            <Icon 
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              className={cn(
                "transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-110"
              )}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
