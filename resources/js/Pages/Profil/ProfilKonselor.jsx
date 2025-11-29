import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn'; 

// --- ICON COMPONENTS ---
const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
    CheckBadge: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
    ),
    Building: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    Sparkles: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
    Calendar: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    ArrowRight: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    ),
    Users: () => (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    TeamIcon: () => (
        <svg className="w-24 h-24 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
    )
};

// --- KOMPONEN KARTU KONSELOR ---
function CounselorCard({ name, title, faculty, expertise, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1); 
    const [imageError, setImageError] = useState(false);

    return (
        <div 
            ref={ref} 
            style={style} 
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 hover:border-yarsi-accent/30 
                       overflow-hidden transition-all duration-500 hover:-translate-y-2 w-full"
        >
            {/* Header dengan Foto Profil */}
            <div className="relative">
                {/* Background Pattern*/}
                <div className="h-36 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-yarsi-green-dark relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full"></div>
                    
                    {/* Verified Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 
                                    flex items-center gap-1.5 shadow-lg border border-yarsi-green/20">
                        <div className="text-yarsi-green">
                            <Icons.CheckBadge />
                        </div>
                        <span className="text-xs font-bold text-yarsi-green-dark">Terverifikasi</span>
                    </div>
                </div>

                {/* Foto Profil - Floating */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-xl ring-4 ring-white 
                                        group-hover:ring-yarsi-accent/20 transition-all duration-300">
                            <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src={!imageError && photoUrl ? photoUrl : '/images/placeholder-avatar.png'}
                                    alt={name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={() => setImageError(true)}
                                />
                            </div>
                        </div>
                        {/* Status Online Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yarsi-accent rounded-full border-4 border-white 
                                      shadow-lg group-hover:scale-110 transition-transform"></div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="pt-20 pb-6 px-6">
                {/* Nama & Gelar */}
                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold font-kaisei text-gray-900 mb-2 group-hover:text-yarsi-green 
                                 transition-colors leading-tight">
                        {name}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg mb-3 border border-gray-100">
                        <div className="text-yarsi-green">
                            <Icons.Academic />
                        </div>
                        <span className="text-sm font-semibold text-yarsi-green-light">{title}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yarsi-accent to-transparent mx-auto mb-4"></div>

                {/* Info Tambahan */}
                <div className="space-y-2.5 text-sm">
                    {faculty && (
                        <div className="flex items-start gap-2.5 text-gray-600">
                            <div className="mt-0.5 text-yarsi-green">
                                <Icons.Building />
                            </div>
                            <span className="leading-relaxed">{faculty}</span>
                        </div>
                    )}
                    
                    {expertise && (
                        <div className="flex items-start gap-2.5 text-gray-600">
                            <div className="mt-0.5 text-yarsi-green">
                                <Icons.Sparkles />
                            </div>
                            <span className="leading-relaxed">{expertise}</span>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link
                        href="/layanan/konsultasi"
                        className="flex items-center justify-center gap-2 w-full bg-yarsi-gradient-button
                                 hover:brightness-110 text-white font-semibold py-3 px-4 rounded-xl 
                                 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    >
                        <Icons.Calendar />
                        <span>Lihat Jadwal</span>
                        <div className="group-hover/btn:translate-x-1 transition-transform">
                            <Icons.ArrowRight />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="bg-gray-50 py-3 border-t border-gray-100">
                <div className="text-center text-xs font-bold text-yarsi-green tracking-wider uppercase">
                    Universitas YARSI
                </div>
            </div>
        </div>
    );
}

// --- HALAMAN UTAMA ---
export default function ProfilKonselor({ counselors }) { 
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const heroImage = useScrollFadeIn(0.4);

    return (
        <MainLayout>
            <Head title="Profil Konselor - CDC YARSI" />
            
            {/* --- HERO SECTION --- */}
            <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-gray-50">
                
                {/* Dekorasi Latar Belakang */}
                <div className="absolute inset-0 opacity-[0.05]" 
                     style={{ backgroundImage: 'radial-gradient(circle, #044732 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-accent/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yarsi-green/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply animate-blob animation-delay-2000"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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
                                Career Development Center
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 font-kaisei mb-6 leading-tight">
                                Tim Konselor <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yarsi-green to-yarsi-accent">
                                    Profesional
                                </span>
                            </h1>
                            
                            {/* Description */}
                            <p 
                                ref={heroText.ref} 
                                style={heroText.style} 
                                className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8"
                            >
                                Kami memiliki konselor terbaik yang tidak hanya berkompeten, tetapi juga peduli pada perkembangan mahasiswa YARSI. Dengan pendekatan personal, kami siap mendampingi langkah akademik maupun karir Anda.
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8 max-w-md mx-auto lg:mx-0">
                                <div>
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">{counselors?.length || 0}+</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Konselor</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-3xl font-bold font-kaisei text-yarsi-green">100%</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">Terverifikasi</div>
                                </div>
                                <div className="border-l border-gray-200 pl-4">
                                    <div className="text-xl font-bold font-kaisei text-yarsi-green mt-1">1-on-1</div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">Bimbingan</div>
                                </div>
                            </div>
                        </div>

                        {/* --- (VISUAL CARD) */}
                        <div className="lg:w-1/2 relative w-full" ref={heroImage.ref} style={heroImage.style}>
                            {/* Card Background menggunakan Yarsi Green */}
                            <div className="aspect-[4/3] relative rounded-[2rem] overflow-hidden shadow-2xl bg-yarsi-green flex items-center justify-center p-8 border-[6px] border-white ring-1 ring-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yarsi-accent to-transparent"></div>
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/pattern-dot.png')", backgroundSize: '20px' }}></div>
                                
                                <div className="relative z-10 text-center transform hover:scale-105 transition-transform duration-300">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-lg relative">
                                        <div className="absolute -top-3 -right-3 bg-yarsi-accent text-white p-1.5 rounded-lg shadow-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                        </div>
                                        <Icons.TeamIcon />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 font-kaisei tracking-wide">CDC YARSI</h3>
                                    <div className="h-1 w-12 bg-yarsi-accent mx-auto rounded-full mb-2"></div>
                                    <p className="text-emerald-100 text-sm font-medium tracking-wider">Informatics & Career</p>
                                </div>

                                <div className="absolute bottom-8 left-8 flex items-center gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white">
                                    <div className="bg-green-100 p-1.5 rounded-full text-yarsi-green">
                                        <Icons.CheckBadge />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Status</div>
                                        <div className="text-xs font-bold text-gray-900">Professional</div>
                                    </div>
                                </div>
                            </div>
                            {/* Elemen Dekoratif di belakang Card */}
                            <div className="absolute -z-10 top-10 -right-10 w-full h-full border-2 border-yarsi-green/20 rounded-[2rem] transform rotate-6"></div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- LIST KONSELOR SECTION --- */}
            <section className="py-20 lg:py-28 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/0 via-yarsi-green/5 to-gray-50/0"></div>
                
                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 max-w-6xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-kaisei text-gray-900 mb-3">
                            Berkenalan dengan Konselor Kami!
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-yarsi-green to-yarsi-accent mx-auto rounded-full mb-6"></div>
                    </div>

                    {/* Grid Konselor */}
                    {counselors && counselors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {counselors.map((counselor) => (
                                <CounselorCard
                                    key={counselor.id}
                                    name={counselor.name}
                                    title={counselor.title}
                                    faculty={counselor.faculty}
                                    expertise={counselor.expertise}
                                    photoUrl={counselor.photo_url}
                                />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="max-w-md mx-auto">
                            <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                                <div className="text-gray-400 mb-6 mx-auto w-fit">
                                    <Icons.Users />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Data Konselor</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Data konselor sedang diperbarui oleh admin. Silakan cek kembali nanti.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* --- CTA SECTION (Gradient YARSI) --- */}
            <section className="py-20 bg-gradient-to-br from-yarsi-green via-yarsi-green-light to-cdc-green-dark relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 lg:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold font-kaisei text-white mb-4">
                            Siap Konsultasi dengan Ahli?
                        </h2>
                        <p className="text-emerald-50 text-lg mb-8 font-light">
                            Booking sesi konsultasi Anda sekarang dan dapatkan bimbingan profesional.
                        </p>
                        <Link
                            href="/layanan/konsultasi"
                            className="inline-flex items-center gap-3 bg-white text-yarsi-green font-bold py-4 px-8 
                                     rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl 
                                     transform hover:-translate-y-1 group"
                        >
                            <Icons.Calendar />
                            <span>Lihat Jadwal Konsultasi</span>
                            <div className="group-hover:translate-x-1 transition-transform">
                                <Icons.ArrowRight />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            
            <Footer />
        </MainLayout>
    );
}