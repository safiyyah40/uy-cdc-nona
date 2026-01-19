import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Newspaper, Search, Filter, LogIn,
    ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';

const MAIN_GREEN = "text-emerald-700";

// --- KOMPONEN KARTU BERITA ---
const CardBerita = ({ item }) => {
    return (
        <Link
            href={route('berita.show', { id: item.id, slug: item.slug })}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1 h-full"
        >
            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
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

                {/* Badge Tanggal */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-md border border-emerald-100">
                    {item.formatted_date}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                {/* Judul */}
                <h3 className={`text-xl font-bold ${MAIN_GREEN} mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight`}>
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.description}
                </p>

                {/* Footer Card */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                        {item.views}x Dilihat
                    </span>
                    <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors group-hover:underline decoration-2 underline-offset-4">
                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- KOMPONEN UTAMA ---
export default function IndexBerita({ berita, auth, filters, isGuest, total }) {

    // State Management (Default 8)
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '8');

    // --- HANDLERS ---
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('program.berita'), {
            search: searchTerm,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPageChange = (e) => {
        const val = e.target.value;
        setPerPage(val);
        router.get(route('program.berita'), {
            search: searchTerm,
            per_page: val
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                per_page: perPage
            }, { preserveState: true, preserveScroll: true });
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setPerPage('8');
        router.get(route('program.berita'));
    };

    // Fallback data
    const newsList = berita?.data || [];

    return (
        <MainLayout user={auth.user}>
            <Head title="Berita Terbaru" />

            {/* --- HERO SECTION --- */}
            <div
                className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}
            >
                {/* Judul dan Deskripsi */}
                <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                    {/* BADGE */}
                    <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                        <Newspaper className="w-4 h-4 mr-2" />
                        Pengumuman dan Informasi Kampus
                    </span>

                    {/* JUDUL */}
                    <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                        Berita
                    </h1>

                    {/* DESKRIPSI */}
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                        Informasi terbaru seputar kegiatan di Universitas Yarsi, pengumuman penting, serta perkembangan yang terjadi di lingkungan Universitas YARSI. Beragam update mengenai acara, prestasi, dan informasi akademik maupun non-akademik yang disajikan secara ringkas dan mudah diakses.
                    </p>
                </div>
            </div>
            {/* --- CONTENT AREA --- */}
            <div className="py-16 md:py-24 bg-white min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* --- USER VIEW (TOOLBAR SEARCH & FILTER) --- */}
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
                                                    placeholder="Cari judul berita, topik, atau kata kunci..."
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
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
                                                    <option value="4">Tampilkan 4</option>
                                                    <option value="8">Tampilkan 8 </option>
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
                                            className="text-sm text-gray-400 hover:text-emerald-600 underline underline-offset-4 decoration-dashed transition-colors"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- GRID BERITA --- */}
                    {newsList && newsList.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {newsList.map((item) => (
                                    <CardBerita key={item.id} item={item} />
                                ))}
                            </div>

                            {/* --- PAGINATION (USER ONLY) --- */}
                            {!isGuest && berita.links && berita.last_page > 1 && (
                                <div className="mt-16">
                                    <div className="flex flex-col items-center gap-4">
                                        {/* Pagination Controls */}
                                        <div className="flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                                            {berita.links.map((link, i) => {
                                                // Render label arrows properly
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
                                                        className={`
                                                            min-w-[40px] h-10 px-3 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
                                                            ${link.active
                                                                ? 'bg-emerald-600 text-white shadow-md scale-105'
                                                                : 'bg-transparent text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                                                            }
                                                            ${!link.url && 'opacity-40 cursor-not-allowed hover:bg-transparent'}
                                                        `}
                                                    >
                                                        {label}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Info Text */}
                                        <p className="text-sm text-gray-400 font-medium">
                                            Menampilkan <span className="text-gray-700 font-bold">{berita.from}-{berita.to}</span> dari <span className="text-gray-700 font-bold">{berita.total}</span> berita
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        // Empty State
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-6">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada berita ditemukan</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Coba ubah kata kunci pencarian Anda atau periksa kembali filter yang digunakan.
                            </p>
                            {!isGuest && (
                                <button
                                    onClick={handleReset}
                                    className="mt-6 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                    Tampilkan Semua
                                </button>
                            )}
                        </div>
                    )}

                    {/* Guest CTA (Jika Guest) */}
                    {isGuest && (
                        <div className="mt-16 flex justify-center">
                            <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Ingin melihat lebih banyak Berita?
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Saat ini tersedia total <strong>{total} berita</strong>. Silakan masuk menggunakan akun Anda untuk mengakses arsip berita lengkap, melakukan pencarian, dan fitur lainnya.
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
    );
}