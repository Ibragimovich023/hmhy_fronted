import { useState } from "react";
import { 
  Search, 
  Eye, 
  Edit, 
  Ban, 
  Trash2, 
  UserCheck, 
  Users, 
  UserMinus,
  MessageSquare,
  Clock,
  Filter as FilterIcon
} from "lucide-react";
import { useStudentList, useStudentStats, type Student } from "../../../hooks/useStudents";
import { StudentDetailModal } from "./StudentDetailModal";
import { StudentEditModal } from "./StudentEditModal";
import { StudentBlockModal } from "./StudentBlockModal";
import { StudentDeleteModal } from "./StudentDeleteModal";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  color: 'blue' | 'emerald' | 'red';
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'gray' | 'orange' | 'red';
  onClick: () => void;
}

export default function StudentPage() {
  const { data: studentsData, isLoading } = useStudentList();
  const { data: statsData } = useStudentStats();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"detail" | "edit" | "block" | "delete" | null>(null);

  const students: Student[] = Array.isArray(studentsData?.data) ? studentsData.data : [];
  const stats = statsData?.data || { totalStudents: 0, activeStudents: 0, blockedStudents: 0 };

  const darkBg = 'bg-[#0a0c14]';
  const cardBg = 'bg-[#11141d]/50 backdrop-blur-xl border-white/5';

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.phoneNumber || "").includes(searchQuery) ||
      (student.tgUsername?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const openModal = (type: typeof modalType, studentId: string) => {
    setSelectedStudent(studentId);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalType(null);
  };

  if (isLoading) {
    return (
      <div className={`p-6 space-y-6 ${darkBg} min-h-screen`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32 w-full rounded-[24px] bg-white/5" />)}
        </div>
        <Skeleton className="h-20 w-full rounded-[24px] bg-white/5" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-[24px] bg-white/5" />)}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-8 ${darkBg} min-h-screen text-slate-200`}>
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">O'quvchilar</h1>
          <p className="text-slate-500 mt-1 font-medium">O'quvchilar hisoblari va ruxsatlarini boshqarish</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Jami o'quvchilar" 
          value={stats.totalStudents} 
          icon={<Users className="w-5 h-5 text-blue-400" />} 
          description="Ro'yxatdan o'tganlar"
          color="blue"
        />
        <StatsCard 
          title="Faol o'quvchilar" 
          value={stats.activeStudents} 
          icon={<UserCheck className="w-5 h-5 text-emerald-400" />} 
          description="Ruxsat berilganlar"
          color="emerald"
        />
        <StatsCard 
          title="Bloklanganlar" 
          value={stats.blockedStudents} 
          icon={<UserMinus className="w-5 h-5 text-rose-400" />} 
          description="Ruxsati cheklanganlar"
          color="red"
        />
      </div>

      {/* Filters & Search */}
      <Card className={`${cardBg} border-none shadow-2xl rounded-[28px] overflow-hidden`}>
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Ism, telefon yoki Telegram orqali qidiruv..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus-visible:ring-blue-500/50"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[200px] h-12 bg-white/[0.03] border-white/10 rounded-2xl text-slate-300">
              <div className="flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-slate-500" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1a1f2e] border-white/10 text-slate-200">
              <SelectItem value="all">Barcha o'quvchilar</SelectItem>
              <SelectItem value="active">Faqat faollar</SelectItem>
              <SelectItem value="blocked">Bloklanganlar</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="h-12 px-8 font-bold border-white/10 hover:bg-white/5 rounded-2xl text-slate-300" 
            onClick={() => setSearchQuery("")}
          >
            Tozalash
          </Button>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex gap-20">
            <span className="w-64">O'quvchi ma'lumoti</span>
            <span className="ml-10">Aloqa kanali</span>
          </div>
          <div className="flex gap-24 mr-16">
            <span>Qo'shilgan sana</span>
            <span>Amallar</span>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <Card className={`${cardBg} p-24 text-center border-dashed border-2 border-white/5 rounded-[32px]`}>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white/5 rounded-full">
                <Users className="w-12 h-12 text-slate-700" />
              </div>
              <p className="text-slate-500 font-bold text-lg">Hech qanday ma'lumot topilmadi</p>
            </div>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className={`${cardBg} border-none hover:bg-white/[0.06] transition-all duration-300 group rounded-[24px]`}>
              <CardContent className="p-4 flex items-center justify-between">
                
                {/* Left: Info */}
                <div className="flex items-center gap-5 w-[30%]">
                  <div className="h-12 w-12 rounded-[18px] bg-blue-500/10 flex items-center justify-center font-black text-blue-400 border border-blue-500/20 uppercase text-lg shadow-inner">
                    {student.firstName[0]}{student.lastName[0]}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-white text-lg tracking-tight">
                        {student.firstName} {student.lastName}
                      </h3>
                      <Badge 
                        className={`text-[10px] h-5 font-black uppercase tracking-tighter rounded-md ${
                          student.isBlocked 
                            ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" 
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }`}
                      >
                        {student.isBlocked ? "Bloklangan" : "Faol"}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 font-bold">ID: {student.id.slice(0, 12)}</span>
                  </div>
                </div>

                {/* Middle: Contact */}
                <div className="flex flex-col gap-1.5 w-[30%]">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    {student.tgUsername ? `@${student.tgUsername}` : <span className="text-slate-600 font-medium italic">username yo'q</span>}
                  </div>
                  <div className="text-xs text-slate-500 font-bold ml-6">
                    {student.phoneNumber || "+998 -- --- -- --"}
                  </div>
                </div>

                {/* Right: Date */}
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 w-[15%]">
                  <Clock className="w-4 h-4 text-slate-600" />
                  {new Date(student.createdAt).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <ActionButton icon={<Eye className="w-4 h-4" />} label="Ko'rish" color="blue" onClick={() => openModal("detail", student.id)} />
                  <ActionButton icon={<Edit className="w-4 h-4" />} label="Tahrir" color="gray" onClick={() => openModal("edit", student.id)} />
                  <ActionButton icon={<Ban className="w-4 h-4" />} label={student.isBlocked ? "Ochish" : "Blok"} color="orange" onClick={() => openModal("block", student.id)} />
                  <ActionButton icon={<Trash2 className="w-4 h-4" />} label="O'chirish" color="red" onClick={() => openModal("delete", student.id)} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modals */}
      {modalType === "detail" && selectedStudent && <StudentDetailModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "edit" && selectedStudent && <StudentEditModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "block" && selectedStudent && <StudentBlockModal studentId={selectedStudent} onClose={closeModal} />}
      {modalType === "delete" && selectedStudent && <StudentDeleteModal studentId={selectedStudent} onClose={closeModal} />}
    </div>
  );
}

function StatsCard({ title, value, icon, description, color }: StatsCardProps) {
  const colors = {
    blue: "from-blue-500/20 to-transparent border-blue-500/20",
    emerald: "from-emerald-500/20 to-transparent border-emerald-500/20",
    red: "from-rose-500/20 to-transparent border-rose-500/20"
  };
  return (
    <Card className={`bg-[#11141d]/50 backdrop-blur-xl border-white/5 rounded-[32px] overflow-hidden group`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-30`} />
      <CardContent className="p-8 relative">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">{icon}</div>
        </div>
        <div className="mt-6">
          <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2">{title}</p>
          <p className="text-[10px] font-bold text-slate-600 mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({ icon, label, color, onClick }: ActionButtonProps) {
  const colors = {
    blue: "hover:bg-blue-500/20 text-blue-400 border-blue-500/10",
    gray: "hover:bg-white/10 text-slate-400 border-white/10",
    orange: "hover:bg-orange-500/20 text-orange-400 border-orange-500/10",
    red: "hover:bg-rose-500/20 text-rose-400 border-rose-500/10"
  };
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`h-10 gap-2 font-black text-[11px] uppercase tracking-tighter border transition-all rounded-xl ${colors[color]}`}
      onClick={onClick}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </Button>
  );
}