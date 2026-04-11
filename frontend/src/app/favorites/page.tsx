import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import Image from "next/image";
import { 
  Heart, 
  Copy, 
  Share2, 
  Clock, 
  Filter,
  Search,
  MoreVertical,
  Plus,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function Favorites() {
  const categories = ["All", "LinkedIn", "X", "Email", "Blog Posts"];
  
  const favorites = [
    {
      title: "Maximizing ROI in B2B SaaS",
      description: "Learn how we transformed our customer acquisition funnel using AI-driven outreach patterns. The results were staggering...",
      platform: "LinkedIn",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXpTBCRPpJXc-6rSqPVwZVrt5YxEX4VqIZ9X8PuXTfnqACGO0IVmIWnY06HVWMeWttMXgrbyucU9TBPvVSCwgQzXjP5YdTRtk4Be97Onm7HbTBDht94ssLgRKt-l7yPtIxINeS5o36YnSws42OizPIPXddiysTCwnc1SzCWtxNFK50cPKjzVZJH8UgAreswTKIftaUW9nuKI-zyqcspbDLmEpXbtZmlFh0KI4CV6WZZL6VwcXctxu7dLTDDsk1-TYJIeA2PVDwGZe2",
      time: "2 hours ago",
      platformColor: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "Thread: The Future of Neural UI",
      description: "1/10 Designing for AI isn't about more buttons. It's about less friction. Here is why the \"Invisible Interface\" is winning in 2026...",
      platform: "X / Twitter",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUU5gLhi_IWF-Z7Z25e88bQ1WwKyrWGeICJLAQLi5qNH3ETxb6palEUqtt7C8B99Wv4YYNCPS9ONBH_Q_BqtFAXtk1BJh4FNTCEToyk2uDRB1yVGGZqXeDVdAiJ0KNQLL-xujqtSPKD7UmHeHZF92pFLAF3HI_5BH6yLJBbLjv9iWgdsWb7-_i7F4MGvS0FoGpJzEs2c4qvrWET8XMeuJFdoKqPN3kBVwiBb0mxcBSAmGK30Kq5BE8RvWF5EUNxF2bkTWAJAxybmM8",
      time: "1 day ago",
      platformColor: "bg-zinc-800/20 border-white/10 text-zinc-300"
    },
    {
      title: "Newsletter: The Forge Weekly",
      description: "Inside this edition: We break down the top 3 AI trends of Q1, interview the founders of CoreFlow, and give away a free prompt pack.",
      platform: "Email Newsletter",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXE7kbK_5yuoTY2WMKrlhc6YcBPm8J4xbGXFNhG1LvUUc58f4OVdf1LnBlZ8F0N8SvNhRCmvHWMck5F_QRlUDUDRvw9kdzQ6xRZdCFiNE71efl46Aa7qCHI685WCjYGQsnUpXpMDEEqudNcJAyKn0zUYozzFEwZV4Pcf4-mFNfQ4sqcVlaFWUb4eRsQUUlsQwZf1xnDAjLaLUoVeQ8itdiOOaQa6yHgLQwmISDubSDfR-VWJ_m7lIf1eUVAE0BZibvJY7uhI3VL_wS",
      time: "3 days ago",
      platformColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
    },
    {
      title: "The Death of 9-to-5 Culture",
      description: "Work isn't a place anymore. It's a state of mind. Companies that don't adapt to the asynchronous revolution will fail.",
      platform: "LinkedIn",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0CEWBVBwipj2x_41Nb4rY3YsqRx4JNnsNJIMhSp-V8uUfLpMxSOIwHhPkPCP9ahHQ39e5xXUdJRlQOJrgv0GV5vpXE-e2i9g9YrAN7sNuCbpxGw-4GvMIvVVxNtZG1PrXfU3mL9g_OjEC1k0wkS23qf9uaxr6pUr7H2xz0X8DnuCIp4U03hQAiBH71AjouXYFUCjauB1BXI-Wj6kSSo3ZUbfXw0jkTze2MFObZW-2FnLsYIZskBjJvCKSezTEx_XhELDOZHRd_6l2",
      time: "May 12, 2026",
      platformColor: "bg-blue-500/10 border-blue-500/20 text-blue-400"
    },
    {
      title: "AI Agents: Your New Best Friend",
      description: "Prompt engineering is out. Intent engineering is in. Stop telling the AI *what* to do, start telling it *why* you're doing it.",
      platform: "X / Twitter",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvE92_3GwImv2iFGa1bcJIG-JEjusF8h8v2xaF-rYOijypoasTGKBB22Sqj-EdkbvTPaPGg_39csC3EfMt3qducBvBx5AN-17PjavhQF-kl15pzVT97uBm2abYct05U-fhlTKKUuAgaS2TM1Fwh8kHIV7KRs2VD3EUYqITpp-czwTEoGytnoGv21jyAXFDNpVdU1bnTc8mXKHZibnfDYQtvjpVr_B76kPwnHbJk2A-7HfEnGYKXQVwDknT7PmD8fsejL5bR7UP5c_l",
      time: "Apr 28, 2026",
      platformColor: "bg-zinc-800/20 border-white/10 text-zinc-300"
    },
    {
      title: "Content Strategy for the Solopreneur",
      description: "You don't need a team of ten. You need one solid idea repurposed across six platforms. Here is the blueprint for total digital dominance.",
      platform: "Blog Post",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUfJrSLkpYo9eXbzyQsxtOb03pMa2GQrJAn7uRNDgOBgSoZI-HoCMQRDXGJd4usTwKgNBGTYw-93T0MfgadhDGVZwRUTyN60AgCwTLRGNUChq_D6X6SDH-y2eqsjqq4uBTp4FbJo-6VIV-pVa1DUF_iNN4g5GSTKZQw76sUoC-DxmW-vhnznjQItKQgubeO37u4rT8I7K2SUO1RmmFNDTrvr2s-rlfBMy9BNHiGf1vNl7wC5ZYLp6A7F8HQ8ZCK2L2YyZc0GX1Hscs",
      time: "Apr 15, 2026",
      platformColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    }
  ];

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Your Library" />

        <div className="px-12 py-12 max-w-[1400px] mx-auto">
          {/* Hero / Filter Section */}
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
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                    cat === "All"
                      ? "bg-white text-black shadow-lg"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-56 overflow-hidden relative">
                  <Image
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
                  <div className={`absolute top-6 left-6 backdrop-blur-xl px-3 py-1 rounded-full border ${item.platformColor}`}>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">{item.platform}</span>
                  </div>
                  <button className="absolute top-6 right-6 w-10 h-10 bg-white backdrop-blur-md rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:scale-110 transition-transform group/heart">
                    <Heart size={18} fill="currentColor" className="group-hover/heart:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="p-10">
                  <h3 className="text-xl font-black font-heading text-white mb-4 line-clamp-1 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-3 mb-8 group-hover:text-zinc-400 transition-colors">{item.description}</p>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group/btn">
                        <Copy size={16} className="group-hover/btn:rotate-6 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Copy</span>
                      </button>
                      <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group/btn">
                        <Share2 size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAB */}
        <button className="fixed bottom-12 right-12 w-16 h-16 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all z-50 group">
          <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </main>
    </div>
  );
}
