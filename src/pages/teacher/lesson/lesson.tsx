import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Loader2,
    AlertCircle,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    LayoutGrid
} from 'lucide-react';
import { useLessons } from '../../../hooks/use-lesson';
import { type Lesson, type LessonFilters, LessonStatus } from '../../auth/types';
import LessonCard from '../lesson/components/LessonCard';

const TeacherLessonsPage = () => {
    const navigate = useNavigate();

    const [lessonFilters, setLessonFilters] = useState<LessonFilters>({
        status: '',
        sortBy: 'startTime',
        sortOrder: 'DESC',
        page: 1,
        limit: 20,
    });

    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: lessonsData,
        isLoading: lessonsLoading,
        error: lessonsError,
    } = useLessons();

    const lessons = lessonsData?.data || [];
    const pagination = lessonsData ? {
        currentPage: lessonsData.currentPage,
        totalPages: lessonsData.totalPages,
        totalElements: lessonsData.totalElements,
    } : null;

    const handleStatusFilter = (status: LessonStatus | '') => {
        setLessonFilters((prev: LessonFilters) => ({ ...prev, status, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setLessonFilters((prev: LessonFilters) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getStatusColor = (status: LessonStatus | ''): string => {
        const colors: Record<LessonStatus | '', string> = {
            '': 'bg-zinc-500',
            [LessonStatus.AVAILABLE]: 'bg-blue-500',
            [LessonStatus.BOOKED]: 'bg-amber-500',
            [LessonStatus.COMPLETED]: 'bg-emerald-500',
            [LessonStatus.CANCELLED]: 'bg-rose-500',
        };
        return colors[status] || 'bg-zinc-500';
    };

    const filteredLessons = lessons.filter((lesson: Lesson) =>
        lesson.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.student?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans relative overflow-hidden">
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 text-zinc-500 hover:text-white mb-4 transition-all uppercase text-[10px] font-black tracking-[0.2em]"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Teachers
                        </button>
                        <h1 className="text-4xl font-black tracking-tighter italic flex items-center gap-3">
                            <LayoutGrid className="w-8 h-8 text-blue-500" />
                            LESSONS <span className="text-zinc-700">ARCHIVE</span>
                        </h1>
                    </div>

                    <div className="bg-zinc-900/40 border border-white/[0.05] rounded-2xl px-6 py-4 backdrop-blur-md">
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 text-right">Total Records</p>
                        <p className="text-2xl font-black text-white tracking-tighter text-right">
                            {pagination?.totalElements || 0} <span className="text-blue-500 text-sm italic">Lessons</span>
                        </p>
                    </div>
                </div>

                {/* Search & Filters Section */}
                <div className="bg-zinc-900/20 border border-white/[0.05] rounded-[2.5rem] p-6 mb-8 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-4 text-zinc-600">
                        <Filter className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">System Filters</span>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search lesson or student name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-black border border-white/[0.08] text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-sm font-medium placeholder:text-zinc-700"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {['', LessonStatus.AVAILABLE, LessonStatus.BOOKED, LessonStatus.COMPLETED, LessonStatus.CANCELLED].map(
                                (status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusFilter(status as LessonStatus | '')}
                                        className={`px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                                            lessonFilters.status === status
                                                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                                : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/10'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(status as LessonStatus | '')}`} />
                                        {status || 'All Status'}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Lessons Content Grid */}
                {!lessonsLoading && !lessonsError && filteredLessons.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {filteredLessons.map((lesson: Lesson) => (
                                <LessonCard key={lesson.id} lesson={lesson} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex flex-col items-center gap-6 pb-12">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        className="p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 disabled:opacity-20 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-12 h-12 rounded-2xl text-xs font-black transition-all border ${
                                                    page === pagination.currentPage
                                                        ? 'bg-blue-600 border-blue-500 text-white'
                                                        : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:border-white/20'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        className="p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 disabled:opacity-20 transition-all"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* --- BU YERDA CALENDAR ISHLATILADI (EMPTY STATE) --- */}
                {!lessonsLoading && !lessonsError && filteredLessons.length === 0 && (
                    <div className="text-center py-32 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
                        <Calendar className="w-16 h-16 mx-auto text-zinc-800 mb-6" />
                        <h3 className="text-xl font-black text-white italic mb-2 tracking-tight">NULL_DATA_FOUND</h3>
                        <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
                            No lessons match the current sequence
                        </p>
                        <button 
                            onClick={() => {setSearchQuery(''); handleStatusFilter('');}}
                            className="mt-8 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] hover:underline"
                        >
                            Reset System Filters
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {lessonsLoading && (
                    <div className="flex flex-col items-center justify-center py-24 space-y-4">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Syncing Database...</p>
                    </div>
                )}

                {/* Error State */}
                {lessonsError && (
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 mb-8 flex items-center gap-4">
                        <AlertCircle className="w-6 h-6 text-rose-500" />
                        <div>
                            <p className="text-xs font-black text-rose-500 uppercase tracking-widest">Fetch Failure</p>
                            <p className="text-sm text-zinc-400">{lessonsError.message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherLessonsPage;