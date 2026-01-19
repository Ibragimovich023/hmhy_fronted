import { useState } from 'react';
import { useTeachers } from '../../../hooks/use-lesson';
import type { SortField, TeacherFilters } from '../../auth/types';
import TeacherCard from '../../admin/lesson/components/TeacherCard';
import { 
    Search, 
    Filter, 
    SortAsc, 
    ChevronLeft, 
    ChevronRight, 
    Loader2, 
    Users, 
    Star 
} from 'lucide-react';

const Lesson = () => {
    const [filters, setFilters] = useState<TeacherFilters>({
        search: '',
        level: '',
        minRating: undefined,
        maxRating: undefined,
        sortBy: 'fullName',
        sortOrder: 'ASC',
        page: 1,
        limit: 12,
    });

    const { data, isLoading } = useTeachers(filters);

    const teachers = data?.data ?? [];
    const pagination = data;

    const handleSearch = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    };

    const handleSort = (sortBy: SortField) => {
        setFilters((prev) => ({
            ...prev,
            sortBy,
            sortOrder: prev.sortOrder === 'ASC' ? 'DESC' : 'ASC',
            page: 1,
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0a0c14] text-white p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-white">Ustozlar</h1>
                        </div>
                        <p className="text-slate-500 font-medium text-sm">Platformadagi barcha ustozlarni boshqarish va ko'rish</p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    {/* Background glow for filters */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] -mr-16 -mt-16" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative z-10">
                        
                        {/* Search Input */}
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Ism bo'yicha qidirish..."
                                value={filters.search || ''}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        {/* Level Filter */}
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <select
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/40 appearance-none cursor-pointer"
                                value={filters.level || ''}
                                onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value, page: 1 }))}
                            >
                                <option value="" className="bg-[#0f111a]">Barcha darajalar</option>
                                {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
                                    <option key={lvl} value={lvl} className="bg-[#0f111a]">{lvl}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div className="relative">
                            <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                            <select
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/40 appearance-none cursor-pointer"
                                value={filters.minRating ?? ''}
                                onChange={(e) => setFilters((prev) => ({ ...prev, minRating: e.target.value ? Number(e.target.value) : undefined, page: 1 }))}
                            >
                                <option value="" className="bg-[#0f111a]">Barcha reytinglar</option>
                                <option value="4" className="bg-[#0f111a]">4.0+ ⭐</option>
                                <option value="3" className="bg-[#0f111a]">3.0+ ⭐</option>
                                <option value="2" className="bg-[#0f111a]">2.0+ ⭐</option>
                            </select>
                        </div>
                    </div>

                    {/* Quick Sort Buttons */}
                    <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/5 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mr-2">Saralash:</span>
                        {[
                            { id: 'fullName', label: 'Ism' },
                            { id: 'rating', label: 'Reyting' },
                            { id: 'createdAt', label: 'Sana' }
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => handleSort(btn.id as SortField)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 active:scale-95 ${
                                    filters.sortBy === btn.id 
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30' 
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                }`}
                            >
                                <SortAsc className={`w-3.5 h-3.5 transition-transform ${filters.sortBy === btn.id ? 'rotate-0' : 'opacity-40 rotate-180'}`} />
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-5">
                        <div className="relative">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-500 relative z-10" />
                            <div className="absolute inset-0 blur-xl bg-blue-500/20" />
                        </div>
                        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Ustozlar yuklanmoqda</p>
                    </div>
                )}

                {/* Grid Section */}
                {!isLoading && teachers.length > 0 && (
                    <div className="space-y-12 pb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {teachers.map((teacher) => (
                                <TeacherCard key={teacher.id} teacher={teacher} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && pagination.totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:text-white transition-all active:scale-90"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 p-2 rounded-[24px] shadow-xl">
                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-11 h-11 rounded-xl text-sm font-black transition-all active:scale-90 ${
                                                page === pagination.currentPage 
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-105' 
                                                : 'text-slate-500 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:text-white transition-all active:scale-90"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && teachers.length === 0 && (
                    <div className="bg-white/[0.02] border border-white/5 rounded-[40px] py-32 text-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-20" />
                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-slate-800/40 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-white/5">
                                <Users className="w-12 h-12 text-slate-600" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3">Ustozlar topilmadi</h3>
                            <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed px-6">
                                Qidiruv natijasi bo'sh chiqdi. Filtrlarni tozalab yoki boshqa so'z bilan qidirib ko'rin.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lesson;