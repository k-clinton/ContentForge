"use client";

import Link from "next/link";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Activity,
  Zap
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || "";
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(q);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userData, setUserData] = useState<{ name?: string; email?: string; plan?: string; credits?: number } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/history?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/history`);
    }
  };

  const handleInputChange = (val: string) => {
    setSearchQuery(val);
    // If we're already on a results-capable page like history or dashboard, 
    // we could update the URL immediately with debounce, 
    // but for now, we'll wait for Enter or just let the user type.
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const formatCredits = (credits?: number) => {
    if (credits === undefined || credits === null) return "0";
    return credits.toLocaleString();
  };

  return (
    <header className="flex justify-between items-center w-full px-12 py-6 bg-surface/80 backdrop-blur-xl border-b border-white/5 font-heading tracking-tight font-semibold z-40 sticky top-0 transition-all duration-500">
      <div className="flex items-center gap-12">
        <div>
          <h2 className="text-xl font-black tracking-tighter text-white font-heading">{title}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Forge Engine Active</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 group focus-within:border-indigo-500/30 focus-within:bg-white/[0.08] transition-all duration-500 w-[400px]">
          <Search size={16} className="text-zinc-500 group-focus-within:text-indigo-400 group-focus-within:scale-110 transition-all" />
          <input 
            type="text" 
            placeholder="Search your library..." 
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-full font-sans font-medium"
          />
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-md border border-white/5 text-[10px] text-zinc-600 font-black">
            <span className="opacity-50">ENTER</span>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2">
          <Link href="/notifications" className="p-3 text-zinc-400 hover:text-indigo-400 hover:bg-white/5 rounded-2xl transition-all relative group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-surface group-hover:scale-125 transition-transform" />
          </Link>
          <Link href="/activity" className="p-3 text-zinc-400 hover:text-indigo-400 hover:bg-white/5 rounded-2xl transition-all">
            <Activity size={20} />
          </Link>
          <div className="h-8 w-[1px] bg-white/5 mx-2" />
          <button className="flex items-center gap-3 px-5 py-2.5 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-2xl border border-indigo-500/20 transition-all group">
            <Zap size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-black tracking-tight">{formatCredits(userData?.credits)}</span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 bg-white/5 hover:bg-white/10 rounded-[1.25rem] border border-white/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10 overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform">
               <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs">{getInitials(userData?.name)}</div>
            </div>
            <div className="hidden sm:block text-left px-1">
              <p className="text-xs font-black text-white leading-tight">{userData?.name || "User"}</p>
              <p className="text-[10px] font-bold text-indigo-400/70 uppercase tracking-widest leading-tight">{userData?.plan || "Free Member"}</p>
            </div>
            <ChevronDown size={14} className={`text-zinc-500 mr-2 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-surface-container/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
              <div className="p-4 border-b border-white/5 mb-2">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Signed in as</p>
                <p className="text-sm font-bold text-white truncate">{userData?.email || "user@example.com"}</p>
              </div>
              <div className="space-y-1">
                <Link href="/settings?section=account" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                  <User size={18} className="group-hover:text-indigo-400 transition-colors" />
                  <span className="text-sm font-bold">Profile Settings</span>
                </Link>
                <Link href="/settings?section=workspace" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
                  <Settings size={18} className="group-hover:text-indigo-400 transition-colors" />
                  <span className="text-sm font-bold">System Preferences</span>
                </Link>
                <div className="h-[1px] bg-white/5 my-2 mx-4" />
                <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all group">
                  <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-bold">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
