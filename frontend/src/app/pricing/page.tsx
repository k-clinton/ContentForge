import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Check, 
  Coins, 
  Plus, 
  Crown, 
  Gem, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function Pricing() {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Credits & Billing" />
        
        <div className="max-w-[1280px] mx-auto px-8 py-12">
          {/* Credit Overview Section */}
          <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-10 leading-tight">
              Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Alchemy</span>
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Active Credit Status */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-12 -bottom-12 opacity-5 scale-150 group-hover:rotate-12 transition-transform duration-1000">
                  <Coins size={200} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block">Available Credits</span>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                  <div className="flex items-baseline gap-4 mb-10">
                    <span className="text-7xl font-black text-white font-heading tracking-tighter">2,450</span>
                    <span className="text-zinc-500 font-bold text-lg">credits remaining</span>
                  </div>
                  <div className="w-full bg-black/40 h-3 rounded-full mb-4 border border-white/5 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full w-[45%] relative shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shimmer_2s_infinite] translate-x-[-100%]" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                    <span className="text-zinc-500">Plan resets on Nov 24, 2026</span>
                    <span className="text-indigo-400">45% Used</span>
                  </div>
                </div>
              </div>

              {/* Quick Top-up Card */}
              <div className="bg-indigo-600 p-10 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10">
                    <Plus size={24} />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-3 font-heading tracking-tight">Need a Boost?</h4>
                  <p className="text-sm text-indigo-100/80 leading-relaxed font-medium mb-8">
                    Add one-time credits to your account. Synthesized magic that never expires.
                  </p>
                </div>
                <button className="w-full py-4 bg-white text-indigo-600 font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 active:scale-95 group">
                  Buy One-time 
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          {/* Pricing Tiers */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl font-black text-white font-heading mb-4 tracking-tight">Choose Your Craft</h2>
              <p className="text-zinc-500 font-medium text-lg">Select the plan that fits your content production scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Starter Plan */}
              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group flex flex-col">
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                      <Sparkles size={16} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Alchemist</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-heading tracking-tighter">$29</span>
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">/ month</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    "1,000 Monthly Credits",
                    "All Transformation Types",
                    "Standard Processing",
                    "Basic Brand Voices"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
                        <Check size={12} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-zinc-800/50 text-zinc-400 font-black text-xs uppercase tracking-widest rounded-2xl border border-zinc-700/50 cursor-default">Current Plan</button>
              </div>

              {/* Pro Plan - Featured */}
              <div className="bg-gradient-to-br from-indigo-600/90 to-purple-800/90 backdrop-blur-2xl p-10 rounded-[3rem] border border-indigo-400/30 shadow-[0_40px_100px_rgba(99,102,241,0.2)] relative scale-105 z-10 flex flex-col group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-2xl">Recommended</div>
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white border border-white/20">
                      <Crown size={16} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Forge Master</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-heading tracking-tighter">$79</span>
                    <span className="text-indigo-200 font-bold uppercase tracking-widest text-[10px]">/ month</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    "5,000 Monthly Credits",
                    "Priority AI Synthesis",
                    "Custom Brand Voices",
                    "Early API Access (Beta)",
                    "Dedicated Support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold text-white group-hover:translate-x-1 transition-transform cursor-default">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-5 bg-white text-indigo-600 font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-black/20 hover:scale-[1.03] active:scale-97 transition-all">Upgrade Now</button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group flex flex-col">
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 border border-zinc-700">
                      <Gem size={16} />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Imperial Forge</h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white font-heading tracking-tighter">$199</span>
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">/ month</span>
                  </div>
                </div>
                <ul className="space-y-6 mb-12 flex-1">
                  {[
                    "Unlimited Monthly Credits",
                    "Custom Model Fine-tuning",
                    "Dedicated Account Manager",
                    "White-label Integration",
                    "SLA Guarantees"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
                        <Check size={12} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 transition-all">Contact Sales</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
