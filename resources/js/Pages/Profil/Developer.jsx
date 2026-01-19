import React, { useRef, useState, useCallback, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Autoplay, Parallax, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Saya tambahkan import icon sosmed
import { Users, Code, ArrowRight, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';

// KOMPONEN KARTU TIM (Diupdate untuk terima sosmed)
function PuskakaTeamCard({ name, title, photoUrl, npm, email, linkedin, github, instagram }) {
    const { ref, style } = useScrollFadeIn(0.1);

    return (
        <div
            ref={ref}
            style={style}
            className="group relative w-full max-w-[300px] mx-auto bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 border border-gray-100 hover:border-yarsi-green/30 transition-all duration-500 hover:-translate-y-2"
        >
            {/* CONTAINER FOTO */}
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

            {/* CONTAINER TEXT */}
            <div className="p-6 text-center relative bg-white transition-colors duration-500 group-hover:bg-emerald-50/30">
                <h3 className="text-lg md:text-xl font-bold font-kaisei text-gray-900 group-hover:text-yarsi-green-dark transition-colors duration-300 leading-tight mb-1">
                    {name}
                </h3>
                {npm && (
                    <p className="text-xs text-gray-500 font-medium leading-tight mb-2">
                        {npm}
                    </p>
                )}

                <div className="mt-3 flex justify-center">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-100/80 text-yarsi-green-dark border border-emerald-200/50 group-hover:bg-yarsi-green group-hover:text-white group-hover:border-transparent transition-all duration-300">
                        <p className="text-[11px] font-bold uppercase tracking-wider leading-none">
                            {title}
                        </p>
                    </div>
                </div>

                {/* ICON SOSMED (Ditambahkan dengan styling minimalis) */}
                <div className="flex justify-center gap-3 mt-4 pt-3 border-t border-gray-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {email && <a href={`mailto:${email}`} className="text-gray-400 hover:text-yarsi-green transition-colors hover:scale-110"><Mail size={16} /></a>}
                    {linkedin && <a href={linkedin} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors hover:scale-110"><Linkedin size={16} /></a>}
                    {github && <a href={github} target="_blank" className="text-gray-400 hover:text-gray-900 transition-colors hover:scale-110"><Github size={16} /></a>}
                    {instagram && <a href={instagram} target="_blank" className="text-gray-400 hover:text-pink-600 transition-colors hover:scale-110"><Instagram size={16} /></a>}
                </div>
            </div>
        </div>
    );
}

// Komponen utama (Menerima Props dari Backend)
export default function Developer({ teamMembers, photos }) {
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const heroImage = useScrollFadeIn(0.4);
    const teamTitle = useScrollFadeIn(0.2);
    const ctaRef = useScrollFadeIn(0.5);

    const targetUrl = '/';

    // Gunakan props dari database, atau array kosong jika belum ada data
    const memberList = teamMembers || [];
    const photoList = photos || [];

    return (
        <>
            <MainLayout>
                <Head title="Tentang Pengembang - Tim NONA" />

                {/* HERO SECTION */}
                <section className="relative w-full py-14 md:py-20 pt-28 md:pt-40 bg-gradient-to-br from-white to-emerald-50 overflow-hidden">
                    {/* Pattern dan Ornamen Background */}
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
                                    Pengembang Aplikasi Multi Platform
                                </div>

                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 font-kaisei mb-6 leading-tight">
                                    Kami Adalah Tim <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yarsi-green to-yarsi-accent">
                                        NONA
                                    </span>
                                </h1>

                                <p
                                    ref={heroText.ref}
                                    style={heroText.style}
                                    className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8"
                                >
                                    Tiga mahasiswi Teknik Informatika, Universitas YARSI, angkatan 2023. Proyek ini dibuat sebagai tugas mata kuliah Pengembangan Aplikasi Multi Platform.
                                </p>

                                {/* Stats Grid Dinamis */}
                                <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8 max-w-md mx-auto lg:mx-0">
                                    <div>
                                        <div className="text-3xl font-bold font-kaisei text-yarsi-green">{memberList.length || 3}</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Anggota Tim</div>
                                    </div>
                                    <div className="border-l border-gray-200 pl-4">
                                        <div className="text-3xl font-bold font-kaisei text-yarsi-green">2023</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Angkatan</div>
                                    </div>
                                    <div className="border-l border-gray-200 pl-4">
                                        <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">Teknik Informatika</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Jurusan</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/2 relative w-full" ref={heroImage.ref} style={heroImage.style}>
                                {/* Swiper Slider dengan Data Dinamis */}
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
                                    loop={photoList.length > 1}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    className="aspect-[4/3] relative rounded-[2rem] overflow-hidden border-4 border-white/80 ring-1 ring-gray-100/50 transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out shadow-xl shadow-emerald-900/20 group aesthetic-pagination"
                                >
                                    <div slot="container-start" className="parallax-bg absolute inset-0 bg-cover bg-center" data-swiper-parallax="-23%"></div>

                                    {/* MAPPING DATA SLIDE DARI BACKEND */}
                                    {photoList.length > 0 ? photoList.map((photo) => (
                                        <SwiperSlide key={photo.id} className="overflow-hidden rounded-[2rem]">
                                            <div
                                                className="w-full h-full bg-cover bg-center transform scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                                style={{ backgroundImage: `url(${photo.image_path})` }}
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
                                                    <Code className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-gray-500 uppercase font-semibold tracking-widest">Dokumentasi Proyek</div>
                                                    <div className="text-sm font-bold text-gray-900">{photo.title || "Proyek Pengembangan"}</div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )) : (
                                        // Fallback jika belum ada data slide di DB
                                        <SwiperSlide className="overflow-hidden rounded-[2rem]">
                                            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                                                <Code className="w-12 h-12 mb-2 opacity-20" />
                                                <span className="text-sm">Belum ada slide dokumentasi</span>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                                <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-yarsi-green/20 rounded-[2rem] transform rotate-6"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEKSI ANGGOTA TIM */}
                <div className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
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
                                Anggota Tim NONA
                            </h2>
                            <p className="text-gray-600 mt-3">Peran dan tanggung jawab dalam pengembangan aplikasi ini.</p>
                        </div>

                        {/* MAPPING DATA TIM DARI BACKEND */}
                        {memberList && memberList.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
                                {memberList.map((member) => (
                                    <PuskakaTeamCard
                                        key={member.id}
                                        name={member.name}
                                        title={member.title}
                                        photoUrl={member.photo_url}
                                        npm={member.npm}
                                        // Props Sosmed
                                        email={member.email}
                                        linkedin={member.linkedin_url}
                                        github={member.github_url}
                                        instagram={member.instagram_url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-xl font-bold text-gray-600 p-10 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                                Belum ada data anggota tim yang tersedia di Database.
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA SECTION (TETAP SAMA) */}
                <section className="py-24 bg-gradient-to-br from-[#006241] to-[#004d33] relative overflow-hidden" ref={ctaRef.ref} style={ctaRef.style}>
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full border-[20px] border-white/5 blur-sm"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full border-[30px] border-white/5 blur-sm"></div>
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                    <div className="container mx-auto px-4 lg:px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl sm:text-5xl font-bold font-kaisei text-white mb-6 leading-tight">
                                Proyek Kami Telah Selesai!
                            </h2>
                            <p className="text-emerald-100 text-lg mb-10 font-light leading-relaxed">
                                Senang dapat menyelesaikan tugas mata kuliah ini. Kunjungi halaman utama untuk melihat hasil akhir aplikasi.
                            </p>
                            <Link
                                href={targetUrl}
                                className="inline-flex items-center gap-3 bg-white text-yarsi-green-dark font-bold py-4 px-10 rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-2xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 group">
                                <span>Kembali ke Beranda</span>
                                <div className="bg-emerald-100 p-1.5 rounded-full group-hover:bg-emerald-200 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-yarsi-green-dark" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>
    );
}