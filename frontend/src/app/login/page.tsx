import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "@/components/icons";

export default function Login() {
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
          <h1 className="text-4xl font-black text-white font-heading tracking-tight mb-2">Welcome Back</h1>
          <p className="text-zinc-500 font-medium">Continue your content alchemy journey</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Password</label>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none"
              />
            </div>

            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 group">
              Sign In to Forge
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-surface px-4 text-zinc-600">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-zinc-300 hover:text-white">
                <GoogleIcon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-zinc-300 hover:text-white">
                <GitHubIcon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-500 text-sm font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold">Create one for free</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-zinc-600">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Enterprise Grade Security</span>
        </div>
      </div>
    </div>
  );
}
