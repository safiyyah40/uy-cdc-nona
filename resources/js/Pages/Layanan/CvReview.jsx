import React from 'react';
import { router, Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { ArrowRight, Check, FileText, Zap, UserCheck, LayoutDashboard } from 'lucide-react';

const Icons = {
    Check: (props) => <Check {...props} />,
    FileText: (props) => <FileText {...props} />,
    Zap: (props) => <Zap {...props} />,
    UserCheck: (props) => <UserCheck {...props} />,
    LayoutDashboard: (props) => <LayoutDashboard {...props} />,
};

function CvReview(props) {
    const { auth } = usePage().props;
    const user = auth.user;

    const isCounselor = user ? user.username.includes('.konselor') : false;

    const mainGreen = "text-emerald-800";
    const accentGreen = "bg-emerald-600";
    const hoverAccentGreen = "hover:bg-emerald-700";

    const handleMulaiSekarang = () => {
        router.get('/layanan/tabel-cv-review');
    };

    const loginRedirectUrl = '/login?redirect_to=/layanan/tabel-cv-review';

    const heroIcon = Icons.FileText;

    let heroBadgeText = "Career Preparation";
    let heroTitle = "CV Review";
    let heroSubtitle = "Kami membantu meninjau dan menyempurnakan CV-mu agar tampil lebih rapi, relevan, dan menarik di mata perekrut. Tingkatkan peluang panggilan wawancara dengan CV yang strategis.";
    let buttonText = user ? "Mulai Review Sekarang" : "Masuk & Langsung ke Review";

    let featureSectionTitle = "Apa yang Kami Review?";
    let featureSectionSubtitle = "Dapatkan evaluasi profesional pada aspek-aspek kunci CV Anda.";
    let reviewFeatures = [
        {
            icon: Icons.FileText,
            title: "Tinjauan Format & Struktur",
            description: "Memastikan layout CV Anda profesional, mudah dibaca (ATS-friendly), dan terstruktur secara logis."
        },
        {
            icon: Icons.Zap,
            title: "Optimasi Kata Kunci",
            description: "Menyesuaikan konten CV dengan kata kunci industri target agar lebih menonjol di mata perekrut."
        },
        {
            icon: Icons.UserCheck,
            title: "Fokus pada Pencapaian",
            description: "Mengubah deskripsi tugas menjadi pernyataan hasil yang berdampak dan kuantitatif."
        },
    ];

    if (isCounselor) {
        heroBadgeText = "Counselor Management";
        heroTitle = "CV Review Konselor";
        heroSubtitle = "Selamat datang, Konselor. Akses dan kelola daftar CV yang perlu ditinjau.";
        buttonText = "Akses Dashboard Review";

        featureSectionTitle = "Tugas & Metrik Konselor";
        featureSectionSubtitle = "Fokus utama Anda dalam mengelola layanan peninjauan CV.";

        reviewFeatures = [
            {
                icon: Icons.FileText,
                title: "Kelola Daftar Tunggu",
                description: "Lihat semua pengajuan CV dari pengguna yang menunggu untuk ditinjau."
            },
            {
                icon: Icons.Check,
                title: "Berikan Umpan Balik",
                description: "Lakukan review mendalam dan kirimkan umpan balik yang konstruktif."
            },
            {
                icon: Icons.Zap,
                title: "Lacak Kinerja",
                description: "Pantau metrik kecepatan dan kualitas peninjauan Anda."
            },
        ];
    }

    const ButtonComponent = user ? 'button' : Link;

    const buttonClassNames = `px-8 py-3.5 ${accentGreen} text-white font-bold rounded-xl shadow-lg ${hoverAccentGreen} transition-all transform hover:-translate-y-1 inline-flex items-center cursor-pointer`;

    return (
        <>
            <Head title={heroTitle} />

            <MainLayout user={user}>
                <div className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24 text-left relative">

                        <span className="inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest">
                            <heroIcon className="w-4 h-4 mr-2" />
                            {heroBadgeText}
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
                            {heroTitle}
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-4xl font-light">
                            {isCounselor ? heroSubtitle : (
                                <span>
                                    Kami membantu meninjau dan menyempurnakan CV-mu agar tampil lebih
                                    <span className="font-extrabold text-emerald-800"> rapi</span>,
                                    <span className="font-extrabold text-emerald-800"> relevan</span>, dan
                                    <span className="font-extrabold text-emerald-800"> menarik</span> di mata perekrut.
                                    Tingkatkan peluang panggilan wawancara dengan CV yang strategis.
                                </span>
                            )}
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

                <div className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-3xl">
                            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-2 inline-block">
                                {featureSectionTitle}
                            </h2>
                            <p className="text-gray-600 mt-4 text-lg">
                                {featureSectionSubtitle}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviewFeatures.map((feature, index) => (
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

export default CvReview;
