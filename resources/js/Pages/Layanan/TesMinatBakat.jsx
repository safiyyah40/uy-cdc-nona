import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    Sparkles, Gauge, Users, Aperture, ArrowRight,
    BrainCircuit, Lightbulb, Lock, Check, Wrench,
    Search, Palette, HeartHandshake, Briefcase, FileText,
    Target, TrendingUp, Award, Zap, Clock, Shield
} from "lucide-react";

// FEATURE CARD COMPONENT
const FeatureCard = ({ icon: Icon, title, description, color = "emerald" }) => {
    return (
        <div className="group bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-[#00CA65] shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -mr-10 -mt-10 transition-colors group-hover:bg-emerald-50"></div>

            <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#00CA65] transition-all duration-300`}>
                    <Icon className={`w-8 h-8 text-[#004d40] group-hover:text-[#00CA65] transition-colors`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif group-hover:text-[#004d40] transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

// RIASEC TYPE CARD
const RiasecTypeCard = ({ type, icon: Icon, title, description, color }) => {
    return (
        <div className={`group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-[#00CA65] transition-all duration-500 hover:-translate-y-1`}>
            <div className={`${color.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                <Icon className={`w-7 h-7 ${color.icon}`} />
            </div>
            <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-black text-[#004d40] font-serif">{type}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${color.badge}`}>
                    {title}
                </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

// HERO SECTION
const HeroSection = ({ user, scrollToContent }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const handleMainClick = (e) => {
        if (user) {
            router.get('/layanan/tes-riasec');
        } else {
            e.preventDefault();
            scrollToContent();
        }
    };

    const mainButtonText = user ? "Mulai Tes Sekarang" : "Pelajari Lebih Lanjut";

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            {/* Background Blobs */}
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
                                Penemuan Diri & Jalur Karir
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight font-serif text-gray-900 mb-6">
                                Tes Minat & Bakat <span className="text-[#004d40]">RIASEC</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Analisis minat profesional menggunakan standar <span className="font-bold text-[#004d40]">Holland RIASEC</span> untuk menentukan lingkungan kerja yang paling optimal bagi pertumbuhan Anda.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={handleMainClick}
                                    className="group px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                                >
                                    <BrainCircuit className="w-5 h-5" />
                                    {mainButtonText}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {!user && (
                                    <Link
                                        href="/login?redirect_to=/layanan/tes-minat-bakat"
                                        className="px-8 py-4 bg-white text-[#004d40] border-2 border-[#004d40] font-bold rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Lock className="w-5 h-5" />
                                        Masuk & Ikuti Tes
                                    </Link>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8 max-w-md mx-auto lg:mx-0">
                                <div>
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">30</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Pertanyaan</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">~10</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Menit</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">6</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Tipe RIASEC</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                    alt="Tes Minat Bakat Illustration"
                                    className="w-full object-cover h-[400px] lg:h-[550px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 via-[#004d40]/40 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-xl lg:text-2xl font-bold mb-2">"Kenali dirimu, raih masa depanmu."</p>
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

// MAIN COMPONENT
function TesMinatBakat() {
    const { auth } = usePage().props;
    const user = auth.user;

    const scrollToContent = () => {
        document.getElementById('list-features')?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        {
            icon: Gauge,
            title: "Analisis Kepribadian Akurat",
            description: "Mengukur preferensi kerja, gaya komunikasi, dan kecenderungan perilaku untuk menentukan lingkungan kerja yang paling cocok.",
            color: "emerald"
        },
        {
            icon: Target,
            title: "Identifikasi Potensi Unik",
            description: "Menyingkap bakat tersembunyi dan kekuatan alami (natural strength) yang dapat dioptimalkan menjadi keunggulan karir.",
            color: "blue"
        },
        {
            icon: TrendingUp,
            title: "Rekomendasi Karir Personal",
            description: "Mencocokkan profil minat dan bakatmu dengan database profesi industri terkini yang paling prospektif.",
            color: "purple"
        },
    ];

    const riasecTypes = [
        {
            type: "R",
            icon: Wrench,
            title: "Realistic",
            description: "Praktis, mekanis, menyukai aktivitas fisik dan bekerja dengan alat. Cocok untuk teknisi, insinyur, atau operator mesin.",
            color: {
                bg: "bg-orange-50",
                icon: "text-orange-600",
                border: "border-orange-200",
                badge: "bg-orange-100 text-orange-700"
            }
        },
        {
            type: "I",
            icon: Search,
            title: "Investigative",
            description: "Analitis, intelektual, senang memecahkan masalah melalui observasi. Cocok untuk peneliti, ilmuwan, atau analis.",
            color: {
                bg: "bg-blue-50",
                icon: "text-blue-600",
                border: "border-blue-200",
                badge: "bg-blue-100 text-blue-700"
            }
        },
        {
            type: "A",
            icon: Palette,
            title: "Artistic",
            description: "Ekspresif, orisinal, independen. Lebih suka lingkungan kreatif. Cocok untuk desainer, penulis, atau seniman.",
            color: {
                bg: "bg-purple-50",
                icon: "text-purple-600",
                border: "border-purple-200",
                badge: "bg-purple-100 text-purple-700"
            }
        },
        {
            type: "S",
            icon: HeartHandshake,
            title: "Social",
            description: "Ramah, memiliki empati tinggi, senang membantu dan melayani orang lain. Cocok untuk guru, konselor, atau perawat.",
            color: {
                bg: "bg-rose-50",
                icon: "text-rose-600",
                border: "border-rose-200",
                badge: "bg-rose-100 text-rose-700"
            }
        },
        {
            type: "E",
            icon: Briefcase,
            title: "Enterprising",
            description: "Ambisius, persuasif, memiliki jiwa kepemimpinan kuat. Cocok untuk manajer, entrepreneur, atau sales executive.",
            color: {
                bg: "bg-emerald-50",
                icon: "text-emerald-600",
                border: "border-emerald-200",
                badge: "bg-emerald-100 text-emerald-700"
            }
        },
        {
            type: "C",
            icon: FileText,
            title: "Conventional",
            description: "Teliti, teratur, menyukai keteraturan data dan prosedur yang jelas. Cocok untuk akuntan, administrator, atau auditor.",
            color: {
                bg: "bg-slate-50",
                icon: "text-slate-600",
                border: "border-slate-200",
                badge: "bg-slate-100 text-slate-700"
            }
        },
    ];

    return (
        <MainLayout user={user}>
            <Head title="Tes Minat Bakat RIASEC - Temukan Karirmu" />

            <div className="min-h-screen bg-gray-50 font-sans">
                {/* Hero Section */}
                <HeroSection user={user} scrollToContent={scrollToContent} />

                {/* Features Section */}
                <div id="list-features" className="py-24 bg-white relative">
                    {/* Background Pattern similar to CvReview */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-[#004d40] text-xs font-black uppercase tracking-wider mb-4 border border-emerald-100">
                                <Sparkles className="w-4 h-4" /> Fitur Unggulan
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 font-serif">
                                Apa yang Kami <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004d40] to-[#00CA65]">Analisis?</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Dapatkan laporan komprehensif mengenai profil psikologis dan potensi karir Anda.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                            {features.map((feature, idx) => (
                                <FeatureCard key={idx} {...feature} />
                            ))}
                        </div>

                        {/* RIASEC Types Section */}
                        <div className="text-center mb-16 mt-12 border-t border-gray-100 pt-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider mb-4 border border-blue-100">
                                <Lightbulb className="w-4 h-4" /> 6 Tipe Kepribadian
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 font-serif">
                                Kenali <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#004d40]">Tipe RIASEC</span> Anda
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Teori Holland membagi minat karir menjadi 6 tipe kepribadian. Anda akan mendapatkan 3 tipe dominan yang paling sesuai dengan kepribadian Anda.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {riasecTypes.map((type, idx) => (
                                <RiasecTypeCard key={idx} {...type} />
                            ))}
                        </div>

                        {/* Bagaimana Cara Kerjanya? Section */}
                        <div className="mt-32 bg-[#004d40] rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00CA65] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 font-serif">
                                        Bagaimana <span className="text-[#00CA65]">Cara Kerjanya?</span>
                                    </h2>
                                    <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
                                        Proses sederhana dalam 3 langkah untuk menemukan jalur karir ideal Anda
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                                    <div className="text-center group">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 border border-white/20 group-hover:bg-[#00CA65] group-hover:text-[#004d40] transition-all">
                                            1
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Jawab 30 Pertanyaan</h3>
                                        <p className="text-emerald-100/80 text-sm px-4">Berikan rating 1-5 pada setiap aktivitas berdasarkan minat Anda</p>
                                    </div>
                                    <div className="text-center group">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 border border-white/20 group-hover:bg-[#00CA65] group-hover:text-[#004d40] transition-all">
                                            2
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Analisis Otomatis</h3>
                                        <p className="text-emerald-100/80 text-sm px-4">Sistem menghitung skor untuk setiap tipe RIASEC secara akurat</p>
                                    </div>
                                    <div className="text-center group">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 border border-white/20 group-hover:bg-[#00CA65] group-hover:text-[#004d40] transition-all">
                                            3
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Dapatkan Hasil</h3>
                                        <p className="text-emerald-100/80 text-sm px-4">Terima 3 tipe dominan dengan rekomendasi karir yang sesuai</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="mt-20 text-center pb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 text-[#004d40] text-xs font-black uppercase tracking-wider mb-6 border border-emerald-100">
                                <Zap className="w-4 h-4" /> Gratis & Cepat
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 font-serif">
                                Siap Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004d40] to-[#00CA65]">Jalur Karirmu?</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                                Mulai perjalanan penemuan diri Anda sekarang. Hanya butuh 10 menit untuk mengubah masa depan karir Anda.
                            </p>
                            <button
                                onClick={() => user ? router.get('/layanan/tes-riasec') : router.get('/login?redirect_to=/layanan/tes-minat-bakat')}
                                className="group px-10 py-5 bg-[#004d40] text-white font-bold text-lg rounded-xl hover:bg-[#00382e] shadow-2xl hover:shadow-emerald-900/30 transition-all transform hover:-translate-y-2 inline-flex items-center gap-3"
                            >
                                <BrainCircuit className="w-6 h-6" />
                                Mulai Tes Sekarang
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-gray-500 font-bold">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-[#00CA65]" />
                                    Data Aman & Privat
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#00CA65]" />
                                    Hanya 10 Menit
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-[#00CA65]" />
                                    Metode Terpercaya
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </MainLayout>
    );
}

export default TesMinatBakat;