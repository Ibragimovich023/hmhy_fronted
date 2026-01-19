import { useState } from "react";
import { useTeacherList } from "../service/query/useTeacherList";
import {
    Search,
    Mail,
    Phone,
    Star,
    Trash,
    Award,
    ArrowUpDown,
    UserCircle2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import type { Teacher } from "../../auth/admin-type";
import { TeacherDetailsModal } from "../components/teacherDetail";
import { toast } from "sonner";
import { TeacherEditModal } from "../components/teacherEdit";
import { TeacherDeleteModal } from "../components/teacherDelete";
import { useChangeTeacherStatus } from "../service/mutate/useChangeActiveTeacher";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";


export const TeacherPage = () => {
    const { data, isPending } = useTeacherList();
    const queryClient = useQueryClient();
    const role = Cookies.get("role");
    const navigate = useNavigate();

    const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editTeacher, setEditTeacher] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteTeacher, setDeleteTeacher] = useState<any | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { mutate: changeStatus, isPending: isStatusPending } = useChangeTeacherStatus();

    // Deep Dark Styles
    const darkBg = "bg-[#0a0c12]";
    const cardStyle = "bg-[#11141d] border-white/5 shadow-2xl";
    const inputStyle = "bg-white/[0.03] border-white/10 text-white focus:border-blue-500/50";

    const handleEditClick = (teacher: any) => {
        setEditTeacher(teacher);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (teacher: any) => {
        setDeleteTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    if (isPending) {
        return (
            <div className={`p-6 space-y-6 min-h-screen ${darkBg}`}>
                <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-32 bg-white/5" />
                    <Skeleton className="h-10 w-48 rounded-md bg-white/5" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className={`p-4 ${cardStyle}`}>
                            <Skeleton className="h-20 w-full bg-white/5" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const teachers: Teacher[] = data?.data || [];
    const filteredTeachers = teachers.filter((t) =>
        (t.fullName || t.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (name: string) => {
        if (!name) return "??";
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const handleOpenDetails = (id: string) => {
        setSelectedTeacherId(id);
        setIsModalOpen(true);
    };

    const handleStatusToggle = (id: string) => {
        queryClient.setQueryData(['teacher-list'], (oldData: any) => {
            if (!oldData) return oldData;
            return {
                ...oldData,
                data: oldData.data.map((teacher: any) =>
                    teacher.id === id ? { ...teacher, isActive: !teacher.isActive } : teacher
                )
            };
        });

        changeStatus(id, {
            onSuccess: () => {
                toast.success('Status muvaffaqiyatli o\'zgartirildi!', {
                    className: "bg-[#11141d] text-white border-white/10"
                });
                queryClient.invalidateQueries({ queryKey: ['teacher-list'] });
            },
            onError: () => {
                toast.error('Xatolik yuz berdi');
                queryClient.invalidateQueries({ queryKey: ['teacher-list'] });
            },
        });
    };

    return (
        <div className={`p-6 space-y-8 min-h-screen ${darkBg} text-slate-300`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        <UserCircle2 className="w-8 h-8 text-blue-500" /> Teachers
                    </h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Xodimlar boshqaruvi</p>
                </div>

                {role === "superadmin" && (
                    <Button
                        onClick={() => navigate("/admin/teachers/deleted")}
                        className="bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-xl transition-all h-11 px-6 font-bold"
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        O'chirilganlar
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="flex gap-4 items-center">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                        placeholder="Ism, email yoki yo'nalish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-12 h-12 rounded-2xl border-none ${inputStyle}`}
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="h-12 px-6 rounded-2xl border-white/10 text-white hover:bg-white/5 font-bold transition-all"
                >
                    Tozalash
                </Button>
            </div>

            {/* List Body */}
            <div className="space-y-4">
                {filteredTeachers.length === 0 ? (
                    <Card className={`p-20 text-center ${cardStyle} border-dashed border-2`}>
                        <p className="text-slate-600 font-bold uppercase tracking-widest">Ma'lumot topilmadi</p>
                    </Card>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <Card
                            key={teacher.id}
                            className={`p-5 rounded-[2rem] transition-all hover:bg-white/[0.02] group ${cardStyle}`}
                        >
                            <div className="flex flex-col xl:flex-row items-center gap-6">
                                <div className="flex items-center gap-5 w-full xl:w-[35%] min-w-[320px]">
                                    <Avatar className="h-16 w-16 rounded-2xl border-2 border-white/5 ring-4 ring-blue-500/5 group-hover:ring-blue-500/10 transition-all">
                                        <AvatarImage src={teacher.imageUrl} className="object-cover" />
                                        <AvatarFallback className="bg-blue-500/10 text-blue-500 font-black">
                                            {getInitials(teacher.fullName || teacher.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-lg truncate tracking-tight">
                                                {teacher.fullName || teacher.name}
                                            </h3>
                                            <Badge
                                                className={`text-[9px] px-2 py-0.5 rounded-md border-none font-black uppercase tracking-tighter
                                                    ${teacher.isActive 
                                                        ? "bg-emerald-500/10 text-emerald-500" 
                                                        : "bg-rose-500/10 text-rose-500"}`}
                                            >
                                                {teacher.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                            <span className="text-blue-500/80">{teacher.specification || "General"}</span>
                                            <span className="flex items-center gap-1">
                                                <Award className="w-3.5 h-3.5 text-orange-500" />
                                                LVL {teacher.level || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-2 w-full xl:w-[30%] px-6 xl:border-l border-white/5">
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                        <Mail className="w-4 h-4 text-slate-600" />
                                        <span className="truncate">{teacher.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                        <Phone className="w-4 h-4 text-slate-600" />
                                        <span>{teacher.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center w-full xl:w-[10%]">
                                    <div className="flex items-center gap-1.5 text-yellow-500 font-black text-xl">
                                        <Star className="w-5 h-5 fill-yellow-500 stroke-none" />
                                        {Number(teacher.rating).toFixed(1)}
                                    </div>
                                    <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Rating</span>
                                </div>

                                <div className="flex items-center justify-end gap-2 flex-1 w-full border-t xl:border-t-0 xl:border-l border-white/5 pt-4 xl:pt-0">
                                    <Button
                                        variant="outline"
                                        className="h-10 px-4 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold text-xs"
                                        onClick={() => handleOpenDetails(teacher.id)}
                                    >
                                        Batafsil
                                    </Button>
                                    <Button
                                        onClick={() => handleStatusToggle(teacher.id)}
                                        disabled={isStatusPending}
                                        className={`h-10 px-4 rounded-xl font-black text-xs border-none transition-all ${
                                            teacher.isActive 
                                            ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white" 
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                    >
                                        {teacher.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-10 w-10 p-0 rounded-xl border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                                        onClick={() => handleEditClick(teacher)}
                                    >
                                        <ArrowUpDown className="w-4 h-4 rotate-90" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="h-10 w-10 p-0 rounded-xl bg-rose-600/10 text-rose-600 hover:bg-rose-600 hover:text-white border-none"
                                        onClick={() => handleDeleteClick(teacher)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Modals */}
            {selectedTeacherId && (
                <TeacherDetailsModal 
                    id={selectedTeacherId} 
                    open={isModalOpen} 
                    onOpenChange={setIsModalOpen} 
                />
            )}
            <TeacherEditModal 
                teacher={editTeacher} 
                open={isEditModalOpen} 
                onOpenChange={setIsEditModalOpen} 
            />
            <TeacherDeleteModal 
                teacher={deleteTeacher} 
                open={isDeleteModalOpen} 
                onOpenChange={setIsDeleteModalOpen} 
            />
        </div>
    );
};