import { Navigate, Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import type { Role } from "../pages/auth/types"
import { AppSidebar } from "./navbar";

export const TeacherLayout = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role') as Role

  if (!token || role !== 'teacher') {
    console.log(
      "%c ⛔ Teacher Auth: Kirish taqiqlangan! ",
      "background: #ef4444; color: white; font-weight: bold; border-radius: 4px; padding: 2px 5px;"
    )
    return <Navigate replace to="/teacher/login" />
  }

  console.log(
    "%c 🎓 Teacher Access: Tizimga kirildi! ",
    "background: #10b981; color: white; font-weight: bold; border-radius: 4px; padding: 2px 5px;"
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#02040a] text-slate-200">
        <AppSidebar role="teacher" />
        
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 h-16 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer">
                <SidebarTrigger className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-widest uppercase">
                  Teacher Dashboard
                </span>
                <span className="text-[10px] text-blue-500 font-medium">
                  Akademik boshqaruv paneli
                </span>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 relative overflow-hidden bg-[#02040a]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}