import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, BookOpen, Clock, MapPin, Wifi, Calendar, Timer, LogIn, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

// Terima props baru: seminars, pagination, filters, isGuest, total
export default function IndexSeminar({ auth, seminars, pagination, filters, isGuest, total }) {

    // STATE MANAGEMENT
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');

    // Konstanta Warna Tema
    const mainGreen = "text-emerald-800";
    const accentGreen = "bg-emerald-600";

    // HANDLERS

    // 1. Handle Pencarian
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('program.seminar'), {
            search: searchTerm,
            per_page: perPage
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // 2. Handle Ganti Jumlah Tampilan (Per Page)
    const handlePerPageChange = (e) => {
        const val = e.target.value;
        setPerPage(val);
        router.get(route('program.seminar'), {
            search: searchTerm,
            per_page: val
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // 3. Handle Pagination (Pindah Halaman)
    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                per_page: perPage
            }, {
                preserveState: true,
                preserveScroll: true
            });
        }
    };

    // 4. Reset Filter
    const handleReset = () => {
        setSearchTerm('');
        setPerPage('12');
        router.get(route('program.seminar'));
    };

    // Fallback data agar tidak error jika null
    const seminarList = Array.isArray(seminars) ? seminars : (seminars?.data || []);

    return (
        <>
            <Head title="Seminar" />

            <MainLayout user={auth?.user}>

                {/* HERO SECTION */}
                <div className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}>
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                        <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Pengembangan Karakter dan Keilmuan
                        </span>

                        <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                            Seminar
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                            Menghadirkan wawasan terkini untuk membentuk lulusan yang tidak hanya kompeten secara profesional, tetapi juga memiliki integritas dan pola pikir Islami yang komprehensif dalam menghadapi dunia kerja.
                        </p>
                    </div>
                </div>

                {/* SEMINAR LIST SECTION */}
                <div className={`py-16 md:py-24 bg-white min-h-screen`}>
                    <div className="container mx-auto px-6 lg:px-8">

                        {/* USER VIEW (SEARCH & FILTER) */}
                        {!isGuest && (
                            <div className="mb-12 space-y-6">
                                <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                        {/* Search Input */}
                                        <div className="md:col-span-8">
                                            <form onSubmit={handleSearch} className="flex gap-2">
                                                <div className="relative flex-1 group">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                                    <input
                                                        type="text"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        placeholder="Cari topik seminar..."
                                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className={`px-6 py-3 ${accentGreen} hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2`}
                                                >
                                                    <Search className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Cari</span>
                                                </button>
                                            </form>
                                        </div>

                                        {/* Filter Per Page */}
                                        <div className="md:col-span-4">
                                            <div className="flex items-center gap-3 h-full">
                                                <div className="relative w-full">
                                                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <select
                                                        value={perPage}
                                                        onChange={handlePerPageChange}
                                                        className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                                    >
                                                        <option value="6">Tampilkan 6</option>
                                                        <option value="12">Tampilkan 12 </option>
                                                        <option value="24">Tampilkan 24</option>
                                                        <option value="1000">Tampilkan Semua</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Filter Badge */}
                                    {filters?.search && (
                                        <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">Hasil pencarian untuk:</span>
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200 flex items-center gap-2">
                                                "{filters.search}"
                                                <button onClick={handleReset} className="hover:text-emerald-900 bg-emerald-200 rounded-full p-0.5">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                </button>
                                            </span>
                                            <button
                                                onClick={handleReset}
                                                className="text-sm text-gray-400 hover:text-emerald-600 underline underline-offset-4 decoration-dashed transition-colors ml-auto"
                                            >
                                                Reset Filter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* GRID SEMINAR */}
                        {seminarList && seminarList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {seminarList.map((item) => {
                                    const detailUrl = route('program.seminar.show', { id: item.id, slug: item.slug });

                                    const isOnline = item.type === 'Online';
                                    const TypeIcon = isOnline ? Wifi : MapPin;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={detailUrl}
                                            className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
                                        >
                                            {/* Image Section */}
                                            <div className="relative aspect-[6/4] w-full overflow-hidden bg-gray-100">
                                                <img
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    src={item.image_url}
                                                    alt={item.title}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/ecfdf5/047857?text=Seminar+YARSI"; }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                                <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border shadow-sm flex items-center gap-1.5 backdrop-blur-sm bg-white/90 text-gray-800`}>
                                                    <TypeIcon className={`w-3 h-3 ${isOnline ? 'text-sky-600' : 'text-orange-600'}`} />
                                                    {item.type || 'Event'}
                                                </div>

                                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-emerald-100 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {item.date}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col flex-grow relative">
                                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                                                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-emerald-700">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {item.time}
                                                    </div>
                                                    {item.location && (
                                                        <div className="flex items-center gap-1.5 truncate max-w-[180px]" title={item.location}>
                                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                                            {item.location}
                                                        </div>
                                                    )}
                                                </div>

                                                <h3 className={`font-serif ${mainGreen} font-bold text-xl leading-snug line-clamp-3 mb-4 group-hover:text-emerald-600 transition-colors`}>
                                                    {item.title.replace(/^"|"$/g, '')}
                                                </h3>

                                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center text-xs text-gray-400 gap-1">
                                                        <Timer className="w-3 h-3" />
                                                        <span>Diposting {item.posted_at}</span>
                                                    </div>

                                                    <div className="flex items-center text-sm font-bold text-emerald-600 group-hover:underline decoration-2 underline-offset-4">
                                                        {isGuest ? 'Masuk untuk Detail' : 'Lihat Detail'}
                                                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                                    <BookOpen className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tidak ada seminar ditemukan</h3>
                                <p className="text-gray-500 mt-2">Coba kata kunci lain atau nantikan jadwal terbaru.</p>
                                {!isGuest && (
                                    <button
                                        onClick={handleReset}
                                        className="mt-6 px-6 py-2 bg-white border border-emerald-200 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                                    >
                                        Tampilkan Semua
                                    </button>
                                )}
                            </div>
                        )}

                        {/* PAGINATION (HANYA UNTUK USER) */}
                        {!isGuest && pagination && pagination.last_page > 1 && (
                            <div className="mt-16 flex justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                                        {pagination.links.map((link, i) => {
                                            let label = link.label;

                                            if (label.includes('&laquo;') || label === 'Previous') {
                                                label = <ChevronLeft className="w-4 h-4" />;
                                            } else if (label.includes('&raquo;') || label === 'Next') {
                                                label = <ChevronRight className="w-4 h-4" />;
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handlePageChange(link.url)}
                                                    disabled={!link.url || link.active}
                                                    className={`
                                                        px-4 py-2 rounded-lg text-sm font-bold transition-all
                                                        ${link.active ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                                                        }
                                                        ${!link.url && 'opacity-50 cursor-not-allowed hover:bg-transparent'}
                                                    `}
                                                >
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="text-xs text-gray-400">
                                        Menampilkan {pagination.from}-{pagination.to} dari {pagination.total} data
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Guest CTA (Jika Guest) */}
                        {isGuest && (
                            <div className="mt-16 flex justify-center">
                                <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Ingin melihat lebih banyak Seminar?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Saat ini tersedia total <strong>{total} Seminar</strong>. Silakan masuk menggunakan akun Anda untuk mengakses arsip seminar lengkap, melakukan pencarian, dan mendaftar acara.
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
                    </div>
                </div>
            </MainLayout>
        </>
    );
}