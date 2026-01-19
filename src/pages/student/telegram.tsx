import { useEffect } from "react"; // Yo'naltirish uchun kerak
import { Send, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import studentImg from "../../assets/student.png"; 

const Telegram = () => {
  const botLink = "https://t.me/QogozBinoTVbot"; // Linkni to'g'irladik (@ olib tashlandi)

  // Sahifaga kirishi bilan botni ochish
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = botLink;
    }, 2000); // 2 soniya kutib keyin yo'naltiradi (foydalanuvchi sahifani ko'rishi uchun)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center font-sans p-4 overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-amber-400/10 blur-[120px]" />

      <div className="relative w-full max-w-sm">
        
        {/* Profile and Shield Badge */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30">
          <div className="relative">
            <div className="h-32 w-32 rounded-full border-4 border-black bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img 
                src={studentImg} 
                alt="Student" 
                className="h-full w-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="absolute bottom-1 right-1 z-40">
              <div className="h-9 w-9 bg-amber-300 rounded-full flex items-center justify-center border-[3px] border-black shadow-lg shadow-amber-900/40">
                <Send className="text-black w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-0 rounded-[2rem] border border-white/[0.08] bg-black p-8 shadow-[0_0_50px_rgba(0,0,0,1)] pt-24 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

          <div className="mb-10">
            <h2 className="text-xl font-black text-white tracking-[0.1em] uppercase italic">Student Access</h2>
            <div className="h-1 w-8 bg-amber-400 mx-auto mt-2 rounded-full animate-pulse" />
          </div>

          <div className="space-y-8 flex flex-col items-center">
            <div className="flex items-center gap-1">
              <h1 className="text-4xl font-black tracking-tighter text-white">HM</h1>
              <h1 className="text-4xl font-black tracking-tighter text-amber-300">HY</h1>
            </div>

            <div className="space-y-3 px-2">
              <p className="text-xs font-bold text-zinc-400 leading-relaxed uppercase tracking-wider">
                Botga yo'naltirilmoqda...
              </p>
              <p className="text-[10px] text-zinc-600 font-medium">
                Agar o'tish sodir bo'lmasa, quyidagi tugmani bosing.
              </p>
            </div>

            <Button
              className="w-full h-14 rounded-xl font-black bg-white text-black hover:bg-zinc-200 shadow-xl transition-all active:scale-[0.97] border-none"
              onClick={() => window.location.href = botLink}
            >
              <span className="flex items-center justify-center gap-2 tracking-tighter">
                BOTGA O'TISH <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[9px] text-zinc-800 font-black uppercase tracking-[0.5em]">
          Redirecting to Telegram...
        </p>
      </div>
    </div>
  );
};

export default Telegram;