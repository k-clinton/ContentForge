"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import Image from "next/image";
import {
  Heart,
  Copy,
  Clock,
  Plus,
  Loader2,
  AlertCircle,
  ImageOff
} from "lucide-react";
import type { VaultItem } from "@/lib/types";

const ImageWithFallback = ({ src, alt }: { src: string; alt: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 flex items-center justify-center">
        <ImageOff size={48} className="text-zinc-700" />
      </div>
    );
  }

  return (
    <Image
      className="object-cover group-hover:scale-110 transition-transform duration-700"
      src={src}
      alt={alt}
      fill
      unoptimized
      onError={() => setError(true)}
    />
  );
};

export default function Favorites() {
  const categories = ["All", "LinkedIn", "X", "Email", "Blog Posts"];

  const [favorites, setFavorites] = useState<VaultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchVault = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/vault`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch vault items");

      const data = await response.json();
      setFavorites(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVault();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/vault/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchVault();
    } catch {
      alert("Failed to delete item.");
    }
  };

  const filteredFavorites = favorites.filter(item => {
    if (activeCategory === "All") return true;
    return item.platform === activeCategory;
  });

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Your Library" />

        <div className="px-12 py-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-xl">
              <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 w-fit mb-4">
                Vault
              </div>
              <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4">
                Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Masterpieces</span>
              </h1>
              <p className="text-zinc-500 text-lg font-medium">Curated collection of your most impactful AI transcriptions.</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                    cat === activeCategory
                      ? "bg-white text-black shadow-lg"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-indigo-500" size={48} />
            </div>
          ) : error ? (
             <div className="flex flex-col items-center justify-center py-20 text-rose-500">
               <AlertCircle size={48} className="mb-4" />
               <span>{error}</span>
             </div>
          ) : filteredFavorites.length === 0 && activeCategory !== "All" ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/5">
               <span className="text-zinc-500 font-bold">No items in {activeCategory} category.</span>
             </div>
          ) : filteredFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/5">
               <span className="text-zinc-500 font-bold">Your vault is empty.</span>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFavorites.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="h-56 overflow-hidden relative bg-black/40">
                    {item.image ? (
                      <ImageWithFallback src={item.image} alt={item.title} />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 flex items-center justify-center">
                        <ImageOff size={48} className="text-zinc-700" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
                    <div className={`absolute top-6 left-6 backdrop-blur-xl px-3 py-1 rounded-full border bg-indigo-500/10 border-indigo-500/20 text-indigo-400`}>
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase">{item.platform}</span>
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-6 right-6 w-10 h-10 bg-white backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:scale-110 transition-transform"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-10">
                    <h3 className="text-xl font-black font-heading text-white mb-4 line-clamp-1 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-3 mb-8 group-hover:text-zinc-400 transition-colors">{item.description}</p>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group/btn" onClick={() => navigator.clipboard.writeText(item.content)}>
                          <Copy size={16} className="group-hover/btn:rotate-6 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Copy</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="fixed bottom-12 right-12 w-16 h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all z-50 group">
          <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </main>
    </div>
  );
}
