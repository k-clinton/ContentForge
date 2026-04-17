"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import {
  Zap,
  Clock,
  FileText,
  Wallet,
  Video,
  Mic,
  Type,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ name?: string; credits?: number } | null>(null);
  const [stats, setStats] = useState({ totalGenerated: 0, creditsUsed: 0, creditLimit: 2000 });
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    // Fetch stats from backend
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        
        // Fetch history to count total generated
        const [historyRes] = await Promise.all([
          fetch(`${apiUrl}/api/history`, {
            headers: { "Authorization": `Bearer ${token}` }
          })
        ]);

        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setStats(prev => ({ ...prev, totalGenerated: historyData.length }));
          setRecentJobs(historyData.slice(0, 2));
        }
      } catch {
        console.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getFirstName = (name?: string) => {
    if (!name) return "Creator";
    return name.trim().split(" ")[0];
  };

  const creditPercentage = userData && userData.credits !== undefined 
    ? ((userData.credits / stats.creditLimit) * 100).toFixed(0)
    : 0;

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('video') || p.includes('youtube')) return <Video size={24} />;
    if (p.includes('audio') || p.includes('podcast') || p.includes('mic')) return <Mic size={24} />;
    return <Type size={24} />;
  };

  const getPlatformBgIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('video') || p.includes('youtube')) return <Video size={64} />;
    if (p.includes('audio') || p.includes('podcast') || p.includes('mic')) return <Mic size={64} />;
    return <Type size={64} />;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full -z-10" />

        <TopNav title="Dashboard" />
        <div className="px-8 pb-12 max-w-7xl mx-auto">
          {/* Welcome Header Section */}
          <section className="mt-12 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-5xl font-black tracking-tight text-white mb-3 font-heading leading-tight">
                   Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{getFirstName(userData?.name)}</span>
                </h1>
                <p className="text-zinc-400 text-lg font-medium">What magic are we crafting today?</p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl px-8 py-5 rounded-2xl flex items-center gap-4 border border-white/5 shadow-2xl relative group overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 ring-1 ring-indigo-500/30">
                  <Clock size={24} />
                </div>
                <div className="relative z-10">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">Weekly Momentum</span>
                  <p className="text-white font-semibold flex items-center gap-2">
                    Saved <span className="text-indigo-400 font-black text-xl">18.4h</span>
                    <TrendingUp size={14} className="text-emerald-400" />
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Grid - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 mb-12">
            <div className="md:col-span-3 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative overflow-hidden group animate-in fade-in zoom-in-95 duration-500 delay-100">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 blur-[60px] group-hover:bg-indigo-500/20 transition-all duration-700 rounded-full" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-zinc-400 mb-6 border border-white/5">
                  <FileText size={24} />
                </div>
                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-bold mb-2">Total Generated</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-5xl font-black text-white font-heading tracking-tighter">{stats.totalGenerated.toLocaleString()}</h3>
                  <span className="mb-2 text-emerald-400 text-sm font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    <TrendingUp size={12} /> +12%
                  </span>
                </div>
                <div className="mt-8 flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex-1 h-12 bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute bottom-0 left-0 w-full bg-indigo-500/30" style={{ height: `${20 + Math.random() * 60}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative overflow-hidden group animate-in fade-in zoom-in-95 duration-500 delay-200">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 blur-[60px] group-hover:bg-purple-500/20 transition-all duration-700 rounded-full" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-zinc-400 mb-6 border border-white/5">
                  <Wallet size={24} />
                </div>
                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase font-bold mb-2">Credits Remaining</p>
                <h3 className="text-5xl font-black text-white font-heading tracking-tighter">{userData?.credits?.toLocaleString() || 0} <span className="text-zinc-600 text-2xl font-medium">/ {stats.creditLimit.toLocaleString()}</span></h3>
                <div className="w-full bg-white/5 h-2 rounded-full mt-10 overflow-hidden ring-1 ring-white/5">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full relative" style={{ width: `${creditPercentage}%` }}>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite] translate-x-[-100%]" />
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] uppercase font-black tracking-widest text-zinc-500">
                  <span>Usage Cycle: 12 days left</span>
                  <button className="text-indigo-400 hover:text-indigo-300">Upgrade</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Recent Repurposes */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center mb-2 px-2">
                <h2 className="text-2xl font-bold text-white font-heading tracking-tight flex items-center gap-3">
                  Recent Alchemy
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                </h2>
                <button className="text-zinc-500 text-sm hover:text-indigo-400 transition-colors font-bold uppercase tracking-widest flex items-center gap-2">
                  Full Journal <ExternalLink size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentJobs.length > 0 ? (
                  recentJobs.map((job) => (
                    <div key={job.id} className="bg-white/5 hover:bg-white/[0.08] p-6 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 text-zinc-800 opacity-20 group-hover:opacity-40 transition-opacity">
                        {getPlatformBgIcon(job.platform)}
                      </div>
                      <div className="relative z-10">
                        <div className="flex gap-4 items-center mb-6">
                          <div className={`w-12 h-12 ${job.platform.toLowerCase().includes('video') ? 'bg-purple-500/20 text-purple-400' : 'bg-indigo-500/20 text-indigo-400'} rounded-2xl flex items-center justify-center ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                            {getPlatformIcon(job.platform)}
                          </div>
                          <div>
                            <h4 className="text-white font-bold group-hover:text-indigo-300 transition-colors truncate max-w-[150px]">
                              {job.platform} Synthesis
                            </h4>
                            <p className="text-zinc-500 text-xs font-medium">{getTimeAgo(job.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Finalized</span>
                          <div className="flex items-center gap-1 text-indigo-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
                            Review <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 bg-white/5 border border-dashed border-white/10 p-12 rounded-3xl flex flex-col items-center justify-center text-center group transition-colors hover:border-indigo-500/30">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-600 mb-4 group-hover:text-indigo-400">
                      <Zap size={32} />
                    </div>
                    <p className="text-zinc-400 font-bold">No alchemy yet</p>
                    <p className="text-zinc-600 text-sm mt-1 mb-6">Start your first repurpose to see it here</p>
                    <button className="bg-indigo-600/20 text-indigo-400 px-6 py-2 rounded-xl text-sm font-bold border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all">
                      Create Transformation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-indigo-600 p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 lg:sticky lg:top-32">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-2xl font-black font-heading tracking-tight">Quick Start</h2>
                </div>
                
                <div className="space-y-3">
                  {[
                    { icon: Mic, label: "Audio to Post", type: "audio", color: "white/10" },
                    { icon: Video, label: "Video to Reel", type: "video", color: "white/10" },
                    { icon: Type, label: "Text to Thread", type: "text", color: "white/10" }
                  ].map((action, i) => (
                    <button 
                      key={i} 
                      onClick={() => router.push(`/new-repurpose?type=${action.type}`)}
                      className="w-full flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all group border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <action.icon size={18} className="text-indigo-200" />
                        <span className="font-bold text-sm">{action.label}</span>
                      </div>
                      <PlusCircle size={18} className="text-indigo-300 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-indigo-700/50 rounded-3xl border border-white/10">
                  <div className="flex items-center gap-2 text-indigo-200 font-black text-[10px] uppercase tracking-widest mb-3">
                    <Zap size={12} fill="currentColor" /> Pro Tip
                  </div>
                  <p className="text-sm text-indigo-100/80 leading-relaxed font-medium mb-6">
                    Connect your YouTube account to automatically repurpose new uploads as they go live.
                  </p>
                  <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
