import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isDeleting: boolean;
    adminName?: string; 
}

export const DeleteConfirmationModal = ({
    open,
    onOpenChange,
    onConfirm,
    isDeleting,
    adminName,
}: DeleteConfirmationModalProps) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-[#0a0c14] border-white/10 text-white rounded-[28px] p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <DialogHeader className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                
                <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                    O'chirishni tasdiqlang
                </DialogTitle>
                
                <DialogDescription className="text-slate-400 text-base leading-relaxed">
                    Siz chindan ham <span className="text-white font-semibold">"{adminName || 'ushbu admin'}"</span>ni tizimdan o'chirib tashlamoqchimisiz? 
                    <br />
                    <span className="text-red-400/80 text-sm mt-2 block italic">
                        * Bu amalni ortga qaytarib bo'lmaydi.
                    </span>
                </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-8 gap-3 sm:gap-0 relative z-10">
                <Button
                    variant="ghost"
                    onClick={() => onOpenChange(false)}
                    className="h-12 px-6 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-medium border border-transparent hover:border-white/10"
                >
                    Bekor qilish
                </Button>
                
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    variant="destructive"
                    className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95 flex items-center justify-center min-w-[140px]"
                >
                    {isDeleting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            O'chirilmoqda
                        </>
                    ) : (
                        "Ha, o'chirilsin"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);