import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { AlertTriangle, Loader2, ShieldAlert } from "lucide-react";
import type { Props } from "../../auth/admin-type";

export const TeacherHardDeleteModal = ({
    teacher,
    open,
    onOpenChange,
    onConfirm,
    isPending,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-[#0a0c14] border-white/10 text-white rounded-[28px] shadow-2xl relative">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="p-8 relative z-10">
                    <DialogHeader className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="space-y-1 text-left">
                                <DialogTitle className="text-2xl font-bold tracking-tight">
                                    To'liq o'chirish
                                </DialogTitle>
                                <DialogDescription className="text-slate-400 text-sm leading-relaxed">
                                    Tizimdan ma'lumotlarni butunlay o'chirish.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="mt-6 space-y-6">
                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <p className="text-sm text-slate-300">
                                "<span className="text-white font-bold italic">
                                    {teacher?.fullName}
                                </span>" ustozni to'liq o'chirib tashlamoqchimisiz?
                            </p>
                        </div>

                        <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl space-y-3 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rotate-45 translate-x-8 -translate-y-8" />
                            
                            <div className="flex items-center gap-2 text-red-500">
                                <AlertTriangle className="w-4 h-4 animate-pulse" />
                                <span className="font-black text-[10px] uppercase tracking-[0.2em]">
                                    Kritik ogohlantirish!
                                </span>
                            </div>
                            <p className="text-xs text-red-400/90 leading-relaxed font-medium">
                                Ushbu amal qaytarilmasdir. Barcha bog'liq
                                ma'lumotlar: darslar tarixi, moliya tranzaksiyalari 
                                va shaxsiy hujjatlar arxivsiz o'chiriladi.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-8">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 h-12 rounded-xl font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all order-2 sm:order-1"
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            onClick={onConfirm}
                            disabled={isPending}
                            className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 transition-all active:scale-95 order-1 sm:order-2"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    O'chirilmoqda...
                                </>
                            ) : (
                                "Tasdiqlash"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};