import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';

// Animasi di Team Card
function PuskakaTeamCard({ name, title, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1); // Tambahkan hook animasi

    return (
        <div
            ref={ref}
            style={style}
            className="bg-white rounded-2xl shadow-lg p-4 text-center w-full max-w-[280px] mx-auto flex flex-col items-center
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <div className="relative w-full h-80 bg-[#FFF0E8] rounded-lg mb-4 overflow-hidden">
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
            <p className="text-gray-600 mt-1 whitespace-pre-line">{title}</p>
        </div>
    );
}

export default function ProfilPuskaka({ teamMembers, photos }) {
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const teamTitle = useScrollFadeIn(0.2);
    const galleryTitle = useScrollFadeIn(0.2);

    return (
        <>
            <Head title="Profil Puskaka-UY" />

            {/* Styling untuk Swiper */}
            <style>{`
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

            {/* Hero Section */}
            <section
                className="relative flex h-[500px] md:h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-cover bg-no-repeat bg-center pt-32 pb-40"
                style={{
                    backgroundImage: "url('/images/bg-dreamina.jpg')",
                }}
            >
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center">
             <div className="container mx-auto px-6 max-w-5xl text-center">
        <h1
            ref={heroTitle.ref}
            style={heroTitle.style}
            className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-black font-kaisei whitespace-nowrap"
        >
            Pusat Kemahasiswaan, Karir dan Alumni
        </h1>
        <p
            ref={heroText.ref}
            style={heroText.style}
            className="text-xl md:text-2xl leading-relaxed mt-8 text-gray-800 font-sans
                    font-light tracking-wide max-w-4xl mx-auto"
        >
            Puskaka-UY (Pusat Kemahasiswaan, Karir, dan Alumni Universitas YARSI) adalah unit kerja di Bidang 1, Universitas YARSI yang bertugas mengelola berbagai layanan kemahasiswaan, pengembangan karir, dan hubungan alumni. Puskaka-UY berperan sebagai pusat pembinaan aktivitas kemahasiswaan, penguatan soft skills, penyelenggaraan bimbingan karir, serta fasilitator jejaring alumni, guna mendukung terciptanya lulusan yang unggul, kompetitif, dan berdaya saing di tingkat nasional maupun internasional.
        </p>
    </div>
</div>
            </section>

            {/* Struktur Organisasi & Galeri */}
            <section
                className="bg-yarsi-green py-20 relative bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/bg-linear.jpg')",
                    backgroundPosition: 'top center',
                    backgroundSize: '100% auto',
                }}
            >
                <div className="container mx-auto px-4">

                    {/* BAGIAN STRUKTUR ORGANISASI */}
                    <h2
                        ref={teamTitle.ref}
                        style={teamTitle.style}
                        className="text-4xl font-bold text-white text-center mb-12"
                    >
                        Struktur Organisasi Puskaka
                    </h2>
                    {teamMembers && teamMembers.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-8 max-w-screen-lg mx-auto">
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
                        <div
                            ref={teamTitle.ref}
                            style={teamTitle.style}
                            className="text-center font-bold text-white"
                        >
                            Belum ada data anggota tim.
                        </div>
                    )}


                    {photos && photos.length > 0 && (
                        <div className="mt-20">

                            {/* Judul Galeri */}
                            <h2
                                ref={galleryTitle.ref}
                                style={galleryTitle.style}
                                className="text-4xl font-bold text-white text-center mb-12"
                            >
                                Dokumentasi Kegiatan Puskaka
                            </h2>

                            {/* Slider Container */}
                            <Swiper
                                modules={[Navigation, Pagination, Mousewheel]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                mousewheel={true}
                                grabCursor={true}
                                loop={true}
                                className="relative max-w-3xl mx-auto rounded-2xl shadow-xl"
                            >
                                {photos.map((photo) => (
                                    <SwiperSlide key={photo.id}>
                                        <img
                                            src={`/storage/${photo.image_path}`}
                                            alt={photo.title || 'Foto Galeri Puskaka'}
                                            className="w-full h-auto object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}

ProfilPuskaka.layout = (page) => <MainLayout children={page} />;
