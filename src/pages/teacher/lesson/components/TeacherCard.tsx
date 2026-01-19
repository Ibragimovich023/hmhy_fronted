// src/components/TeacherCard.tsx
import React from 'react';
import { Star, ChevronRight, Award, Mail, Phone, ShieldCheck } from 'lucide-react';
import { type Teacher, TeacherSpecification } from '../../../auth/types';
import { useNavigate } from 'react-router-dom';

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const navigate = useNavigate();

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    const getSpecificationLabel = (spec?: TeacherSpecification): string => {
        const labels: Record<TeacherSpecification, string> = {
            [TeacherSpecification.IELTS]: 'IELTS Master',
            [TeacherSpecification.SPEAKING]: 'Speaking',
            [TeacherSpecification.GRAMMAR]: 'Grammar',
            [TeacherSpecification.BUSINESS]: 'Business',
            [TeacherSpecification.KIDS]: 'Kids Pro',
        };
        return spec ? labels[spec] : 'General English';
    };

    const handleViewLessons = () => {
        navigate(`/app/admin/teacher/${teacher.id}/lessons`);
    };

    return (
        <div className="group bg-black border border-white/[0.06] rounded-[2.5rem] p-6 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
            {/* Background Glow on Hover */}
            <div className="absolute -top-24 -right-24 h-48 w-48 bg-blue-600/5 blur-[80px] group-hover:bg-blue-600/10 transition-all pointer-events-none" />

            {/* Header: Avatar & Main Info */}
            <div className="relative z-10 flex items-center gap-5 mb-8">
                <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border-4 border-zinc-900 bg-zinc-900 overflow-hidden ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-500">
                        {teacher.imageUrl ? (
                            <img
                                src={teacher.imageUrl}
                                alt={teacher.fullName}
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 text-2xl font-black">
                                {teacher.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                    {/* Active Status Badge */}
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-4 border-black ${teacher.isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-zinc-700'}`} />
                </div>

                <div className="min-w-0 flex-1">
                    <h3
                        onClick={handleViewLessons}
                        className="text-xl font-black tracking-tighter text-white truncate cursor-pointer hover:text-blue-500 transition-colors italic uppercase"
                    >
                        {teacher.fullName}
                    </h3>
                    <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            <ShieldCheck className="w-3 h-3 text-blue-500" />
                            {teacher.level || 'Expert Teacher'}
                        </div>
                        {teacher.specification && (
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                <Award className="w-3 h-3" />
                                {getSpecificationLabel(teacher.specification)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mb-6 py-4 border-y border-white/[0.05]">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Rating</span>
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-black text-white">{teacher.rating}</span>
                        <span className="text-[9px] text-zinc-700 font-bold italic">({teacher.lessonsCount || 0} LSSN)</span>
                    </div>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Hourly Rate</span>
                    <span className="text-sm font-black text-white tracking-tight">
                        {formatPrice(teacher.hourPrice || 0)} <span className="text-[9px] text-zinc-500 font-bold uppercase">so'm</span>
                    </span>
                </div>
            </div>

            {/* Quick Contacts */}
            <div className="relative z-10 space-y-2 mb-6 px-1">
                <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-500 group/item cursor-default">
                    <Mail className="w-3.5 h-3.5 text-zinc-700 group-hover/item:text-blue-500 transition-colors" />
                    <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-500 group/item cursor-default">
                    <Phone className="w-3.5 h-3.5 text-zinc-700 group-hover/item:text-blue-500 transition-colors" />
                    <span>{teacher.phoneNumber || 'Hidden Contact'}</span>
                </div>
            </div>

            {/* Description/Experience */}
            {teacher.description && (
                <p className="relative z-10 text-[11px] text-zinc-600 leading-relaxed mb-6 line-clamp-2 italic font-medium border-l-2 border-white/5 pl-3">
                    "{teacher.description}"
                </p>
            )}

            {/* View Lessons Action */}
            <button
                onClick={handleViewLessons}
                className="relative z-10 w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-white/[0.05] rounded-2xl group/btn hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98] outline-none"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Profile & Lessons</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default TeacherCard;