import { Trash2, AlertTriangle, UserX } from 'lucide-react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useDeleteStudent } from '../../../hooks/useStudentMutations';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

export function StudentDeleteModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data, isLoading } = useStudentDetail(studentId);
  const deleteStudent = useDeleteStudent();
  const student = data?.data;

  const modalBg = 'bg-[#0d0f16]';

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[440px] border-white/5 ${modalBg} shadow-[0_0_50px_rgba(225,29,72,0.15)] rounded-[32px] overflow-hidden p-0`}>
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-rose-600 to-transparent opacity-50" />
        
        <div className="p-8">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-600 blur-2xl opacity-20" />
                <div className="relative p-5 bg-rose-500/10 rounded-[28px] border border-rose-500/20">
                  <UserX className="w-9 h-9 text-rose-500" />
                </div>
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-white tracking-tight">
                  Hisobni o'chirish
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium mt-1">
                  Ushbu amalni ortga qaytarib bo'lmaydi
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {isLoading ? (
            <div className="space-y-4 py-2">
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-16 w-full rounded-2xl bg-white/5" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 relative group">
                <div className="absolute right-4 top-4">
                   <Trash2 className="w-4 h-4 text-slate-700 group-hover:text-rose-500 transition-colors" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-rose-500/60 mb-2">O'chirilayotgan profil</p>
                <p className="text-xl font-bold text-white tracking-tight">
                  {student?.firstName} {student?.lastName}
                </p>
                <p className="text-sm text-slate-500 font-bold mt-1">
                  ID: {student?.id}
                </p>
              </div>

              <div className="flex gap-4 p-5 bg-rose-500/5 rounded-2xl border border-rose-500/10 border-l-rose-600 border-l-4">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <p className="text-[13px] text-rose-200/70 leading-relaxed font-bold">
                  Barcha o'quv tarixi, to'lovlar ma'lumotlari va profil ma'lumotlari <span className="text-rose-500 underline decoration-rose-500/30 underline-offset-4">butunlay o'chib ketadi</span>.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="mt-10 flex gap-3 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="flex-1 font-black text-slate-400 hover:text-white hover:bg-white/5 h-14 rounded-2xl transition-all"
            >
              Bekor qilish
            </Button>
            <Button 
              onClick={() => deleteStudent.mutate(studentId, { onSuccess: onClose })}
              disabled={deleteStudent.isPending}
              className="flex-1 h-14 rounded-2xl font-black text-white bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-600/20 transition-all active:scale-95 border-none"
            >
              {deleteStudent.isPending ? 'O\'chirilmoqda...' : 'Butunlay o\'chirish'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent> 
    </Dialog>
  );
}