import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    FileText, Check, Zap, UserCheck,
    LayoutDashboard, Briefcase, Lock, Upload,
    ExternalLink, Download, Palette,
    Sparkles, ArrowRight, Search, Filter, X,
    MousePointerClick, Eye, ChevronLeft, ChevronRight, GraduationCap, TrendingUp
} from "lucide-react";

// FEATURE CARD
const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="group bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            <div className="p-6 flex items-center justify-center bg-gray-50 border-b border-emerald-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00CA65]/5"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center ring-1 ring-emerald-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-[#004d40]" />
                    </div>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif group-hover:text-[#00CA65] transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

const TemplateCard = ({ template, onKlik }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleKlik = () => {
        if (onKlik) {
            onKlik(template.id, template.url_template);
        } else {
            window.open(template.url_template, '_blank');
        }
    };

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#00CA65] transform hover:-translate-y-1">

            {/* Badge Unggulan */}
            {template.is_unggulan && (
                <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    Unggulan
                </div>
            )}

            {/* Image Preview */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d40]"></div>
                    </div>
                )}

                <img
                    src={template.preview_url}
                    alt={template.judul}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
                />

                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-[#004d40]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-3 backdrop-blur-sm">
                    <button
                        onClick={handleKlik}
                        className="px-6 py-3 bg-white text-[#004d40] font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-emerald-50 w-full justify-center shadow-lg"
                    >
                        {template.sumber === 'canva' ? <Palette className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                        Gunakan Template
                    </button>

                    {/* Stats Mini */}
                    <div className="flex items-center gap-4 text-white/90 text-xs translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                            <Eye className="w-3 h-3" /> {template.jumlah_view || 0}
                        </span>
                        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                            <MousePointerClick className="w-3 h-3" /> {template.jumlah_klik || 0}
                        </span>
                    </div>
                </div>

                {/* Badge Kategori */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-[#004d40] shadow-sm border border-emerald-100/50">
                    {template.kategori}
                </div>
            </div>

            {/* Info Template */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 line-clamp-1 text-sm group-hover:text-[#00CA65] transition-colors" title={template.judul}>
                        {template.judul}
                    </h4>
                    {/* Badge Sumber Mini */}
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${template.sumber === 'canva' ? 'bg-blue-100 text-blue-700' :
                        template.sumber === 'google_slides' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {template.sumber === 'canva' ? 'Canva' : template.sumber === 'google_slides' ? 'Slides' : 'File'}
                    </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {template.deskripsi || 'Template profesional siap pakai & mudah diedit.'}
                </p>

                {/* Tags */}
                {template.tags && template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {template.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// HERO SECTION
const HeroSection = ({ user, isCounselor, scrollToContent }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const title = isCounselor ? `HALO, ${user?.name?.toUpperCase() || 'KONSELOR'}!` : "REVIEW CV";
    const subtext = isCounselor
        ? "Anda masuk sebagai Konselor. Kelola antrean CV, berikan review mendalam, dan pantau statistik pekerjaan Anda melalui Dashboard ini."
        : "Tingkatkan peluang karirmu dengan CV yang profesional. Gunakan template gratis pilihan kami atau minta review langsung dari konselor ahli.";

    const badgeText = isCounselor ? "Manajemen Konselor" : "Persiapan Karir Mahasiswa";

    const handleMainClick = (e) => {
        if (isCounselor || user) {
            router.get(route('layanan.tabel.cv.review'));
        } else {
            e.preventDefault();
            scrollToContent();
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

            <div className="relative w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24 gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-[#004d40] text-xs font-bold uppercase tracking-wider mb-6" ref={heroTitle.ref} style={heroTitle.style}>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CA65] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00CA65]"></span>
                                </span>
                                {badgeText}
                            </div>

                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-serif ${isCounselor ? 'text-[#004d40]' : 'text-gray-900'}`}>
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {subtext}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                {user && !isCounselor && (
                                    <button
                                        onClick={() => router.visit(route('layanan.cv.review.upload'))}
                                        className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Upload CV Saya
                                    </button>
                                )}

                                {user && (
                                    <button
                                        onClick={handleMainClick}
                                        className={`px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2
                                            ${isCounselor
                                                ? "bg-[#004d40] text-white hover:bg-[#00382e] shadow-lg"
                                                : "bg-white text-[#004d40] border-2 border-[#004d40] hover:bg-emerald-50"
                                            }`}
                                    >
                                        {isCounselor ? <LayoutDashboard className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                                        {isCounselor ? "Dashboard Konselor" : "Riwayat Review"}
                                    </button>
                                )}

                                {!user && (
                                    <Link
                                        href="/login?redirect_to=/layanan/tabel-cv-review"
                                        className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Masuk & Unggah CV
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                                    alt="Review CV Process"
                                    className="w-full object-cover h-[400px] lg:h-[500px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-lg opacity-90">"Profesional, Rapi, & Lolos ATS."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// MAIN PAGE COMPONENT
function CvReview(props) {
    const { auth, flash, templates, pagination, filters } = usePage().props;
    const user = auth.user;
    const isCounselor = user?.role === 'konselor';

    // TEMPLATE LOGIC START
    const safeTemplates = templates || [];
    const safePagination = pagination || { links: [], from: 0, to: 0, total: 0 };
    const safeFilters = filters || { kategori: 'semua', sumber: 'semua', search: '' };

    const [searchTerm, setSearchTerm] = useState(safeFilters.search || '');
    const [filterKategori, setFilterKategori] = useState(safeFilters.kategori || 'semua');
    const [filterSumber, setFilterSumber] = useState(safeFilters.sumber || 'semua');
    const [showKategoriDropdown, setShowKategoriDropdown] = useState(false);
    const [showSumberDropdown, setShowSumberDropdown] = useState(false);

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm !== safeFilters.search) {
                fetchData({ search: searchTerm });
            }
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchData = (params = {}) => {
        const currentParams = {
            search: searchTerm,
            kategori: filterKategori,
            sumber: filterSumber,
            ...params
        };
        router.get(route('layanan.cv.review'), currentParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
            only: ['templates', 'pagination', 'filters']
        });
    };

    const handleKategoriChange = (value) => {
        setFilterKategori(value);
        setShowKategoriDropdown(false);
        fetchData({ kategori: value });
    };

    const handleSumberChange = (value) => {
        setFilterSumber(value);
        setShowSumberDropdown(false);
        fetchData({ sumber: value });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {
                search: searchTerm,
                kategori: filterKategori,
                sumber: filterSumber
            }, { preserveState: true, preserveScroll: true, only: ['templates', 'pagination', 'filters'] });
        }
    };

    const handleTemplateKlik = (templateId, urlTemplate) => {
        // Cek apakah ini URL eksternal (Canva/Google Slides)
        const isExternal = urlTemplate && (urlTemplate.startsWith('http') || urlTemplate.startsWith('https'));

        if (user) {
            if (isExternal) {
                window.open(urlTemplate, '_blank');
            } else {
                window.location.href = urlTemplate;
            }
        } else {
            if (isExternal) {
                window.open(urlTemplate, '_blank');
            } else {
                router.visit(route('login'));
            }
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setFilterKategori('semua');
        setFilterSumber('semua');
        router.get(route('layanan.cv.review'));
    };

    const scrollToContent = () => {
        document.getElementById('template-gallery')?.scrollIntoView({ behavior: 'smooth' });
    };

    const kategoriOptions = [
        { value: 'semua', label: 'Semua Kategori', icon: FileText },
        { value: 'ATS Friendly', label: 'ATS Friendly', icon: TrendingUp },
        { value: 'Kreatif', label: 'Kreatif', icon: Palette },
        { value: 'Profesional', label: 'Profesional', icon: Briefcase },
        { value: 'Akademik', label: 'Akademik', icon: GraduationCap },
        { value: 'Modern', label: 'Modern', icon: Sparkles },
    ];

    const sumberOptions = [
        { value: 'semua', label: 'Semua Sumber' },
        { value: 'canva', label: '🎨 Canva' },
        { value: 'google_slides', label: '📊 Google Slides' },
        { value: 'manual', label: '📄 File Download' },
    ];

    const activeFiltersCount = [filterKategori !== 'semua', filterSumber !== 'semua', searchTerm !== ''].filter(Boolean).length;

    // Feature Data
    const features = isCounselor ? [
        { icon: FileText, title: "Kelola Daftar Tunggu", description: "Lihat semua pengajuan CV dari pengguna yang menunggu untuk ditinjau." },
        { icon: Check, title: "Berikan Umpan Balik", description: "Lakukan review mendalam dan kirimkan feedback konstruktif." },
        { icon: LayoutDashboard, title: "Lacak Kinerja", description: "Pantau jumlah CV yang telah direview dan rating kepuasan." },
    ] : [
        { icon: FileText, title: "Format & Struktur", description: "Layout profesional yang terstruktur secara logis dan ATS-friendly." },
        { icon: Zap, title: "Optimasi Kata Kunci", description: "Penyesuaian konten agar relevan dengan industri target." },
        { icon: UserCheck, title: "Review Ahli", description: "Feedback langsung dari konselor karir berpengalaman." },
    ];

    return (
        <MainLayout user={user}>
            <Head title={isCounselor ? "Dashboard Review CV" : "Layanan Review CV"} />

            <div className="min-h-screen bg-gray-50 font-sans">
                <HeroSection
                    user={user}
                    isCounselor={isCounselor}
                    scrollToContent={scrollToContent}
                />

                {/* SECTION 1: TEMPLATE GALLERY (Hanya untuk Mahasiswa / Umum) */}
                {!isCounselor && (
                    <section id="template-gallery" className="py-20 bg-white">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                            <div className="relative text-center mb-16 space-y-4">
                                {/* Judul */}
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-serif tracking-tight">
                                    Template CV{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004d40] to-emerald-500">
                                        Siap Pakai
                                    </span>
                                </h2>

                                {/* Deskripsi yang lebih lega */}
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                    Bingung mulai dari mana? Gunakan koleksi template gratis kami.
                                    Mulai dari format <span className="font-semibold text-gray-800">ATS Friendly</span> hingga desain <span className="font-semibold text-gray-800">Kreatif</span> yang memukau rekruter.
                                </p>
                            </div>

                            {/* FILTER BAR */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 mb-10">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    {/* Search */}
                                    <div className="flex-grow">
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#004d40] transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Cari judul, tag, atau jenis pekerjaan..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00CA65] focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white transition-all"
                                            />
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {/* Filter Kategori */}
                                        <div className="relative">
                                            <button
                                                onClick={() => { setShowKategoriDropdown(!showKategoriDropdown); setShowSumberDropdown(false); }}
                                                className={`w-full sm:w-48 px-5 py-3.5 border rounded-xl font-bold flex items-center justify-between transition-all ${filterKategori !== 'semua' ? 'bg-emerald-50 border-[#00CA65] text-[#004d40]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#00CA65]/50'
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2 text-sm truncate">
                                                    <Filter className="w-4 h-4" />
                                                    {filterKategori === 'semua' ? 'Kategori' : filterKategori}
                                                </span>
                                                {filterKategori !== 'semua' && <span className="bg-[#004d40] text-white text-[10px] px-2 py-0.5 rounded-full">1</span>}
                                            </button>

                                            {showKategoriDropdown && (
                                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 py-2 animate-scale-in">
                                                    {kategoriOptions.map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => handleKategoriChange(opt.value)}
                                                            className={`w-full text-left px-5 py-3 hover:bg-emerald-50 text-sm flex items-center gap-3 transition ${filterKategori === opt.value ? 'font-bold text-[#004d40] bg-emerald-50' : 'text-gray-600'
                                                                }`}
                                                        >
                                                            <opt.icon className="w-4 h-4" /> {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Filter Sumber */}
                                        <div className="relative">
                                            <button
                                                onClick={() => { setShowSumberDropdown(!showSumberDropdown); setShowKategoriDropdown(false); }}
                                                className={`w-full sm:w-48 px-5 py-3.5 border rounded-xl font-bold flex items-center justify-between transition-all ${filterSumber !== 'semua' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2 text-sm truncate">
                                                    <Palette className="w-4 h-4" />
                                                    {filterSumber === 'semua' ? 'Sumber' : filterSumber}
                                                </span>
                                                {filterSumber !== 'semua' && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">1</span>}
                                            </button>

                                            {showSumberDropdown && (
                                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 py-2 animate-scale-in">
                                                    {sumberOptions.map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => handleSumberChange(opt.value)}
                                                            className={`w-full text-left px-5 py-3 hover:bg-gray-50 text-sm transition ${filterSumber === opt.value ? 'font-bold text-blue-700 bg-blue-50' : 'text-gray-600'
                                                                }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Reset */}
                                        {activeFiltersCount > 0 && (
                                            <button
                                                onClick={handleReset}
                                                className="px-5 py-3.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center"
                                                title="Reset Filter"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* TEMPLATE GRID */}
                            {safeTemplates.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                                        {safeTemplates.map((tpl) => (
                                            <TemplateCard
                                                key={tpl.id}
                                                template={tpl}
                                                onKlik={handleTemplateKlik}
                                            />
                                        ))}
                                    </div>

                                    {/* PAGINATION */}
                                    {safePagination.links && safePagination.links.length > 3 && (
                                        <div className="flex justify-center mt-12">
                                            <div className="bg-white rounded-2xl shadow-sm p-3 border border-gray-200 inline-flex flex-col items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    {safePagination.links.map((link, i) => {
                                                        let label = link.label;
                                                        if (label.includes('&laquo;') || label === 'Previous') label = <ChevronLeft className="w-5 h-5" />;
                                                        if (label.includes('&raquo;') || label === 'Next') label = <ChevronRight className="w-5 h-5" />;

                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => handlePageChange(link.url)}
                                                                disabled={!link.url || link.active}
                                                                className={`
                                                                    w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
                                                                    ${link.active
                                                                        ? 'bg-[#004d40] text-white shadow-lg scale-110'
                                                                        : 'bg-white border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:text-[#004d40]'}
                                                                    ${!link.url && 'opacity-40 cursor-not-allowed hover:bg-white hover:text-gray-500'}
                                                                `}
                                                            >
                                                                {label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium">
                                                    Menampilkan {safePagination.from}-{safePagination.to} dari {safePagination.total} template
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <FileText className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Template Ditemukan</h3>
                                    <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau filter Anda.</p>
                                    <button onClick={handleReset} className="text-[#004d40] font-bold hover:underline">Reset Filter</button>
                                </div>
                            )}
                            {/* CTA EXTERNAL LINK */}
                            <div className="mt-16 bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center container mx-auto max-w-7xl">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Butuh Lebih Banyak Pilihan?</h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Jelajahi ribuan template CV premium lainnya dari partner kami Canva dan Google Slides untuk menemukan desain yang sempurna.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://www.canva.com/resumes/templates/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] transition shadow-lg"
                                    >
                                        <Palette className="w-5 h-5 mr-2" />
                                        Jelajahi Canva
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>

                                    <a
                                        href="https://slidesgo.com/search?q=resume#rs=search"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-white text-[#004d40] border-2 border-[#004d40] font-bold rounded-xl hover:bg-emerald-50 transition"
                                    >
                                        📊 SLIDESGO
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 2: FEATURES / WHY US */}
                <section className="relative py-24 bg-[#004d40] overflow-hidden">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    {/* Ambient Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00CA65] rounded-full mix-blend-overlay filter blur-[120px] opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400 rounded-full mix-blend-overlay filter blur-[100px] opacity-10 pointer-events-none"></div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">

                            {/* LEFT SIDE: Sticky Text */}
                            <div className="lg:w-2/5 lg:sticky lg:top-28 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-2 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#00CA65] animate-pulse"></span>
                                    {isCounselor ? "Fokus Konselor" : "Nilai Tambah Kami"}
                                </div>

                                <h2 className="text-4xl font-extrabold font-serif leading-tight text-white">
                                    {isCounselor ? "Metrik & Tanggung Jawab" : "Lebih dari Sekadar Koreksi Typo."}
                                </h2>

                                <p className="text-emerald-100 text-lg leading-relaxed opacity-90">
                                    {isCounselor
                                        ? "Sistem kami dirancang untuk mempermudah alur kerja Anda, memastikan setiap mahasiswa mendapatkan review berkualitas tepat waktu."
                                        : "Kami menganalisis CV Anda dari sudut pandang rekruter dan sistem ATS. Kami memastikan potensi Anda tidak tertutup oleh format yang buruk."
                                    }
                                </p>

                                {!isCounselor && (
                                    <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group backdrop-blur-md">
                                        <div className="absolute -top-4 -right-4 text-8xl text-white/5 font-serif select-none">"</div>
                                        <p className="text-[15px] font-medium italic text-emerald-50 leading-relaxed relative z-10">
                                            "Pembeda antara CV yang dibuang dan yang dipanggil interview seringkali hanya pada **kejelasan struktur** dan **relevansi kata kunci**."
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* RIGHT SIDE: Cards */}
                            <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6 w-full pl-0 lg:pl-10">
                                {features.map((feature, index) => {
                                    const IconComponent = feature.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group bg-white rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 
                                        border border-transparent hover:border-emerald-400
                                        shadow-2xl shadow-black/20
                                        flex flex-col relative overflow-hidden z-0"
                                        >
                                            {/* Icon Box */}
                                            <div className="mb-6 w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-[#004d40] group-hover:rotate-6 transition-all duration-500 ease-out">
                                                <IconComponent className="w-8 h-8 text-[#004d40] group-hover:text-[#00CA65] transition-colors duration-300" />
                                            </div>

                                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif group-hover:text-[#004d40] transition-colors">
                                                {feature.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </section>

                {/* SECTION 3: CTA LOGIN (Jika belum login) */}
                {!user && !isCounselor && (
                    <section className="py-20 bg-emerald-50 border-t border-emerald-100">
                        <div className="container mx-auto px-4 text-center max-w-3xl">
                            <div className="bg-white p-8 rounded-3xl shadow-xl">
                                <div className="w-16 h-16 bg-[#004d40] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Mulai Perjalanan Karirmu</h3>
                                <p className="text-gray-600 mb-8">
                                    Akses penuh ke fitur upload CV dan konsultasi karir hanya tersedia untuk mahasiswa terdaftar.
                                </p>
                                <Link
                                    href="/login?redirect_to=/layanan/tabel-cv-review"
                                    className="px-10 py-4 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
                                >
                                    Masuk ke Akunmu
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <Footer />
        </MainLayout>
    );
}

export default CvReview;