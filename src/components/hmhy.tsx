export const HMHYText = () => {
  return (
    <div className="relative group cursor-default select-none">
      <h1 className="relative flex items-baseline leading-none">
        <span className="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <span className="relative flex items-center tracking-tighter">
          <span className="text-white text-5xl md:text-7xl font-black italic tracking-tighter">
            HM
          </span>

          <span className="relative flex">
            <span className="text-blue-500 text-5xl md:text-7xl font-black italic tracking-tighter">
              H
            </span>
            <span className="text-blue-400 text-5xl md:text-7xl font-black italic tracking-tighter">
              Y
            </span>
            
            <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 to-transparent" />
          </span>
        </span>

        <span className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <span className="absolute top-0 left-0 w-full h-[2px] bg-white animate-scan" />
        </span>
      </h1>

      <div className="flex items-center gap-2 mt-1 px-1">
        <span className="h-[1px] w-4 bg-zinc-800" />
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-500 transition-colors">
          Secure_Node_v4.0
        </span>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};