import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { AppSidebar } from "./navbar"
import { type Role } from "../pages/auth/types"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { LogOut, User, LayoutGrid } from "lucide-react"

export const MainLayout = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role") as Role | null
  const username = localStorage.getItem("username") || "User"

  if (!token || !role) {
    return <Navigate replace to="/" />
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    navigate("/", { replace: true })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#02040a]">
        <AppSidebar role={role} />

        <main className="flex-1 flex flex-col min-h-screen">
          
          <header className="sticky top-0 z-40 h-16 bg-[#02040a]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="p-1.5 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <SidebarTrigger className="text-slate-300 hover:text-white" />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold text-white tracking-wide">
                    HMHY Management
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[2px]">
                   System Control
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-white/90">
                    {username}
                  </span>
                  <Badge className="h-5 bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-bold px-2 py-0">
                    {role.toUpperCase()}
                  </Badge>
                </div>
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-blue-400">
                  <User className="w-5 h-5" />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/10 transition-all"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span className="sr-only">Chiqish</span>
              </Button>
            </div>
          </header>

          <div className="p-4 md:p-8 bg-[#02040a] relative flex-1">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
            
            <div className="relative">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}