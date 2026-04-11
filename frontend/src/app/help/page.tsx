import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Search, 
  Book, 
  MessageSquare, 
  LifeBuoy, 
  Zap, 
  ArrowRight, 
  PlayCircle, 
  FileText,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function Help() {
  const categories = [
    { name: "Getting Started", icon: PlayCircle, count: 12, color: "text-indigo-400" },
    { name: "AI Synthesis Tips", icon: Zap, count: 8, color: "text-purple-400" },
    { name: "Billing & Credits", icon: FileText, count: 5, color: "text-emerald-400" },
    { name: "API Documentation", icon: Book, count: 24, color: "text-blue-400" },
  ];

  const faqs = [
    { q: "How do credits work?", a: "One credit is consumed per 500 words synthesized. High-fidelity models may consume more." },
    { q: "Can I connect my YouTube?", a: "Yes, go to Settings > Integrations to link your channel for automatic transcription." },
    { q: "What is 'Brand Voice'?", a: "It's a preset that tells our AI how to sound—Professional, Witty, or like a Thought Leader." },
  ];

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Support & Knowledge" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Hero Section */}
          <section className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-6xl font-black font-heading tracking-tight text-white mb-6">
              How can we help <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">today?</span>
            </h1>
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-8 py-5">
                <Search size={20} className="text-zinc-500 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search documentation, guides, and more..." 
                  className="bg-transparent border-none outline-none text-lg text-white placeholder:text-zinc-600 w-full font-medium"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] text-zinc-500 font-black">
                  CMD K
                </kbd>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/20 transition-all group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${cat.color} border border-white/5`}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{cat.name}</h3>
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="text-xs font-medium">{cat.count} articles</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* FAQs */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-black font-heading text-white mb-8 flex items-center gap-3">
                Common Questions
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              </h2>
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.08] transition-all group cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white font-bold text-lg">{faq.q}</h4>
                    <PlusIcon />
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Contact Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <MessageSquare size={40} className="mb-6 opacity-80" />
                  <h3 className="text-2xl font-black font-heading mb-4">Live Alchemy Support</h3>
                  <p className="text-indigo-100/70 text-sm font-medium leading-relaxed mb-8">
                    Our experts are online to help you master the forge. Expected response: &lt; 5 mins.
                  </p>
                  <button className="w-full py-4 bg-white text-indigo-600 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3">
                    Start Chatting
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-3 mb-6">
                  <LifeBuoy size={20} className="text-indigo-400" />
                  <h4 className="text-white font-bold">System Status</h4>
                </div>
                <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">All Systems Go</span>
                  </div>
                  <ExternalLink size={14} className="text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2.5V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
