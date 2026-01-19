import { LayoutGrid, BookOpen, Bell, User } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-5 font-sans">
      <div className="flex justify-between items-center mt-4 mb-10">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">O'quvchi paneli</p>
        </div>
        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center">
          <Bell className="w-5 h-5 text-zinc-400" />
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/[0.05] rounded-3xl p-6 mb-6">
        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Joriy Kurs</p>
        <h2 className="text-xl font-bold mb-4">Frontend Development</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <div className="h-1.5 w-full bg-black rounded-full">
            <div className="h-full bg-blue-600 w-[65%] rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button className="flex items-center gap-4 bg-zinc-900/30 border border-white/[0.03] p-4 rounded-2xl hover:bg-zinc-900/50 transition-all active:scale-[0.98]">
          <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-left text-sm font-bold">Mening kurslarim</div>
        </button>

        <button className="flex items-center gap-4 bg-zinc-900/30 border border-white/[0.03] p-4 rounded-2xl hover:bg-zinc-900/50 transition-all active:scale-[0.98]">
          <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-left text-sm font-bold">Dars jadvali</div>
        </button>

        <button className="flex items-center gap-4 bg-zinc-900/30 border border-white/[0.03] p-4 rounded-2xl hover:bg-zinc-900/50 transition-all active:scale-[0.98]">
          <div className="h-10 w-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-left text-sm font-bold">Profil sozlamalari</div>
        </button>
      </div>

      <div className="text-center mt-12">
        <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em]">
          Academy System v1.0
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;