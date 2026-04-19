"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { 
  Bell, 
  Sparkles, 
  Zap, 
  CircleCheck, 
  AlertCircle,
  ChevronRight,
  Clock,
  MoreVertical,
  Loader2
} from "lucide-react";

import type { Notification } from "@/lib/types";

const ICON_MAP: Record<string, React.ComponentType<{ size: number }>> = {
  Sparkles,
  Zap,
  AlertCircle,
  CircleCheck,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/notifications`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch notifications");

      const data = await response.json();
      setNotifications(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    setIsReading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/notifications/read-all`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch {
      alert("Failed to update notifications");
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen pb-32 md:pb-0 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full -z-10" />

        <TopNav title="Notification Center" />
        
        <div className="max-w-[1000px] mx-auto px-12 py-12">
          {/* Header Section */}
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end">
              <div>
                <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border border-indigo-500/20 w-fit mb-4">
                  Inbox
                </div>
                <h1 className="text-5xl font-black font-heading tracking-tight text-white mb-4">
                  Activity <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hub</span>
                </h1>
                <p className="text-zinc-500 text-lg font-medium">Stay updated with your forge operations and system alerts.</p>
              </div>
              <button 
                onClick={handleMarkAllAsRead}
                disabled={isReading}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 disabled:opacity-50"
              >
                {isReading ? "Synchronizing..." : "Mark all as read"}
              </button>
            </div>
          </section>

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border border-white/5">
                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Synchronizing Notifications...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 rounded-[2rem] border border-red-500/10">
                <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
                <p className="text-red-400 font-bold uppercase tracking-widest text-[10px]">{error}</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border border-white/5">
                <Bell className="w-10 h-10 text-zinc-700 mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">No notifications found</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const Icon = ICON_MAP[notif.icon] || Bell;
                return (
                  <div 
                    key={notif.id}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex gap-6 items-start">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${notif.bg} ${notif.color} border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">{notif.title}</h3>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                              <Clock size={12} />
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                            <button className="text-zinc-700 hover:text-white transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-zinc-500 font-medium leading-relaxed max-w-2xl">{notif.description}</p>
                      </div>
                      <div className="flex items-center px-4 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={20} className="text-indigo-400" />
                      </div>
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })
            )}
          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="px-10 py-4 bg-white/5 text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/5 hover:border-white/10">
              Load Older Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
