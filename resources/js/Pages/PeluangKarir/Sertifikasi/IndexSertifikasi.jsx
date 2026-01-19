import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Search, Filter, ArrowRight, TrendingUp, Award, Clock, MapPin, Building2, BookOpen, Wallet, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function IndexSertifikasi({ auth, sertifikasis, pagination, filters, isGuest, total, categoriesList, providersList }) {
    // STATE MANAGEMENT
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [selectedProvider, setSelectedProvider] = useState(filters?.provider || 'all');

    // HANDLERS
    const handleSearch = () => {
        router.get(route('sertifikasi.index'), {
            search: searchTerm,
            category: selectedCategory,
            provider: selectedProvider,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePerPageChange = (e) => {
        const val = e.target.value;
        setPerPage(val);
        router.get(route('sertifikasi.index'), {
            search: searchTerm,
            category: selectedCategory,
            provider: selectedProvider,
            per_page: val
        }, { preserveState: true, preserveScroll: true });
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        setSelectedCategory(val);
        router.get(route('sertifikasi.index'), {
            search: searchTerm,
            category: val,
            provider: selectedProvider,
            per_page: perPage
        }, { preserveState: true, preserveScroll: true });
    };

    const handleProviderChange = (e) => {
        const val = e.target.value;
        setSelectedProvider(val);
        router.get(route('sertifikasi.index'), {
            search: searchTerm,
            category: selectedCategory,
            provider: val,
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
        setSelectedProvider('all');
        router.get(route('sertifikasi.index'));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    // Data List
    const sertifikasiList = Array.isArray(sertifikasis) ? sertifikasis : (sertifikasis?.data || []);

    return (
        <>
            <Head title="Program Sertifikasi - CDC UY" />

            <MainLayout user={auth?.user}>

                {/* HERO SECTION */}
                <div className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300">
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                        {/* Layout Grid */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Kiri: Teks */}
                            <div>
                                <span className="inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest">
                                    <Award className="w-4 h-4 mr-2" />
                                    Pengembangan Profesional & Keterampilan
                                </span>

                                <h1 className="text-6xl md:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-none drop-shadow-sm">
                                    Program <span className="text-emerald-600">Sertifikasi</span>
                                </h1>

                                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-xl font-light">
                                    Tingkatkan kompetensi dan kredibilitas profesional Anda dengan program sertifikasi dan kursus terakreditasi.
                                </p>

                                {/* Stats */}
                                <div className="flex flex-wrap gap-6 pt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{total || 0}+</p>
                                            <p className="text-sm text-gray-500 font-medium">Program Tersedia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Ilustrasi Card */}
                            <div className="hidden lg:block relative">
                                <div className="relative z-10 transform translate-x-8">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-emerald-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="space-y-4">
                                            {/* Mock Card 1 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <Award className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Certified Data Scientist</h4>
                                                    <p className="text-xs text-gray-500">Google Digital Garage</p>
                                                </div>
                                                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Online</span>
                                            </div>

                                            {/* Mock Card 2 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm opacity-90">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Project Management Pro</h4>
                                                    <p className="text-xs text-gray-500">Coursera</p>
                                                </div>
                                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Self-Paced</span>
                                            </div>

                                            {/* Mock Card 3 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm opacity-80">
                                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Health Informatics</h4>
                                                    <p className="text-xs text-gray-500">YARSI University</p>
                                                </div>
                                                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Hybrid</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Decor */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* SERTIFIKASI LIST SECTION */}
                <div className="py-16 md:py-24 bg-white min-h-screen">
                    <div className="container mx-auto px-6 lg:px-8">

                        {/* SEARCH & FILTER (UNTUK USER LOGIN) */}
                        {!isGuest && (
                            <div className="mb-12 space-y-6">
                                <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                                        {/* Search Input */}
                                        <div className="md:col-span-5">
                                            <div className="relative group">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Cari program, kategori, atau penyedia..."
                                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Category Filter */}
                                        <div className="md:col-span-3">
                                            <div className="relative">
                                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <select
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                                >
                                                    <option value="all">Semua Kategori</option>
                                                    {categoriesList && categoriesList.map((cat, index) => (
                                                        <option key={index} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Provider Filter */}
                                        <div className="md:col-span-2">
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <select
                                                    value={selectedProvider}
                                                    onChange={handleProviderChange}
                                                    className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                                >
                                                    <option value="all">Semua Provider</option>
                                                    {providersList && providersList.map((provider, index) => (
                                                        <option key={index} value={provider}>{provider}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Per Page */}
                                        <div className="md:col-span-2">
                                            <div className="relative">
                                                <select
                                                    value={perPage}
                                                    onChange={handlePerPageChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 appearance-none cursor-pointer font-medium text-gray-700 transition-all"
                                                >
                                                    <option value="6">Tampilkan 6</option>
                                                    <option value="12">Tampilkan 12</option>
                                                    <option value="24">Tampilkan 24</option>
                                                    <option value="1000">Semua</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSearch}
                                        className="mt-4 w-full md:hidden px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Cari Program
                                    </button>

                                    {/* Active Filters */}
                                    {(filters?.search || (filters?.category && filters.category !== 'all') || (filters?.provider && filters.provider !== 'all')) && (
                                        <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">Filter aktif:</span>
                                            {filters?.search && (
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold border border-purple-200">
                                                    "{filters.search}"
                                                </span>
                                            )}
                                            {filters?.category && filters.category !== 'all' && (
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">
                                                    {filters.category}
                                                </span>
                                            )}
                                            {filters?.provider && filters.provider !== 'all' && (
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200">
                                                    {filters.provider}
                                                </span>
                                            )}
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

                        {/* GRID SERTIFIKASI */}
                        {sertifikasiList && sertifikasiList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {sertifikasiList.map((item) => {
                                    const detailUrl = route('sertifikasi.show', item.slug || item.id);

                                    // Check deadline urgency
                                    const registrationDeadline = item.registration_deadline ? new Date(item.registration_deadline) : null;
                                    const today = new Date();
                                    const daysUntilDeadline = registrationDeadline
                                        ? Math.ceil((registrationDeadline - today) / (1000 * 60 * 60 * 24))
                                        : null;
                                    const isDeadlineSoon = daysUntilDeadline !== null && daysUntilDeadline <= 7 && daysUntilDeadline > 0;
                                    const isRegistrationOpen = item.is_registration_open;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={detailUrl}
                                            className="group flex flex-col bg-white rounded-3xl shadow-md hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] border border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full"
                                        >
                                            <div className="relative h-36 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 overflow-hidden">
                                                {/* Decorative Pattern */}
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="absolute inset-0" style={{
                                                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                                        backgroundSize: '20px 20px'
                                                    }}></div>
                                                </div>

                                                {/* Logo Container */}
                                                <div className="absolute -bottom-10 left-6 z-10">
                                                    <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[4px] border-white ring-1 ring-gray-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 overflow-hidden relative">
                                                        {item.logo ? (
                                                            <img
                                                                src={item.logo.startsWith('http') ? item.logo : `/storage/${item.logo}`}
                                                                alt={item.provider_name}
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        ) : (
                                                            <Award className="w-10 h-10 text-emerald-600" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Top Right Badges */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                                    {/* Mode Badge */}
                                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/30 ${item.mode === 'Online'
                                                        ? 'bg-purple-500/90 text-white'
                                                        : item.mode === 'Hybrid'
                                                            ? 'bg-orange-500/90 text-white'
                                                            : 'bg-blue-500/90 text-white'
                                                        }`}>
                                                        {item.mode}
                                                    </span>

                                                    {/* Level Badge */}
                                                    {item.level && (
                                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-emerald-700 shadow-md border border-emerald-200">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Deadline Warning Badge */}
                                                {isDeadlineSoon && (
                                                    <div className="absolute top-4 left-4 animate-pulse">
                                                        <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-red-500 text-white shadow-lg border-2 border-white">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {daysUntilDeadline} Hari Lagi!
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Body */}
                                            <div className="p-6 pt-14 flex flex-col flex-grow">
                                                {/* Title & Provider */}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-emerald-600 font-semibold text-sm flex items-center gap-1.5">
                                                        <Building2 className="w-4 h-4" />
                                                        {item.provider_name}
                                                    </p>
                                                </div>

                                                {/* Quick Info Grid */}
                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    {/* Duration */}
                                                    <div className="flex items-center gap-2 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                                            <Clock className="w-4 h-4 text-emerald-600" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Durasi</span>
                                                            <span className="text-xs font-bold text-gray-900 truncate">{item.duration || 'Flexible'}</span>
                                                        </div>
                                                    </div>

                                                    {/* Type */}
                                                    <div className="flex items-center gap-2 p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
                                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                                            <BookOpen className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] font-bold text-gray-400 uppercase leading-none">Jenis</span>
                                                            <span className="text-xs font-bold text-gray-900 truncate">{item.type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Fee Section - Emphasized */}
                                                <div className="mb-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200/50 shadow-sm">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                                <Wallet className="w-5 h-5 text-emerald-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Biaya Program</p>
                                                                <p className="text-lg font-bold text-emerald-700">
                                                                    {item.is_free ? 'GRATIS' : `Rp ${new Intl.NumberFormat('id-ID').format(item.fee)}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {item.is_free && (
                                                            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-md">
                                                                FREE
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Registration Info */}
                                                {registrationDeadline && (
                                                    <div className={`mb-4 p-3 rounded-xl border-l-4 ${isDeadlineSoon
                                                        ? 'bg-red-50 border-red-500'
                                                        : 'bg-blue-50 border-blue-500'
                                                        }`}>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className={`w-4 h-4 ${isDeadlineSoon ? 'text-red-600' : 'text-blue-600'}`} />
                                                            <div className="flex-1">
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase">Deadline Pendaftaran</p>
                                                                <p className={`text-sm font-bold ${isDeadlineSoon ? 'text-red-700' : 'text-blue-700'}`}>
                                                                    {registrationDeadline.toLocaleDateString('id-ID', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric'
                                                                    })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Registration Status */}
                                                <div className="mb-4">
                                                    <div className={`flex items-center gap-2 p-2.5 rounded-lg ${isRegistrationOpen
                                                        ? 'bg-green-50 border border-green-200'
                                                        : 'bg-gray-100 border border-gray-200'
                                                        }`}>
                                                        <div className={`w-2 h-2 rounded-full ${isRegistrationOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                                                            }`}></div>
                                                        <span className={`text-xs font-bold ${isRegistrationOpen ? 'text-green-700' : 'text-gray-500'
                                                            }`}>
                                                            {isRegistrationOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Categories Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.categories && item.categories.slice(0, 3).map((cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-white text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 shadow-sm"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                    {item.categories && item.categories.length > 3 && (
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full border border-gray-200">
                                                            +{item.categories.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Location */}
                                                {item.location && item.mode !== 'Online' && (
                                                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        <span className="font-medium truncate">{item.location}</span>
                                                    </div>
                                                )}

                                                {/* Footer CTA */}
                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                                                            {isGuest ? 'Masuk untuk Daftar' : 'Lihat Detail Program'}
                                                        </span>
                                                        <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center transition-all group-hover:scale-110">
                                                            <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            // EMPTY STATE
                            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                                    <Award className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 font-kaisei">Tidak ada program sertifikasi ditemukan</h3>
                                <p className="text-gray-500 mt-2">Coba kata kunci lain atau ubah filter pencarian Anda.</p>
                                {!isGuest && (
                                    <button
                                        onClick={handleReset}
                                        className="mt-6 px-6 py-2 bg-white border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                    >
                                        Reset Filter
                                    </button>
                                )}
                            </div>
                        )}

                        {/* PAGINATION (HANYA UNTUK USER LOGGED IN) */}
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
                                                            ? 'bg-emerald-600 text-white shadow-md'
                                                            : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
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
                                        Menampilkan {pagination.from}-{pagination.to} dari {pagination.total} program
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GUEST CTA */}
                        {isGuest && (
                            <div className="mt-16 flex justify-center">
                                <div className="text-center bg-emerald-50 p-8 rounded-2xl shadow-xl border border-emerald-100 max-w-2xl w-full">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                        Ingin melihat lebih banyak program?
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        Saat ini tersedia total <strong className="text-emerald-600">{total} program sertifikasi</strong> dari berbagai penyedia terpercaya. Silakan masuk untuk mengakses seluruh program, filter pencarian, dan mendaftar.
                                    </p>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        Masuk Sekarang
                                        <ArrowRight className="w-5 h-5 ml-2" />
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