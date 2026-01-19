import { Navigate, Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "./navbar"

export const StudentLayout = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token || role !== "student") {
    console.log(
      "%c 🛡️ Student Auth: Kirish rad etildi! ",
      "background: #dc2626; color: white; font-weight: bold; border-radius: 6px; padding: 3px 8px; border: 1px solid #991b1b;"
    )
    return <Navigate replace to="/student/login" />
  }

  console.log(
    "%c 📖 Student Portal: Xush kelibsiz! ",
    "background: #059669; color: white; font-weight: bold; border-radius: 6px; padding: 3px 8px; border: 1px solid #065f46;"
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#02040a] text-slate-200">
        <AppSidebar role="student" />
        
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-40 h-16 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                <SidebarTrigger className="text-slate-400 group-hover:text-white transition-colors" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  Student Portal
                </span>
                <span className="text-[10px] text-emerald-500 font-medium animate-pulse">
                  ● Online Learning
                </span>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4 md:p-8 bg-[#02040a] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}