import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    FileText, Check, Zap, UserCheck,
    ArrowRight, LayoutDashboard, Briefcase, Lock
} from "lucide-react";

// --- SUB-COMPONENT: FEATURE CARD ---
const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="group bg-white rounded-2xl border border-[#00CA65] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
            
            {/* Bagian Atas (Header Icon) */}
            <div className="p-6 flex items-center justify-center bg-gray-50 border-b border-[#00CA65]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00CA65]/10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-10 h-10 text-[#004d40]" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#004d40] text-white p-1 rounded-full border-2 border-white z-20">
                        <Check className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Bagian Konten */}
            <div className="p-6 flex flex-col flex-grow justify-start bg-white text-center">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 font-serif group-hover:text-[#00CA65] transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: HERO SECTION ---
const HeroSection = ({ user, isCounselor, scrollToContent }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const title = isCounselor ? `HALO, ${user?.name?.toUpperCase() || 'KONSELOR'}!` : "CV REVIEW";
    const subtext = isCounselor
        ? "Anda masuk sebagai Konselor. Kelola antrean CV, berikan review mendalam, dan pantau statistik pekerjaan Anda melalui Dashboard ini."
        : "Kami membantu meninjau dan menyempurnakan CV-mu agar tampil lebih rapi, relevan, dan menarik di mata perekrut. Tingkatkan peluang panggilan wawancara.";
    
    const badgeText = isCounselor ? "Counselor Management" : "Career Preparation";

    const handleMainClick = (e) => {
        if (isCounselor) {
            // --- UPDATED: Konselor diarahkan ke Tabel List ---
            router.get('/layanan/tabel-cv-review');
        } else if (user) {
            router.get('/layanan/tabel-cv-review'); 
        } else {
            e.preventDefault();
            scrollToContent();
        }
    };

    const mainButtonText = isCounselor ? "Akses Dashboard Review" : (user ? "Mulai Review Sekarang" : "Lihat Fitur Review");

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

                            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-serif ${isCounselor ? 'text-[#004d40]' : 'text-gray-900'}`}>
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {subtext}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={handleMainClick}
                                    className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg hover:shadow-[#004d40]/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                >
                                    {isCounselor ? <LayoutDashboard className="w-5 h-5"/> : <Briefcase className="w-5 h-5"/>}
                                    {mainButtonText}
                                </button>
                                
                                {!user && !isCounselor && (
                                    <Link 
                                        href="/login?redirect_to=/layanan/tabel-cv-review" 
                                        className="px-8 py-4 bg-white text-[#004d40] border border-[#004d40] font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                                    >
                                        Masuk & Upload
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" 
                                    alt="CV Review Process" 
                                    className="w-full object-cover h-[400px] lg:h-[500px]" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-lg opacity-90">"Professional look, professional result."</p>
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

// --- MAIN PAGE COMPONENT ---
function CvReview(props) {
    const { auth } = usePage().props;
    const user = auth.user;

    const isCounselor = user?.role === 'konselor';

    const scrollToContent = () => {
        document.getElementById('list-features')?.scrollIntoView({ behavior: 'smooth' });
    };

    let sectionTitle = "Apa yang Kami Review?";
    let sectionSubtitle = "Dapatkan evaluasi profesional pada aspek-aspek kunci CV Anda.";
    
    let features = [
        {
            icon: FileText,
            title: "Tinjauan Format & Struktur",
            description: "Memastikan layout CV Anda profesional, mudah dibaca (ATS-friendly), dan terstruktur secara logis.",
        },
        {
            icon: Zap,
            title: "Optimasi Kata Kunci",
            description: "Menyesuaikan konten CV dengan kata kunci industri target agar lebih menonjol di mata perekrut.",
        },
        {
            icon: UserCheck,
            title: "Fokus pada Pencapaian",
            description: "Mengubah deskripsi tugas menjadi pernyataan hasil yang berdampak dan kuantitatif.",
        },
    ];

    if (isCounselor) {
        sectionTitle = "Metrik & Tugas Konselor";
        sectionSubtitle = "Fokus utama Anda dalam memberikan pelayanan review terbaik.";
        features = [
            {
                icon: FileText,
                title: "Kelola Daftar Tunggu",
                description: "Lihat semua pengajuan CV dari pengguna yang menunggu untuk ditinjau dalam satu dashboard.",
            },
            {
                icon: Check,
                title: "Berikan Umpan Balik",
                description: "Lakukan review mendalam menggunakan tools kami dan kirimkan feedback konstruktif.",
            },
            {
                icon: LayoutDashboard,
                title: "Lacak Kinerja",
                description: "Pantau jumlah CV yang telah direview dan rating kepuasan dari mahasiswa.",
            },
        ];
    }

    return (
        <MainLayout user={user}>
            <Head title={isCounselor ? "Dashboard CV Review" : "Layanan CV Review"} />

            <div className="min-h-screen bg-white relative overflow-hidden">
                <HeroSection 
                    user={user} 
                    isCounselor={isCounselor} 
                    scrollToContent={scrollToContent} 
                />

                <section id="list-features" className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 border border-gray-200 relative">

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                                    {sectionTitle}
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    {sectionSubtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <FeatureCard 
                                        key={index}
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                    />
                                ))}
                            </div>

                            {!user && !isCounselor && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="bg-[#004d40] p-4 rounded-full shadow-xl mb-4 ring-4 ring-green-100">
                                            <div className="text-white"><Lock className="w-8 h-8" /></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Akses Upload Terbatas</h3>
                                        <p className="text-gray-600 max-w-lg mb-6 text-sm">
                                            Silakan masuk menggunakan Akun Portal / SSO Anda untuk mengunggah CV.
                                        </p>
                                        <Link 
                                            href="/login?redirect_to=/layanan/tabel-cv-review" 
                                            className="px-8 py-3 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-lg shadow-lg transition-all"
                                        >
                                            Masuk Sekarang
                                        </Link>
                                    </div>
                                </div>
                            )}

                             {user && !isCounselor && (
                                <div className="mt-12 text-center">
                                    <button 
                                        onClick={() => router.get('/layanan/tabel-cv-review')}
                                        className="px-10 py-4 bg-[#00CA65] text-white font-bold rounded-xl hover:bg-[#00b058] shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                                    >
                                        <Briefcase className="w-5 h-5" />
                                        Upload CV Saya Sekarang
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                             )}

                             {isCounselor && (
                                <div className="mt-12 text-center">
                                    <button 
                                        // --- UPDATED: Arahkan ke Tabel List CV ---
                                        onClick={() => router.get('/layanan/tabel-cv-review')}
                                        className="px-10 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                                    >
                                        <LayoutDashboard className="w-5 h-5" />
                                        Masuk ke Dashboard Review
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                             )}

                        </div>
                    </div>
                </section>
            </div>
            
            <Footer />
        </MainLayout>
    );
}

export default CvReview;