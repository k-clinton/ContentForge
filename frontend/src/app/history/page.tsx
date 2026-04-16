"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import {
  Search,
  Calendar,
  Filter,
  ChevronDown,
  Eye,
  Clock,
  Globe,
  Share2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { SynthesisJob } from "@/lib/types";

export default function History() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || "";
  
  const [historyItems, setHistoryItems] = useState<SynthesisJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(q);

  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/history`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();
        setHistoryItems(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = historyItems.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.platform?.toLowerCase().includes(query) ||
      item.voice?.toLowerCase().includes(query) ||
      item.outputText?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="History & Archive" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-12">
                <div className="max-w-xl">
                  <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 w-fit mb-4">
                    Archive
                  </div>
                  <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4">
                    Synthesis <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">History</span>
                  </h1>
                  <p className="text-zinc-500 text-lg font-medium">Revisit and refine your previous content transformations.</p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="relative group flex-1 lg:flex-none lg:w-80">
                      <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        className="w-full bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-zinc-700 focus:border-indigo-500/30 transition-all outline-none font-medium"
                        placeholder="Search transformations..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                </div>
             </div>

             <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/5 text-zinc-400 hover:text-white transition-all group">
                  <Calendar size={16} className="group-hover:text-indigo-400 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Last 30 Days</span>
                  <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/5 text-zinc-400 hover:text-white transition-all group">
                  <Filter size={16} className="group-hover:text-indigo-400 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest">More Filters</span>
                </button>
             </div>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Date & Time</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Transformation</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Outputs</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-4" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Loading History...</span>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">{error}</span>
                      </td>
                    </tr>
                  ) : filteredHistory.length === 0 && searchQuery ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">No results found for &quot;{searchQuery}&quot;</span>
                      </td>
                    </tr>
                  ) : filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-10 py-20 text-center">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">No history yet. Synthesize some content!</span>
                      </td>
                    </tr>
                  ) : filteredHistory.map((item) => (
                    <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors cursor-default">
                      <td className="px-10 py-8 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-zinc-200">{new Date(item.createdAt).toLocaleDateString()}</div>
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{new Date(item.createdAt).toLocaleTimeString()}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-base font-black text-white group-hover:text-indigo-300 transition-colors mb-1">Generated Output</div>
                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                            Voice: <span className="text-zinc-400">{item.voice}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-400 transition-all">
                            {item.platform === 'LinkedIn' ? <Globe size={14} /> : item.platform === 'Twitter' ? <Share2 size={14} /> : <Mail size={14} />}
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white bg-white/5 h-10 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                            <Eye size={14} />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination placeholder */}
            <div className="px-10 py-8 border-t border-white/5 flex items-center justify-between bg-black/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Showing {filteredHistory.length} results</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-700 hover:text-white disabled:opacity-30" disabled>
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1.5 mx-2">
                    <button className="w-8 h-8 flex items-center justify-center text-[10px] font-black bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/20">1</button>
                </div>
                <button className="p-2 text-zinc-700 hover:text-white disabled:opacity-30" disabled>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
