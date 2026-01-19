import { useState } from "react";
import { useDeleteTeacher } from "../service/mutate/useDeleteTeacher";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { Loader2, AlertCircle, Info } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import type { TeacherDeleteModalProps } from "../../auth/admin-type";

interface ApiErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const TeacherDeleteModal = ({
    teacher,
    open,
    onOpenChange,
}: TeacherDeleteModalProps) => {
    const [reason, setReason] = useState("");
    const { mutate, isPending } = useDeleteTeacher();

    const handleDelete = () => {
        if (!reason.trim()) {
            toast.error("O'chirish sababini kiriting", {
                position: "top-right",
                style: { background: "#0a0c14", color: "#fff", border: "1px solid #ef4444" }
            });
            return;
        }

        mutate(
            { id: teacher.id, reason },
            {
                onSuccess: () => {
                    toast.success("Ustoz muvaffaqiyatli o'chirildi");
                    onOpenChange(false);
                    setReason("");
                },
                onError: (error: unknown) => {
                    const apiError = error as ApiErrorResponse;
                    toast.error(apiError?.response?.data?.message || "Xatolik yuz berdi!");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0c14] border-white/10 text-white rounded-[28px] p-8 shadow-2xl overflow-hidden relative">
                {/* Dekorativ qizil nur */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 blur-[60px] rounded-full pointer-events-none" />
                
                <DialogHeader className="relative z-10 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                        O'chirishni tasdiqlang
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-sm leading-relaxed">
                        Ushbu amalni ortga qaytarib bo'lmaydi. O'chirishdan so'ng ma'lumotlar arxivga o'tadi.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 mt-6 relative z-10">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-sm text-slate-300">
                            "<span className="text-white font-bold">
                                {teacher?.fullName || teacher?.name}
                            </span>"ni o'chirishga ishonchingiz komilmi?
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                O'chirish sababi <span className="text-red-500">*</span>
                            </label>
                            <Info className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        
                        <Textarea
                            placeholder="Nima uchun o'chirilayotganini tushuntiring..."
                            className="min-h-[120px] bg-white/[0.03] border-white/10 rounded-xl text-white resize-none focus-visible:ring-red-500/20 focus-visible:border-red-500/40 transition-all placeholder:text-slate-600"
                            maxLength={500}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        
                        <div className="flex justify-between items-center px-1">
                            <p className="text-[10px] font-medium text-slate-500 tracking-tighter">
                                {reason.length} / 500 belgi
                            </p>
                            {reason.length < 5 && reason.length > 0 && (
                                <p className="text-[10px] text-red-400 italic flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                                    Kamida 5 ta belgi kiriting
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 relative z-10">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-12 px-6 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all order-2 sm:order-1"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleDelete}
                        disabled={isPending || reason.trim().length < 3}
                        className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95 min-w-[140px] order-1 sm:order-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Jarayonda...
                            </>
                        ) : (
                            "Tasdiqlash"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};