// src/components/LessonCard.tsx
import React from 'react';
import { Calendar, Clock, DollarSign, CheckCircle, XCircle, Video, User as UserIcon } from 'lucide-react';
import { type Lesson, LessonStatus } from '../../../auth/types';

interface LessonCardProps {
    lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
    // Holatlar uchun neon ranglar (Mutloq qora fonda yaxshi ko'rinadigan)
    const getStatusStyles = (status: LessonStatus): string => {
        const styles = {
            [LessonStatus.AVAILABLE]: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
            [LessonStatus.BOOKED]: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
            [LessonStatus.COMPLETED]: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
            [LessonStatus.CANCELLED]: 'border-rose-500/20 text-rose-400 bg-rose-500/5',
        };
        return styles[status] || 'border-zinc-800 text-zinc-400 bg-zinc-900/50';
    };

    const getStatusIcon = (status: LessonStatus) => {
        switch (status) {
            case LessonStatus.COMPLETED:
                return <CheckCircle className="w-3.5 h-3.5" />;
            case LessonStatus.CANCELLED:
                return <XCircle className="w-3.5 h-3.5" />;
            default:
                return <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />;
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
        return `${Math.round(diffMs / 60000)} min`;
    };

    return (
        <div className="group bg-zinc-950 border border-white/[0.05] rounded-[2rem] p-6 hover:border-white/10 transition-all duration-300 relative overflow-hidden">
            {/* Hover Glow Effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex-1">
                    <h3 className="text-lg font-black tracking-tight text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {lesson.name}
                    </h3>
                    {lesson.student && (
                        <div className="flex items-center gap-2 text-zinc-500">
                            <UserIcon className="w-3.5 h-3.5" />
                            <span className="text-xs font-bold uppercase tracking-widest leading-none">
                                {lesson.student.firstName} {lesson.student.lastName}
                            </span>
                        </div>
                    )}
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 transition-all ${getStatusStyles(lesson.status)}`}>
                    {getStatusIcon(lesson.status)}
                    {lesson.status}
                </span>
            </div>

            {/* Date & Time Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mb-6 p-4 bg-white/[0.02] border border-white/[0.03] rounded-2xl">
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Sana</p>
                    <div className="flex items-center gap-2 text-zinc-300">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold">{formatDateTime(lesson.startTime)}</span>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Vaqt ({getDuration()})</p>
                    <div className="flex items-center gap-2 text-zinc-300">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold">
                            {formatTime(lesson.startTime)} — {formatTime(lesson.endTime)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Meet Link & Actions */}
            <div className="relative z-10 space-y-4">
                {lesson.googleMeetUrl && (
                    <a
                        href={lesson.googleMeetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 border border-white/[0.05] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all active:scale-[0.98]"
                    >
                        <Video className="w-4 h-4" />
                        Google Meet
                    </a>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1.5 text-white">
                        <DollarSign className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-sm font-black tracking-tight">
                            {formatPrice(lesson.price)} <span className="text-[10px] text-zinc-500 uppercase">so'm</span>
                        </span>
                    </div>
                    
                    {lesson.isPaid ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Paid</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 border border-white/5 rounded-lg">
                            <div className="w-1 h-1 bg-zinc-500 rounded-full" />
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Unpaid</span>
                        </div>
                    )}
                </div>

                {/* Timestamp logs */}
                {(lesson.bookedAt || lesson.completedAt) && (
                    <div className="pt-2">
                        <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-widest text-right">
                            {lesson.status === LessonStatus.COMPLETED 
                                ? `Finish: ${formatDateTime(lesson.completedAt!)}`
                                : `Booked: ${formatDateTime(lesson.bookedAt!)}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonCard;