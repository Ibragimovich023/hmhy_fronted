import React from 'react';
import { Star, ChevronRight, Award, Mail, Phone, Clock, ShieldCheck } from 'lucide-react'; // 'User' olib tashlandi
import { type Teacher, TeacherSpecification } from '../../../auth/types';
import { useNavigate } from 'react-router-dom';

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const navigate = useNavigate();

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .filter(Boolean) 
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    const getSpecificationLabel = (spec?: TeacherSpecification): string => {
        const labels: Record<TeacherSpecification, string> = {
            [TeacherSpecification.IELTS]: 'IELTS',
            [TeacherSpecification.SPEAKING]: 'Speaking',
            [TeacherSpecification.GRAMMAR]: 'Grammar',
            [TeacherSpecification.BUSINESS]: 'Business',
            [TeacherSpecification.KIDS]: 'Kids',
        };
        return spec ? labels[spec] : 'General';
    };

    const handleViewLessons = () => {
        navigate(`/app/admin/teacher/${teacher.id}/lessons`);
    };

    return (
        <div className="group relative bg-[#11141d] rounded-[28px] p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all" />
            
            <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="relative shrink-0">
                    <div className="p-1 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-xl">
                        {teacher.imageUrl ? (
                            <img
                                src={teacher.imageUrl}
                                alt={teacher.fullName}
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#11141d]"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 text-xl font-black border-2 border-[#11141d]">
                                {getInitials(teacher.fullName)}
                            </div>
                        )}
                    </div>
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-[3px] border-[#11141d] ${
                        teacher.isActive ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-slate-500"
                    }`} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3
                        className="font-bold text-white text-lg mb-1 truncate hover:text-blue-400 cursor-pointer transition-colors"
                        onClick={handleViewLessons}
                    >
                        {teacher.fullName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
                            <ShieldCheck className="w-3 h-3" />
                            {teacher.level || 'General'}
                        </span>
                        {teacher.specification && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-tighter">
                                <Award className="w-3 h-3" />
                                {getSpecificationLabel(teacher.specification)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-white font-black text-base">{teacher.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reyting</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-base">
                        {teacher.lessonsCount || 0}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Darslar</span>
                </div>
            </div>

            <div className="space-y-4 mb-6 relative z-10">
                {teacher.description && (
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed italic">
                        "{teacher.description}"
                    </p>
                )}

                <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>{teacher.experience || 'Yangi'} tajriba</span>
                    </div>
                    <div className="text-emerald-400 font-black text-sm">
                        {formatPrice(teacher.hourPrice || 0)} <span className="text-[10px] opacity-70">sum/h</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                    {teacher.email && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="truncate">{teacher.email}</span>
                        </div>
                    )}
                    {teacher.phoneNumber && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{teacher.phoneNumber}</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleViewLessons}
                className="w-full group/btn flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-600/20 relative z-10"
            >
                Darslarni ko'rish
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default TeacherCard;