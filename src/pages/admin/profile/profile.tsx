import { useProfile } from "../service/query/useProfile";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { Badge } from "../../../components/ui/badge";
import {
    Pencil,
    Lock,
    User,
    Phone,
    Shield,
    Calendar,
    Save,
    X,
    Clock,
    UserCircle,
} from "lucide-react";
import { Spinner } from "../../../components/ui/spinner";
import {
    useEditProfile,
    useChangePassword,
} from "../service/mutate/useEditProfile";
import { useState } from "react";
import { toast } from "sonner";

interface ApiError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}

type PasswordFieldName = "currentPassword" | "newPassword" | "confirmPassword";

export const ProfilePage = () => {
    const { data, isPending, refetch } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedData, setEditedData] = useState({
        username: "",
        phoneNumber: "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const darkBg = 'bg-[#0a0c14]';
    const cardBg = 'bg-[#11141d]/50 backdrop-blur-xl border-white/5';
    const inputBg = 'bg-white/[0.03] border-white/10 text-white focus:border-blue-500/50';
    const textMuted = 'text-slate-500';

    const { mutate: updateProfile, isPending: isUpdating } = useEditProfile({
        username: editedData.username,
        phone: editedData.phoneNumber,
    });
    const { mutate: changePassword, isPending: isChangingPass } =
        useChangePassword();

    if (isPending) {
        return (
            <div className={`space-y-6 ${darkBg} p-4`}>
                <div className="flex items-center justify-between mb-8">
                    <Skeleton className="h-10 w-48 bg-white/5" />
                    <div className="flex gap-3">
                        <Skeleton className="h-11 w-32 rounded-2xl bg-white/5" />
                        <Skeleton className="h-11 w-40 rounded-2xl bg-white/5" />
                    </div>
                </div>
                <div className={`${cardBg} rounded-[32px] p-8 border border-white/5`}>
                    <Skeleton className="h-8 w-64 mb-10 bg-white/5" />
                    <div className="space-y-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-4 w-24 bg-white/5" />
                                <Skeleton className="h-14 w-full rounded-2xl bg-white/5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const profile = data?.data;

    const handleEdit = () => {
        setEditedData({
            username: profile?.username || "",
            phoneNumber: profile?.phoneNumber || "",
        });
        setIsEditing(true);
        setIsChangingPassword(false);
    };

    const handleChangePasswordClick = () => {
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsChangingPassword(true);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsChangingPassword(false);
    };

    // 2. onError funksiyasini Error tipini ApiError ga aylantirgan holda yozamiz
    const handleSave = () => {
        updateProfile(editedData, {
            onSuccess: () => {
                toast.success("Profil muvaffaqiyatli yangilandi!");
                setIsEditing(false);
                refetch();
            },
            onError: (err: Error) => {
                const error = err as ApiError;
                toast.error(error?.response?.data?.message || "Xatolik yuz berdi");
            },
        });
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Yangi parollar mos kelmadi!");
            return;
        }
        changePassword(
            {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success("Parol o'zgartirildi!");
                    setIsChangingPassword(false);
                },
                onError: (err: Error) => {
                    const error = err as ApiError;
                    toast.error(error?.response?.data?.message || "Xatolik yuz berdi");
                },
            }
        );
    };

    return (
        <div className={`min-h-screen ${darkBg} text-slate-200 p-4`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Mening Profilim</h1>
                    <p className={`${textMuted} mt-1 font-medium`}>Shaxsiy ma'lumotlaringizni boshqaring</p>
                </div>
                {!isEditing && !isChangingPassword && (
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={handleEdit}
                            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl px-6 h-12 transition-all active:scale-95"
                        >
                            <Pencil className="h-4 w-4 mr-2 text-blue-400" />
                            Tahrirlash
                        </Button>
                        <Button
                            onClick={handleChangePasswordClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl px-6 h-12 shadow-lg shadow-blue-600/20 transition-all active:scale-95 border-none"
                        >
                            <Lock className="h-4 w-4 mr-2" />
                            Parolni o'zgartirish
                        </Button>
                    </div>
                )}
            </div>

            {/* Main Content Card */}
            <div className={`${cardBg} rounded-[40px] border border-white/5 shadow-2xl overflow-hidden`}>
                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 bg-blue-500/10 rounded-2xl">
                            {isChangingPassword ? <Lock className="h-6 w-6 text-blue-400" /> : <UserCircle className="h-6 w-6 text-blue-400" />}
                        </div>
                        <h2 className="text-2xl font-black text-white">
                            {isChangingPassword ? "Xavfsizlik sozlamalari" : "Asosiy ma'lumotlar"}
                        </h2>
                    </div>

                    <div className="max-w-3xl space-y-10">
                        {isChangingPassword ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {[
                                    { label: "Joriy parol", key: "currentPassword" as PasswordFieldName },
                                    { label: "Yangi parol", key: "newPassword" as PasswordFieldName },
                                    { label: "Yangi parolni tasdiqlang", key: "confirmPassword" as PasswordFieldName },
                                ].map((field) => (
                                    <div key={field.key} className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                                            {field.label}
                                        </label>
                                        <Input
                                            type="password"
                                            value={passwordData[field.key]}
                                            onChange={(e) => setPasswordData({ ...passwordData, [field.key]: e.target.value })}
                                            className={`${inputBg} h-14 rounded-2xl px-5 text-lg`}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-10 animate-in fade-in duration-500">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 ml-1">
                                        <User className="h-3.5 w-3.5" />
                                        <label className="text-[11px] font-black uppercase tracking-widest">Foydalanuvchi nomi</label>
                                    </div>
                                    {isEditing ? (
                                        <Input
                                            value={editedData.username}
                                            onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                                            className={`${inputBg} h-14 rounded-2xl px-5 text-lg font-bold`}
                                        />
                                    ) : (
                                        <div className="bg-white/5 border border-white/5 rounded-[20px] px-6 py-4">
                                            <p className="text-lg font-bold text-white">{profile?.username || "Noma'lum"}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-500 ml-1">
                                        <Phone className="h-3.5 w-3.5" />
                                        <label className="text-[11px] font-black uppercase tracking-widest">Telefon raqam</label>
                                    </div>
                                    {isEditing ? (
                                        <Input
                                            value={editedData.phoneNumber}
                                            onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                                            className={`${inputBg} h-14 rounded-2xl px-5 text-lg font-bold`}
                                        />
                                    ) : (
                                        <div className="bg-white/5 border border-white/5 rounded-[20px] px-6 py-4">
                                            <p className="text-lg font-bold text-white">{profile?.phoneNumber || "Kiritilmagan"}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-slate-500 ml-1">
                                            <Shield className="h-3.5 w-3.5" />
                                            <label className="text-[11px] font-black uppercase tracking-widest">Roli</label>
                                        </div>
                                        <div className="inline-block">
                                            <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-tighter">
                                                {profile?.role || "ADMIN"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-3 md:col-span-2">
                                        <div className="flex items-center gap-2 text-slate-500 ml-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <label className="text-[11px] font-black uppercase tracking-widest">Ro'yxatdan o'tgan sana</label>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <Clock className="h-4 w-4 text-blue-400" />
                                            <span className="font-bold">
                                                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("uz-UZ", { day: '2-digit', month: 'long', year: 'numeric' }) : "N/A"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {(isEditing || isChangingPassword) && (
                        <div className="flex items-center gap-4 mt-16 pt-10 border-t border-white/5 animate-in fade-in duration-700">
                            <Button
                                onClick={isChangingPassword ? handlePasswordChange : handleSave}
                                disabled={isUpdating || isChangingPass}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[18px] px-10 h-14 shadow-xl shadow-blue-600/20 transition-all active:scale-95 border-none"
                            >
                                {isUpdating || isChangingPass ? (
                                    <Spinner className="w-5 h-5" />
                                ) : (
                                    <>
                                        <Save className="h-5 w-5 mr-2" />
                                        Saqlash
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                variant="ghost"
                                className="text-slate-400 hover:text-white hover:bg-white/5 font-bold rounded-[18px] px-8 h-14"
                            >
                                <X className="h-5 w-5 mr-2" />
                                Bekor qilish
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};