import React, { useState, useEffect } from 'react';
import { useStudentDetail } from '../../../hooks/useStudents';
import { useUpdateStudent } from '../../../hooks/useStudentMutations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../components/ui/select";
import { User, Phone, Mail, Globe, Clock, AlignLeft, Loader2, Save } from 'lucide-react';

export function StudentEditModal({ studentId, onClose }: { studentId: string; onClose: () => void }) {
  const { data, isLoading } = useStudentDetail(studentId);
  const updateStudent = useUpdateStudent();
  const student = data?.data;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    bio: '',
    languageCode: 'uz',
    timezone: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        phoneNumber: student.phoneNumber || '',
        email: student.email || '',
        bio: student.bio || '',
        languageCode: student.languageCode || 'uz',
        timezone: student.timezone || ''
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent.mutate({ id: studentId, ...formData }, { 
      onSuccess: () => onClose() 
    });
  };

  const cardBg = 'bg-[#0d0f16]'; 
  const inputBg = 'bg-white/[0.03] border-white/10 text-slate-200 focus:border-blue-500/50 focus:ring-blue-500/20 placeholder:text-slate-600';
  const labelStyle = 'text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2 mb-2';

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className={`max-w-xl border-white/5 ${cardBg} shadow-[0_0_50px_rgba(0,0,0,0.6)] rounded-[32px] p-0 overflow-hidden`}>
        
        {/* Header  */}
        <DialogHeader className="p-8 border-b border-white/5 bg-gradient-to-br from-[#1a1f2e] to-transparent">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-white tracking-tight">Profilni tahrirlash</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">
                O'quvchi ma'lumotlarini yangilash
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin opacity-50" />
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Yuklanmoqda...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className={labelStyle}><User className="w-3 h-3 text-blue-500" /> Ism</Label>
                <Input 
                  className={`${inputBg} h-12 rounded-xl transition-all`} 
                  value={formData.firstName} 
                  onChange={(e) => setFormData(p => ({...p, firstName: e.target.value}))} 
                  required 
                />
              </div>
              <div className="space-y-1">
                <Label className={labelStyle}><User className="w-3 h-3 text-blue-500" /> Familiya</Label>
                <Input 
                  className={`${inputBg} h-12 rounded-xl transition-all`} 
                  value={formData.lastName} 
                  onChange={(e) => setFormData(p => ({...p, lastName: e.target.value}))} 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className={labelStyle}><Phone className="w-3 h-3 text-blue-500" /> Telefon</Label>
                <Input 
                  className={`${inputBg} h-12 rounded-xl transition-all`} 
                  value={formData.phoneNumber} 
                  onChange={(e) => setFormData(p => ({...p, phoneNumber: e.target.value}))} 
                  required 
                />
              </div>
              <div className="space-y-1">
                <Label className={labelStyle}><Mail className="w-3 h-3 text-blue-500" /> Email</Label>
                <Input 
                  className={`${inputBg} h-12 rounded-xl transition-all`} 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className={labelStyle}><Globe className="w-3 h-3 text-blue-500" /> Til</Label>
                <Select value={formData.languageCode} onValueChange={(val) => setFormData(p => ({...p, languageCode: val}))}>
                  <SelectTrigger className={`${inputBg} h-12 rounded-xl border-white/5`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-white/10 text-slate-200">
                    <SelectItem value="uz">O'zbekcha</SelectItem>
                    <SelectItem value="ru">Ruscha</SelectItem>
                    <SelectItem value="en">Inglizcha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className={labelStyle}><Clock className="w-3 h-3 text-blue-500" /> Vaqt mintaqasi</Label>
                <Input 
                  placeholder="UTC+5" 
                  className={`${inputBg} h-12 rounded-xl transition-all`} 
                  value={formData.timezone} 
                  onChange={(e) => setFormData(p => ({...p, timezone: e.target.value}))} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className={labelStyle}><AlignLeft className="w-3 h-3 text-blue-500" /> Bio / Izoh</Label>
              <Textarea 
                rows={3} 
                className={`${inputBg} rounded-xl resize-none py-3 border-white/5 transition-all`} 
                value={formData.bio} 
                onChange={(e) => setFormData(p => ({...p, bio: e.target.value}))} 
              />
            </div>

            <DialogFooter className="pt-6 border-t border-white/5 flex gap-3">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose} 
                className="flex-1 h-12 rounded-xl font-black text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                BEKOR QILISH
              </Button>
              <Button 
                type="submit" 
                disabled={updateStudent.isPending} 
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-black text-white shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
              >
                {updateStudent.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2"><Save className="w-4 h-4" /> SAQLASH</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}