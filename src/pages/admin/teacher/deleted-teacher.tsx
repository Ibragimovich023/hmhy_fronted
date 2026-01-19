import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ArrowLeft,
    ArrowUpDown,
    ArrowDown,
    AlertCircle,
    RotateCcw,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import { useDeletedTeacher } from "../service/query/useDeletedTeacher";
import { TeacherDetailsModal } from "../components/teacherDetail";
import { TeacherCard } from "../components/teacherCard";
import { useRestoreTeacher } from "../service/mutate/useRestoreTeacher";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useHardDeleteTeacher } from "../service/mutate/useHardDeleteTeacher";
import { TeacherHardDeleteModal } from "../components/teacherHardDelete";

export interface Teacher {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string; 
    deletedBy: string;
    deletedAt?: string;
    image?: string;
    subject?: string;
}

interface TeacherResponse {
    data: Teacher[];
}

export const DeletedTeachersPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data, isPending } = useDeletedTeacher() as { data: TeacherResponse | undefined, isPending: boolean };

    const [hardDeleteTeacher, setHardDeleteTeacher] = useState<Teacher | null>(null);
    const [isHardDeleteModalOpen, setIsHardDeleteModalOpen] = useState<boolean>(false);

    const { mutate: hardDelete, isPending: isDeleting } = useHardDeleteTeacher();
    const { mutate: restoreTeacher, isPending: isRestoring } = useRestoreTeacher();

    const handleRestore = (id: string) => {
        restoreTeacher(id, {
            onSuccess: () => {
                toast.success("Ustoz muvaffaqiyatli tiklandi!", {
                    className: "bg-[#11141d] text-white border-white/10",
                });
                queryClient.invalidateQueries({ queryKey: ["teacherDeletedList"] });
                queryClient.invalidateQueries({ queryKey: ["teachers"] });
            },
            onError: () => toast.error("Tiklashda xatolik yuz berdi"),
        });
    };

    const handleHardDelete = () => {
        if (!hardDeleteTeacher) return;
        hardDelete(hardDeleteTeacher.id, {
            onSuccess: () => {
                toast.success("Ustoz tizimdan butunlay o'chirildi");
                queryClient.invalidateQueries({ queryKey: ["teacherDeletedList"] });
                setIsHardDeleteModalOpen(false);
            },
            onError: () => toast.error("O'chirishda xatolik yuz berdi"),
        });
    };

    const openHardDeleteModal = (teacher: Teacher) => {
        setHardDeleteTeacher(teacher);
        setIsHardDeleteModalOpen(true);
    };

    // 2. Map funksiyasida 'any' o'rniga Partial<Teacher> yoki Record ishlatamiz
    const deletedTeachers: Teacher[] = (data?.data || []).map((t: Teacher): Teacher => ({
        ...t,
        phoneNumber: t.phoneNumber || "Noma'lum",
        deletedBy: t.deletedBy || "Admin"
    }));

    const filteredTeachers = deletedTeachers.filter(
        (teacher: Teacher) =>
            teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (name: string): string => {
        if (!name) return "??";
        return name.trim().split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const handleOpenDetails = (id: string) => {
        setSelectedTeacherId(id);
        setIsModalOpen(true);
    };

    // Dizayn konstantalari
    const bgDark = "bg-[#0a0c12]";
    const cardDark = "bg-[#11141d] border-white/5";
    const inputDark = "bg-white/[0.03] border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/10 placeholder:text-slate-600";

    if (isPending) {
        return (
            <div className={`p-8 space-y-6 min-h-screen ${bgDark}`}>
                <Skeleton className="h-20 w-full rounded-2xl bg-white/5 border-none" />
                {[1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-2xl bg-white/5 border-none" />)}
            </div>
        );
    }

    return (
        <div className={`p-8 space-y-8 min-h-screen font-sans ${bgDark} text-slate-300`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all mb-2 cursor-pointer group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Orqaga
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-rose-500/10 rounded-3xl border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                            <RotateCcw className="w-7 h-7 text-rose-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tighter">Arxivlanganlar</h1>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">O'chirilgan ustozlar bazasi</p>
                        </div>
                    </div>
                </div>

                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                        placeholder="Qidiruv (Ism, Email...)"
                        className={`pl-12 h-14 rounded-2xl shadow-inner transition-all border-none ${inputDark}`}
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Bar */}
            <Card className={`p-4 px-8 flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] ${cardDark} rounded-2xl shadow-2xl`}>
                <span className="text-slate-600 font-bold">Saralash:</span>
                <div className="flex items-center gap-2 cursor-pointer text-blue-500">
                    Sana bo'yicha <ArrowDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-300 transition-colors">
                    Ism (A-Z) <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
            </Card>

            {/* Content Area */}
            <div className="space-y-4">
                {filteredTeachers.length === 0 ? (
                    <Card className={`p-32 flex flex-col items-center justify-center border-dashed border-2 border-white/5 ${cardDark} rounded-[48px] text-center`}>
                        <div className="bg-white/5 p-10 rounded-full mb-6 relative">
                            <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-10" />
                            <AlertCircle className="w-16 h-16 text-slate-800 relative" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Arxiv bo'sh</h3>
                        <p className="text-slate-600 mt-2 font-medium max-w-[250px]">Hozircha o'chirilgan ustozlar mavjud emas</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredTeachers.map((teacher: Teacher) => (
                            <TeacherCard
                                key={teacher.id}
                                teacher={teacher}
                                onOpenDetails={handleOpenDetails}
                                getInitials={getInitials}
                                onRestore={() => handleRestore(teacher.id)}
                                isRestoring={isRestoring}
                                onHardDelete={() => openHardDeleteModal(teacher)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {selectedTeacherId && (
                <TeacherDetailsModal id={selectedTeacherId} open={isModalOpen} onOpenChange={setIsModalOpen} />
            )}
            <TeacherHardDeleteModal
                teacher={hardDeleteTeacher}
                open={isHardDeleteModalOpen}
                onOpenChange={setIsHardDeleteModalOpen}
                onConfirm={handleHardDelete}
                isPending={isDeleting}
            />
        </div>
    );
};