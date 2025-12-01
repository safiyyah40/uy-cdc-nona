import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage } from "@inertiajs/react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// --- ICON COMPONENTS ---
const Icons = {
    Calendar: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    Clock: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Lock: () => (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    Check: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    ),
    ArrowRight: () => (
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    ),
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
};

// --- KOMPONEN KARTU KONSELOR ---
const CounselorCard = ({ counselor }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group bg-white rounded-2xl border border-[#00CA65] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full">

            {/* FOTO & IDENTITAS */}
            <div className="md:w-2/5 relative p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#00CA65]/30 bg-gray-50">
                <div className="absolute inset-0 bg-[#00CA65]/10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply" style={{ backgroundImage: "url('/images/bg-linear.jpg')" }}></div>

                <div className="relative mb-4 z-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative bg-white">
                        {counselor.photo_url && !imageError ? (
                            <img src={counselor.photo_url} alt={counselor.name} onError={() => setImageError(true)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full bg-[#004d40] flex items-center justify-center text-white"><span className="text-3xl font-serif font-bold">{counselor.name ? counselor.name.charAt(0) : 'K'}</span></div>
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#004d40] text-white p-1 rounded-full border-2 border-white z-20"><Icons.Check /></div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 relative z-10 line-clamp-2">{counselor.name}</h3>
                <p className="text-xs text-[#004d40] font-medium mb-2 flex items-center justify-center gap-1 relative z-10"><Icons.Academic /> {counselor.title}</p>
            </div>

            {/* JADWAL & TOMBOL */}
            <div className="md:w-3/5 p-4 flex flex-col justify-between bg-white">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1 bg-[#004d40]/10 text-[#004d40] rounded"><Icons.Calendar /></div>
                        <h4 className="font-semibold text-xs text-gray-800">Jadwal Tersedia</h4>
                    </div>

                    {counselor.slots && counselor.slots.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {/* Hapus .slice(0, 2) agar semua data di-looping */}
                            {counselor.slots.map((slot, index) => (
                                <button
                                    key={slot.id || index}
                                    className="flex items-center justify-between p-2 rounded border border-gray-200 hover:border-[#00CA65] hover:bg-[#00CA65]/5 transition-all group/btn text-left w-full"
                                >
                                    <div>
                                        <div className="text-xs font-bold text-gray-800">{slot.date_string}</div>
                                        <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Icons.Clock /> {slot.time_string} WIB
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-gray-300 group-hover/btn:border-[#00CA65] group-hover/btn:bg-[#00CA65] flex items-center justify-center transition-colors">
                                        <svg className="w-3 h-3 text-white opacity-0 group-hover/btn:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>

                    ) : (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center"><p className="text-xs text-gray-500 font-medium">Jadwal penuh.</p></div>
                    )}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                    <button className="w-full py-2 bg-[#004d40] hover:bg-[#00382e] text-white text-xs font-bold uppercase tracking-wider rounded shadow-md transition-all flex items-center justify-center gap-1">
                        Booking Sesi<Icons.ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- HALAMAN UTAMA ---
const ProfilKonselor = ({ counselors = [] }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    const heroTitle = useScrollFadeIn(0.2);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Default 8 card (4 baris x 2 kolom)

    // Logic Filter Search
    const filteredCounselors = counselors.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logic Pagination
    const totalPages = Math.ceil(filteredCounselors.length / itemsPerPage);
    const currentItems = filteredCounselors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const scrollToList = () => {
        document.getElementById('list-konselor')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <MainLayout user={user}>
            <Head title="Layanan Konsultasi Akademik" />

            {/* HERO SECTION */}
            <div className="min-h-screen bg-white relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
                <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

                <div className="relative">
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
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 font-serif">KONSULTASI</h1>
                                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    Konsultasi ini hadir sebagai sarana bagi mahasiswa untuk berbagi cerita, mendapatkan arahan, serta menemukan solusi dari berbagai permasalahan akademik maupun personal.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <button onClick={scrollToList} className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg hover:shadow-[#004d40]/30 transition-all transform hover:-translate-y-1">
                                        {user ? "Lihat Jadwal & Booking" : "Cek Jadwal Konselor"}
                                    </button>
                                    {!user && (
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

                {/* LIST KONSELOR SECTION */}
                <section id="list-konselor" className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen" style={{ backgroundImage: "url('/images/bg-linear.jpg')", backgroundPosition: 'top center', backgroundSize: '100% auto' }}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 border border-gray-200">

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 font-serif">Pilih Konselor Anda</h2>
                                <p className="text-gray-600 mt-2">{user ? "Temukan konselor yang tepat dan atur jadwal konsultasi." : "Jadwal real-time terintegrasi dengan sistem akademik."}</p>
                            </div>

                            {user ? (
                                <>
                                    {/* SEARCH INPUT */}
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

                                    {/* GRID KONSELOR - 2 KOLOM */}
                                    {currentItems.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {currentItems.map((counselor) => (
                                                    <CounselorCard key={counselor.id} counselor={counselor} />
                                                ))}
                                            </div>

                                            {/* PAGINATION */}
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
                                </>
                            ) : (
                                // LOCK SCREEN
                                <div className="relative min-h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                                    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 filter blur-sm opacity-40 pointer-events-none select-none">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>)}
                                    </div>
                                    <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                                        <div className="bg-[#004d40] p-5 rounded-full shadow-xl mb-6 ring-4 ring-green-100"><div className="text-white"><Icons.Lock /></div></div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Akses Terbatas</h3>
                                        <p className="text-gray-600 max-w-lg mb-8">Silakan masuk menggunakan Akun Portal / SSO Anda.</p>
                                        <Link href="/login" className="px-8 py-3 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-lg shadow-lg transition-all">Masuk Sekarang</Link>
                                    </div>
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

export default ProfilKonselor;