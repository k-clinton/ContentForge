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
  Database,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Clock,
  ExternalLink,
  Save
} from "lucide-react";

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionParam = searchParams.get('section');
  
  const [activeSection, setActiveSection] = useState(sectionParam || 'account');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (sectionParam && sectionParam !== activeSection) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam, activeSection]);

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

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Account Card */}
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
                      <div className="absolute inset-0 flex items-center justify-center text-white font-black text-4xl">
                        AK
                      </div>
                    </div>
                    <button className="absolute -bottom-4 -right-4 w-12 h-12 bg-indigo-600 rounded-2xl border-4 border-surface flex items-center justify-center text-white hover:bg-indigo-500 transition-colors shadow-xl group-hover:scale-110">
                      <Sparkles size={18} />
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Display Name</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" defaultValue="Alex Kappy"/>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Email Address</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" defaultValue="alex@contentforge.ai"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-500/5 backdrop-blur-2xl rounded-[2.5rem] border border-rose-500/10 overflow-hidden">
              <div className="p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-xl font-black font-heading text-rose-500 mb-2">Danger Zone</h3>
                  <p className="text-zinc-500 text-sm font-medium">Permanently delete your account and all Forge data.</p>
                </div>
                <button className="px-8 py-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                  Purge Account
                </button>
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
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="h-[1px] bg-white/5" />

                <div className="flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">Two-Factor Authentication</div>
                      <div className="text-zinc-500 text-xs font-medium">Add an extra layer of security to your account.</div>
                    </div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-zinc-600 transition translate-x-1" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <Clock size={20} className="text-indigo-400" />
                  Active Sessions
                </h3>
              </div>
              <div className="p-10 space-y-4">
                {[
                  { device: "MacBook Pro", location: "San Francisco, USA", active: true },
                  { device: "iPhone 15 Pro", location: "San Francisco, USA", active: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${session.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-700'}`} />
                      <div>
                        <div className="text-white font-bold text-sm">{session.device}</div>
                        <div className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest">{session.location}</div>
                      </div>
                    </div>
                    {session.active ? (
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Current</span>
                    ) : (
                      <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* API Keys Section */}
             <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
                <div className="p-10 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                  <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                    <Key size={20} className="text-purple-400" />
                    API & Integration
                  </h3>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                    <Zap size={14} fill="currentColor" />
                    Generate Key
                  </button>
                </div>
                <div className="p-10">
                  <div className="bg-black/40 rounded-3xl border border-white/5 p-8 flex items-center justify-between group hover:border-indigo-500/20 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400">
                        <Database size={24} />
                      </div>
                      <div>
                        <div className="text-white font-bold mb-1">Production Forge Key</div>
                        <div className="font-mono text-zinc-600 text-xs tracking-tighter">sk_live_••••••••••••••••••••••••4f21</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-400/10 px-3 py-1 rounded-full">
                        <CheckCircle2 size={12} />
                        Active
                      </span>
                      <button className="text-zinc-600 hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl text-purple-400">
                    <ExternalLink size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Developer Documentation</h4>
                    <p className="text-zinc-500 text-xs">Learn how to integrate the Forge API into your apps.</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">View Docs</button>
              </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                <div className="flex items-center gap-3 text-white/70 text-[10px] font-black uppercase tracking-widest mb-6">
                   <Zap size={14} fill="currentColor" /> Current Plan
                </div>
                <h3 className="text-4xl font-black text-white mb-2">Alchemy Pro</h3>
                <p className="text-white/60 font-medium mb-8">Billed annually • Next renewal Apr 20, 2026</p>
                <button className="px-8 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all">
                  Manage Plan
                </button>
              </div>
              <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-10">
                <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">
                   <Database size={14} /> Usage Analysis
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold text-sm">Forge Credits</span>
                       <span className="text-zinc-500 text-xs">2,450 / 5,000</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[49%] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-white font-bold text-sm">Storage</span>
                       <span className="text-zinc-500 text-xs">12.4GB / 50GB</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[25%] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <CreditCard size={20} className="text-indigo-400" />
                  Payment Methods
                </h3>
              </div>
              <div className="p-10">
                <div className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 group hover:border-indigo-500/20 transition-all">
                   <div className="flex items-center gap-6">
                     <div className="w-16 h-10 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center text-white font-bold italic">VISA</div>
                     <div>
                        <div className="text-white font-bold text-sm">•••• •••• •••• 4242</div>
                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Expires 12/28</div>
                     </div>
                   </div>
                   <button className="text-zinc-600 hover:text-white transition-colors">Edit</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <Bell size={20} className="text-indigo-400" />
                  Alert Preferences
                </h3>
              </div>
              <div className="p-10 space-y-6">
                {[
                  { label: "Alchemy Completion", desc: "Notify me when a transformation task finishes.", active: true },
                  { label: "Credit Alerts", desc: "Get notified when your credit balance is low.", active: true },
                  { label: "Security Notifications", desc: "Alert me about new sign-ins and password changes.", active: true },
                  { label: "Newsletter & Updates", desc: "Stay informed about new Forge features and tips.", active: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-black/40 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <div className="max-w-md">
                      <div className="text-white font-bold mb-1">{pref.label}</div>
                      <div className="text-zinc-500 font-medium text-xs">{pref.desc}</div>
                    </div>
                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pref.active ? 'bg-indigo-600' : 'bg-white/10'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${pref.active ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'workspace':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 overflow-hidden">
              <div className="p-10 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black font-heading text-white flex items-center gap-3">
                  <Globe size={20} className="text-indigo-400" />
                  System Customization
                </h3>
              </div>
              <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Primary Language</label>
                    <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none appearance-none">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Default Synthesis Output</label>
                    <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:border-indigo-500/30 transition-all outline-none appearance-none">
                      <option>Markdown (.md)</option>
                      <option>Plain Text (.txt)</option>
                      <option>JSON (.json)</option>
                      <option>HTML (.html)</option>
                    </select>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5" />

                <div className="space-y-6">
                   <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest px-1">Alchemy Theme</label>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {['Midnight', 'Nebula', 'Onyx', 'Vapor'].map((theme, i) => (
                       <button key={theme} className={`p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all ${i === 0 ? 'bg-indigo-600/10 border-indigo-500/50 text-white' : 'bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10'}`}>
                         <div className={`w-8 h-8 rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-zinc-800'}`} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{theme}</span>
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </div>
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
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="System Configuration" />
        
        <div className="max-w-[1400px] mx-auto px-12 py-12">
          {/* Header Section */}
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 w-fit mb-4">
              Control Center
            </div>
            <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Settings</span>
            </h1>
            <p className="text-zinc-500 text-lg font-medium">Fine-tune your alchemy engine and account security.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sidebar Navigation */}
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

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              {renderSectionContent()}

              <div className="flex justify-end gap-4 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <button 
                  onClick={() => setActiveSection('account')}
                  className="px-8 py-4 bg-white/5 text-zinc-400 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 hover:border-white/10"
                >
                  Reset Changes
                </button>
                <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2">
                  <Save size={14} />
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
