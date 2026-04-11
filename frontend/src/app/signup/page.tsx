import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-6">
            <Sparkles size={32} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black text-white font-heading tracking-tight mb-2">Create Account</h1>
          <p className="text-zinc-500 font-medium text-center">Join 2,000+ creators scaling their impact with AI</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">First Name</label>
                <input 
                  type="text" 
                  placeholder="Alex" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Kappy" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
              />
              <p className="text-[10px] text-zinc-600 font-medium px-1">Must be at least 8 characters with symbols.</p>
            </div>

            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 group">
              Begin My Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-3 px-1">
              <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                <CheckCircle2 size={14} />
              </div>
              <p className="text-[10px] text-zinc-500 font-medium leading-tight">
                I agree to the <span className="text-zinc-300">Terms of Service</span> and <span className="text-zinc-300">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-500 text-sm font-medium">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
