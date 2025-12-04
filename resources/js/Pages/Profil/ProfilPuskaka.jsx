import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Autoplay, Parallax, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Newspaper, Users, Camera, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';

// --- KOMPONEN KARTU TIM ---
function PuskakaTeamCard({ name, title, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1);

    return (
        <div
            ref={ref}
            style={style}
            className="group relative w-full max-w-[300px] mx-auto bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 border border-gray-100 hover:border-yarsi-green/30 transition-all duration-500 hover:-translate-y-2"
        >
            {/* --- CONTAINER FOTO --- */}
            <div className="relative w-full aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50 animate-pulse"></div>

                <img
                    src={photoUrl || '/images/placeholder-avatar.png'}
                    alt={`Foto ${name}`}
                    className="relative z-10 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = '/images/placeholder-avatar.png';
                        e.target.previousSibling.classList.remove('animate-pulse');
                    }}
                />

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-yarsi-green-dark/90 via-yarsi-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 z-30 w-full h-1.5 bg-gradient-to-r from-yarsi-green via-yarsi-accent to-yarsi-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

            {/* --- CONTAINER TEXT --- */}
            <div className="p-6 text-center relative bg-white transition-colors duration-500 group-hover:bg-emerald-50/30">
                <h3 className="text-lg md:text-xl font-bold font-kaisei text-gray-900 group-hover:text-yarsi-green-dark transition-colors duration-300 leading-tight mb-2">
                    {name}
                </h3>
                <div className="mt-4 flex justify-center">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-100/80 text-yarsi-green-dark border border-emerald-200/50 group-hover:bg-yarsi-green group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        <p className="text-[11px] font-bold uppercase tracking-wider leading-none">
                            {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- KOMPONEN UTAMA ---
export default function ProfilPuskaka({ teamMembers = [], photos = [] }) {
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const heroImage = useScrollFadeIn(0.4);
    const teamTitle = useScrollFadeIn(0.2);
    const { auth } = usePage().props;
    const targetUrl = auth?.user
        ? '/dashboard#layanan-tes'
        : '/#layanan-tes';

    return (
        <>
            <MainLayout>
                <Head title="Profil Puskaka UY - CDC Universitas YARSI" />

                {/* --- HERO SECTION (TIDAK DIUBAH) --- */}
                <section className="relative w-full py-14 md:py-20 -mt-10 md:-mt-32 bg-gradient-to-br from-white to-emerald-50 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: 'radial-gradient(circle, #044732 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                    </div>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-accent/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yarsi-green/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob animation-delay-2000"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-yarsi-green/20 shadow-sm text-yarsi-green text-xs font-bold uppercase tracking-wider mb-6"
                                    ref={heroTitle.ref}
                                    style={heroTitle.style}
                                >
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yarsi-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yarsi-accent"></span>
                                    </span>
                                    Pusat Kemahasiswaan, Karir dan Alumni-UY
                                </div>

                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 font-kaisei mb-6 leading-tight">
                                    Pusat Kemahasiswaan, Karir dan Alumni <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yarsi-green to-yarsi-accent">
                                        Universitas YARSI
                                    </span>
                                </h1>

                                <p
                                    ref={heroText.ref}
                                    style={heroText.style}
                                    className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8"
                                >
                                    Puskaka-UY (Pusat Kemahasiswaan, Karir, dan Alumni Universitas YARSI) adalah unit kerja di Bidang 1, Universitas YARSI yang bertugas mengelola berbagai layanan kemahasiswaan, pengembangan karir, dan hubungan alumni.
                                </p>

                                {/* Stats Grid */}
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
                                        <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">Mahasiswa & Alumni</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Jejaring Karir</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 relative w-full" ref={heroImage.ref} style={heroImage.style}>
                                <Swiper
                                    modules={[Navigation, Pagination, Mousewheel, Autoplay, Parallax, A11y]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    parallax={true}
                                    speed={1000}
                                    navigation
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    mousewheel={true}
                                    grabCursor={true}
                                    loop={true}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border-4 border-white/80 ring-1 ring-gray-100/50 transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out shadow-xl shadow-emerald-900/20 group aesthetic-pagination"
                                >
                                    <div slot="container-start" className="parallax-bg absolute inset-0 bg-cover bg-center" data-swiper-parallax="-23%"></div>
                                    {photos.map((photo) => (
                                        <SwiperSlide key={photo.id} className="overflow-hidden rounded-[2rem]">
                                            <div
                                                className="w-full h-full bg-cover bg-center transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                                style={{ backgroundImage: `url('/storage/${photo.image_path}')` }}
                                                data-swiper-parallax="-20%"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-yarsi-green-dark/80 via-yarsi-green/20 to-transparent mix-blend-overlay"></div>
                                                <div className="absolute inset-0 bg-black/10"></div>
                                            </div>
                                            <div
                                                className="absolute bottom-8 left-8 flex items-center gap-3 p-3 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 transition-all duration-300 hover:bg-white/90 hover:shadow-md hover:scale-105"
                                                data-swiper-parallax="-300"
                                                data-swiper-parallax-opacity="0.5"
                                            >
                                                <div className="bg-emerald-100/80 p-2 rounded-full text-yarsi-green shadow-inner">
                                                    <Newspaper className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-gray-500 uppercase font-semibold tracking-widest">Dokumentasi</div>
                                                    <div className="text-sm font-bold text-gray-900">{photo.title || "Kegiatan Puskaka"}</div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-yarsi-green/20 rounded-[2rem] transform rotate-6"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- STRUKTUR ORGANISASI --- */}
                <div className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
                    {/* Pattern Dot Halus */}
                    <div className="absolute inset-0 opacity-[0.4]"
                        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[80px] pointer-events-none"></div>
                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <div className="mb-14 max-w-4xl mx-auto text-center">
                            <h2
                                ref={teamTitle.ref}
                                style={teamTitle.style}
                                className="text-3xl font-bold text-gray-900 border-b-2 border-yarsi-accent/50 pb-2 inline-flex items-center font-kaisei"
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
                            <div className="text-center text-xl font-bold text-gray-600 p-10 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                                Belum ada data anggota tim yang tersedia.
                            </div>
                        )}
                    </div>
                </div>

                {/* --- CTA SECTION --- */}
                <section className="py-24 bg-gradient-to-br from-[#006241] to-[#004d33] relative overflow-hidden">

                    {/* Ornamen Lingkaran Abstrak */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full border-[20px] border-white/5 blur-sm"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full border-[30px] border-white/5 blur-sm"></div>

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    <div className="container mx-auto px-4 lg:px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl sm:text-5xl font-bold font-kaisei text-white mb-6 leading-tight">
                                Mulai Kembangkan Diri Anda!
                            </h2>
                            <p className="text-emerald-100 text-lg mb-10 font-light leading-relaxed">
                                Jangan lewatkan kesempatan untuk berkembang. Telusuri layanan kami untuk kemahasiswaan, karir, dan jejaring alumni sekarang juga.
                            </p>
                            <Link
                                href={targetUrl}
                                className="inline-flex items-center gap-3 bg-white text-yarsi-green-dark font-bold py-4 px-10 rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 group">
                                <span>Lihat Semua Layanan</span>
                                <div className="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-yarsi-green-dark" />
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