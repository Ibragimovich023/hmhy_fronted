import { useState } from "react"; 
import { useUpdateAdmin } from "../service/mutate/useEditAdmin";
import type { Admin } from "../../auth/admin-type";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Loader2, Edit3, ShieldCheck } from "lucide-react";

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

interface AdminUpdatePayload {
    username: string;
    phoneNumber: string;
    password?: string;
}

export const EditAdminModal = ({
    admin,
    open,
    onOpenChange,
}: {
    admin: Admin | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) => {
    const { mutate: updateAdmin, isPending } = useUpdateAdmin();
    
    const [formData, setFormData] = useState({
        username: admin?.username || "",
        phoneNumber: admin?.phoneNumber || "",
        password: "",
    });

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen && admin) {
            setFormData({
                username: admin.username || "",
                phoneNumber: admin.phoneNumber || "",
                password: "",
            });
        }
        onOpenChange(isOpen);
    };

    const queryClient = useQueryClient();

    const handleSave = () => {
        if (!admin?.id) return;

        const { password, ...otherData } = formData;
        const updateData: AdminUpdatePayload = { ...otherData };

        if (password && password.trim() !== "") {
            updateData.password = password;
        }

        updateAdmin(
            { id: admin.id, data: updateData },
            {
                onSuccess: () => {
                    toast.success("Admin muvaffaqiyatli yangilandi!");
                    handleOpenChange(false);
                    queryClient.invalidateQueries({ queryKey: ["adminList"] });
                },
                onError: (error: unknown) => {
                    const apiError = error as ApiError;
                    toast.error(apiError?.response?.data?.message || "Xatolik yuz berdi");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md bg-[#0a0c14] border-white/10 text-white rounded-[28px] p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] rounded-full pointer-events-none" />
                
                <DialogHeader className="relative z-10 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Edit3 className="w-5 h-5 text-blue-400" />
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            Tahrirlash
                        </DialogTitle>
                    </div>
                    <p className="text-slate-500 text-sm">Boshqaruvchi ma'lumotlarini yangilash</p>
                </DialogHeader>

                <div className="grid gap-5 py-6 relative z-10">
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</Label>
                        <Input
                            placeholder="Yangi username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Telefon raqam</Label>
                        <Input
                            placeholder="+998..."
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Yangi Parol</Label>
                            <span className="text-[10px] text-slate-600 italic">Ixtiyoriy</span>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="h-12 bg-white/[0.03] border-white/10 rounded-xl text-white focus:ring-blue-500/20"
                        />
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1 ml-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Parol o'zgarmasligi uchun bo'sh qoldiring</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 relative z-10">
                    <Button
                        variant="ghost"
                        onClick={() => handleOpenChange(false)}
                        className="h-12 px-6 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isPending}
                        className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 min-w-[120px]"
                    >
                        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : "Saqlash"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};