"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        headers: getAuthHeaders(null),
        body: JSON.stringify({
          email,
          password,
          name: `${firstName} ${lastName}`.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create account");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto ring-1 ring-emerald-500/50">
            <CheckCircle2 size={48} className="text-emerald-400" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white font-heading tracking-tight">Check your inbox</h1>
            <p className="text-zinc-500 text-lg">
              We've sent a verification link to <span className="text-white font-bold">{email}</span>. Please verify your email to continue.
            </p>
          </div>
          <div className="pt-8">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
            >
              Back to Sign In <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex flex-1 relative bg-zinc-950 items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[120px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-xl px-12 space-y-10">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
            <Sparkles className="text-white" size={32} />
          </div>
          <div className="space-y-6">
            <h2 className="text-6xl font-black text-white font-heading tracking-tighter leading-none">
              Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Content</span> into Impact.
            </h2>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              Join 10,000+ creators using Alchemy Forge to amplify their voice across every social platform.
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 xl:p-24 bg-black relative">
        <div className="max-w-md w-full space-y-12 relative z-10 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white font-heading tracking-tight">Create your account</h1>
            <p className="text-zinc-500">Start your 7-day free trial today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">First Name</label>
                <input 
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none" 
                  placeholder="Aris"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Last Name</label>
                <input 
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none" 
                  placeholder="Kappy"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Email Address</label>
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none" 
                placeholder="aris@example.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Password</label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none" 
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-white hover:bg-zinc-200 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="text-center text-zinc-600 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:text-indigo-400 font-bold underline underline-offset-4 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
