export const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-black p-4 md:p-8 space-y-8 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.05] animate-pulse">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/[0.08]" />
          <div className="space-y-3">
            <div className="h-8 bg-zinc-900 rounded-lg w-48" />
            <div className="h-4 bg-zinc-900/50 rounded-md w-32" />
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="h-12 bg-zinc-900 rounded-2xl w-full md:w-32" />
          <div className="h-12 bg-zinc-900 rounded-2xl w-full md:w-32" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-zinc-900/20 border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-3 bg-zinc-900 rounded w-24 mb-2" />
                <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl w-full" />
              </div>
            ))}
          </div>

          <div className="space-y-8">
             <div className="space-y-3">
                <div className="h-3 bg-zinc-900 rounded w-24 mb-2" />
                <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl" />
                <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl" />
              </div>
              <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl" />
              <div className="h-14 bg-black/40 border border-white/[0.05] rounded-xl" />
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="h-3 bg-zinc-900 rounded w-32 mb-2" />
            <div className="h-32 bg-black/40 border border-white/[0.05] rounded-2xl w-full" />
          </div>
        </div>
      </div>

      {/* CSS Animation for Shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}