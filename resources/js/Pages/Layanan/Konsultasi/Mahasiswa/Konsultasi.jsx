/**
 * HALAMAN KONSULTASI PAGE
 * 
 * Halaman utama untuk layanan konsultasi akademik CDC YARSI.
 * Mendukung 3 role berbeda: Guest (tamu), Mahasiswa (student), dan Konselor (counselor).
 * 
 * ROLE DETECTION & ACCESS CONTROL:
 * - Guest: Dapat melihat daftar konselor & jadwal, tapi tidak bisa booking
 * - Mahasiswa: Dapat booking konsultasi, melihat riwayat
 * - Konselor: Diarahkan ke dashboard konselor atau ditampilkan modal akses terbatas
 * - Dosen/Staf yang coba akses: Ditampilkan modal MahasiswaRoleAccessModal
 * 
 * FITUR UTAMA:
 * 1. Hero Section - Banner utama dengan CTA
 * 2. List Konselor - Grid card konselor dengan jadwal tersedia
 * 3. Search & Filter - Pencarian by nama/prodi/jadwal
 * 4. Pagination - Navigasi halaman untuk banyak konselor
 * 5. Modal Access Control - Proteksi role-based access
 * 
 * PROPS DARI CONTROLLER:
 * - counselors: Array - Daftar konselor dengan slots jadwal
 * - auth.user: Object - Data user yang login (null jika guest)
 * 
 * STATE MANAGEMENT:
 * - searchTerm: Filter nama/prodi konselor
 * - scheduleSearch: Filter jadwal (hari/tanggal/jam)
 * - currentPage: Halaman pagination aktif
 * - showStudentModal: Toggle modal akses terbatas untuk mahasiswa
 * 
 * URL HASH NAVIGATION:
 * - #list-konselor: Auto scroll ke section daftar konselor
 * - Digunakan saat redirect dari login atau halaman lain
 * 
 * @component
 * @author NONA
 * @lastUpdate 2025-01-21 - Integrated MahasiswaRoleAccessModal
 */

import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react";
import MahasiswaRoleAccessModal from "@/Components/MahasiswaRoleAccessModal";
import {
    Search, ChevronLeft, ChevronRight,
    ArrowRight, Briefcase, Calendar, Clock, Lock, Check, History
} from "lucide-react";

// ICON COMPONENTS
const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
};

// COUNSELOR CARD COMPONENT
/**
 * Card untuk menampilkan detail konselor dan slot jadwalnya
 * 
 * FEATURES:
 * - Foto profil konselor dengan fallback ke inisial
 * - List slot jadwal yang tersedia (clickable untuk pilih)
 * - Radio button indicator untuk slot yang dipilih
 * - Tombol booking yang disabled jika belum pilih slot
 * - Guest protection - redirect ke login jika belum login
 * - Dosen/Staf protection - tampilkan modal jika role tidak sesuai
 * 
 * @param {Object} counselor - Data konselor (id, name, title, photo_url, slots)
 * @param {Object} user - Data user yang login (null jika guest)
 * @param {Function} handleActionClick - Handler untuk intercept klik (dosen_staf protection)
 */
const CounselorCard = ({ counselor, user, handleActionClick }) => {
    const [imageError, setImageError] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const isGuest = !user;

    /**
     * Generate URL untuk booking
     * Params: counselor_id, counselor_name, slot_date, slot_time, slot_id
     */
    const getBookingUrl = (slot) => {
        if (!isGuest && slot) {
            return `/layanan/konsultasi/booking?counselor_id=${counselor.id}&counselor_name=${encodeURIComponent(counselor.name)}&slot_date=${encodeURIComponent(slot.date_string)}&slot_time=${encodeURIComponent(slot.time_string)}&slot_id=${slot.id}`;
        }
        return isGuest ? "/login" : "/layanan/konsultasi/booking";
    };

    /**
     * Handler untuk tombol booking
     * Guest: Redirect ke login
     * Dosen/Staf: Tampilkan modal
     * User: Navigate ke form booking dengan slot terpilih
     */
    const handleBooking = (e) => {
        if (isGuest) {
            router.visit('/login');
            return;
        }

        if (selectedSlot) {
            const url = getBookingUrl(selectedSlot);
            // Cek dosen_staf sebelum navigate
            if (handleActionClick) {
                handleActionClick(e, () => router.visit(url));
            } else {
                router.visit(url);
            }
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-[#00CA65] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full">
            {/* FOTO & IDENTITAS */}
            <div className="md:w-2/5 relative p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#00CA65]/30 bg-gray-50">
                <div className="absolute inset-0 bg-[#00CA65]/10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"></div>

                <div className="relative mb-4 z-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative bg-white">
                        {counselor.photo_url && !imageError ? (
                            <img
                                src={counselor.photo_url}
                                alt={counselor.name}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#004d40] flex items-center justify-center text-white">
                                <span className="text-3xl font-serif font-bold">{counselor.name ? counselor.name.charAt(0) : 'K'}</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#004d40] text-white p-1 rounded-full border-2 border-white z-20">
                        <Check className="w-4 h-4" />
                    </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 relative z-10 line-clamp-2">{counselor.name}</h3>
                <p className="text-xs text-[#004d40] font-medium mb-2 flex items-center justify-center gap-1 relative z-10">
                    <Icons.Academic /> {counselor.title}
                </p>
            </div>

            {/* JADWAL & TOMBOL */}
            <div className="md:w-3/5 p-5 flex flex-col justify-between bg-white">
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-yarsi-green/10 text-yarsi-green rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-base text-gray-900">Pilih Jadwal Tersedia</h4>
                    </div>

                    {/* Daftar Slot Jadwal */}
                    {counselor.slots && counselor.slots.length > 0 ? (
                        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {counselor.slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => {
                                        if (selectedSlot?.id === slot.id) {
                                            setSelectedSlot(null);
                                        } else {
                                            setSelectedSlot(slot);
                                        }
                                    }}
                                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left w-full ${selectedSlot?.id === slot.id
                                            ? 'border-yarsi-accent bg-green-50 ring-2 ring-yarsi-accent/20'
                                            : 'border-gray-200 hover:border-yarsi-green/50 hover:bg-gray-50'
                                        }`}
                                >
                                    <div>
                                        <div className="text-sm md:text-base font-bold text-gray-900">
                                            {slot.date_string}
                                        </div>
                                        <div className="text-xs md:text-sm font-semibold text-gray-700 flex items-center gap-1.5 mt-1">
                                            <Clock className="w-4 h-4 text-yarsi-accent" /> {slot.time_string} WIB
                                        </div>
                                    </div>

                                    {/* Radio indicator */}
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedSlot?.id === slot.id ? 'border-yarsi-accent bg-yarsi-accent' : 'border-gray-300'
                                        }`}>
                                        {selectedSlot?.id === slot.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-center">
                            <p className="text-sm text-gray-600 font-bold">Maaf, jadwal saat ini sudah penuh.</p>
                        </div>
                    )}
                </div>

                {/* Tombol Booking */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    {user ? (
                        <button
                            onClick={handleBooking}
                            disabled={!selectedSlot}
                            className={`w-full py-4 text-white text-sm md:text-base font-black uppercase tracking-tight rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${!selectedSlot
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                    : 'bg-yarsi-gradient-button hover:opacity-90 cursor-pointer hover:shadow-xl hover:-translate-y-1'
                                }`}
                        >
                            <span>{selectedSlot ? 'Lanjut Reservasi Sesi' : 'Pilih Jadwal Terlebih Dahulu'}</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <Link
                            href={`${route('layanan.konsultasi.auth')}#list-konselor`}
                            className="w-full py-4 bg-yarsi-green text-white text-sm md:text-base font-black uppercase tracking-tight rounded-xl shadow-lg hover:bg-yarsi-green-dark flex items-center justify-center hover:shadow-xl transition-all"
                        >
                            Masuk untuk Reservasi Sesi
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

// HERO SECTION COMPONENT
/**
 * Banner hero section dengan CTA buttons
 * 
 * VARIANTS:
 * - Normal View: Untuk guest/mahasiswa - tampilkan jadwal & reservasi
 * - Counselor View: Untuk konselor - tampilkan dashboard link
 * 
 * @param {Object} user - Data user
 * @param {Function} scrollToList - Handler scroll ke list konselor
 * @param {Boolean} isCounselorView - Flag untuk tampilan konselor
 * @param {Function} handleActionClick - Handler untuk intercept klik (dosen_staf protection)
 */
const HeroSection = ({ user, scrollToList, isCounselorView = false, handleActionClick }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const title = isCounselorView ? `SELAMAT DATANG, ${user?.name?.toUpperCase() || 'KONSELOR'}!` : "KONSULTASI";
    const subtext = isCounselorView
        ? "Anda masuk sebagai Konselor. Kelola jadwal konsultasi, lihat daftar sesi, dan akses laporan melalui Dashboard khusus Anda."
        : "Konsultasi ini hadir sebagai sarana bagi mahasiswa untuk berbagi cerita, mendapatkan arahan, serta menemukan solusi dari berbagai permasalahan akademik maupun personal.";
    const mainButtonText = isCounselorView ? "Lihat Jadwal Konseling" : (user ? "Lihat Jadwal & Reservasi" : "Cek Jadwal Konselor");
    const mainButtonHref = isCounselorView ? "/konselor/table-konsultasi-konselor" : "#list-konselor";

    const handleScroll = (e) => {
        if (!isCounselorView && scrollToList) {
            // Untuk dosen_staf, cek dulu sebelum scroll
            if (handleActionClick) {
                handleActionClick(e, () => scrollToList());
            } else {
                e.preventDefault();
                scrollToList();
            }
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            {/* Background Decorations */}
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
                                Career Development Center
                            </div>

                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-serif ${isCounselorView ? 'text-[#004d40]' : 'text-gray-900'}`}>
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {subtext}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {isCounselorView ? (
                                    <Link
                                        href={mainButtonHref}
                                        className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                                    >
                                        <Briefcase className="w-5 h-5" /> {mainButtonText}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleScroll}
                                        className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg hover:shadow-[#004d40]/30 transition-all transform hover:-translate-y-1"
                                    >
                                        {mainButtonText}
                                    </button>
                                )}
                                {!isCounselorView && user && (
                                    <Link
                                        href="/layanan/konsultasi/riwayat"
                                        onClick={(e) => handleActionClick && handleActionClick(e)}
                                        className="px-8 py-4 bg-white text-[#004d40] border-2 border-[#004d40] font-bold rounded-xl hover:bg-gray-50 shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                                    >
                                        <History className="w-5 h-5" />
                                        Riwayat Konseling
                                    </Link>
                                )}

                                {!user && !isCounselorView && (
                                    <Link href={`${route('layanan.konsultasi.auth')}#list-konselor`} className="px-8 py-4 bg-white text-[#004d40] border border-[#004d40] font-bold rounded-xl hover:bg-gray-50 transition-all">
                                        Masuk ke Akunmu
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img src="/images/pict-profil-konselor.png" alt="Diskusi Mahasiswa" className="w-full object-cover h-[400px] lg:h-[500px]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-lg opacity-90">"Ilmu Pengetahuan, Agama, dan Negara."</p>
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
/**
 * Halaman Konsultasi Utama
 * 
 * FLOW:
 * 1. Detect role user (guest/mahasiswa/konselor/dosen_staf)
 * 2. Jika konselor: tampilkan hero konselor atau redirect
 * 3. Jika dosen_staf: tampilkan modal akses terbatas
 * 4. Jika mahasiswa/guest: tampilkan list konselor dengan filter
 * 
 * @param {Array} counselors - Data konselor dari controller
 */
const Konsultasi = ({ counselors = [] }) => {
    const { auth } = usePage().props;
    const user = auth.user;

    // Role Detection
    const isCounselor = user && user.username && user.username.includes('.konselor');
    const isDosenStaf = user && user.role === 'dosen_staf';

    // State Management
    const [searchTerm, setSearchTerm] = useState('');
    const [scheduleSearch, setScheduleSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const itemsPerPage = 8;

    /**
     * Auto-scroll ke section list konselor saat page load
     * Triggered jika URL memiliki hash #list-konselor
     */
    useEffect(() => {
        const handleScrollToElement = () => {
            const hash = window.location.hash;

            if (hash === '#list-konselor') {
                const element = document.getElementById('list-konselor');

                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        handleScrollToElement();

        // Fallback dengan delay (untuk memastikan DOM sudah ready)
        const timer = setTimeout(() => {
            handleScrollToElement();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    /**
     * Handler untuk intercept klik button jika user adalah dosen_staf
     * Modal akan muncul dan mencegah navigasi default
     */
    const handleActionClick = (e, defaultAction) => {
        if (isDosenStaf) {
            e.preventDefault();
            setShowStudentModal(true);
            return;
        }
        // Jika bukan dosen_staf, lanjutkan action normal
        if (defaultAction) {
            defaultAction();
        }
    };

    /**
     * Filter konselor berdasarkan:
     * 1. Nama/prodi (searchTerm)
     * 2. Jadwal tersedia (scheduleSearch)
     */
    const filteredCounselors = counselors.filter(c => {
        // Filter berdasarkan nama/prodi
        const nameMatch = (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (c.title && c.title.toLowerCase().includes(searchTerm.toLowerCase()));

        // Filter berdasarkan jadwal
        let scheduleMatch = true;

        if (scheduleSearch.trim() !== '') {
            const search = scheduleSearch.toLowerCase().trim();

            scheduleMatch = c.slots && c.slots.some(slot => {
                const dateString = (slot.date_string || '').toLowerCase();
                const timeString = (slot.time_string || '').toLowerCase();
                const fullSchedule = `${dateString} ${timeString}`;

                // Support multi-keyword search (e.g., "jumat 18:00")
                const searchWords = search.split(/[\s,]+/).filter(w => w.length > 0);
                const allWordsMatch = searchWords.every(word => fullSchedule.includes(word));
                const directMatch = fullSchedule.includes(search);

                return allWordsMatch || directMatch;
            });
        }

        return nameMatch && scheduleMatch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredCounselors.length / itemsPerPage);
    const currentItems = filteredCounselors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    /**
     * Scroll helper untuk tombol CTA
     */
    const scrollToList = () => {
        document.getElementById('list-konselor')?.scrollIntoView({ behavior: 'smooth' });
    };

    // RENDER: COUNSELOR VIEW
    if (isCounselor) {
        return (
            <MainLayout user={user}>
                <Head title="Dashboard Konselor" />
                <HeroSection user={user} isCounselorView={true} handleActionClick={handleActionClick} />
            </MainLayout>
        );
    }

    // RENDER: MAIN PAGE (MAHASISWA/GUEST VIEW)
    return (
        <MainLayout user={user}>
            <Head title="Layanan Konsultasi Akademik" />

            {/* MODAL AKSES TERBATAS - UNTUK DOSEN/STAF */}
            <MahasiswaRoleAccessModal
                isOpen={showStudentModal}
                onClose={() => setShowStudentModal(false)}
                userName={user?.name || "Pengguna"}
                contactInfo={{ whatsapp_number: "6281295986204" }}
            />

            <div className="min-h-screen bg-white relative overflow-hidden">
                {/* HERO SECTION */}
                <HeroSection user={user} scrollToList={scrollToList} isCounselorView={false} handleActionClick={handleActionClick} />

                {/* LIST KONSELOR SECTION */}
                <section id="list-konselor" className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 border border-gray-200 relative">

                            {/* Section Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 font-serif">Pilih Konselor Anda</h2>
                                <p className="text-gray-600 mt-2">
                                    {user ? "Temukan konselor yang tepat dan atur jadwal konsultasi." : "Jadwal real-time terintegrasi dengan sistem akademik."}
                                </p>
                            </div>

                            {/* SEARCH BOX */}
                            <div className="mb-8 flex flex-col sm:flex-row justify-center gap-4">
                                {/* Search Nama/Prodi */}
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari nama dosen atau prodi..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent shadow-sm"
                                    />
                                </div>

                                {/* Search Jadwal */}
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari jadwal: jumat, 12 desember, 18:00 - 19:00"
                                        value={scheduleSearch}
                                        onChange={(e) => {
                                            setScheduleSearch(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* COUNSELOR GRID */}
                            {currentItems.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {currentItems.map((counselor) => (
                                            <CounselorCard
                                                key={counselor.id}
                                                counselor={counselor}
                                                user={user}
                                                handleActionClick={handleActionClick}
                                            />
                                        ))}
                                    </div>

                                    {/* PAGINATION */}
                                    {totalPages > 1 && (
                                        <div className="mt-10 flex justify-center items-center gap-4">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-full border border-gray-300 hover:bg-[#004d40] hover:text-white hover:border-[#004d40] disabled:opacity-50 transition-all"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <span className="text-sm font-semibold text-gray-700">
                                                Halaman {currentPage} dari {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-full border border-gray-300 hover:bg-[#004d40] hover:text-white hover:border-[#004d40] disabled:opacity-50 transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-gray-500">
                                        {scheduleSearch ? 'Tidak ada konselor dengan jadwal yang sesuai.' : 'Tidak ada konselor yang ditemukan.'}
                                    </p>
                                </div>
                            )}

                            {/* GUEST OVERLAY */}
                            {!user && (
                                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-3xl">
                                    <div className="bg-[#004d40] p-5 rounded-full shadow-xl mb-6 ring-4 ring-green-100">
                                        <div className="text-white">
                                            <Lock className="w-12 h-12" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Akses Reservasi Terbatas</h3>
                                    <p className="text-gray-600 max-w-lg mb-8">
                                        Silakan masuk menggunakan Akun Portal / SSO Anda untuk melakukan reservasi sesi.
                                    </p>
                                    <Link
                                        href={`${route('layanan.konsultasi.auth')}#list-konselor`}
                                        className="px-8 py-3 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-lg shadow-lg transition-all"
                                    >
                                        Masuk dan Reservasi Sekarang
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default Konsultasi;
