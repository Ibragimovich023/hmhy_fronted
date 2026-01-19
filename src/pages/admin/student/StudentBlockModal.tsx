import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useBlockStudent } from '../../../hooks/useStudentMutations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export function StudentBlockModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data, isLoading } = useStudentDetail(studentId);
  const blockStudent = useBlockStudent();
  const student = data?.data;

  const handleBlock = () => {
    blockStudent.mutate(studentId, { onSuccess: onClose });
  };

  // Dizayn konstantalari
  const isBlocking = !student?.isBlocked;
  const accentColor = isBlocking ? 'rose' : 'emerald';
  const modalBg = 'bg-[#11141d]'; // Deep dark card color

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] border-white/5 ${modalBg} shadow-2xl rounded-[32px] overflow-hidden p-0`}>
        {/* Yuqori qismdagi dekorativ gradient line */}
        <div className={`h-1.5 w-full bg-${accentColor}-500/50`} />
        
        <div className="p-8">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <div className={`p-4 rounded-[24px] ${isBlocking ? 'bg-rose-500/10' : 'bg-emerald-500/10'} border border-${accentColor}-500/20`}>
                {isBlocking ? (
                  <ShieldAlert className="w-8 h-8 text-rose-500" />
                ) : (
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-white tracking-tight">
                  {student?.isBlocked ? "Blokdan chiqarish" : "Bloklash"}
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium mt-1">
                  {student?.isBlocked ? "Platformaga kirish ruxsatini tiklash" : "Platformaga kirishni cheklash"}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {isLoading ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-16 w-full rounded-2xl bg-white/5" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* O'quvchi ma'lumoti kartasi */}
              <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/5">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500 mb-2">Tanlangan o'quvchi</p>
                <p className="text-lg font-bold text-white leading-none">
                  {student?.firstName} {student?.lastName}
                </p>
                <p className="text-sm text-blue-400 font-bold mt-2">
                  {student?.tgUsername ? `@${student.tgUsername}` : 'username kiritilmagan'}
                </p>
              </div>

              {/* Ogohlantirish xabari */}
              <div className={`p-4 rounded-2xl border ${
                isBlocking 
                  ? 'bg-rose-500/5 border-rose-500/10 text-rose-200/80' 
                  : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-200/80'
              }`}>
                <div className="flex gap-3">
                  <AlertTriangle className={`w-5 h-5 shrink-0 ${isBlocking ? 'text-rose-500' : 'text-emerald-500'}`} />
                  <p className="text-sm font-bold leading-relaxed">
                    {student?.isBlocked 
                      ? "Ishonchingiz komilmi? Bu amal o'quvchiga barcha kurs va ma'lumotlardan foydalanishga ruxsat beradi."
                      : "Diqqat: Bloklash amalga oshirilgandan so'ng, o'quvchi shaxsiy kabinetiga kira olmaydi."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-10 flex gap-3 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="flex-1 font-black text-slate-400 hover:text-white hover:bg-white/5 h-12 rounded-2xl transition-all"
            >
              Bekor qilish
            </Button>
            <Button 
              onClick={handleBlock} 
              disabled={blockStudent.isPending}
              className={`flex-1 h-12 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 ${
                isBlocking 
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              {blockStudent.isPending ? (
                <span className="flex items-center gap-2">
                   Bajarilmoqda...
                </span>
              ) : (
                student?.isBlocked ? 'Tasdiqlash' : 'Bloklash'
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}