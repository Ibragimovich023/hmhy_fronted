import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  ArrowRight,
  Zap,
} from "lucide-react"
import { useDashboardStats } from "../../../hooks/use-dashboard-stats"
import { Link } from "react-router-dom"

export const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats()
  const username = localStorage.getItem("username") || "Shuxrat"

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh] bg-[#0a0c14]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 relative z-10" />
            <div className="absolute inset-0 blur-lg bg-blue-500/20" />
          </div>
          <p className="text-slate-400 font-medium text-sm animate-pulse tracking-widest uppercase">
            Platforma yuklanmoqda...
          </p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6 bg-[#0a0c14]">
        <Card className="max-w-md w-full border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl rounded-[32px]">
          <CardHeader className="text-center pt-8">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <CardTitle className="text-xl text-white">Xatolik yuz berdi</CardTitle>
            <CardDescription className="text-slate-500 mt-2">
              Ma’lumotlarni olishda muammo bo‘ldi. Qayta urinib ko‘ring.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-bold transition-all active:scale-95"
            >
              Qayta urinish
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const stats = data.data

  const colorMap = {
    blue: {
      iconWrap: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      soft: "bg-white/[0.02] border-white/5",
      accentText: "text-blue-400",
      glow: "shadow-blue-500/10",
    },
    emerald: {
      iconWrap: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      soft: "bg-white/[0.02] border-white/5",
      accentText: "text-emerald-400",
      glow: "shadow-emerald-500/10",
    },
    purple: {
      iconWrap: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      soft: "bg-white/[0.02] border-white/5",
      accentText: "text-purple-400",
      glow: "shadow-purple-500/10",
    },
    amber: {
      iconWrap: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      soft: "bg-white/[0.02] border-white/5",
      accentText: "text-amber-400",
      glow: "shadow-amber-500/10",
    },
  } as const

  const topStats = [
    { title: "Ustozlar", value: stats.totalTeachers, sub: "Jami faol ustozlar", icon: Users, color: "blue" as const },
    { title: "Talabalar", value: stats.totalStudents, sub: "Jami faol talabalar", icon: GraduationCap, color: "emerald" as const },
    { title: "Darslar", value: stats.totalLessons, sub: "Jami darslar soni", icon: BookOpen, color: "purple" as const },
    { title: "Daromad", value: stats.totalRevenue, sub: "Jami daromad (UZS)", icon: DollarSign, color: "amber" as const, format: (v: number) => v.toLocaleString("uz-UZ") },
  ]

  const quickActions = [
    { title: "Ustozlar", icon: Users, color: "blue" as const, link: "/app/admin/teacher" },
    { title: "Talabalar", icon: GraduationCap, color: "emerald" as const, link: "/app/admin/student" },
    { title: "Darslar", icon: BookOpen, color: "purple" as const, link: "/app/admin/lesson" },
    { title: "To‘lovlar", icon: DollarSign, color: "amber" as const, link: "/app/admin/payment" },
  ]

  return (
    <div className="space-y-8 bg-[#0a0c14] min-h-screen">
      {/* HEADER SECTION */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#11141d] border border-white/5 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] -ml-32 -mb-32 rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
              <Zap className="w-3 h-3 fill-blue-400" /> System Live
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Xush kelibsiz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{username}</span>!
            </h1>
            <p className="text-slate-400 mt-2 text-lg font-medium">
              Bugungi platformangiz ko‘rsatkichlari bilan tanishing
            </p>
          </div>
          
          <div className="bg-white/[0.03] border border-white/5 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Server Status</p>
              <p className="text-emerald-400 font-bold text-sm">Online</p>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      </div>

      {/* TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {topStats.map((s) => {
          const c = colorMap[s.color]
          const Icon = s.icon
          const val = s.format ? s.format(s.value as number) : s.value

          return (
            <Card key={s.title} className="group relative overflow-hidden border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04] hover:border-white/10 rounded-[24px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border transition-colors ${c.iconWrap}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="h-1 w-12 bg-white/5 rounded-full" />
                </div>

                <div className="mt-6">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{s.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-3xl font-black text-white">{val}</p>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-2 font-medium uppercase tracking-tighter">
                    {s.sub}
                  </p>
                </div>
                
                {/* Decorative Bottom Glow */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-${s.color}-500/50 to-transparent blur-sm`} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Talabalar */}
        <Card className="border-white/5 bg-white/[0.02] rounded-[24px] overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <GraduationCap className="w-5 h-5 text-emerald-400" /> Talabalar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-5 rounded-[20px] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between group transition-all hover:bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-300">Faol Talabalar</span>
              </div>
              <span className="text-2xl font-black text-white">{stats.totalStudents}</span>
            </div>

            <div className="p-5 rounded-[20px] bg-red-500/5 border border-red-500/10 flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-300">Bloklanganlar</span>
              </div>
              <span className="text-2xl font-black text-white">0</span>
            </div>
          </CardContent>
        </Card>

        {/* Ustozlar */}
        <Card className="border-white/5 bg-white/[0.02] rounded-[24px] overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <Users className="w-5 h-5 text-blue-400" /> Ustozlar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-5 rounded-[20px] bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Users className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-300">Jami Ustozlar</span>
              </div>
              <span className="text-2xl font-black text-white">{stats.totalTeachers}</span>
            </div>

            <div className="p-5 rounded-[20px] bg-purple-500/5 border border-purple-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Star className="w-5 h-5 fill-purple-400" />
                </div>
                <span className="font-bold text-slate-300">O‘rtacha Reyting</span>
              </div>
              <span className="text-2xl font-black text-white">4.5</span>
            </div>
          </CardContent>
        </Card>

        {/* To‘lovlar */}
        <Card className="border-white/5 bg-white/[0.02] rounded-[24px] overflow-hidden">
          <CardHeader className="border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-widest">
              <DollarSign className="w-5 h-5 text-amber-400" /> To‘lovlar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="p-5 rounded-[20px] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Jami Daromad</span>
              <span className="text-2xl font-black text-amber-400">{stats.totalRevenue.toLocaleString("uz-UZ")} UZS</span>
            </div>

            <Button asChild variant="ghost" className="w-full h-14 rounded-xl border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-all group">
              <Link to="/app/admin/payments" className="flex items-center justify-between w-full px-4">
                Barcha to‘lovlar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card className="border-white/5 bg-white/[0.02] rounded-[32px] overflow-hidden">
        <CardHeader className="border-b border-white/5 p-6 bg-white/[0.01]">
          <CardTitle className="text-base font-bold text-white uppercase tracking-[0.2em]">Tezkor harakatlar</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((a) => {
              const c = colorMap[a.color]
              const Icon = a.icon
              return (
                <Link
                  key={a.title}
                  to={a.link}
                  className={`group rounded-2xl border ${c.soft} p-6 flex flex-col items-center gap-4 hover:bg-white/[0.05] hover:border-white/10 transition-all active:scale-95 shadow-lg shadow-black/20`}
                >
                  <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${c.iconWrap}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="font-bold text-slate-300 text-sm tracking-wide group-hover:text-white">{a.title}</p>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}