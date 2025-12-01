import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, BookOpen, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// --- KOMPONEN CARD ---
const ProgramCard = ({ program, isGuest }) => {
    const detailUrl = isGuest
        ? route('login')
        : route('program.campus.hiring.show', { id: program.id, slug: program.slug });

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl rounded-2xl group h-full"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 md:flex h-full">

                {/* Image Section */}
                <div className="md:w-5/12 relative overflow-hidden bg-gray-200 min-h-[200px] md:min-h-full">
                    <img
                        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90 absolute inset-0"
                        src={program.imageSrc}
                        alt={program.title}
                        onError={(e) => { e.target.src = '/images/campushiring.jpg'; }}
                    />
                    {/* Badge Tanggal Mobile */}
                    <div className="absolute top-3 right-3 md:hidden bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 shadow-md">
                        {program.formatted_date}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-center">
                    {/* Badge/Title */}
                    <div className="uppercase tracking-widest text-xs font-bold text-emerald-800 mb-1">
                        {program.company_name || "Perusahaan"}
                    </div>
                    {/* Subtitle (Judul Program) */}
                    <h3 className="mt-1 text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug mb-3 group-hover:text-emerald-600 transition-colors">
                        {program.title}
                    </h3>
                    {/* Deskripsi */}
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-6">
                        {program.description}
                    </p>

                    {/* Meta Info & CTA */}
                    <div className="mt-auto">
                        {!isGuest && (
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 font-medium mb-6">
                                <span className="flex items-center bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                                    <Calendar className="w-3.5 h-3.5 mr-1.5" /> {program.formatted_date}
                                </span>
                                {program.location && (
                                    <span className="flex items-center bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5" /> {program.location}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* CTA Button */}
                        <span className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white border border-transparent rounded-full font-bold text-xs md:text-sm uppercase tracking-wider shadow-md hover:bg-emerald-700 focus:outline-none transition ease-in-out duration-150">
                            {isGuest ? 'Masuk untuk Detail' : 'Lihat Detail Program'}
                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- HALAMAN UTAMA ---
export default function CampusHiring({ auth, programs, pagination, filters, isGuest, total }) {

    // State Management
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '8');

    const accentGreen = "bg-emerald-600";

    // Normalisasi data programs
    const programList = programs || [];

    // --- HANDLERS ---
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('program.campus.hiring'), {
            search: searchTerm,
            per_page: perPage,
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPageChange = (value) => {
        setPerPage(value);
        router.get(route('program.campus.hiring'), {
            search: searchTerm,
            per_page: value,
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                per_page: perPage,
            }, { preserveState: true, preserveScroll: true });
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setPerPage('8');
        router.get(route('program.campus.hiring'));
    };

    return (
        <MainLayout user={auth?.user}>
            <Head title="Campus Hiring - CDC UY" />
            {/* HERO SECTION */}
            <div className={`pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300`}>
                <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">
                    <span className={`inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest`}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Pengembangan Karakter dan Keilmuan
                    </span>
                    <h1 className={`text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm`}>
                        Temukan <span className="text-emerald-600">Karir Impian</span> <br /> di <span className="font-serif italic">Campus Hiring</span>
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-5xl font-light">
                        Campus Hiring memberikan kesempatan bagi mahasiswa dan alumni Universitas YARSI untuk mengenal lebih dekat dunia kerja, serta membuka peluang untuk mahasiswa bisa bergabung di dalamnya. Universitas YARSI berkomitmen mendukung pengembangan karier mahasiswa dan alumni melalui penyelenggaraan Career Day yang melibatkan berbagai mitra industri, termasuk program campus hiring seperti ini.
                    </p>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className={`py-16 md:py-24 bg-white min-h-screen`}>
                <div className="container mx-auto px-6 lg:px-8">

                    {/* --- USER TOOLBAR (SEARCH & FILTER) --- */}
                    {!isGuest && (
                        <div className="mb-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Search */}
                                <div className="md:col-span-8">
                                    <form onSubmit={handleSearch} className="flex gap-2">
                                        <div className="relative flex-1 group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                placeholder="Cari posisi, perusahaan, atau lokasi..."
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                                            />
                                        </div>
                                        <button type="submit" className={`px-6 py-3 ${accentGreen} hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2`}>
                                            <Search className="w-4 h-4" /> <span className="hidden sm:inline">Cari</span>
                                        </button>
                                    </form>
                                </div>

                                {/* Filter Per Page */}
                                <div className="md:col-span-4">
                                    <div className="relative w-full h-full">
                                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <select
                                            value={perPage}
                                            onChange={(e) => handlePerPageChange(e.target.value)}
                                            className="w-full h-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer font-medium text-gray-700 transition-all"
                                        >
                                            <option value="4">Tampilkan 4</option>
                                            <option value="8">Tampilkan 8</option>
                                            <option value="12">Tampilkan 12</option>
                                            <option value="24">Tampilkan 24</option>
                                            <option value="all">Tampilkan Semua</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Badge */}
                            {searchTerm && (
                                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">Hasil untuk:</span>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">"{searchTerm}"</span>
                                    <button onClick={handleReset} className="text-sm text-gray-400 hover:text-emerald-600 underline underline-offset-4 decoration-dashed transition-colors ml-auto">Reset Filter</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- CONTENT LIST --- */}
                    {programList && programList.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8">
                            {programList.map((program) => (
                                <ProgramCard
                                    key={program.id}
                                    program={program}
                                    isGuest={isGuest}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-sm mb-6">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada program ditemukan</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Coba ubah kata kunci pencarian Anda atau periksa kembali filter yang digunakan.
                            </p>
                            {!isGuest && (
                                <button onClick={handleReset} className="mt-6 px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                    Tampilkan Semua
                                </button>
                            )}
                        </div>
                    )}

                    {/* --- PAGINATION & GUEST CTA --- */}
                    <div className="mt-16">
                        {/* Pagination (Hanya User Login) */}
                        {!isGuest && pagination && pagination.last_page > 1 && (
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                                    {pagination.links.map((link, i) => {
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
                                <p className="text-sm text-gray-400 font-medium">
                                    Menampilkan <span className="text-gray-700 font-bold">{pagination.from}-{pagination.to}</span> dari <span className="text-gray-700 font-bold">{pagination.total}</span> program
                                </p>
                            </div>
                        )}

                        {/* Guest CTA (Jika Guest) */}
                        {isGuest && (
                            <div className="flex justify-center">
                                <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Ingin melihat lebih banyak lowongan?
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Saat ini tersedia total <strong>{total} program</strong>. Silakan masuk menggunakan akun Anda untuk mengakses seluruh lowongan, melakukan pencarian, dan melamar pekerjaan.
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
            </div>
            <Footer />
        </MainLayout>
    );
}