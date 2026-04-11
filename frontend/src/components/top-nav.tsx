import Image from "next/image";
import { Moon, Coins, Bell, Search } from "lucide-react";

interface TopNavProps {
  title: string;
}

export function TopNav({ title }: TopNavProps) {
  return (
    <header className="flex justify-between items-center w-full px-12 py-6 bg-surface-container border-b border-white/5 font-heading tracking-tight font-semibold z-40 sticky top-0">
      <div className="flex items-center gap-8">
        <h2 className="text-xl font-bold tracking-tighter text-zinc-100">{title}</h2>
        <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 group focus-within:border-indigo-500/50 transition-colors duration-300">
          <Search size={16} className="text-zinc-500 group-focus-within:text-indigo-400" />
          <input 
            type="text" 
            placeholder="Search repurposes..." 
            className="bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-64"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-2">
          <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-300">
            <Bell size={20} />
          </button>
          <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-300">
            <Moon size={20} />
          </button>
          <div className="h-10 w-[1px] bg-white/5 mx-2" />
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/20 transition-colors duration-300">
            <Coins size={18} />
            <span className="text-sm font-bold tracking-tight">2,450</span>
          </button>
        </div>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 overflow-hidden shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
          <Image
            alt="User profile"
            className="object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4dU5hjrClqyN-HbCx7HWcCQJFTFCvKCfUIy5C5bAp2hlQya1p_dzZl5TThP6xjRlETNc0c5bAYILhLTjmKmnxLFcAzh1NgdCvQwMRj2QgjNc5_a7ziiLkJuDGur3MomLmxQhXZoOkFitJ6xHiomMH0WaI5C37YmJfYcSnRwywPBE-lKqJoZ8BL-Yp2-KG3oWlvsbVrnByvt2nuKaqcoqNPPN-6FWUCnxx2QdsLv3opXeVRZnwQrIClaeWUmHpq34MdMvj3SPMeHy6"
            fill
            unoptimized
          />
        </div>
      </div>
    </header>
  );
}
