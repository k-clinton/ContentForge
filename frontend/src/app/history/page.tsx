import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Search, 
  Calendar, 
  Filter, 
  ChevronDown, 
  Eye, 
  Download, 
  Trash2, 
  Clock, 
  Plus,
  Globe,
  Share2,
  Mail,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from "lucide-react";

export default function History() {
  const historyItems = [
    {
      date: "Oct 24, 2026",
      time: "14:30 PM",
      title: "Mastering the AI Alchemy Workflow",
      source: "Blog Post",
      platforms: [<Globe key="li" size={14} />, <Share2 key="tw" size={14} />, <Mail key="ml" size={14} />]
    },
    {
      date: "Oct 22, 2026",
      time: "09:15 AM",
      title: "The Future of Content Repurposing",
      source: "Podcast",
      platforms: [<Globe key="li" size={14} />, <Share2 key="tw" size={14} />]
    },
    {
      date: "Oct 20, 2026",
      time: "11:45 AM",
      title: "10 Tips for Better AI Prompts",
      source: "Newsletter",
      platforms: [<Mail key="ml" size={14} />, <Share2 key="tw" size={14} />]
    },
    {
      date: "Oct 18, 2026",
      time: "16:20 PM",
      title: "Building a Digital Brand in 2026",
      source: "Blog Post",
      platforms: [<Globe key="li" size={14} />, <Share2 key="tw" size={14} />, <Mail key="ml" size={14} />]
    },
    {
      date: "Oct 15, 2026",
      time: "10:00 AM",
      title: "Scaling Your Content with ContentForge",
      source: "Case Study",
      platforms: [<Globe key="li" size={14} />, <Share2 key="tw" size={14} />]
    }
  ];

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="History & Archive" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Header & Filter Bar Section */}
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

          {/* Table Section */}
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
                  {historyItems.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] transition-colors cursor-default">
                      <td className="px-10 py-8 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-zinc-200">{item.date}</div>
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{item.time}</div>
                            </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="text-base font-black text-white group-hover:text-indigo-300 transition-colors mb-1">{item.title}</div>
                        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                            Source: <span className="text-zinc-400">{item.source}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                          {item.platforms.map((Icon, pIdx) => (
                            <div key={pIdx} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 border border-white/5 hover:border-indigo-500/30 hover:text-indigo-400 transition-all">
                              {Icon}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white bg-white/5 h-10 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                            <Eye size={14} />
                            View
                          </button>
                          <button className="p-2.5 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl border border-white/5 transition-all">
                            <Download size={16} />
                          </button>
                          <button className="p-2.5 bg-white/5 hover:bg-rose-500/10 text-zinc-600 hover:text-rose-500 rounded-xl border border-white/5 hover:border-rose-500/20 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-10 py-8 border-t border-white/5 flex items-center justify-between bg-black/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Showing 1 to 5 of 24 results</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-700 hover:text-white disabled:opacity-30" disabled>
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-1.5 mx-2">
                    <button className="w-8 h-8 flex items-center justify-center text-[10px] font-black bg-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-500/20">1</button>
                    <button className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center text-[10px] font-black text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors">3</button>
                </div>
                <button className="p-2 text-zinc-400 hover:text-white">
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
