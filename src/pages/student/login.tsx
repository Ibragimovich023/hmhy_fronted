import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { request } from "../../config/request";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

type TelegramWebApp = {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
  expand: () => void;
  ready: () => void; 
  close: () => void;
};

const StudentLogin = () => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const webApp = (window as any).Telegram?.WebApp as TelegramWebApp;
    
    if (webApp) {
      setTg(webApp);
      webApp.expand();
      if (typeof webApp.ready === 'function') {
        webApp.ready();
      }
      
      if (webApp.initData) {
        handleLogin(webApp);
      }
    } else {
      toast.error("Iltimos, bot orqali kiring", {
        className: "bg-black text-white border-white/10"
      });
    }
  }, []);

  const handleLogin = async (webApp?: TelegramWebApp) => {
    const telegramApp = webApp || tg;
    if (!telegramApp?.initData) return;

    setLoading(true);
    try {
      const response = await request.post("/telegram/login", {
        initData: telegramApp.initData,
      });

      const { accessToken, student } = response.data.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", "student");
      
      if (student) {
        localStorage.setItem("studentName", `${student.firstName} ${student.lastName}`);
      }

      toast.success(`Xush kelibsiz!`, {
        className: "bg-black text-white border-white/10"
      });

      setTimeout(() => navigate("/student"), 500);

    } catch (error: any) {
      const message = error?.response?.data?.message || "Login muvaffaqiyatsiz";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="h-20 w-20 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter italic">HMHY</h1>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Student Portal</p>
        </div>

        {tg?.initDataUnsafe.user ? (
          <div className="space-y-6">
            <div className="bg-zinc-900/40 border border-white/[0.05] p-6 rounded-[2rem] text-center backdrop-blur-xl">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3">Tizimga aniqlandi</p>
              <h2 className="text-xl font-bold tracking-tight">
                {tg.initDataUnsafe.user.first_name} {tg.initDataUnsafe.user.last_name || ''}
              </h2>
            </div>

            <button
              onClick={() => handleLogin()}
              disabled={loading}
              className="w-full h-16 bg-white text-black rounded-2xl font-black flex items-center justify-center gap-3 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Davom etish <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-10 bg-zinc-900/40 border border-white/[0.05] rounded-[2.5rem]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500 mb-4" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Yuklanmoqda...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;