import React from 'react';
import { router, Head, Link, usePage } from '@inertiajs/react';
// Asumsikan MainLayout dan Footer berada di lokasi ini dan telah terdefinisi dengan benar
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { ArrowRight, Check, FileText, Zap, UserCheck } from 'lucide-react';

// --- KOMPONEN ICON ---
// Icons yang diimpor dari lucide-react sudah bisa digunakan langsung.
// Mendefinisikan ulang di sini tidak diperlukan, tapi saya akan pertahankan
// struktur ini untuk kemudahan referensi jika ada penyesuaian styling lebih lanjut.
const Icons = {
    Check: (props) => <Check {...props} />,
    FileText: (props) => <FileText {...props} />,
    Zap: (props) => <Zap {...props} />,
    UserCheck: (props) => <UserCheck {...props} />,
};

// --- HALAMAN UTAMA CV REVIEW ---
function CvReview(props) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Variabel warna untuk konsistensi
    const mainGreen = "text-emerald-800";
    const accentGreen = "bg-emerald-600";
    const hoverAccentGreen = "hover:bg-emerald-700"; // Tambahkan untuk konsistensi

    const handleMulaiSekarang = () => {
        // Gunakan router.get atau router.visit untuk navigasi Inertia
        router.get('/layanan/tabel-cv-review');
    };

    const loginRedirectUrl = '/login?redirect_to=/layanan/tabel-cv-review';

    const reviewFeatures = [
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

    const buttonText = user ? "Mulai Review Sekarang" : "Masuk & Langsung ke Review";
    // Menentukan komponen dinamis: button biasa atau Link Inertia
    // Link dari Inertiajs/react sudah meng-handle navigasi tanpa reload penuh
    const ButtonComponent = user ? 'button' : Link;

    // ClassName untuk Tombol Utama, diperbaiki dari template literal yang salah
    const buttonClassNames = `px-8 py-3.5 ${accentGreen} text-white font-bold rounded-xl shadow-lg ${hoverAccentGreen} transition-all transform hover:-translate-y-1 inline-flex items-center cursor-pointer`;
    // *BUG FIX*: ClassNames yang sebelumnya salah dalam template literal (tidak ada backtick di awal/akhir) telah diperbaiki.

    return (
        <>
            <Head title="Layanan CV Review" />

            {/* Pastikan MainLayout menerima prop user */}
            <MainLayout user={user}>
                {/* HERO SECTION */}
                <div className="pt-24 pb-24 relative overflow-hidden bg-gradient-to-br from-white to-emerald-100 border-b border-emerald-300">
                    {/* Background decoration (optional blob) */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>

                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24 text-left relative">

                        <span className="inline-flex items-center text-sm font-semibold mb-3 text-emerald-600 uppercase tracking-widest">
                            <Icons.FileText className="w-4 h-4 mr-2" />
                            Career Preparation
                        </span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold font-serif italic text-gray-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
                            CV Review
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-sans max-w-4xl font-light">
                            Kami membantu meninjau dan menyempurnakan CV-mu agar tampil lebih
                            <span className="font-extrabold text-emerald-800"> rapi</span>,
                            <span className="font-extrabold text-emerald-800"> relevan</span>, dan
                            <span className="font-extrabold text-emerald-800"> menarik</span> di mata perekrut.
                            Tingkatkan peluang panggilan wawancara dengan CV yang strategis.
                        </p>

                        <div className="mt-10">
                            {/* LOGIC FIX: Penanganan props pada ButtonComponent */}
                            <ButtonComponent
                                // Jika user L O G I N : Component adalah 'button', gunakan onClick
                                // Jika user B E L U M L O G I N : Component adalah Link, gunakan href
                                {...(user ? { onClick: handleMulaiSekarang } : { href: loginRedirectUrl })}
                                className={buttonClassNames}
                            >
                                {buttonText}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </ButtonComponent>
                        </div>

                    </div>
                </div>

                {/* FEATURES SECTION */}
                <div className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-3xl">
                            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-2 inline-block">
                                Apa yang Kami Review?
                            </h2>
                            <p className="text-gray-600 mt-4 text-lg">
                                Dapatkan evaluasi profesional pada aspek-aspek kunci CV Anda.
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
                                    {/* FIX: Perbaikan penggunaan template literal untuk className (backticks) */}
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

