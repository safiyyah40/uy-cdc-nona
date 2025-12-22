import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import {Calendar, MapPin, Briefcase, Search, Filter, Clock, ArrowRight, Building2, Wallet, TrendingUp, ChevronLeft, ChevronRight, ListFilter} from 'lucide-react';

export default function IndexLoker({ auth, lokers, pagination, filters, isGuest, total, categoriesList, locationsList }) {

    // STATE MANAGEMENT
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [selectedLocation, setSelectedLocation] = useState(filters?.location || 'all');

    // INJECT CSS ANIMATION
    useEffect(() => {
        const styleId = 'blob-animation-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 8s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    // HANDLERS
    const handleSearch = () => {
        router.get(route('loker.index'), {
            search: searchTerm, category: selectedCategory, location: selectedLocation, per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPageChange = (e) => {
        const value = e.target.value;
        setPerPage(value);
        router.get(route('loker.index'), {
            search: searchTerm, category: selectedCategory, location: selectedLocation, per_page: value
        }, { preserveState: true, preserveScroll: true });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        router.get(route('loker.index'), {
            search: searchTerm, category: e.target.value, location: selectedLocation, per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        router.get(route('loker.index'), {
            search: searchTerm, category: selectedCategory, location: e.target.value, per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (url) => {
        if (url) router.get(url, {}, { preserveState: true, preserveScroll: false });
    };

    const handleReset = () => {
        setSearchTerm('');
        setPerPage('12');
        setSelectedCategory('all');
        setSelectedLocation('all');
        router.get(route('loker.index'));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0,
        }).format(amount);
    };

    // Safety check data
    const lokerList = Array.isArray(lokers) ? lokers : (lokers?.data || []);

    return (
        <MainLayout user={auth?.user}>
            <Head title="Lowongan Kerja - CDC - UY" />
            
            {/* HERO SECTION */}
            <div className="pt-20 pb-12 md:pb-20 relative overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-teal-50 border-b border-emerald-200">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-16 lg:pt-20">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center text-xs sm:text-sm font-semibold mb-3 sm:mb-4 text-emerald-600 uppercase tracking-widest">
                                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                Peluang Karir & Pengembangan Profesional
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold font-serif italic text-gray-900 mb-4 sm:mb-6 tracking-tight leading-none drop-shadow-sm">
                                Lowongan <span className="text-emerald-600">Pekerjaan</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 font-sans max-w-2xl mx-auto lg:mx-0 font-light mb-6 sm:mb-8">
                                Temukan berbagai peluang kerja sesuai bidang dan keahlian Anda. Halaman ini menyajikan informasi lowongan pekerjaan dari beragam sumber terpercaya.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-emerald-100">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{total || 0}+</p>
                                        <p className="text-xs sm:text-sm text-gray-500 font-medium">Lowongan Aktif</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-8 lg:mt-0">
                            <div className="relative z-10">
                                <div className="absolute -top-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                                <div className="relative bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-gray-100">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                                            alt="Job Search Illustration"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FILTER & LIST SECTION */}
            <div id="job-list" className="py-16 md:py-24 bg-white min-h-screen">
                <div className="container mx-auto px-6 lg:px-8">

                    {/* FILTER BAR (User Only) */}
                    {!isGuest && (
                        <div className="mb-12 space-y-6">
                            <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                    
                                    {/* 1. Search Input (Lebar: 4) */}
                                    <div className="md:col-span-4">
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yarsi-accent transition-colors" />
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Cari posisi/perusahaan..."
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Category Filter (Lebar: 3) */}
                                    <div className="md:col-span-3 relative">
                                        <div className="relative">
                                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            <select
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                                className="w-full pl-11 pr-8 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none text-sm"
                                            >
                                                <option value="all">Semua Industri</option>
                                                {categoriesList && categoriesList.map((cat, idx) => (
                                                    <option key={idx} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Location Filter (Lebar: 3) */}
                                    <div className="md:col-span-3 relative">
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            <select
                                                value={selectedLocation}
                                                onChange={handleLocationChange}
                                                className="w-full pl-11 pr-8 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yarsi-green focus:ring-2 focus:ring-yarsi-accent/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none text-sm"
                                            >
                                                <option value="all">Semua Lokasi</option>
                                                {locationsList && locationsList.map((loc, idx) => (
                                                    <option key={idx} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Per Page Filter (Lebar: 2) */}
                                    <div className="md:col-span-2 relative">
                                        <div className="relative">
                                            <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                            <select
                                                value={perPage}
                                                onChange={handlePerPageChange}
                                                className="w-full pl-11 pr-8 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-yarsi-green focus:ring-2 focus:ring-yarsi-accent/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none text-sm"
                                            >
                                                <option value="6">6 Item</option>
                                                <option value="12">12 Item</option>
                                                <option value="24">24 Item</option>
                                                <option value="1000">Semua</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handleSearch} className="mt-4 w-full md:hidden px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                                    <Search className="w-4 h-4" /> Cari Lowongan
                                </button>

                                {/* Active Filter Badge */}
                                {(filters?.search || (filters?.category && filters.category !== 'all') || (filters?.location && filters.location !== 'all')) && (
                                    <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500">Filter aktif:</span>
                                        {filters?.search && <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">"{filters.search}"</span>}
                                        {filters?.category && filters.category !== 'all' && <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold border border-indigo-200">{filters.category}</span>}
                                        {filters?.location && filters.location !== 'all' && <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold border border-purple-200">{filters.location}</span>}
                                        <button onClick={handleReset} className="text-sm text-gray-400 hover:text-emerald-600 underline underline-offset-4 decoration-dashed transition-colors ml-auto">Reset Filter</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* CARD GRID */}
                    {lokerList && lokerList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {lokerList.map((item) => {
                                const detailUrl = isGuest ? route('login') : route('loker.show', { slug: item.slug });
                                const deadline = new Date(item.deadline);
                                const diffDays = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
                                const isUrgent = diffDays <= 7 && diffDays > 0;

                                return (
                                    <Link
                                        key={item.id}
                                        href={detailUrl}
                                        className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                                    >
                                        {/* Header Card */}
                                        <div className="relative h-32 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-yarsi-accent overflow-hidden">
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
                                            </div>
                                            <div className="absolute -bottom-8 left-6">
                                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-transform overflow-hidden">
                                                    {item.logo ? (
                                                        <img
                                                            src={item.logo.startsWith('http') ? item.logo : `/storage/${item.logo}`}
                                                            alt={item.company}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    ) : (
                                                        <Building2 className="w-10 h-10 text-yarsi-green" />
                                                    )}
                                                </div>
                                            </div>
                                            {isUrgent && (
                                                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg animate-pulse flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {diffDays} Hari Lagi
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6 pt-12 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-yarsi-green transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-yarsi-green font-bold text-sm flex items-center gap-1">
                                                    <Building2 className="w-4 h-4" />
                                                    {item.company}
                                                </p>
                                            </div>

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

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                    <span className="font-medium truncate">{item.location}</span>
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

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {(item.categories || []).slice(0, 2).map((cat, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-yarsi-green/5 text-yarsi-green text-xs font-bold rounded-full border border-yarsi-green/20">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>

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
                            <h3 className="text-xl font-bold text-gray-900">Tidak ada lowongan ditemukan</h3>
                            <p className="text-gray-500 mt-2">Coba kata kunci lain atau ubah filter pencarian Anda.</p>
                            {!isGuest && (
                                <button onClick={handleReset} className="mt-6 px-6 py-2 bg-white border border-emerald-200 text-yarsi-green font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm">
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    )}

                    {isGuest && (
                        <div className="mt-24 flex justify-center">
                            <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ingin melihat lebih banyak program?</h3>
                                <p className="text-gray-600 mb-6">
                                    Saat ini tersedia total <strong>{total} program</strong>. Silakan masuk menggunakan akun Anda untuk mengakses seluruh lowongan.
                                </p>
                                <Link href={route('login')} className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-colors shadow-lg">
                                    Masuk Sekarang
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* PAGINATION (User Logged In) */}
                    {!isGuest && pagination && pagination.last_page > 1 && (
                        <div className="mt-16 flex justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
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
                                                    flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg text-sm font-bold transition-all
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
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
}