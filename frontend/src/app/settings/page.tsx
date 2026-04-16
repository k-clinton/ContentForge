"use client";

import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  ShieldCheck,
  Key,
  Bell,
  Globe,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Save,
  Loader2,
  ChevronRight
} from "lucide-react";

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState(sectionParam || 'account');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [_userData, setUserData] = useState<{ name?: string; email?: string; credits?: number; plan?: string; apiKey?: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", apiKey: "" });

  useEffect(() => {
    if (sectionParam && sectionParam !== activeSection) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam, activeSection]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/user/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setForm(f => ({ ...f, name: data.name, email: data.email, apiKey: data.apiKey || "" }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/user/settings`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email, 
          password: form.password || undefined,
          apiKey: form.apiKey || undefined
        })
      });
      alert("Settings saved successfully!");
      setForm(f => ({ ...f, password: "", confirmPassword: "" }));
      fetchUser();
    } catch (e) {
      console.error(e);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    router.push(`/settings?section=${id}`, { scroll: false });
  };

  const sections = [
    { id: 'account', name: 'Account Profile', icon: User },
    { id: 'security', name: 'Security & Auth', icon: ShieldCheck },
    { id: 'api', name: 'API Management', icon: Key },
    { id: 'billing', name: 'Subscription', icon: CreditCard },
    { id: 'notifications', name: 'Alerts & Notifications', icon: Bell },
    { id: 'workspace', name: 'Workspace Preferences', icon: Globe },
  ];

  if (isLoading) {
    return <div className="flex-1 flex justify-center items-center h-full"><Loader2 className="animate-spin text-indigo-500" /></div>;
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <User size={20} className="text-indigo-400" />
                  Personal Information
                </h3>
              </div>
              <div className="p-10 space-y-10">
                <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10 overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 flex items-center justify-center text-white font-black text-4xl uppercase">
                        {form.name ? form.name.substring(0, 2) : "AK"}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Display Name</label>
                      <input 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Email Address</label>
                      <input 
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <Lock size={20} className="text-indigo-400" />
                  Password & Security
                </h3>
              </div>
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" 
                        placeholder="••••••••"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Confirm Password</label>
                    <input 
                      type="password"
                      value={form.confirmPassword}
                      onChange={e => setForm({...form, confirmPassword: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <Key size={20} className="text-indigo-400" />
                  Alchemist API Keys
                </h3>
              </div>
              <div className="p-10 space-y-8">
                <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 text-sm text-indigo-200 font-medium">
                  By adding your own Gemini API Key, you can enable unlimited generation and bypass platform-level credit limits.
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Gemini API Key</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={form.apiKey}
                      onChange={e => setForm({...form, apiKey: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white font-mono focus:border-indigo-500/30 transition-all outline-none" 
                      placeholder="AIzaSy..."
                    />
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-2 px-1 italic">Your key is encrypted and stored securely. Used only for your own synthesis jobs.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden p-12 text-center">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mx-auto mb-6">
                  <CreditCard size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Alpha Pioneer Plan</h3>
                <p className="text-zinc-500 font-medium mb-8">You currently have lifetime access to ContentForge Alpha.</p>
                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="block text-[10px] text-zinc-600 uppercase font-black mb-1">Status</span>
                    <span className="text-emerald-400 font-bold">Active</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="block text-[10px] text-zinc-600 uppercase font-black mb-1">Billing</span>
                    <span className="text-white font-bold">Free Alpha</span>
                  </div>
                </div>
             </div>
          </div>
        );

      case 'notifications':
      case 'workspace':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] border border-white/5 rounded-[2.5rem] bg-white/[0.02]">
             <Bell size={48} className="text-zinc-800 mb-4" />
             <span className="text-zinc-500 text-lg font-medium">Section coming in the next update.</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        <TopNav title="System Configuration" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-3 space-y-2 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                      isActive 
                        ? "bg-white/10 text-white shadow-xl border border-white/5" 
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <section.icon size={18} className={isActive ? "text-indigo-400" : "group-hover:text-indigo-400 transition-colors"} />
                      <span className="text-sm font-bold">{section.name}</span>
                    </div>
                    {isActive && <ChevronRight size={16} className="text-indigo-400" />}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-9">
              {renderSectionContent()}

              <div className="flex justify-end gap-4 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <button 
                  onClick={() => fetchUser()}
                  className="px-8 py-4 bg-white/5 text-zinc-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 hover:border-white/10"
                >
                  Reset Changes
                </button>
                <button disabled={isSaving} onClick={handleSave} className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2 disabled:opacity-50">
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Save Alchemy Config
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Settings() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <SettingsContent />
    </Suspense>
  );
}
