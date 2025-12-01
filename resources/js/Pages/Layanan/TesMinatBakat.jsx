import React from 'react';
// Import yang diperlukan (router, Head, Link, usePage)
import { router, Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import Footer from '@/Components/Footer';
// Mengganti import ikon agar relevan, saya tambahkan Sparkles dan Gauge
import { ArrowRight, Sparkles, Zap, Users, Aperture, Gauge } from 'lucide-react';

// --- KOMPONEN ICON ---
const Icons = {
    Sparkles: (props) => <Sparkles {...props} />, // Untuk Judul Utama
    Gauge: (props) => <Gauge {...props} />, // Untuk kecepatan/pengukuran
    Users: (props) => <Users {...props} />, // Untuk aspek sosial/personal
    Aperture: (props) => <Aperture {...props} />, // Untuk potensi unik
};

// --- HALAMAN UTAMA TES MINAT BAKAT ---
function TesMinatBakat(props) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Variabel warna disamakan dengan CvReview (hijau emerald)
    const mainGreen = "text-emerald-800";
    const accentGreen = "bg-emerald-600";
    const hoverAccentGreen = "hover:bg-emerald-700";
    const lightestGreenBg = "bg-emerald-50";

    const handleMulaiSekarang = () => {
        // Arahkan ke halaman utama tes (ganti path sesuai rute Anda)
        router.get('/layanan/tabel-tes-minat-bakat');
    };

    const loginRedirectUrl = '/login?redirect_to=/layanan/tabel-tes-minat-bakat';

    // FITUR-FITUR TES
    const tesFeatures = [
        {
            icon: Icons.Gauge,
            title: "Analisis Kepribadian Akurat",
            description: "Mengukur preferensi kerja dan gaya komunikasi untuk menentukan lingkungan yang paling cocok."
        },
        {
            icon: Icons.Aperture,
            title: "Identifikasi Potensi Unik",
            description: "Menyingkap bakat tersembunyi dan kecenderungan alami yang dapat dioptimalkan menjadi karir."
        },
        {
            icon: Icons.Users,
            title: "Rekomendasi Karir Personal",
            description: "Mencocokkan profil minat dan bakatmu dengan daftar profesi yang paling prospektif."
        },
    ];

    const buttonText = user ? "Mulai Tes Sekarang" : "Masuk & Mulai Tes";
    // Menentukan komponen dinamis: button biasa atau Link Inertia
    const ButtonComponent = user ? 'button' : Link;

    // ClassName untuk Tombol Utama (disamakan dengan CvReview)
    const buttonClassNames = `px-8 py-3.5 ${accentGreen} text-white font-bold rounded-xl shadow-lg ${hoverAccentGreen} transition-all transform hover:-translate-y-1 inline-flex items-center cursor-pointer`;

    return (
        <>
            <Head title="Layanan Tes Minat Bakat" />

            <MainLayout user={user}>
                {/* HERO SECTION - DISAMAKAN DENGAN CVREVIEW */}
                <div className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300">
                    {/* Background decoration (optional blob) */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24 text-left relative">

                        <span className="inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest">
                            <Icons.Sparkles className="w-4 h-4 mr-2" />
                            Career Clarity
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
                            Tes Minat Bakat
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-4xl font-light">
                            Temukan potensi terbaikmu melalui Tes Minat dan Bakat. Kenali kepribadian, kemampuan, dan
                            <span className="font-extrabold text-emerald-800"> arah karier</span> yang paling
                            <span className="font-extrabold text-emerald-800"> sesuai</span> untuk
                            <span className="font-extrabold text-emerald-800"> pengembangan dirimu</span> di masa depan.
                        </p>

                        <div className="mt-10">
                            <ButtonComponent
                                {...(user ? { onClick: handleMulaiSekarang } : { href: loginRedirectUrl })}
                                className={buttonClassNames}
                            >
                                {buttonText}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </ButtonComponent>
                        </div>

                    </div>
                </div>

                {/* FEATURES SECTION - DISAMAKAN DENGAN CVREVIEW */}
                <div className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-3xl">
                            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-2 inline-block">
                                Apa yang Kamu Dapatkan?
                            </h2>
                            <p className="text-gray-600 mt-4 text-lg">
                                Laporan mendalam dan personal untuk membimbing langkah karirmu selanjutnya.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tesFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-start text-left"
                                >
                                    <div className="p-3 bg-emerald-50 rounded-lg mb-4">
                                        <feature.icon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className={`font-semibold ${mainGreen} text-xl mb-3`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </MainLayout>
        </>
    );
}

export default TesMinatBakat;
