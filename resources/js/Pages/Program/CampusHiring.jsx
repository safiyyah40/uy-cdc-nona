import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, LogIn } from 'lucide-react';

export default function CampusHiring({ auth, programs = [], pagination = null, filters = {}, isGuest = false, total = 0 }) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || 8);

    const primaryDark = "text-emerald-800";
    const accentGreen = "bg-emerald-600";
    const lightestGreen = "bg-emerald-50";
    const programList = Array.isArray(programs) ? programs : [];

    // Search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('program.campus.hiring'), {
            search: searchTerm,
            per_page: perPage,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Filter Change
    const handlePerPageChange = (value) => {
        setPerPage(value);
        router.get(route('program.campus.hiring'), {
            search: searchTerm,
            per_page: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Pagination
    const handlePageChange = (page) => {
        router.get(route('program.campus.hiring'), {
            search: searchTerm,
            per_page: perPage,
            page: page,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Campus Hiring" />

            <MainLayout user={auth.user}>
                {/* HERO SECTION */}
                <div className={`relative w-full py-24 md:py-36 bg-gradient-to-br from-white to-emerald-50 overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path fill="#d1fae5" fillOpacity="1" d="M0,192L80,192C160,192,320,192,480,186.7C640,181,800,171,960,165.3C1120,160,1280,160,1360,160L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                            <path fill="#a7f3d0" fillOpacity="1" d="M0,256L80,245.3C160,235,320,213,480,208C640,203,800,213,960,224C1120,235,1280,245,1360,250.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 z-10 relative">
                        <span className="inline-block text-lg font-semibold mb-4 text-emerald-700 border-b-2 border-emerald-300 pb-1">
                            Pusat Karir Puskaka UY
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight drop-shadow-sm">
                            Temukan <span className="text-emerald-600">Karir Impian</span> <br /> di <span className="font-serif italic">Campus Hiring</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed max-w-4xl text-gray-700 font-light">
                            Jelajahi kesempatan karir eksklusif. Program Campus Hiring ini membuka pintu bagi mahasiswa dan alumni YARSI
                            untuk langsung berinteraksi dan bergabung dengan mitra perusahaan terkemuka.
                        </p>
                    </div>
                </div>

                {/* PROGRAM LIST SECTION */}
                <div className={`py-16 md:py-24 ${lightestGreen}`}>
                    <div className="container mx-auto px-6 lg:px-8">
                        
                        {/* Header & Description */}
                        <div className="max-w-4xl mb-12">
                            <h2 className={`${primaryDark} text-3xl md:text-4xl font-bold mb-4`}>
                                Program Terbaru
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Universitas YARSI berkomitmen mendukung pengembangan karier mahasiswa dan alumni
                                melalui penyelenggaraan Career Day dan kemitraan strategis dengan dunia industri.
                            </p>
                        </div>

                        {/* Guest Warning - Hanya tampil untuk tamu */}
                        {isGuest && (
                            <div className="mb-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                                <div className="flex items-start">
                                    <LogIn className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                                            Login untuk Akses Lengkap
                                        </h3>
                                        <p className="text-yellow-700 mb-3">
                                            Anda hanya dapat melihat 4 program terbaru. Total ada <strong>{total} program</strong> tersedia.
                                        </p>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            <LogIn className="w-4 h-4 mr-2" />
                                            Login Sekarang
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Search & Filter - Hanya tampil untuk user login */}
                        {!isGuest && (
                            <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    {/* Search Bar */}
                                    <div className="md:col-span-8">
                                        <form onSubmit={handleSearch} className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    placeholder="Cari program, perusahaan, atau lokasi..."
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className={`px-6 py-3 ${accentGreen} hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2`}
                                            >
                                                <Search className="w-4 h-4" />
                                                Cari
                                            </button>
                                        </form>
                                    </div>

                                    {/* Filter Per Page */}
                                    <div className="md:col-span-4">
                                        <div className="flex items-center gap-2">
                                            <Filter className="text-gray-500 w-5 h-5" />
                                            <select
                                                value={perPage}
                                                onChange={(e) => handlePerPageChange(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

                                {/* Active Filters Display */}
                                {filters?.search && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Hasil pencarian untuk:</span>
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                                            "{filters.search}"
                                        </span>
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                router.get(route('program.campus.hiring'), { per_page: perPage });
                                            }}
                                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Programs Grid */}
                        <div className="space-y-12">
                            {programList.length === 0 ? (
                                <div className="text-center py-16 bg-white rounded-xl shadow-lg">
                                    <p className="text-xl text-gray-500">Tidak ada program yang ditemukan.</p>
                                    {isGuest && (
                                        <p className="mt-2 text-gray-400">Silakan login untuk melihat semua program.</p>
                                    )}
                                </div>
                            ) : (
                                programList.map((program) => (
                                    <ProgramCard
                                        key={program.id}
                                        program={program}
                                        primaryDark={primaryDark}
                                        accentGreen={accentGreen}
                                        isGuest={isGuest}
                                    />
                                ))
                            )}
                        </div>

                        {/* Pagination - Hanya tampil untuk user login */}
                        {!isGuest && pagination && pagination.last_page > 1 && (
                            <div className="mt-12 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Previous
                                </button>

                                {[...Array(pagination.last_page)].map((_, index) => {
                                    const page = index + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-lg ${
                                                page === pagination.current_page
                                                    ? `${accentGreen} text-white`
                                                    : 'border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}

                        {/* Results Info */}
                        {!isGuest && pagination && (
                            <div className="mt-6 text-center text-gray-600">
                                Menampilkan {pagination.from} - {pagination.to} dari {pagination.total} program
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </MainLayout>
        </>
    );
}

// PROGRAM CARD COMPONENT
const ProgramCard = ({ program, primaryDark, accentGreen, isGuest }) => {
    const detailUrl = isGuest 
        ? route('login') 
        : route('program.campus.hiring.show', { id: program.id, slug: program.slug });

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl rounded-2xl group"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 md:flex">
                {/* Image Section */}
                <div className="md:w-5/12 aspect-w-16 aspect-h-9 md:aspect-none">
                    <img
                        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                        src={program.imageSrc}
                        alt={program.title}
                    />
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-7/12 flex flex-col justify-center">
                    {/* Badge/Title */}
                    <p className="mt-1 text-3xl font-extrabold text-gray-900 leading-snug">
                        {program.title}
                    </p>


                    {/* Subtitle */}
                    <p className="mt-1 text-3xl font-extrabold text-gray-900 leading-snug">
                        {program.subtitle}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-gray-500 text-base leading-relaxed line-clamp-3">
                        {program.description}
                    </p>

                    {/* Additional Info - Only for logged in users */}
                    {!isGuest && program.date && (
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                            <span>📅 {new Date(program.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span>📍 {program.location}</span>
                        </div>
                    )}

                    {/* CTA Button */}
                    <div className="mt-6">
                        <span className={`inline-flex items-center px-6 py-2 ${accentGreen} border border-transparent rounded-full font-semibold text-sm text-white uppercase tracking-wider shadow-md hover:bg-green-700 active:bg-green-900 focus:outline-none transition ease-in-out duration-150`}>
                            {isGuest ? 'Login untuk Lihat Detail' : 'Lihat Detail Program'}
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};