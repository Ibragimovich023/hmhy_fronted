import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../components/ui/sidebar"
import { links } from "./layout-data"
import { Link, useNavigate } from "react-router-dom"
import type { Role } from "../pages/auth/types"
import { ActiveLink } from "../components/active-link"
import { HMHYText } from "../components/hmhy"

export function AppSidebar({ role }: { role: Role }) {
    const navigate = useNavigate()
    const roleLinks = links[role as keyof typeof links] || []

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("username")
        navigate("/", { replace: true })
    }
    
    console.log(handleLogout);

    return (
        <Sidebar className="border-r border-white/5 bg-[#02040a] text-slate-400">
            <SidebarHeader className="h-28 px-6 flex items-center justify-center border-b border-white/5 bg-[#02040a]">
                <Link 
                    to={`/app/${role}`} 
                    className="flex items-center gap-2 transition-transform duration-200 active:scale-95 group"
                >
                    <div className="relative">
                        <div className="absolute -inset-2 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <HMHYText />
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-6 bg-[#02040a]">
                <SidebarGroupContent className="p-0 bg-transparent">
                    <SidebarMenu className="space-y-2">
                        {roleLinks.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent focus:bg-transparent">
                                    <ActiveLink href={item.url}>
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-white/10 hover:bg-white/[0.03] hover:text-white">
                                            {/* Hoverda chiqadigan chap chiziq */}
                                            <div className="absolute left-0 w-1 h-0 bg-blue-500 transition-all duration-300 group-hover:h-1/2 rounded-full" />
                                            
                                            <item.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors duration-300" />
                                            <span className="font-medium tracking-wide">
                                                {item.title}
                                            </span>
                                        </div>
                                    </ActiveLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>

            <div className="mt-auto p-4 opacity-20">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-500 to-transparent" />
            </div>
        </Sidebar>
    )
}