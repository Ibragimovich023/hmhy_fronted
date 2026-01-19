import { useStudentDetail } from '../../../hooks/useStudents';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Skeleton } from "../../../components/ui/skeleton"; // Skeleton qo'shildi
import { UserCircle, Calendar, Hash, Phone, Mail, Globe, Clock, AlignLeft, Loader2 } from 'lucide-react';

interface DetailRowProps {
  label: string;
  value: string | number | null | undefined;
  full?: boolean;
  icon: React.ReactNode;
}

const DetailRow = ({ label, value, full = false, icon }: DetailRowProps) => (
  <div className={`group p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all ${full ? 'col-span-2' : 'col-span-2 md:col-span-1'}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">{label}</p>
    </div>
    <p className="text-sm font-bold text-slate-200 break-all ml-10">
      {value || <span className="text-slate-700 italic font-medium">Ma'lumot yo'q</span>}
    </p>
  </div>
);

export function StudentDetailModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data, isLoading } = useStudentDetail(studentId);
  const student = data?.data;

  // Ishlatilmagan o'zgaruvchilar o'chirildi yoki ishlatildi
  const cardBg = 'bg-[#11141d]';

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl border-white/5 ${cardBg} p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-[32px]`}>
        {/* Header Section */}
        <DialogHeader className="p-8 bg-gradient-to-br from-[#1a1f2e] to-[#11141d] border-b border-white/5">
          {isLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-[22px] bg-white/5" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 bg-white/5" />
                <Skeleton className="h-3 w-32 bg-white/5" />
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-[22px] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <UserCircle className="h-10 w-10 text-blue-500" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black text-white tracking-tight">
                    {student?.firstName} {student?.lastName}
                  </DialogTitle>
                  <p className="text-blue-500/60 text-[10px] font-black mt-1 uppercase tracking-widest flex items-center gap-2">
                    <Hash className="w-3 h-3" /> System ID: {student?.id?.slice(0, 15)}...
                  </p>
                </div>
              </div>
              <Badge className={`px-4 py-1.5 rounded-xl font-black text-[10px] tracking-tighter border ${
                student?.isBlocked 
                  ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                  : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              }`}>
                {student?.isBlocked ? 'BLOKLANGAN' : 'FAOL PROFIL'}
              </Badge>
            </div>
          )}
        </DialogHeader>

        {/* Info Grid */}
        <ScrollArea className="max-h-[65vh]">
          <div className="p-8">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <DetailRow icon={<UserCircle className="w-4 h-4" />} label="Ism" value={student?.firstName} />
                <DetailRow icon={<UserCircle className="w-4 h-4" />} label="Familiya" value={student?.lastName} />
                <DetailRow icon={<Hash className="w-4 h-4" />} label="Telegram Username" value={student?.tgUsername ? `@${student.tgUsername}` : null} />
                <DetailRow icon={<Hash className="w-4 h-4" />} label="Telegram ID" value={student?.tgId} />
                <DetailRow icon={<Phone className="w-4 h-4" />} label="Telefon Raqam" value={student?.phoneNumber} />
                <DetailRow icon={<Mail className="w-4 h-4" />} label="Email Manzili" value={student?.email} />
                <DetailRow icon={<Globe className="w-4 h-4" />} label="Tizim Tili" value={student?.languageCode?.toUpperCase()} />
                <DetailRow icon={<Clock className="w-4 h-4" />} label="Vaqt Mintaqasi" value={student?.timezone} />
                <DetailRow icon={<AlignLeft className="w-4 h-4" />} label="Bio / Izoh" value={student?.bio} full={true} />

                {/* Timeline Info */}
                <div className="col-span-2 mt-4 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Ro'yxatdan o'tdi</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 ml-5">
                        {student?.createdAt ? new Date(student.createdAt).toLocaleString('uz-UZ') : '—'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <div className="flex items-center gap-2 text-slate-500 justify-end">
                        <span className="text-[10px] font-black uppercase tracking-widest">Oxirgi tahrir</span>
                        <Clock className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 mr-5">
                        {student?.updatedAt ? new Date(student.updatedAt).toLocaleString('uz-UZ') : '—'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex justify-end">
           <button 
             onClick={onClose}
             className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center gap-2"
           >
             {isLoading && <Loader2 className="w-3 h-3 animate-spin" />}
             YOPISH
           </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}