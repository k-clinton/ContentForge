"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Activity, 
  Zap, 
  Clock, 
  RefreshCw, 
  ChevronRight,
  BarChart3,
  Flame,
  Cpu,
  ArrowUpRight,
  Loader2,
  AlertCircle
} from "lucide-react";

const stats = [
  { label: "Synthesis Rate", value: "98.2%", icon: Cpu, color: "text-indigo-400" },
  { label: "Active Nodes", value: "14", icon: Flame, color: "text-amber-400" },
  { label: "Total Forge Time", value: "1,240h", icon: Clock, color: "text-purple-400" },
  { label: "Avg. ROI", value: "4.8x", icon: BarChart3, color: "text-emerald-400" },
];

export default function ActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch("http://localhost:8080/api/activity", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch activity logs");

        const data = await response.json();
        setActivities(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);
  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Engine Activity" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Header Section */}
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 w-fit mb-4">
              Diagnostic Feed
            </div>
            <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4">
              Forge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Activity</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Real-time telemetry and operation logs from your synthesis engine.</p>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Activity List */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-xl font-black font-heading text-white flex items-center gap-3">
                <RefreshCw size={20} className="text-indigo-400 animate-spin-slow" />
                Live Operation Feed
              </h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all">
                  Export Log
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Operation</th>
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Engine</th>
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tokens</th>
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Impact</th>
                    <th className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center">
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-4" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Loading Telemetry...</span>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center">
                        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">{error}</span>
                      </td>
                    </tr>
                  ) : activities.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-10 py-20 text-center">
                        <Activity className="w-8 h-8 text-zinc-700 mx-auto mb-4" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">No recent operations</span>
                      </td>
                    </tr>
                  ) : activities.map((act) => (
                    <tr key={act.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-10 py-8">
                        <div className="font-bold text-white mb-1">{act.task}</div>
                        <div className="text-xs text-zinc-600">ID: FORGE-{act.id.slice(-4).toUpperCase()}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                          <span className="text-sm font-medium text-zinc-400">{act.engine}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="w-full max-w-[120px]">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${act.progress === 100 ? 'text-emerald-400' : 'text-indigo-400'}`}>
                              {act.status}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-600">{act.progress}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${act.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                              style={{ width: `${act.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-sm font-mono text-zinc-500">{act.tokens}</td>
                      <td className="px-10 py-8">
                        <span className={`text-xs font-bold ${act.impact.startsWith('+') ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {act.impact}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <span className="text-xs font-bold text-zinc-600">{new Date(act.createdAt).toLocaleDateString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-white/[0.02] border-t border-white/5 text-center">
              <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                View full audit trail
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
