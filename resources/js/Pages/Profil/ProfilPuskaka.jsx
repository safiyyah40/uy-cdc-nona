import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Newspaper, Users, Camera, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';

// --- DATA DUMMY---
const DUMMY_TEAM_MEMBERS = [
    {
        id: 1,
        name: "Dr. Aulia Sari, M.Psi",
        title: "Kepala Puskaka-UY\n(Pusat Kemahasiswaan, Karir, dan Alumni)",
        photo_url: "/images/placeholder-team-1.jpg"
    },
    {
        id: 2,
        name: "Bambang Kurniawan, S.E.",
        title: "Koordinator Layanan Karir & Alumni",
        photo_url: "/images/placeholder-team-2.jpg"
    },
    {
        id: 3,
        name: "Citra Dewi, S.I.Kom.",
        title: "Staf Administrasi & Dokumentasi",
        photo_url: "/images/placeholder-team-3.jpg"
    },
];

// --- DATA DUMMY ---
const DUMMY_PHOTOS = [
    { id: 1, title: 'Bimbingan Karir', image_path: 'puskaka/gallery-1.jpg' },
    { id: 2, title: 'Pelantikan Organisasi Mahasiswa', image_path: 'puskaka/gallery-2.jpg' },
    { id: 3, title: 'Reuni Akbar Alumni', image_path: 'puskaka/gallery-3.jpg' },
    { id: 4, title: 'Workshop Soft Skills', image_path: 'puskaka/gallery-4.jpg' },
];

// --- ICON DUMMY UNTUK KARTU VISUAL HERO  ---
const Icons = {
    TeamIcon: () => (
        <svg className="w-24 h-24 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
    )
};

// --- KOMPONEN KARTU TIM ---
function PuskakaTeamCard({ name, title, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1);

    return (
        <div
            ref={ref}
            style={style}
            className="bg-white rounded-xl shadow-md p-4 text-center w-full max-w-[280px] mx-auto flex flex-col items-center
                       transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] border border-gray-100"
        >
            <div className="relative w-full h-72 bg-emerald-50 rounded-lg mb-4 overflow-hidden">
                <img
                    src={photoUrl || '/images/placeholder-avatar.png'}
                    alt={`Foto ${name}`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                        e.target.src = '/images/placeholder-avatar.png';
                    }}
                />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-line font-medium">{title}</p>
        </div>
    );
}

// --- KOMPONEN UTAMA ---
export default function ProfilPuskaka({ teamMembers = DUMMY_TEAM_MEMBERS, photos = DUMMY_PHOTOS }) {
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const heroImage = useScrollFadeIn(0.4);
    const teamTitle = useScrollFadeIn(0.2);
    const galleryTitle = useScrollFadeIn(0.2);

    const mainGreen = "text-yarsi-green-dark";
    const accentColor = "text-yarsi-accent";
    const lightestGreenBg = "bg-gray-50";

    return (
        <>
            <Head title="Profil Puskaka-UY" />

            {/* Styling untuk Swiper (Dibiarkan sama) */}
            <style>{`
                /* ... (Styling Swiper yang sama) ... */
                .swiper-button-prev,
                .swiper-button-next {
                    color: #ffffff !important;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                    width: 44px !important;
                    height: 44px !important;
                    transition: background-color 0.2s;
                }
                .swiper-button-prev:hover,
                .swiper-button-next:hover {
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .swiper-button-prev::after,
                .swiper-button-next::after {
                    font-size: 1.25rem !important;
                    font-weight: 700;
                }
                .swiper-pagination-bullet {
                    background-color: #ffffff !important;
                    opacity: 0.6;
                    width: 10px;
                    height: 10px;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1;
                    transform: scale(1.2);
                }
            `}</style>

            <MainLayout>

                {/* BLOK 1: HERO SECTION (Mirip ProfilKonselor) */}
                <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-gray-50">

                    {/* Dekorasi Latar Belakang (Dicomot dari ProfilKonselor) */}
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: 'radial-gradient(circle, #044732 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    </div>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-accent/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yarsi-green/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob animation-delay-2000"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                            {/* KONTEN TEKS HERO */}
                            <div className="lg:w-1/2 text-center lg:text-left">

                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-yarsi-green/20 shadow-sm text-yarsi-green text-xs font-bold uppercase tracking-wider mb-6"
                                    ref={heroTitle.ref}
                                    style={heroTitle.style}
                                >
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yarsi-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yarsi-accent"></span>
                                    </span>
                                    PUSAT KEMAHASISWAAN, KARIR, DAN ALUMNI
                                </div>

                                {/* Main Heading */}
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 font-kaisei mb-6 leading-tight">
                                    Profil <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yarsi-green to-yarsi-accent">
                                        Puskaka-UY
                                    </span>
                                </h1>

                                {/* Description */}
                                <p
                                    ref={heroText.ref}
                                    style={heroText.style}
                                    className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8"
                                >
                                    Puskaka-UY (Pusat Kemahasiswaan, Karir, dan Alumni Universitas YARSI) adalah unit kerja di Bidang 1 yang bertugas mengelola berbagai layanan kemahasiswaan, pengembangan karir, dan hubungan alumni.
                                </p>

                                {/* Stats Grid (Disesuaikan untuk Puskaka) */}
                                <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8 max-w-md mx-auto lg:mx-0">
                                    <div>
                                        <div className="text-3xl font-bold font-kaisei text-yarsi-green">3</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Layanan Utama</div>
                                    </div>
                                    <div className="border-l border-gray-200 pl-4">
                                        <div className="text-3xl font-bold font-kaisei text-yarsi-green">100+</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Kegiatan Tahunan</div>
                                    </div>
                                    <div className="border-l border-gray-200 pl-4">
                                        <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">Alumni</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Jejaring Karir</div>
                                    </div>
                                </div>
                            </div>

                            {/* VISUAL CARD*/}
                            <div className="lg:w-1/2 relative w-full" ref={heroImage.ref} style={heroImage.style}>
                                <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl bg-yarsi-green flex items-center justify-center p-8 border-[6px] border-white ring-1 ring-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">

                                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yarsi-accent to-transparent"></div>
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/pattern-dot.png')", backgroundSize: '20px' }}></div>

                                    <div className="relative z-10 text-center transform hover:scale-105 transition-transform duration-300">
                                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-lg relative">
                                            <div className="absolute -top-3 -right-3 bg-yarsi-accent text-white p-1.5 rounded-lg shadow-sm">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <Icons.TeamIcon />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 font-kaisei tracking-wide">Puskaka UY</h3>
                                        <div className="h-1 w-12 bg-yarsi-accent mx-auto rounded-full mb-2"></div>
                                        <p className="text-emerald-100 text-sm font-medium tracking-wider">Kemahasiswaan & Alumni</p>
                                    </div>

                                    <div className="absolute bottom-8 left-8 flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white">
                                        <div className="bg-green-100 p-1.5 rounded-full text-yarsi-green">
                                            <Newspaper className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Unit Kerja</div>
                                            <div className="text-xs font-bold text-gray-900">Bidang 1</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Elemen Dekoratif di belakang Card */}
                                <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-yarsi-green/20 rounded-[2rem] transform rotate-6"></div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* BLOK 2: STRUKTUR ORGANISASI (Tetap) */}
                <div
                    className={`py-16 md:py-24 bg-white`}
                >
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="mb-14 max-w-4xl mx-auto text-center">
                            <h2
                                ref={teamTitle.ref}
                                style={teamTitle.style}
                                className={`text-3xl font-bold text-gray-900 border-b-2 border-yarsi-accent/50 pb-2 inline-flex items-center`}
                            >
                                <Users className="w-6 h-6 mr-2 text-yarsi-green" />
                                Struktur Organisasi
                            </h2>
                            <p className="text-gray-600 mt-3">Mengenal tim inti yang mengelola layanan Kemahasiswaan, Karir, dan Alumni.</p>
                        </div>

                        {teamMembers && teamMembers.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
                                {teamMembers.map((member) => (
                                    <PuskakaTeamCard
                                        key={member.id}
                                        name={member.name}
                                        title={member.title}
                                        photoUrl={member.photo_url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-xl font-bold text-gray-600 p-10">
                                Belum ada data anggota tim yang tersedia.
                            </div>
                        )}
                    </div>
                </div>

                {/* BLOK 3: GALERI DOKUMENTASI */}
                {photos && photos.length > 0 && (
                    <div className={`py-16 md:py-24 ${lightestGreenBg}`}>
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="mb-14 max-w-4xl mx-auto text-center">
                                <h2
                                    ref={galleryTitle.ref}
                                    style={galleryTitle.style}
                                    className={`text-3xl font-bold ${mainGreen} border-b-2 border-yarsi-accent/50 pb-2 inline-flex items-center`}
                                >
                                    <Camera className="w-6 h-6 mr-2 text-yarsi-green" />
                                    Dokumentasi Kegiatan
                                </h2>
                                <p className="text-gray-600 mt-3">Galeri foto kegiatan Puskaka bersama mahasiswa dan alumni.</p>
                            </div>

                            {/* Slider Container Swiper */}
                            <Swiper
                                modules={[Navigation, Pagination, Mousewheel]}
                                spaceBetween={15}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                mousewheel={true}
                                grabCursor={true}
                                loop={true}
                                className="relative max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden"
                            >
                                {photos.map((photo) => (
                                    <SwiperSlide key={photo.id}>
                                        <div className="aspect-[16/10] w-full">
                                            <img
                                                src={`/storage/${photo.image_path}`}
                                                alt={photo.title || 'Foto Galeri Puskaka'}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}

                {/* CTA SECTION (Dicomot dari ProfilKonselor) */}
                <section className="py-20 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-yarsi-green-dark relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 lg:px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold font-kaisei text-white mb-4">
                                Mulai Kembangkan Diri Anda!
                            </h2>
                            <p className="text-emerald-50 text-lg mb-8 font-light">
                                Telusuri layanan kami untuk kemahasiswaan, karir, dan jejaring alumni.
                            </p>
                            <Link
                                href="/layanan"
                                className="inline-flex items-center gap-3 bg-white text-yarsi-green font-bold py-4 px-8
                                            rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl
                                            transform hover:-translate-y-1 group"
                            >
                                <ArrowRight className="w-5 h-5" />
                                <span>Lihat Semua Layanan</span>
                                <div className="group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </MainLayout>
        </>
    );
}

ProfilPuskaka.layout = (page) => <MainLayout children={page} />;
