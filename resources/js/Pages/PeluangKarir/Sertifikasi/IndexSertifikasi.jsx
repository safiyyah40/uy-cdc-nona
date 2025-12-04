import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Search, Filter, ArrowRight, TrendingUp, Award, Clock, MapPin, Building2, BookOpen } from 'lucide-react';

export default function IndexSertifikasi({ auth, sertifikasis, pagination, filters, isGuest, total, categoriesList, providersList }) {
    // NOTE: Logika di sini adalah duplikasi dari IndexMagang.jsx,
    // tetapi dengan penyesuaian untuk Sertifikasi (misalnya: magang.index diganti sertifikasi.index)

    // STATE MANAGEMENT (Disiapkan untuk Filter/Search)
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [perPage, setPerPage] = useState(filters?.per_page || '12');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [selectedProvider, setSelectedProvider] = useState(filters?.provider || 'all');

    // HANDLERS (Hanya duplikasi untuk kebutuhan reset, bisa dihapus jika tidak diperlukan)
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
            <Head title="Sertifikasi & Kursus - YARSI CDC" />

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

                                {/* Stats Tambahan */}
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

                            {/* Kanan: Ilustrasi Card (diadaptasi untuk Sertifikasi) */}
                            <div className="hidden lg:block relative">
                                <div className="relative z-10 transform translate-x-8">
                                    {/* Main Illustration Card */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-emerald-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="space-y-4">
                                            {/* Mock Certification Card 1 */}
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

                                            {/* Mock Certification Card 2 */}
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

                                            {/* Mock Certification Card 3 */}
                                            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm opacity-80">
                                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 text-sm">Advanced Health Informatics</h4>
                                                    <p className="text-xs text-gray-500">Fakultas Kedokteran YARSI</p>
                                                </div>
                                                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Hybrid</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Decor */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* SERTIFIKASI LIST SECTION */}
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
                                        <div className="md:col-span-3 relative">
                                            <div className="relative">
                                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                                                <select
                                                    value={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    disabled={isGuest}
                                                    className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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

                                        {/* Provider Filter (Menggantikan Location Filter) */}
                                        <div className="md:col-span-2 relative">
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                                                <select
                                                    value={selectedProvider}
                                                    onChange={handleProviderChange}
                                                    disabled={isGuest}
                                                    className="w-full pl-11 pr-10 py-3.5 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                >
                                                    <option value="all">Semua Penyedia</option>

                                                    {/* RENDER PENYEDIA SECARA DINAMIS */}
                                                    {providersList && providersList.map((provider, index) => (
                                                        <option key={index} value={provider}>
                                                            {provider}
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
                                        <div className="md:col-span-1">
                                            <div className="relative">
                                                <select
                                                    value={perPage}
                                                    onChange={handlePerPageChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 appearance-none cursor-pointer font-medium text-gray-700 transition-all outline-none"
                                                >
                                                    <option value="6">6</option>
                                                    <option value="12">12</option>
                                                    <option value="24">24</option>
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
                                        className="mt-4 w-full md:hidden px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Cari Program
                                    </button>

                                    {/* Active Filter Badge */}
                                    {(filters?.search || (filters?.category && filters.category !== 'all') || (filters?.provider && filters.provider !== 'all')) && (
                                        <div className="mt-4 flex items-center flex-wrap gap-3 pt-4 border-t border-gray-100">
                                            <span className="text-sm text-gray-500">Filter aktif:</span>
                                            {filters?.search && (
                                                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-bold border border-purple-200 flex items-center gap-2">
                                                    "{filters.search}"
                                                </span>
                                            )}
                                            {filters?.category && filters.category !== 'all' && (
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">
                                                    {filters.category}
                                                </span>
                                            )}
                                            {filters?.provider && filters.provider !== 'all' && (
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold border border-emerald-200">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {sertifikasiList.map((item) => {
                                    // Mengganti route ke sertifikasi.show
                                    const detailUrl = isGuest ? route('login') : route('sertifikasi.show', { id: item.id });

                                    // Hilangkan logika deadline, ganti dengan durasi
                                    // const isUrgent = false; // Hanya sebagai placeholder

                                    return (
                                        <Link
                                            key={item.id}
                                            href={detailUrl}
                                            className="group flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 h-full"
                                        >
                                            {/* Header Card dengan Gradient & Logo */}
                                            <div className="relative h-32 bg-gradient-to-br from-emerald-500 via-emerald-600 to-purple-600 overflow-hidden">
                                                {/* Decorative circles */}
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
                                                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
                                                </div>

                                                {/* Company Logo / Provider Logo */}
                                                <div className="absolute -bottom-8 left-6">
                                                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white group-hover:scale-110 transition-transform overflow-hidden">
                                                        {item.logo ? (
                                                            <img
                                                                src={`/storage/${item.logo}`}
                                                                alt={item.provider_name}
                                                                className="w-full h-full object-contain p-2"
                                                            />
                                                        ) : (
                                                            <Award className="w-10 h-10 text-emerald-600" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Badge Durasi/Status */}
                                                {/* Menggunakan 'status' atau 'duration' sebagai ganti 'isUrgent' */}
                                                {item.status && (
                                                    <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 ${item.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                                        <Clock className="w-3 h-3" />
                                                        {item.status}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 pt-12 flex flex-col flex-grow">
                                                {/* Title & Provider */}
                                                <div className="mb-4">
                                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-emerald-600 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                                                        <Building2 className="w-4 h-4" />
                                                        {item.provider_name}
                                                    </p>
                                                </div>

                                                {/* Price/Fee (Menggantikan Salary) - Anda mungkin perlu data 'fee' dari backend */}
                                                {item.fee && (
                                                    <div className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-emerald-600 p-3 rounded-lg">
                                                        <div className="flex items-center gap-2 text-emerald-600">
                                                            <BookOpen className="w-5 h-5" />
                                                            <div className="flex-1">
                                                                <p className="text-xs font-medium text-gray-600 mb-0.5">Biaya Program</p>
                                                                <p className="font-bold text-sm">
                                                                    {item.fee} {/* Render fee, contoh: Rp 5.000.000 */}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Meta Info */}
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        <span className="font-medium">{item.location}</span> {/* Bisa diubah menjadi Mode: Online/Offline/Hybrid */}
                                                        <span className="ml-auto px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                                                            {item.type} {/* Misalnya: Sertifikasi/Kursus */}
                                                        </span>
                                                    </div>

                                                    <div className={`flex items-center gap-2 text-sm text-gray-600`}>
                                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                                        <span className="font-medium text-xs">
                                                            Durasi: {item.duration || 'N/A'} {/* Misalnya: 3 Bulan / Self-Paced */}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Categories */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {item.categories && item.categories.slice(0, 2).map((cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-emerald-600/5 text-emerald-600 text-xs font-bold rounded-full border border-emerald-600/20"
                                                        >
                                                            {cat}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Footer */}
                                                <div className="mt-auto pt-4 border-t border-gray-100">
                                                    <div className="flex items-center justify-between text-sm font-bold text-emerald-600 group-hover:text-purple-600 transition-colors">
                                                        <span>{isGuest ? 'Masuk untuk Daftar' : 'Lihat Detail Program'}</span>
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
                                    <Award className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tidak ada program sertifikasi ditemukan</h3>
                                <p className="text-gray-500 mt-2">Coba kata kunci lain atau ubah filter pencarian Anda.</p>
                                {!isGuest && (
                                    <button
                                        onClick={handleReset}
                                        className="mt-6 px-6 py-2 bg-white border border-emerald-200 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
                                    >
                                        Reset Filter
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination (Jika Anda menggunakan pagination dari Laravel/Inertia) */}
                        {pagination?.links && (
                            <div className="flex justify-center mt-12">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {pagination.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(link.url)}
                                            disabled={!link.url}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600 font-bold'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${index === 0 ? 'rounded-l-md' : ''} ${index === pagination.links.length - 1 ? 'rounded-r-md' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>

                <Footer />
            </MainLayout>
        </>
    );
}
