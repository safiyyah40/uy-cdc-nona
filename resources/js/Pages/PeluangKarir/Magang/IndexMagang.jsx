import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Calendar, MapPin, Briefcase, Search, Filter, Clock, ArrowRight, Building2, Wallet, TrendingUp, Award, ChevronLeft, ChevronRight  } from 'lucide-react';

export default function IndexMagang({ auth, magangs, pagination, filters, isGuest, total, categoriesList, locationsList }) {
    // STATE MANAGEMENT
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [selectedLocation, setSelectedLocation] = useState(filters?.location || 'all');

    // HANDLERS
    const handleSearch = () => {
        router.get(route('magang.index'), {
            search: searchTerm,
            category: selectedCategory,
            location: selectedLocation,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPageChange = (e) => {
        const val = e.target.value;
        setPerPage(val);
        router.get(route('magang.index'), {
            search: searchTerm,
            category: selectedCategory,
            location: selectedLocation,
            per_page: val
        }, { preserveState: true, preserveScroll: true });
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        setSelectedCategory(val);
        router.get(route('magang.index'), {
            search: searchTerm,
            category: val,
            location: selectedLocation,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handleLocationChange = (e) => {
        const val = e.target.value;
        setSelectedLocation(val);
        router.get(route('magang.index'), {
            search: searchTerm,
            category: selectedCategory,
            location: val,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: false });
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setPerPage('12');
        setSelectedCategory('all');
        setSelectedLocation('all');
        router.get(route('magang.index'));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const magangList = Array.isArray(magangs) ? magangs : (magangs?.data || []);
    return (
        <>
            <Head title="Lowongan Magang - YARSI CDC" />

            <MainLayout user={auth?.user}>

                {/* HERO SECTION */}
                <div className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300">
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                        {/* Layout Grid */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Kiri: Teks */}
                            <div>
                                <span className="inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Peluang Karir & Pengembangan Profesional
                                </span>

                                <h1 className="text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm">
                                    Lowongan <span className="text-emerald-600">Magang</span>
                                </h1>

                                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-xl font-light">
                                    Temukan berbagai kesempatan magang dari industri terkemuka untuk mengembangkan skill dan pengalaman profesionalmu secara nyata.
                                </p>

                                {/* Stats Tambahan */}
                                <div className="flex flex-wrap gap-6 pt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{total || 0}+</p>
                                            <p className="text-sm text-gray-500 font-medium">Lowongan Aktif</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Ilustrasi Card */}
                            <div className="hidden lg:block relative">
                                <div className="relative z-10 transform translate-x-8">
                                    {/* Main Illustration Card */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-emerald-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="space-y-4">
                                            {/* Mock Job Card 1 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <Building2 className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">UI/UX Designer Intern</h4>
                                                    <p className="text-xs text-gray-500">GoTo Financial</p>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Remote</span>
                                            </div>

                                            {/* Mock Job Card 2 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm opacity-90">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Marketing Intern</h4>
                                                    <p className="text-xs text-gray-500">Shopee Indonesia</p>
                                                </div>
                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Jakarta</span>
                                            </div>

                                            {/* Mock Job Card 3 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm opacity-80">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <Award className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Data Analyst</h4>
                                                    <p className="text-xs text-gray-500">Traveloka</p>
                                                </div>
                                                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Hybrid</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Decor */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* MAGANG LIST SECTION */}
                <div className="py-16 md:py-24 bg-white min-h-screen">
                    <div className="container mx-auto px-6 lg:px-8">

                        {/* SEARCH & FILTER (HANYA UNTUK USER LOGGED IN) */}
                        {!isGuest && (
                            <div className="mb-12 space-y-6">
                                <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                        {/* Search Input */}
                                        <div className="md:col-span-6">
                                            <div className="relative group">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yarsi-accent transition-colors" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Cari posisi atau perusahaan..."
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yarsi-accent/20 focus:border-yarsi-accent transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="md:col-span-3 relative">
                                            <div className="relative">
                                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                                                <select
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    disabled={isGuest}
                                                    className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-2xl focus:border-yarsi-green focus:ring-2 focus:ring-yarsi-accent/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                >
                                                    <option value="all">Semua Kategori</option>

                                                    {/* RENDER KATEGORI SECARA DINAMIS DARI DATABASE */}
                                                    {categoriesList && categoriesList.map((cat, index) => (
                                                        <option key={index} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Filter */}
                                        <div className="md:col-span-2 relative">
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                                                <select
                                                    value={selectedLocation}
                                                    onChange={handleLocationChange}
                                                    disabled={isGuest}
                                                    className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-2xl focus:border-yarsi-green focus:ring-2 focus:ring-yarsi-accent/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                >
                                                    <option value="all">Semua Lokasi</option>

                                                    {/* RENDER LOKASI SECARA DINAMIS */}
                                                    {locationsList && locationsList.map((loc, index) => (
                                                        <option key={index} value={loc}>
                                                            {loc}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Per Page Filter */}
                                        <div className="md:col-span-2">
                                            <div className="relative">
                                                <select
                                                    value={perPage}
                                                    onChange={handlePerPageChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-yarsi-accent/20 focus:border-yarsi-accent appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none"
                                                >
                                                    <option value="6">Tampilkan 6</option>
                                                    <option value="12">Tampilkan 12</option>
                                                    <option value="24">Tampilkan 24</option>
                                                    <option value="1000">Tampilkan Semua</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSearch}
                                        className="mt-4 w-full md:hidden px-6 py-3 bg-yarsi-green hover:bg-yarsi-green-light text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Cari Lowongan
                                    </button>

                                    {/* Active Filter Badge */}
                                    {(filters?.search || (filters?.category && filters.category !== 'all') || (filters?.location && filters.location !== 'all')) && (
                                        <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">Filter aktif:</span>
                                            {filters?.search && (
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200 flex items-center gap-2">
                                                    "{filters.search}"
                                                </span>
                                            )}
                                            {filters?.category && filters.category !== 'all' && (
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200">
                                                    {filters.category}
                                                </span>
                                            )}
                                            {filters?.location && filters.location !== 'all' && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold border border-orange-200">
                                                    {filters.location}
                                                </span>
                                            )}
                                            <button
                                                onClick={handleReset}
                                                className="text-sm text-gray-400 hover:text-yarsi-accent underline underline-offset-4 decoration-dashed transition-colors ml-auto"
                                            >
                                                Reset Filter
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* GRID MAGANG */}
                        {magangList && magangList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {magangList.map((item) => {
                                    const detailUrl = route('magang.show', { slug: item.slug });

                                    const deadline = new Date(item.deadline);
                                    const today = new Date();
                                    const diffTime = deadline - today;
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                    const isUrgent = diffDays <= 7 && diffDays > 0;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={detailUrl}
                                            className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                                        >
                                            {/* Header Card dengan Gradient & Logo */}
                                            <div className="relative h-32 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-yarsi-accent overflow-hidden">
                                                {/* Decorative circles */}
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
                                                </div>

                                                {/* Company Logo */}
                                                <div className="absolute -bottom-8 left-6">
                                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-transform overflow-hidden">
                                                        {item.logo ? (
                                                            <img
                                                                src={`/storage/${item.logo}`}
                                                                alt={item.company}
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        ) : (
                                                            <Building2 className="w-10 h-10 text-yarsi-green" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Deadline Badge */}
                                                {isUrgent && (
                                                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-pulse flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {diffDays} Hari Lagi
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 pt-12 flex flex-col flex-grow">
                                                {/* Title & Company */}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-yarsi-green transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-yarsi-green font-bold text-sm flex items-center gap-1">
                                                        <Building2 className="w-4 h-4" />
                                                        {item.company}
                                                    </p>
                                                </div>

                                                {/* Salary Range */}
                                                {item.salary_min && item.salary_max && (
                                                    <div className="mb-4 bg-gradient-to-r from-emerald-50 to-green-50 border-l-4 border-yarsi-accent p-3 rounded-lg">
                                                        <div className="flex items-center gap-2 text-yarsi-green">
                                                            <Wallet className="w-5 h-5" />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-medium text-gray-600 mb-0.5">Estimasi Gaji</p>
                                                                <p className="font-bold text-sm">
                                                                    {formatCurrency(item.salary_min)} - {formatCurrency(item.salary_max)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Meta Info */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="font-medium">{item.location}</span>
                                                        <span className="ml-auto px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                                                            {item.type}
                                                        </span>
                                                    </div>

                                                    <div className={`flex items-center gap-2 text-sm ${isUrgent ? 'text-amber-700' : 'text-gray-600'}`}>
                                                        <Calendar className="w-4 h-4 flex-shrink-0" />
                                                        <span className="font-medium text-xs">
                                                            Deadline: {new Date(item.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Categories */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.categories.slice(0, 2).map((cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-yarsi-green/5 text-yarsi-green text-xs font-bold rounded-full border border-yarsi-green/20"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Footer */}
                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex items-center justify-between text-sm font-bold text-yarsi-accent group-hover:text-yarsi-green transition-colors">
                                                        <span>{isGuest ? 'Masuk untuk Detail' : 'Lihat Detail'}</span>
                                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
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
                                    <Briefcase className="w-8 h-8 text-yarsi-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tidak ada lowongan magang ditemukan</h3>
                                <p className="text-gray-500 mt-2">Coba kata kunci lain atau ubah filter pencarian Anda.</p>
                                {!isGuest && (
                                    <button
                                        onClick={handleReset}
                                        className="mt-6 px-6 py-2 bg-white border border-emerald-200 text-yarsi-green font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                                    >
                                        Tampilkan Semua
                                    </button>
                                )}
                            </div>
                        )}

                        {/* PAGINATION (HANYA UNTUK USER LOGGED IN) */}
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
                                ${link.active
                                                            ? 'bg-yarsi-green text-white shadow-md'
                                                            : 'text-gray-600 hover:bg-emerald-50 hover:text-yarsi-green'
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
                                        Menampilkan {pagination.from}-{pagination.to} dari {pagination.total} lowongan
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* Guest CTA (Jika Guest) */}
                        {isGuest && (
                            <div className="mt-24 flex justify-center">
                                <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        Ingin melihat lebih banyak program?
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
            </MainLayout>
        </>
    );
}