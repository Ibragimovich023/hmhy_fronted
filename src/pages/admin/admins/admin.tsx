import { useState, useMemo } from "react";
import {
    Search,
    Plus,
    Phone,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    UserCircle2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select";

import { useQueryClient } from "@tanstack/react-query";
import { useAdminList } from "../service/query/useAdminList";
import { useCreateAdmin } from "../service/mutate/useCreateAdmin";
import { useDeleteAdmin } from "../service/mutate/useDeleteAdmin";
import type { Admin } from "../../auth/admin-type";
import { toast } from "sonner";
import { AdminDetailsModal } from "../components/adminDetail";
import { DeleteConfirmationModal } from "../components/adminDelete";
import { EditAdminModal } from "../components/adminEdit";

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const AdminPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"username" | "createdAt" | "updatedAt">("username");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
    const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
    const [adminToEdit, setAdminToEdit] = useState<Admin | null>(null);
    const [createFormData, setCreateFormData] = useState({ username: "", phoneNumber: "", password: "" });

    const queryClient = useQueryClient();
    const { data, isLoading } = useAdminList(page, pageSize);
    const { mutate: createAdmin, isPending: isCreating } = useCreateAdmin();
    const { mutate: deleteAdmin, isPending: isDeleting } = useDeleteAdmin();

    const admins: Admin[] = data?.data || [];
    const totalElements = data?.totalElements || 0;
    const totalPages = data?.totalPages || 1;
    const from = data?.from || 0;
    const to = data?.to || 0;

    const filteredAndSortedAdmins = useMemo(() => {
        return admins
            .filter((admin: Admin) => {
                const query = searchQuery.toLowerCase();
                return (
                    admin.username?.toLowerCase().includes(query) ||
                    admin.phoneNumber?.toLowerCase().includes(query) ||
                    admin.role?.toLowerCase().includes(query)
                );
            })
            .sort((a: Admin, b: Admin) => {
                let comparison = 0;
                if (sortBy === "username") {
                    comparison = (a.username || "").localeCompare(b.username || "");
                } else if (sortBy === "createdAt") {
                    comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
                } else if (sortBy === "updatedAt") {
                    comparison = new Date(a.updatedAt || 0).getTime() - new Date(b.updatedAt || 0).getTime();
                }
                return sortOrder === "asc" ? comparison : -comparison;
            });
    }, [admins, searchQuery, sortBy, sortOrder]);

    const toggleSort = (field: "username" | "createdAt" | "updatedAt") => {
        if (sortBy === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        else { setSortBy(field); setSortOrder("asc"); }
    };

    const handleCreate = () => {
        if (!createFormData.username || !createFormData.phoneNumber || !createFormData.password) {
            toast.error("Iltimos, barcha maydonlarni to'ldiring");
            return;
        }
        createAdmin(createFormData, {
            onSuccess: () => {
                toast.success("Admin muvaffaqiyatli yaratildi!");
                queryClient.invalidateQueries({ queryKey: ["adminList"] });
                setOpenCreate(false);
                setCreateFormData({ username: "", phoneNumber: "", password: "" });
            },
            onError: (error: unknown) => {
                const apiError = error as ApiError;
                toast.error(apiError.response?.data?.message || "Xatolik yuz berdi");
            }
        });
    };

    const handleDelete = () => {
        if (!adminToDelete?.id) return;
        deleteAdmin(adminToDelete.id, {
            onSuccess: () => {
                toast.success("Admin muvaffaqiyatli o'chirildi");
                queryClient.invalidateQueries({ queryKey: ["adminList"] });
                setAdminToDelete(null);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="p-8 min-h-screen bg-[#02040a]">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full bg-white/5 rounded-xl" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-24 w-full bg-white/5 rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 min-h-screen bg-[#02040a] text-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Adminlar</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Tizim boshqaruvchilari ro'yxati</p>
                </div>

                <div className="flex flex-1 max-w-2xl items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                        />
                    </div>
                    <Button
                        onClick={() => setOpenCreate(true)}
                        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Qo'shish
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-3 mb-6 bg-white/[0.02] p-2 rounded-2xl border border-white/5 w-fit">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Saralash:</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("username")}
                    className={`h-9 rounded-lg transition-all ${sortBy === "username" ? "bg-white/10 text-white" : "text-slate-400"}`}
                >
                    Nomi <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort("createdAt")}
                    className={`h-9 rounded-lg transition-all ${sortBy === "createdAt" ? "bg-white/10 text-white" : "text-slate-400"}`}
                >
                    Sana <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {filteredAndSortedAdmins.length > 0 ? (
                    filteredAndSortedAdmins.map((admin: Admin) => (
                        <Card
                            key={admin.id}
                            className="group p-5 bg-[#0a0c14] border border-white/5 rounded-[24px] hover:border-white/10 transition-all duration-300 shadow-xl"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <Avatar className="h-14 w-14 rounded-2xl border border-white/10 shadow-2xl">
                                            <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white font-bold text-lg">
                                                {admin.username?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-[#0a0c14] rounded-full" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                                                {admin.username}
                                            </h3>
                                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-black tracking-tighter uppercase">
                                                {admin.role || "ADMIN"}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-500 flex items-center gap-2 font-medium">
                                            <Phone className="w-3.5 h-3.5 text-slate-600" />
                                            {admin.phoneNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setSelectedAdminId(admin.id)}
                                        className="h-10 px-4 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white border border-white/5 transition-all"
                                    >
                                        Batafsil
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setAdminToEdit(admin)}
                                        className="h-10 px-4 rounded-xl text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 border border-white/5 transition-all"
                                    >
                                        Tahrirlash
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setAdminToDelete(admin)}
                                        className="h-10 px-4 rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-500 border border-white/5 transition-all"
                                    >
                                        O'chirish
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="bg-white/[0.02] p-24 rounded-3xl text-center border-2 border-dashed border-white/5">
                        <UserCircle2 className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium italic">Ma'lumotlar topilmadi</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-t border-white/5">
                <div className="flex items-center gap-6">
                    <p className="text-sm text-slate-500 font-medium">
                        Ko'rsatilyapti: <span className="text-white">{from}-{to}</span> / Jami: <span className="text-white">{totalElements}</span>
                    </p>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}
                    >
                        <SelectTrigger className="h-10 w-32 bg-white/5 border-white/10 rounded-xl text-xs text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0c14] border-white/10 text-white">
                            <SelectItem value="5">5 tadan</SelectItem>
                            <SelectItem value="10">10 tadan</SelectItem>
                            <SelectItem value="20">20 tadan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20 transition-all"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Oldingi
                    </Button>

                    <div className="flex items-center gap-1.5 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`h-9 w-9 p-0 rounded-xl transition-all font-bold ${
                                    page === p 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {p}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="text-slate-400 hover:text-white hover:bg-white/5 rounded-xl disabled:opacity-20 transition-all"
                    >
                        Keyingi <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>
            </div>

            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogContent className="sm:max-w-md bg-[#0a0c14] border-white/10 text-white rounded-[28px] p-8 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">Yangi Admin qo'shish</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-6">
                        <div className="space-y-2">
                            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Username</Label>
                            <Input
                                placeholder="Admin nomi"
                                value={createFormData.username}
                                onChange={(e) => setCreateFormData({ ...createFormData, username: e.target.value })}
                                className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:ring-blue-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Telefon raqami</Label>
                            <Input
                                placeholder="+998..."
                                value={createFormData.phoneNumber}
                                onChange={(e) => setCreateFormData({ ...createFormData, phoneNumber: e.target.value })}
                                className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:ring-blue-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-400 text-xs font-bold uppercase tracking-widest">Parol</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={createFormData.password}
                                onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
                                className="bg-white/[0.03] border-white/10 h-12 rounded-xl focus:ring-blue-500/20 text-white"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-3">
                        <Button variant="ghost" onClick={() => setOpenCreate(false)} className="rounded-xl text-slate-400">Bekor qilish</Button>
                        <Button 
                            onClick={handleCreate} 
                            disabled={isCreating}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                        >
                            {isCreating ? <Loader2 className="animate-spin h-5 w-5" /> : "Saqlash"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AdminDetailsModal open={!!selectedAdminId} id={selectedAdminId} onOpenChange={() => setSelectedAdminId(null)} />
            <DeleteConfirmationModal open={!!adminToDelete} adminName={adminToDelete?.username} onConfirm={handleDelete} isDeleting={isDeleting} onOpenChange={() => setAdminToDelete(null)} />
            <EditAdminModal open={!!adminToEdit} admin={adminToEdit} onOpenChange={(isOpen) => !isOpen && setAdminToEdit(null)} />
        </div>
    );
};