import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react"; // Tambah router
import { 
    Search, ChevronLeft, ChevronRight, 
    ArrowRight, Briefcase, Calendar, Clock, Lock, Check // Tambah Calendar & Clock
} from "lucide-react";

// --- ICON COMPONENTS (Custom/Manual SVG) ---
const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
};

// --- KOMPONEN KARTU KONSELOR (Mahasiswa/Tamu View) ---
const CounselorCard = ({ counselor, user }) => {
    const [imageError, setImageError] = useState(false);
    
    // FIX 1: Definisikan state untuk slot yang dipilih
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    const isGuest = !user;

    const getBookingUrl = (slot) => {
        if (!isGuest && slot) {
            return `/layanan/konsultasi/booking?counselor_id=${counselor.id}&counselor_name=${encodeURIComponent(counselor.name)}&slot_date=${encodeURIComponent(slot.date_string)}&slot_time=${encodeURIComponent(slot.time_string)}&slot_id=${slot.id}`;
        }
        return isGuest ? "/login" : "/layanan/konsultasi/booking";
    };

    // FIX 2: Buat fungsi handleBooking
    const handleBooking = () => {
        if (isGuest) {
            router.visit('/login');
            return;
        }
        if (selectedSlot) {
            const url = getBookingUrl(selectedSlot);
            router.visit(url);
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
            <div className="md:w-3/5 p-4 flex flex-col justify-between bg-white">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {/* FIX 3: Gunakan Calendar yang sudah diimport */}
                        <div className="p-1 bg-emerald-800/10 text-emerald-800 rounded"><Calendar className="w-4 h-4" /></div>
                        <h4 className="font-semibold text-xs text-gray-800">Pilih Jadwal Tersedia</h4>
                    </div>

                    {counselor.slots && counselor.slots.length > 0 ? (
                        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                            {counselor.slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => {
                                        if (selectedSlot?.id === slot.id) {
                                            setSelectedSlot(null); // batalin
                                        } else {
                                            setSelectedSlot(slot); // pilih baru
                                        }
                                    }}
                                    className={`flex items-center justify-between p-2 rounded border transition-all text-left w-full ${
                                        selectedSlot?.id === slot.id 
                                        ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' 
                                        : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'
                                    }`}
                                >
                                    <div>
                                        <div className="text-xs font-bold text-gray-800">{slot.date_string}</div>
                                        <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" /> {slot.time_string} WIB
                                        </div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedSlot?.id === slot.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                                        {selectedSlot?.id === slot.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center"><p className="text-xs text-gray-500 font-medium">Jadwal penuh.</p></div>
                    )}
                </div>

                {/* Tombol Booking */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    {user ? (
                        <button
                            onClick={handleBooking}
                            disabled={!selectedSlot}
                            className={`w-full py-2 text-white text-xs font-bold uppercase tracking-wider rounded shadow-md transition-all flex items-center justify-center gap-1 ${
                                !selectedSlot 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-[#004d40] hover:bg-[#00382e] cursor-pointer hover:shadow-lg hover:-translate-y-0.5'
                            }`}
                        >
                            {selectedSlot ? 'Lanjut Booking' : 'Pilih Jadwal Dulu'} <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <Link href="/login" className="w-full py-2 bg-[#004d40] text-white text-xs font-bold uppercase tracking-wider rounded shadow-md hover:bg-[#00382e] flex items-center justify-center hover:shadow-lg transition-all">
                            Login untuk Booking
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN HERO SECTION ---
const HeroSection = ({ user, scrollToList, isCounselorView = false }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const title = isCounselorView ? `SELAMAT DATANG, ${user?.name?.toUpperCase() || 'KONSELOR'}!` : "KONSULTASI";
    const subtext = isCounselorView
        ? "Anda masuk sebagai Konselor. Kelola jadwal konsultasi, lihat daftar booking, dan akses laporan melalui Dashboard khusus Anda."
        : "Konsultasi ini hadir sebagai sarana bagi mahasiswa untuk berbagi cerita, mendapatkan arahan, serta menemukan solusi dari berbagai permasalahan akademik maupun personal.";
    const mainButtonText = isCounselorView ? "Lihat Jadwal Konseling" : (user ? "Lihat Jadwal & Booking" : "Cek Jadwal Konselor");
    const mainButtonHref = isCounselorView ? "/konselor/table-konsultasi-konselor" : "#list-konselor";
    
    const handleScroll = (e) => {
        if (!isCounselorView && scrollToList) {
            e.preventDefault();
            scrollToList();
        }
    };

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            {/* Background Blob/Animation */}
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
                                {!user && !isCounselorView && (
                                    <Link href="/login" className="px-8 py-4 bg-white text-[#004d40] border border-[#004d40] font-bold rounded-xl hover:bg-gray-50 transition-all">
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

// --- HALAMAN UTAMA (KONSULTASI PAGE) ---
const Konsultasi = ({ counselors = [] }) => {
    const { auth } = usePage().props;
    const user = auth.user;

    const isCounselor = user && user.username && user.username.includes('.konselor');

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredCounselors = counselors.filter(c =>
        (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.title && c.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredCounselors.length / itemsPerPage);
    const currentItems = filteredCounselors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const scrollToList = () => {
        document.getElementById('list-konselor')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (isCounselor) {
        return (
            <MainLayout user={user}>
                <Head title="Dashboard Konselor" />
                <HeroSection user={user} isCounselorView={true} />
                <Footer />
            </MainLayout>
        );
    }

    return (
        <MainLayout user={user}>
            <Head title="Layanan Konsultasi Akademik" />

            <div className="min-h-screen bg-white relative overflow-hidden">
                <HeroSection user={user} scrollToList={scrollToList} isCounselorView={false} />

                <section id="list-konselor" className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 border border-gray-200 relative">

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 font-serif">Pilih Konselor Anda</h2>
                                <p className="text-gray-600 mt-2">{user ? "Temukan konselor yang tepat dan atur jadwal konsultasi." : "Jadwal real-time terintegrasi dengan sistem akademik."}</p>
                            </div>

                            <div className="mb-8 flex justify-center">
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari nama dosen atau prodi..."
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent shadow-sm"
                                    />
                                </div>
                            </div>

                            {currentItems.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {currentItems.map((counselor) => (
                                            <CounselorCard
                                                key={counselor.id}
                                                counselor={counselor}
                                                user={user}
                                            />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <div className="mt-10 flex justify-center items-center gap-4">
                                            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-full border border-gray-300 hover:bg-[#004d40] hover:text-white hover:border-[#004d40] disabled:opacity-50 transition-all">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <span className="text-sm font-semibold text-gray-700">Halaman {currentPage} dari {totalPages}</span>
                                            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-full border border-gray-300 hover:bg-[#004d40] hover:text-white hover:border-[#004d40] disabled:opacity-50 transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16"><p className="text-gray-500">Tidak ada konselor yang ditemukan.</p></div>
                            )}

                            {!user && (
                                <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-3xl">
                                    <div className="bg-[#004d40] p-5 rounded-full shadow-xl mb-6 ring-4 ring-green-100"><div className="text-white"><Lock className="w-12 h-12" /></div></div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Akses Booking Terbatas</h3>
                                    <p className="text-gray-600 max-w-lg mb-8">Silakan masuk menggunakan Akun Portal / SSO Anda untuk melakukan booking sesi.</p>
                                    <Link href="/login" className="px-8 py-3 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-lg shadow-lg transition-all">Masuk Sekarang</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default Konsultasi;