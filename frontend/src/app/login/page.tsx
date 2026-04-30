"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "@/components/icons";
import { getApiUrl, getAuthHeaders } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: getAuthHeaders(null),
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Alchemy</span> Forge.
            </h2>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              Step back into the laboratory and continue your journey of digital transmutation.
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 xl:p-24 bg-black relative">
        <div className="max-w-md w-full space-y-12 relative z-10 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-white font-heading tracking-tight">Sign In</h1>
            <p className="text-zinc-500 font-medium">Continue your alchemy journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-6">
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
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Password</label>
                  <Link href="/forgot-password" title="Forgot Password?" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-white transition-colors">Recover</Link>
                </div>
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/50 transition-all outline-none" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-white hover:bg-zinc-200 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
              <span className="bg-black px-4 text-zinc-600">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-zinc-900 border border-white/5 rounded-2xl text-white text-xs font-bold hover:bg-zinc-800 transition-all">
              <GoogleIcon className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-zinc-900 border border-white/5 rounded-2xl text-white text-xs font-bold hover:bg-zinc-800 transition-all">
              <GitHubIcon className="w-5 h-5 text-white" />
              GitHub
            </button>
          </div>

          <p className="text-center text-zinc-600 text-sm font-medium">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white hover:text-indigo-400 font-bold underline underline-offset-4 transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
