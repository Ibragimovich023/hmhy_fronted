import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2, Edit3, User, Phone, Briefcase, DollarSign, Award, Link, Book, AlignLeft } from "lucide-react";
import { useEditTeacher } from "../service/mutate/useEditTeacher";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface TeacherFormValues {
    fullName: string;
    phoneNumber: string;
    description: string;
    experience: string;
    hourPrice: number;
    level: string;
    portfolioLink: string;
    specification: string;
}

interface TeacherEditModalProps {
    teacher: { id: string } & Partial<TeacherFormValues>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const TeacherEditModal = ({
    teacher,
    open,
    onOpenChange,
}: TeacherEditModalProps) => {
    const { mutate, isPending } = useEditTeacher();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<TeacherFormValues>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            description: "",
            experience: "",
            hourPrice: 0,
            level: "",
            portfolioLink: "",
            specification: "",
        },
    });

    useEffect(() => {
        if (teacher && open) {
            reset({
                fullName: teacher.fullName || "",
                phoneNumber: teacher.phoneNumber || "",
                description: teacher.description || "",
                experience: teacher.experience || "",
                hourPrice: teacher.hourPrice || 0,
                level: teacher.level || "",
                portfolioLink: teacher.portfolioLink || "",
                specification: teacher.specification || "",
            });
        }
    }, [teacher, reset, open]);

    const onSubmit = (formData: TeacherFormValues) => {
        mutate(
            { id: teacher.id, data: formData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["teacherList"],
                    });
                    toast.success("Ma'lumotlar muvaffaqiyatli yangilandi");
                    onOpenChange(false);
                },
                onError: (error: unknown) => {
                    const apiError = error as ApiError;
                    toast.error(apiError?.response?.data?.message || "Xatolik yuz berdi");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl bg-[#0a0c14] border-white/10 text-white rounded-[28px] p-0 overflow-hidden shadow-2xl">
                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                
                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <Edit3 className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold tracking-tight text-white">
                                    Tahrirlash
                                </DialogTitle>
                                <DialogDescription className="text-slate-500 text-sm">
                                    O'qituvchi ma'lumotlarini o'zgartirish
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">To'liq ism</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("fullName")}
                                        placeholder="Shaxboz..."
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all placeholder:text-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Telefon raqam</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("phoneNumber")}
                                        placeholder="+998..."
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Specification */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Yo'nalish</label>
                                <div className="relative">
                                    <Book className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("specification")}
                                        placeholder="Ingliz tili"
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Level */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Daraja</label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("level")}
                                        placeholder="Senior / IELTS 8.5"
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Tajriba</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("experience")}
                                        placeholder="5 yil"
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Hour Price */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Narxi (soatbay)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("hourPrice", { valueAsNumber: true })}
                                        type="number"
                                        placeholder="150000"
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Portfolio manzili</label>
                                <div className="relative">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <Input
                                        {...register("portfolioLink")}
                                        placeholder="https://youtube.com/..."
                                        className="h-12 pl-10 bg-white/[0.03] border-white/10 rounded-xl text-white focus-visible:ring-blue-500/20 focus-visible:border-blue-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Bio / Tavsif</label>
                                <div className="relative">
                                    <AlignLeft className="absolute left-3 top-4 w-4 h-4 text-slate-600" />
                                    <textarea
                                        {...register("description")}
                                        placeholder="O'qituvchi haqida qisqacha ma'lumot..."
                                        className="min-h-[100px] w-full py-3 pl-10 pr-4 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all placeholder:text-slate-700 resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/5">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                className="h-12 px-6 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all order-2 sm:order-1"
                            >
                                Bekor qilish
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 min-w-[140px] order-1 sm:order-2"
                            >
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Saqlash"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};