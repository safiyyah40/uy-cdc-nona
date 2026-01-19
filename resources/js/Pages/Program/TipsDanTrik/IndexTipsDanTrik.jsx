import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Lightbulb, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Clock, Tag } from 'lucide-react';

const MAIN_EMERALD = "text-emerald-700";

// --- KOMPONEN KARTU TIPS ---
const CardTips = ({ item }) => {
    const detailUrl = route('program.tips-dan-trik.show', { id: item.id, slug: item.slug });

    return (
        <Link
            href={detailUrl}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1 h-full"
        >
            <div className="relative w-full h-52 overflow-hidden bg-gray-200">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image"; }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">No Image</div>
                )}

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-md border border-emerald-100 uppercase tracking-wide">
                    {item.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className={`text-xl font-bold ${MAIN_EMERALD} mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight font-serif`}>
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {item.reading_time}
                    </span>
                    <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors group-hover:underline decoration-2 underline-offset-4">
                        Baca Tips <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- KOMPONEN UTAMA ---
export default function TipsIndex({ tips, auth, filters, isGuest, total, categories }) {
    // State Management (Default '12' sesuai request)
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');
    const [categoryFilter, setCategoryFilter] = useState(filters?.category || '');

    // --- HANDLERS ---
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('program.tips-dan-trik'), {
            search: searchTerm,
            per_page: perPage,
            category: categoryFilter
        }, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (key, value) => {
        if (key === 'per_page') setPerPage(value);
        if (key === 'category') setCategoryFilter(value);

        router.get(route('program.tips-dan-trik'), {
            search: searchTerm,
            per_page: key === 'per_page' ? value : perPage,
            category: key === 'category' ? value : categoryFilter
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                per_page: perPage,
                category: categoryFilter
            }, { preserveState: true, preserveScroll: true });
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setPerPage('12');
        setCategoryFilter('');
        router.get(route('program.tips-dan-trik'));
    };

    const tipsList = tips?.data || [];

    return (
        <MainLayout user={auth.user}>
            <Head title="Tips & Trik Karir" />

            {/* HERO SECTION */}
            <div className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}>
                <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                    <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Panduan Sukses & Pengembangan Diri
                    </span>
                    <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                        Tips & Trik
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                        Kumpulan strategi praktis, wawasan karir, dan panduan pengembangan diri untuk membantu Anda menavigasi dunia profesional dengan percaya diri.
                    </p>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="py-16 md:py-24 bg-white min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* USER VIEW (TOOLBAR) */}
                    {!isGuest && (
                        <div className="mb-12 space-y-6">
                            <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                    {/* Search Input */}
                                    <div className="md:col-span-6 lg:col-span-6">
                                        <form onSubmit={handleSearch} className="flex gap-2">
                                            <div className="relative flex-1 group">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    placeholder="Cari tips..."
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                                                />
                                            </div>
                                            <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                                                <Search className="w-4 h-4" />
                                                <span className="hidden sm:inline">Cari</span>
                                            </button>
                                        </form>
                                    </div>

                                    {/* Filters Group (Kategori & Per Page) */}
                                    <div className="md:col-span-6 lg:col-span-6 flex flex-col sm:flex-row gap-3">

                                        {/* Kategori Filter */}
                                        <div className="relative flex-1">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <select
                                                value={categoryFilter}
                                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                            >
                                                <option value="">Semua Kategori</option>
                                                {categories && categories.map((cat, idx) => (
                                                    <option key={idx} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Filter Per Page */}
                                        <div className="relative w-full sm:w-48">
                                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <select
                                                value={perPage}
                                                onChange={(e) => handleFilterChange('per_page', e.target.value)}
                                                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                            >
                                                <option value="4">Tampilkan 4</option>
                                                <option value="8">Tampilkan 8</option>
                                                <option value="12">Tampilkan 12</option>
                                                <option value="24">Tampilkan 24</option>
                                                <option value="all">Tampilkan Semua</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Active Filter Badge */}
                                {(filters?.search || filters?.category) && (
                                    <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">Filter Aktif:</span>
                                        {filters.search && <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200 flex items-center gap-2">"{filters.search}"</span>}
                                        {filters.category && <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200 flex items-center gap-2">Kategori: {filters.category}</span>}
                                        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-emerald-600 underline underline-offset-4 decoration-dashed transition-colors ml-auto">Reset Filter</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* GRID TIPS */}
                    {tipsList && tipsList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {tipsList.map((item) => (
                                    <CardTips key={item.id} item={item} />
                                ))}
                            </div>

                            {/* PAGINATION */}
                            {!isGuest && tips.links && tips.last_page > 1 && (
                                <div className="mt-16">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                                            {tips.links.map((link, i) => {
                                                let label = link.label;
                                                if (label.includes('&laquo;')) label = <ChevronLeft className="w-4 h-4" />;
                                                else if (label.includes('&raquo;')) label = <ChevronRight className="w-4 h-4" />;
                                                else if (label === 'Next') label = <ChevronRight className="w-4 h-4" />;
                                                else if (label === 'Previous') label = <ChevronLeft className="w-4 h-4" />;

                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handlePageChange(link.url)}
                                                        disabled={!link.url || link.active}
                                                        className={`min-w-[40px] h-10 px-3 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${link.active ? 'bg-emerald-600 text-white shadow-md scale-105' : 'bg-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'} ${!link.url && 'opacity-40 cursor-not-allowed hover:bg-transparent'}`}
                                                    >
                                                        {label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="text-sm text-gray-400 font-medium">
                                            Menampilkan <span className="text-gray-700 font-bold">{tips.from}-{tips.to}</span> dari <span className="text-gray-700 font-bold">{tips.total}</span> artikel
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Guest CTA (Jika Guest) */}
                            {isGuest && (
                                <div className="mt-16 flex justify-center">
                                    <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            Ingin melihat lebih banyak Tips dan Trik?
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Saat ini tersedia total <strong>{total} Tips dan Trik</strong>. Silakan masuk menggunakan akun Anda untuk mengakses ratusan tips karir, panduan sukses, dan fitur pencarian lengkap.
                                        </p>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-emerald-500/30"
                                        >
                                            Masuk Sekarang
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // EMPTY STATE
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-6">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada tips ditemukan</h3>
                            <p className="text-gray-500 max-w-md mx-auto">Coba ubah kata kunci pencarian Anda atau periksa kembali filter yang digunakan.</p>
                            {!isGuest && (
                                <button onClick={handleReset} className="mt-6 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                    Tampilkan Semua
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}