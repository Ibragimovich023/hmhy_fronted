import React from 'react';
import { Calendar, Clock, DollarSign, CheckCircle, XCircle, Video, User, Timer } from 'lucide-react';
import { type Lesson, LessonStatus } from '../../../auth/types';

interface LessonCardProps {
    lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    const getStatusStyles = (status: LessonStatus): string => {
        const styles = {
            [LessonStatus.AVAILABLE]: 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]',
            [LessonStatus.BOOKED]: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
            [LessonStatus.COMPLETED]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
            [LessonStatus.CANCELLED]: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
        };
        return styles[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    };

    const getStatusIcon = (status: LessonStatus) => {
        switch (status) {
            case LessonStatus.COMPLETED:
                return <CheckCircle className="w-3.5 h-3.5" />;
            case LessonStatus.CANCELLED:
                return <XCircle className="w-3.5 h-3.5" />;
            case LessonStatus.BOOKED:
                return <Clock className="w-3.5 h-3.5" />;
            default:
                return <Timer className="w-3.5 h-3.5" />;
        }
    };

    const formatDateTime = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uz-UZ', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('uz-UZ').format(price);
    };

    const getDuration = (): string => {
        const start = new Date(lesson.startTime);
        const end = new Date(lesson.endTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.round(diffMs / 60000);
        return `${diffMins} min`;
    };

    return (
        <div className="group relative bg-white/[0.02] border border-white/5 rounded-[24px] p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 shadow-xl overflow-hidden">
            {/* Dekorativ orqa fon nuri */}
            <div className={`absolute -top-10 -right-10 w-24 h-24 blur-[50px] opacity-20 rounded-full transition-colors ${
                lesson.status === LessonStatus.COMPLETED ? 'bg-emerald-500' : 'bg-blue-500'
            }`} />

            {/* Header */}
            <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1.5 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {lesson.name}
                    </h3>
                    {lesson.student && (
                        <div className="flex items-center gap-2 text-slate-400">
                            <User className="w-3.5 h-3.5 text-slate-500" />
                            <p className="text-xs font-medium uppercase tracking-wider">
                                {lesson.student.firstName} {lesson.student.lastName}
                            </p>
                        </div>
                    )}
                </div>
                <span
                    className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 transition-all ${getStatusStyles(
                        lesson.status
                    )}`}
                >
                    {getStatusIcon(lesson.status)}
                    {lesson.status}
                </span>
            </div>

            {/* Date & Time Section */}
            <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Sana</span>
                        <span className="text-xs text-slate-200 font-semibold">{formatDateTime(lesson.startTime)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Vaqt</span>
                        <span className="text-xs text-slate-200 font-semibold">{formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}</span>
                    </div>
                </div>
            </div>

            {/* Google Meet Link */}
            {lesson.googleMeetUrl && (
                <div className="mb-5 relative z-10">
                    <a
                        href={lesson.googleMeetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-bold rounded-xl border border-blue-600/20 transition-all group/link"
                    >
                        <Video className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                        <span>Google Meet-ga qo'shilish</span>
                    </a>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-0.5">Narxi</span>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-black">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span className="text-sm">
                            {formatPrice(lesson.price)} <span className="text-[10px] opacity-70">so'm</span>
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Davomiyligi</span>
                        <span className="text-xs text-slate-300 font-bold bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                            {getDuration()}
                        </span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">To'lov</span>
                        {lesson.isPaid ? (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-lg border border-emerald-500/20">
                                PAID
                            </span>
                        ) : (
                            <span className="px-2 py-0.5 bg-slate-500/10 text-slate-400 text-[10px] font-black rounded-lg border border-slate-500/20">
                                UNPAID
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {(lesson.bookedAt || lesson.completedAt) && (
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between opacity-60 italic">
                    <div className="flex items-center gap-1 text-[9px] text-slate-500 font-medium uppercase tracking-tighter">
                        <Timer className="w-3 h-3" />
                        {lesson.status === LessonStatus.COMPLETED ? (
                            <span>Tugatildi: {formatDateTime(lesson.completedAt!)}</span>
                        ) : (
                            <span>Band qilindi: {formatDateTime(lesson.bookedAt!)}</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LessonCard;