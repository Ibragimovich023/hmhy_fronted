import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { useAdmin } from "../service/query/useAdmin";
import { Calendar, Copy, Loader2, Phone, User, Hash, Info } from "lucide-react";
import { toast } from "sonner";

interface AdminDetailsModalProps {
    id: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AdminDetailsModal = ({ id, open, onOpenChange }: AdminDetailsModalProps) => {
    const { data, isLoading } = useAdmin(id);
    const adminData = data?.data || {};

    const formatDate = (dateString: string) => {
        if (!dateString) return { date: "---", time: "--:--" };
        const date = new Date(dateString);
        const months = [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
        ];
        return {
            date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
            time: date.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    };

    const createdAt = formatDate(adminData.createdAt);
    const updatedAt = formatDate(adminData.updatedAt);

    const copyToClipboard = (text: string, message: string) => {
        navigator.clipboard.writeText(text);
        toast.success(message, {
            position: "top-right",
            style: { background: "#0a0c14", color: "#fff", border: "1px solid #1e293b" }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-[#0a0c14] border-white/10 text-white rounded-[28px] shadow-2xl">
                {/* Header Dekoratsiyasi */}
                <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />
                
                <div className="flex items-center gap-3 p-6 pb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Info className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Ma'lumotlar</h2>
                </div>

                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                        <span className="text-slate-500 text-sm animate-pulse">Yuklanmoqda...</span>
                    </div>
                ) : (
                    <div className="p-6 pt-2 space-y-3">
                        {/* ID qatori */}
                        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all hover:bg-white/[0.04]">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Hash className="w-4 h-4" />
                                <span className="text-sm font-medium">Tizim ID</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-300 font-mono text-xs bg-white/5 px-2 py-1 rounded">
                                    {adminData.id || id}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(adminData.id || id || "", "ID nusxalandi!")}
                                    className="text-slate-500 p-1.5 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Username qatori */}
                        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.04]">
                            <div className="flex items-center gap-3 text-slate-400">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">Username</span>
                            </div>
                            <span className="text-white font-semibold text-sm">
                                {adminData.username}
                            </span>
                        </div>

                        {/* Phone qatori */}
                        <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.04]">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-medium">Telefon</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-medium text-sm">
                                    {adminData.phoneNumber}
                                </span>
                                <button
                                    onClick={() => copyToClipboard(adminData.phoneNumber || "", "Raqam nusxalandi!")}
                                    className="text-slate-500 p-1.5 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all cursor-pointer"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Vaqt qatorlari */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-2">
                                <div className="flex items-center gap-2 text-blue-400">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Yaratilgan</span>
                                </div>
                                <div className="text-white text-xs font-bold leading-tight">
                                    {createdAt.date} <br />
                                    <span className="text-slate-500 font-normal">{createdAt.time}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Yangilangan</span>
                                </div>
                                <div className="text-white text-xs font-bold leading-tight">
                                    {updatedAt.date} <br />
                                    <span className="text-slate-500 font-normal">{updatedAt.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Footer yopish tugmasi */}
                <div className="p-6 pt-2">
                    <button 
                        onClick={() => onOpenChange(false)}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-medium transition-all border border-white/5"
                    >
                        Yopish
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};