import { Card } from "../../../components/ui/card";
import { useAdmin } from "../service/query/useAdmin";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
    Calendar,
    CheckCircle2,
    Info,
    RotateCcw,
    Trash2,
    User,
    Mail,
    Phone,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";

interface Teacher {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    imageUrl?: string;
    deletedBy: string;
    reasonDelete?: string;
    deletedAt?: string; 
}

interface TeacherCardProps {
    teacher: Teacher;
    onOpenDetails: (id: string) => void;
    getInitials: (name: string) => string;
    onRestore: () => void;
    isRestoring: boolean;
    onHardDelete: () => void;
}

export const TeacherCard = ({
    teacher,
    onOpenDetails,
    getInitials,
    onRestore,
    isRestoring,
    onHardDelete,
}: TeacherCardProps) => {
    const { data: dataAdmin, isLoading: isAdminLoading } = useAdmin(
        teacher.deletedBy
    );

    return (
        <Card className="p-6 md:p-8 bg-[#0a0c14] border border-white/5 rounded-[24px] hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden group">
            {/* Dekorativ fon nuri */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                <div className="flex gap-6">
                    <div className="relative">
                        <Avatar className="h-20 w-20 rounded-2xl border border-white/10 shadow-2xl">
                            <AvatarImage
                                src={teacher.imageUrl}
                                className="object-cover"
                            />
                            <AvatarFallback className="text-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold">
                                {getInitials(teacher.fullName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-red-500 border-2 border-[#0a0c14] rounded-full flex items-center justify-center">
                            <Trash2 className="w-2.5 h-2.5 text-white" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {teacher.fullName}
                        </h3>
                        <div className="space-y-1">
                            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-slate-600" />
                                {teacher.email}
                            </p>
                            <p className="text-slate-500 text-sm flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-600" />
                                {teacher.phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto min-w-[140px]">
                    <Button
                        variant="ghost"
                        disabled={isRestoring}
                        onClick={onRestore}
                        className="w-full gap-2 h-10 bg-white/5 border border-white/5 text-slate-300 font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                        <RotateCcw
                            className={`w-4 h-4 ${
                                isRestoring ? "animate-spin" : ""
                            }`}
                        />
                        {isRestoring ? "Tiklanmoqda" : "Tiklash"}
                    </Button>
                    <Button
                        onClick={onHardDelete}
                        className="w-full gap-2 h-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-semibold rounded-xl border border-red-500/20 transition-all shadow-lg shadow-red-500/5 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" /> O'chirish
                    </Button>
                    <button
                        onClick={() => onOpenDetails(teacher.id)}
                        className="text-sm font-semibold text-slate-500 hover:text-blue-400 transition-colors mt-1 underline-offset-4 hover:underline cursor-pointer text-center"
                    >
                        Batafsil ma'lumot
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 relative z-10">
                <div className="bg-white/[0.02] p-4 rounded-2xl flex items-center gap-3 border border-white/5 text-sm text-slate-400">
                    <Calendar className="w-4 h-4 text-blue-500/50" />
                    <span>
                        O'chirilgan: <b className="text-slate-200 ml-1 font-semibold">08 Yanvar 2026</b>
                    </span>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl flex items-center gap-3 border border-white/5 text-sm text-slate-400">
                    <User className="w-4 h-4 text-blue-500/50" />
                    <span className="truncate">
                        O'chirgan:{" "}
                        <b className="text-slate-200 ml-1 font-semibold">
                            {isAdminLoading
                                ? "..."
                                : dataAdmin?.data?.username || "Admin"}
                        </b>
                    </span>
                </div>
                <div className="bg-white/[0.02] p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-white/5 md:col-span-2">
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Info className="w-4 h-4 text-amber-500/50" />
                        <span>
                            Tiklash muddati: <b className="text-slate-200 ml-1 font-semibold">22 Yanvar 2026</b>
                        </span>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex gap-2 font-bold text-[10px] tracking-widest uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" /> TIKLASH MUMKIN
                    </Badge>
                </div>
            </div>

            {teacher.reasonDelete && (
                <div className="mt-5 p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl relative z-10">
                    <p className="text-sm leading-relaxed">
                        <span className="font-bold text-amber-500 uppercase text-[10px] tracking-widest mr-3">
                            Sabab:
                        </span>
                        <span className="text-slate-300 font-medium">
                            {teacher.reasonDelete}
                        </span>
                    </p>
                </div>
            )}
        </Card>
    );
};