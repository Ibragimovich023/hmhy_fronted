import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Loader2,
    AlertCircle,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    UserCircle,
    BookOpen
} from 'lucide-react';
import { useTeacher, useTeacherLessons } from '../../../hooks/use-lesson';
import { type Lesson, type LessonFilters, LessonStatus } from '../../auth/types';
import LessonCard from '../lesson/components/LessonCard';

const TeacherLessonsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const teacherId = id || '';

    const [lessonFilters, setLessonFilters] = useState<LessonFilters>({
        status: '',
        sortBy: 'startTime',
        sortOrder: 'DESC',
        page: 1,
        limit: 20,
    });

    const [searchQuery, setSearchQuery] = useState('');

    const cleanFilters = {
        ...lessonFilters,
        status: lessonFilters.status || undefined,
    };

    const { data: teacherData, isLoading: teacherLoading } = useTeacher(teacherId);
    const {
        data: lessonsData,
        isLoading: lessonsLoading,
        error: lessonsError,
    } = useTeacherLessons(teacherId, cleanFilters);

    const teacher = teacherData?.data?.teacher;
    const lessons = lessonsData?.data || [];

    const pagination = lessonsData ? {
        currentPage: lessonsData.currentPage,
        totalPages: lessonsData.totalPages,
        totalElements: lessonsData.totalElements,
    } : null;

    const handleStatusFilter = (status: LessonStatus | '') => {
        setLessonFilters((prev) => ({ ...prev, status, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setLessonFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getStatusStyles = (status: LessonStatus | ''): string => {
        const styles: Record<LessonStatus | '', string> = {
            '': 'bg-slate-800 text-slate-400 border-slate-700',
            [LessonStatus.AVAILABLE]: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            [LessonStatus.BOOKED]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            [LessonStatus.COMPLETED]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            [LessonStatus.CANCELLED]: 'bg-red-500/10 text-red-400 border-red-500/20',
        };
        return styles[status] || styles[''];
    };

    const getStatusLabel = (status: LessonStatus | ''): string => {
        if (!status) return 'Barchasi';
        const labels: Record<LessonStatus, string> = {
            [LessonStatus.AVAILABLE]: 'Mavjud',
            [LessonStatus.BOOKED]: 'Band qilingan',
            [LessonStatus.COMPLETED]: 'Yakunlangan',
            [LessonStatus.CANCELLED]: 'Bekor qilingan',
        };
        return labels[status as LessonStatus];
    };

    const filteredLessons = lessons.filter((lesson: Lesson) =>
        lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!id) return null;

    return (
        <div className="min-h-screen bg-[#0a0c14] text-slate-200 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-all"
                >
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-widest">Ustozlar ro'yxatiga</span>
                </button>

                {/* Teacher Profile Header */}
                <div className="relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-[32px] p-8 backdrop-blur-md">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                {teacher?.imageUrl ? (
                                    <img src={teacher.imageUrl} className="w-24 h-24 rounded-3xl object-cover border-2 border-blue-500/20" alt="" />
                                ) : (
                                    <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <UserCircle className="w-12 h-12 text-blue-400" />
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-xl border-4 border-[#11141d]">
                                    <BookOpen className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                                    {teacherLoading ? "Yuklanmoqda..." : `${teacher?.fullName}`}
                                </h1>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black rounded-lg uppercase tracking-tighter">
                                        {teacher?.level || 'N/A'} Daraja
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-slate-500 text-xs font-bold rounded-lg uppercase tracking-tighter">
                                        ID: {teacherId.slice(-6).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {teacher?.hourPrice && (
                            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[24px] text-center md:text-right min-w-[200px]">
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Dars narxi</p>
                                <p className="text-2xl font-black text-emerald-400">
                                    {new Intl.NumberFormat('uz-UZ').format(teacher.hourPrice)} <span className="text-sm opacity-60">UZS/h</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Controls Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Search & Stats */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-6 backdrop-blur-md">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Filter className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-lg font-bold text-white">Filtrlash</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Dars nomi yoki talaba ismini yozing..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-[20px] py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['', LessonStatus.AVAILABLE, LessonStatus.BOOKED, LessonStatus.COMPLETED, LessonStatus.CANCELLED].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusFilter(status as LessonStatus | '')}
                                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                                                lessonFilters.status === status
                                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30'
                                                    : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'
                                            }`}
                                        >
                                            {getStatusLabel(status as LessonStatus | '')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Lessons Grid */}
                        <div className="space-y-6">
                            {lessonsLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                                    <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Darslar yuklanmoqda</p>
                                </div>
                            ) : lessonsError ? (
                                <div className="bg-red-500/5 border border-red-500/10 rounded-[28px] p-8 text-center">
                                    <AlertCircle className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                                    <p className="text-red-400 font-bold">{lessonsError.message}</p>
                                </div>
                            ) : filteredLessons.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredLessons.map((lesson: Lesson) => (
                                            <LessonCard key={lesson.id} lesson={lesson} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {pagination && pagination.totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-3 pt-6">
                                            <button
                                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                disabled={pagination.currentPage === 1}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <div className="flex gap-2">
                                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => (
                                                    <button
                                                        key={i + 1}
                                                        onClick={() => handlePageChange(i + 1)}
                                                        className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                                                            pagination.currentPage === i + 1
                                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                                                : 'bg-white/5 text-slate-500 hover:bg-white/10'
                                                        }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                disabled={pagination.currentPage === pagination.totalPages}
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-white/[0.01] border border-white/5 rounded-[40px] py-24 text-center">
                                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Calendar className="w-10 h-10 text-slate-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Darslar topilmadi</h3>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">Filtr shartlarini o'zgartirib ko'ring yoki ustozda hozircha darslar mavjud emas.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 shadow-xl shadow-blue-900/20">
                            <h3 className="text-white font-black uppercase text-xs tracking-widest mb-6 opacity-80">Statistika</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-4xl font-black text-white">{pagination?.totalElements || 0}</p>
                                    <p className="text-blue-100/60 text-xs font-bold uppercase tracking-tighter mt-1">Umumiy darslar</p>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div>
                                    <p className="text-4xl font-black text-white">{filteredLessons.length}</p>
                                    <p className="text-blue-100/60 text-xs font-bold uppercase tracking-tighter mt-1">Filtrlangan natijalar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherLessonsPage;