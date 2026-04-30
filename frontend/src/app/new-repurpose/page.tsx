"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Link as LinkIcon, 
  UploadCloud, 
  Sparkles, 
  Info,
  Wand2,
  Loader2,
  Copy,
  Heart,
  ChevronLeft,
  Globe,
  Share2,
  Mail
} from "lucide-react";

export default function NewRepurpose() {
  const router = useRouter();
  const [sourceText, setSourceText] = useState("");
  const [url, setUrl] = useState("");
  const [voice, setVoice] = useState("Professional");
  const [platform, setPlatform] = useState("LinkedIn");
  const [depth, setDepth] = useState(70);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ outputText: string; voice: string; platform: string; id?: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Read file content if it's a text file
      if (file.type.startsWith('text/') || file.type === 'application/pdf' || file.type === 'application/msword' || file.type.includes('document')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result && typeof event.target.result === 'string') {
            setSourceText(event.target.result.substring(0, 5000)); // Limit to first 5000 chars
          }
        };
        reader.readAsText(file);
      }
    }
  };

  const handleSynthesize = async () => {
    if (!sourceText && !url) return alert("Please provide source text or a URL");

    setIsGenerating(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(getApiUrl("/api/synthesis"), {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ sourceText, url, voice, depth, platform })
      });

      if (!response.ok) throw new Error("Synthesis failed");
      const data = await response.json();
      setResult(data.job);
    } catch {
      alert("Failed to synthesize content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToVault = async () => {
    if (!result) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/vault`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `Generated in ${result.voice}`,
          description: result.outputText.substring(0, 100) + "...",
          content: result.outputText,
          platform: result.platform,
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXpTBCRPpJXc-6rSqPVwZVrt5YxEX4VqIZ9X8PuXTfnqACGO0IVmIWnY06HVWMeWttMXgrbyucU9TBPvVSCwgQzXjP5YdTRtk4Be97Onm7HbTBDht94ssLgRKt-l7yPtIxINeS5o36YnSws42OizPIPXddiysTCwnc1SzCWtxNFK50cPKjzVZJH8UgAreswTKIftaUW9nuKI-zyqcspbDLmEpXbtZmlFh0KI4CV6WZZL6VwcXctxu7dLTDDsk1-TYJIeA2PVDwGZe2",
        })
      });
      setIsSaved(true);
    } catch {
      alert("Failed to save to vault");
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.outputText);
      alert("Magic copied to clipboard!");
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title={result ? "Synthesis Result" : "New Repurpose"} />
        
        <div className="max-w-[1280px] mx-auto px-8 py-12">
          {!result && !isGenerating && (
            <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 flex items-center gap-2">
                  <Sparkles size={10} fill="currentColor" />
                  New Synthesis
                </div>
              </div>
              <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4 leading-tight">
                Repurpose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Content</span>
              </h1>
              <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed font-medium">
                Paste long-form text, provide a URL, or upload a file to instantly transform your ideas into platform-ready social gold.
              </p>
            </section>
          )}

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 hover:opacity-40 transition-opacity" />
                <Loader2 size={64} className="text-indigo-400 animate-spin relative z-10" />
              </div>
              <h2 className="text-2xl font-black mt-8 text-white">Performing Alchemy...</h2>
              <p className="text-zinc-500 mt-2">Transmuting your raw content into platform gold.</p>
            </div>
          ) : result ? (
             <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl border border-white/5 animate-in fade-in zoom-in-95 duration-500">
               <button onClick={() => setResult(null)} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-bold">
                 <ChevronLeft size={16} /> Start Over
               </button>
               <h3 className="text-3xl font-black text-white mb-6">Generated Content</h3>
               <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 text-zinc-300 font-sans text-lg leading-relaxed whitespace-pre-wrap">
                 {result.outputText}
               </div>
               <div className="mt-8 flex gap-4">
                 <button onClick={copyToClipboard} className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                   <Copy size={18} /> Copy to Clipboard
                 </button>
                 <button 
                  onClick={handleSaveToVault} 
                  disabled={isSaved}
                  className={`flex-1 py-4 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl ${isSaved ? 'bg-emerald-600/50' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'}`}
                 >
                   <Heart size={18} fill={isSaved ? "currentColor" : "none"} /> 
                   {isSaved ? "Saved to Vault!" : "Save to Vault"}
                 </button>
               </div>
             </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-1 shadow-2xl border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-500 delay-100">
              <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-surface-container/30 rounded-[2.4rem]">
                <div className="lg:col-span-8 space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Source Content</label>
                      <span className="text-zinc-600 text-[10px] font-bold">{sourceText.length} chars</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                      <textarea 
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        className="relative w-full min-h-[320px] bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 text-on-surface placeholder:text-zinc-700 focus:border-indigo-500/30 transition-all resize-none font-sans text-base outline-none shadow-inner leading-relaxed" 
                        placeholder="Paste your blog post, YouTube transcript, or raw thoughts here..."
                      ></textarea>
                      <div className="absolute bottom-6 right-8 flex gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-400 transition-colors">
                          <Info size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Fetch from URL</label>
                      <div className="flex items-center bg-black/40 backdrop-blur-md rounded-2xl px-6 border border-white/5 focus-within:border-indigo-500/50 transition-all group">
                        <LinkIcon size={18} className="text-indigo-400/50 group-focus-within:text-indigo-400 mr-3" />
                        <input 
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="bg-transparent border-none w-full py-4 text-sm focus:ring-0 outline-none text-zinc-300 placeholder:text-zinc-700" 
                          placeholder="https://medium.com/my-post" 
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">Upload File</label>
                      <label className="border-2 border-dashed border-white/5 bg-black/20 rounded-2xl py-2 px-6 flex items-center justify-center gap-4 text-zinc-500 hover:bg-white/5 hover:border-indigo-500/20 transition-all cursor-pointer group h-[58px]">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <UploadCloud size={20} className="group-hover:text-indigo-400 transition-colors" />
                        <span className="text-sm font-bold">
                          {uploadedFile ? uploadedFile.name : "Drop PDF or DOCX"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem] space-y-8">
                    <div>
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 px-1">Target Platform</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'LinkedIn', icon: Globe, label: 'LinkedIn' },
                          { id: 'Twitter', icon: Share2, label: 'Twitter' },
                          { id: 'Email', icon: Mail, label: 'Email' }
                        ].map((p) => (
                          <button 
                            key={p.id}
                            onClick={() => setPlatform(p.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${platform === p.id ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-black/40 border-white/5 text-zinc-500 hover:border-white/10'}`}
                          >
                            <p.icon size={20} className="mb-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6 px-1">Brand Voice</label>
                      <div className="space-y-3">
                        {[
                          { id: 'Professional', label: 'Professional', desc: 'Expert & Authoritative' },
                          { id: 'Creative', label: 'Creative Alchemy', desc: 'Inspired & Original' },
                          { id: 'Witty', label: 'Witty & Sharp', desc: 'Engaging & Bold' },
                          { id: 'Leader', label: 'Thought Leader', desc: 'Visionary & Strategic' }
                        ].map((v) => (
                          <label key={v.id} className="flex items-start gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 cursor-pointer hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                            <input checked={voice === v.id} onChange={() => setVoice(v.id)} className="hidden peer" name="voice" type="radio"/>
                            <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300" />
                            <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex items-center justify-center peer-checked:border-indigo-500 transition-colors mt-0.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                            <div>
                              <span className="block text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{v.label}</span>
                              <span className="block text-[10px] text-zinc-600 font-medium">{v.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                      <div className="flex justify-between items-center mb-6 px-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Synthesis Depth</label>
                        <span className="text-indigo-400 text-[10px] font-black">{depth}%</span>
                      </div>
                      <div className="relative h-2 bg-black/40 rounded-full mb-2 border border-white/5">
                        <div className="absolute h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${depth}%` }} />
                        <input value={depth} onChange={(e) => setDepth(parseInt(e.target.value))} className="absolute w-full h-full opacity-0 cursor-pointer" max="100" min="0" step="1" type="range" />
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-600 font-black tracking-widest uppercase mt-4">
                        <span>Concise</span>
                        <span>Verbose</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleSynthesize} disabled={isGenerating} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3">
                    <Wand2 size={18} />
                    Synthesize Magic
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
ver:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-3">
                    <Wand2 size={18} />
                    Synthesize Magic
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
