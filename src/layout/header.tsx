import { SidebarTrigger } from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { LogOut, User, ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import type { Role } from "../pages/auth/types";
import { useNavigate } from "react-router-dom";

export function AppHeader({ role }: { role: Role }) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Chap tomon: Navigatsiya va Sarlavha */}
            <div className="flex items-center gap-4">
                <div className="p-1 bg-white/5 rounded-lg border border-white/10">
                    <SidebarTrigger className="text-slate-400 hover:text-white transition-colors" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-sm font-bold text-white tracking-tight md:text-base">
                        Dashboard
                    </h1>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                        {role} Panel
                    </p>
                </div>
            </div>

            {/* O'ng tomon: Profil va Chiqish */}
            <div className="flex items-center gap-2 md:gap-6">
                {/* Profil qismi */}
                <div
                    onClick={() =>
                        navigate(
                            role === "superadmin"
                                ? "/admin/profile"
                                : `/${role}/profile`
                        )
                    }
                    className="group flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] cursor-pointer transition-all duration-300"
                >
                    <div className="relative">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-[#02040a] rounded-full" />
                    </div>
                    
                    <div className="hidden md:flex flex-col items-start leading-none">
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                            Account
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium capitalize">
                            {role}
                        </span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>

                <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

                {/* Chiqish tugmasi */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-400/20"
                    onClick={() => {
                        Cookies.remove("token2");
                        Cookies.remove("role");
                        window.location.href = "/";
                    }}
                >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden md:inline font-medium text-xs">Sign out</span>
                </Button>
            </div>
        </header>
    );
}