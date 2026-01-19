import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "../../../components/ui/dialog";
import {
    Calendar,
    Copy,
    Loader2,
    Mail,
    Phone,
    Globe,
    Award,
    Star,
    Briefcase,
    DollarSign,
    BookOpen,
    CheckCircle,
    XCircle,
    Hash,
} from "lucide-react";
import type { LucideIcon } from "lucide-react"; 
import { toast } from "sonner";
import { useTeacher } from "../service/query/useTeacher";

interface TeacherDetailItemProps {
    icon: LucideIcon;
    label: string;
    value: string | number | boolean | undefined;
    copyable?: boolean;
    color?: string;
    isStatus?: boolean;
}

interface TeacherDetailsModalProps {
    id: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DetailItem = ({
    icon: Icon,
    label,
    value,
    copyable = false,
    color = "text-slate-400",
    isStatus = false,
}: TeacherDetailItemProps) => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Nusxalandi!", {
            style: { background: "#0a0c14", color: "#fff", border: "1px solid #1e293b" }
        });
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.04]">
            <div className="flex items-center gap-3 text-slate-400">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {isStatus ? (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase ${
                        value ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                        {value ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {value ? "Faol" : "Nofaol"}
                    </div>
                ) : (
                    <span className="text-slate-200 font-semibold text-sm truncate max-w-[180px]">
                        {value || "---"}
                    </span>
                )}
                {copyable && value && (
                    <button
                        onClick={() => copyToClipboard(String(value))}
                        className="text-slate-500 hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-500/10 transition-all cursor-pointer"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export const TeacherDetailsModal = ({ id, open, onOpenChange }: TeacherDetailsModalProps) => {
    const { data, isLoading } = useTeacher(id ?? ""); 
    const teacherData = data?.data || {};

    const formatDate = (dateString: string) => {
        if (!dateString) return { date: "---", time: "--:--" };
        const date = new Date(dateString);
        const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
        return {
            date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            time: date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        };
    };

    const createdAt = formatDate(teacherData.createdAt);
    const updatedAt = formatDate(teacherData.updatedAt);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-[#0a0c14] border-white/10 text-white rounded-[28px] shadow-2xl">
                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

                <DialogHeader className="sr-only">
                    <DialogTitle>{teacherData.fullName || "Teacher Details"}</DialogTitle>
                    <DialogDescription>Detailed view of teacher profile</DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="p-24 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                        <span className="text-slate-500 text-sm tracking-widest uppercase">Yuklanmoqda...</span>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="p-8 flex flex-col items-center bg-gradient-to-b from-white/[0.03] to-transparent">
                            <div className="relative w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-2 border-white/10 overflow-hidden">
                                {teacherData.imageUrl ? (
                                    <img src={teacherData.imageUrl} alt={teacherData.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="bg-gradient-to-br from-slate-700 to-slate-900 w-full h-full flex items-center justify-center">
                                        {teacherData.fullName?.charAt(0) || "T"}
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-5 font-bold text-2xl tracking-tight text-white text-center">
                                {teacherData.fullName || "Noma'lum"}
                            </h3>
                            <p className="text-blue-400 text-sm font-medium mt-1">{teacherData.specification || "Ustoz"}</p>
                        </div>

                        <div className="px-6 pb-6 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar relative z-10">
                            <DetailItem icon={Hash} label="ID" value={teacherData.id} copyable />
                            <DetailItem icon={Mail} label="Email" value={teacherData.email} copyable color="text-blue-400" />
                            <DetailItem icon={Phone} label="Telefon" value={teacherData.phoneNumber} copyable color="text-blue-400" />
                            <DetailItem icon={Globe} label="Til" value={teacherData.specification} color="text-purple-400" />
                            <DetailItem icon={Award} label="Daraja" value={teacherData.level} color="text-amber-400" />

                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Star className="w-4 h-4 text-orange-400" />
                                    <span className="text-xs font-medium uppercase tracking-wider opacity-70">Reyting</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-orange-400/10 px-2 py-1 rounded-lg">
                                    <span className="text-orange-400 font-bold text-sm">
                                        {Number(teacherData.rating || 0).toFixed(1)}
                                    </span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className={`w-2.5 h-2.5 ${s <= Math.round(Number(teacherData.rating)) ? "fill-orange-400 text-orange-400" : "text-slate-700"}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DetailItem icon={Briefcase} label="Tajriba" value={teacherData.experience} color="text-indigo-400" />

                            <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                <div className="flex items-center gap-3 text-emerald-400/70">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-xs font-medium uppercase tracking-wider">Narx</span>
                                </div>
                                <span className="text-emerald-400 font-bold text-sm">
                                    {new Intl.NumberFormat('uz-UZ').format(teacherData.hourPrice || 0)} so'm
                                </span>
                            </div>

                            <DetailItem icon={BookOpen} label="Darslar" value={teacherData.lessons?.length} />
                            <DetailItem icon={CheckCircle} label="Status" value={teacherData.isActive} isStatus />

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                                    <div className="flex items-center gap-2 text-slate-500 mb-2 font-bold uppercase text-[10px]">
                                        <Calendar className="w-3.5 h-3.5" /> Yaratilgan
                                    </div>
                                    <div className="text-slate-200 text-xs font-bold">{createdAt.date}</div>
                                </div>
                                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                                    <div className="flex items-center gap-2 text-slate-500 mb-2 font-bold uppercase text-[10px]">
                                        <Calendar className="w-3.5 h-3.5" /> Yangilangan
                                    </div>
                                    <div className="text-slate-200 text-xs font-bold">{updatedAt.date}</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-sm font-semibold transition-all"
                            >
                                Yopish
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};