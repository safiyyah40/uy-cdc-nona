import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    Sparkles, Gauge, Users, Aperture,
    ArrowRight, BrainCircuit, Lightbulb, Lock, Check
} from "lucide-react";

// --- SUB-COMPONENT: FEATURE CARD (Style Persis CounselorCard/CVReview Card) ---
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
const HeroSection = ({ user, scrollToContent }) => {
    const heroTitle = useScrollFadeIn(0.2);

    const title = "TES MINAT BAKAT";
    const subtext = "Temukan potensi tersembunyi dan arah karir yang paling sesuai dengan kepribadianmu melalui analisis psikologis yang mendalam dan akurat.";
    const badgeText = "Self Discovery & Career Path";

    const handleMainClick = (e) => {
        if (user) {
            // Arahkan ke dashboard tes jika user sudah login
            router.get('/layanan/tabel-tes-minat-bakat');
        } else {
            e.preventDefault();
            scrollToContent();
        }
    };

    const mainButtonText = user ? "Mulai Tes Sekarang" : "Pelajari Lebih Lanjut";

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            {/* Background Blobs (Sama persis) */}
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

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-serif text-gray-900">
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
                                    <BrainCircuit className="w-5 h-5" />
                                    {mainButtonText}
                                </button>

                                {!user && (
                                    <Link
                                        href="/login?redirect_to=/layanan/tabel-tes-minat-bakat"
                                        className="px-8 py-4 bg-white text-[#004d40] border border-[#004d40] font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                                    >
                                        Masuk & Ikuti Tes
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                                    alt="Tes Minat Bakat Illustration"
                                    className="w-full object-cover h-[400px] lg:h-[500px]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-lg opacity-90">"Kenali dirimu, raih masa depanmu."</p>
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
function TesMinatBakat(props) {
    const { auth } = usePage().props;
    const user = auth.user;

    const scrollToContent = () => {
        document.getElementById('list-features')?.scrollIntoView({ behavior: 'smooth' });
    };

    let sectionTitle = "Apa yang Kami Analisis?";
    let sectionSubtitle = "Dapatkan laporan komprehensif mengenai profil psikologis dan potensi karir Anda.";

    let features = [
        {
            icon: Gauge,
            title: "Analisis Kepribadian Akurat",
            description: "Mengukur preferensi kerja, gaya komunikasi, dan kecenderungan perilaku untuk menentukan lingkungan kerja yang paling cocok."
        },
        {
            icon: Aperture,
            title: "Identifikasi Potensi Unik",
            description: "Menyingkap bakat tersembunyi dan kekuatan alami (natural strength) yang dapat dioptimalkan menjadi keunggulan karir."
        },
        {
            icon: Users,
            title: "Rekomendasi Karir Personal",
            description: "Mencocokkan profil minat dan bakatmu dengan database profesi industri terkini yang paling prospektif."
        },
    ];

    return (
        <MainLayout user={user}>
            <Head title="Layanan Tes Minat Bakat" />

            <div className="min-h-screen bg-white relative overflow-hidden">
                {/* Hero Section */}
                <HeroSection
                    user={user}
                    scrollToContent={scrollToContent}
                />

                {/* Green Section (Style sama persis dengan halaman Konsultasi) */}
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

                            {/* State Belum Login */}
                            {!user && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="bg-[#004d40] p-4 rounded-full shadow-xl mb-4 ring-4 ring-green-100">
                                            <div className="text-white"><Lock className="w-8 h-8" /></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Akses Tes Terbatas</h3>
                                        <p className="text-gray-600 max-w-lg mb-6 text-sm">
                                            Silakan masuk menggunakan Akun Portal / SSO Anda untuk memulai tes minat bakat.
                                        </p>
                                        <Link
                                            href="/login?redirect_to=/layanan/tabel-tes-minat-bakat"
                                            className="px-8 py-3 bg-[#004d40] hover:bg-[#00382e] text-white font-bold rounded-lg shadow-lg transition-all"
                                        >
                                            Masuk Sekarang
                                        </Link>
                                    </div>
                                </div>
                            )}

                             {/* State Sudah Login */}
                             {user && (
                                <div className="mt-12 text-center">
                                    <button
                                        onClick={() => router.get('/layanan/tabel-tes-minat-bakat')}
                                        className="px-10 py-4 bg-[#00CA65] text-white font-bold rounded-xl hover:bg-[#00b058] shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        Mulai Tes Minat Bakat
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

export default TesMinatBakat;
