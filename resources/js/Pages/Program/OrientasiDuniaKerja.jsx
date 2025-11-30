import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

// ===================================
// KOMPONEN ORIENTASI DUNIA KERJA (ODK)
// ===================================
export default function OrientasiDuniaKerja(props) {

    const pageTitle = "Orientasi Dunia Kerja";

    // Data materi untuk ditampilkan
    const materiList = [
        {
            title: "Strategi Karir",
            desc: "Teknik jitu mencari peluang kerja dan memetakan jalur karir yang sesuai minat.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            )
        },
        {
            title: "Personal Branding",
            desc: "Bedah CV, Cover Letter, dan simulasi wawancara untuk menonjolkan potensi diri.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            )
        },
        {
            title: "Etika & Profesionalisme",
            desc: "Memahami budaya kerja, etika komunikasi, dan adaptasi di lingkungan korporat.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            )
        },
        {
            title: "Wirausaha & Studi Lanjut",
            desc: "Eksplorasi jalur alternatif: membangun bisnis sendiri atau melanjutkan pendidikan.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            )
        }
    ];

    // --- PALET WARNA (Emerald/Teal) ---
    const lightestBg = "emerald-50";

    return (
        <>
            <Head title={pageTitle} />

            <MainLayout user={props.auth.user}>

                {/* --- HERO SECTION --- */}
                <div className={`relative w-full h-[65vh] md:h-[550px] flex flex-col justify-center bg-gradient-to-br from-white to-emerald-50 overflow-hidden`}>

                    {/* Overlay pattern/dots */}
                    <div className="absolute inset-0 bg-[url('/images/dots.svg')] opacity-20"></div>

                    {/* Hero Content */}
                    <div className="relative z-10 container mx-auto px-6 lg:px-8">
                        <div className="max-w-4xl pt-16">
                            <span className={`inline-flex items-center text-sm font-semibold mb-4 text-emerald-600 tracking-wider`}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h16zM8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M6 13h12M9 13v4m6-4v4"></path>
                                </svg>
                                PEMBEKALAN KARIR & ALUMNI
                            </span>
                            <h1 className={`text-7xl md:text-7xl font-serif italic font-semibold text-gray-900 mb-6 leading-snug drop-shadow-sm`}>
                                {pageTitle}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl font-light">
                                Jembatan strategis bagi calon wisudawan untuk bertransformasi dari akademisi menjadi profesional yang siap bersaing.
                            </p>

                            <a href="#" className={`mt-10 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full shadow-xl text-white bg-emerald-600 hover:bg-emerald-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-100`}>
                                Mulai Pembekalan Karir
                                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* --- INTRODUCTION SECTION --- */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            {/* Image Content */}
                            <div className="order-1 lg:order-2 relative">
                                <div className="absolute inset-x-0 -bottom-10 h-1/2 bg-emerald-100 rounded-b-3xl transform -rotate-1 shadow-inner"></div>
                                <img
                                    src="/images/odk.jpg"
                                    alt="Suasana Orientasi Dunia Kerja"
                                    className="relative w-full rounded-3xl shadow-2xl border-8 border-white object-cover aspect-video hover:shadow-3xl transition-shadow duration-300 transform hover:rotate-1"
                                />
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500 rounded-tl-3xl rounded-br-3xl opacity-70 blur-sm"></div>
                            </div>

                            {/* Text Content */}
                            <div className="order-2 lg:order-1">
                                <h2 className={`text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6 border-l-4 border-emerald-600 pl-4`}>
                                    Siap Hadapi Transisi Dunia Kerja?
                                </h2>
                                <p className={`text-gray-900 text-lg leading-relaxed mb-6 text-justify`}>
                                    Orientasi Dunia Kerja adalah program pembekalan eksklusif yang dirancang oleh Puskaka-UY.
                                    Kami memahami bahwa transisi dari dunia kampus ke dunia profesional adalah fase krusial.
                                </p>
                                <p className={`text-gray-700 text-lg leading-relaxed mb-8 text-justify opacity-90`}>
                                    Melalui program ini, Anda tidak hanya mendapatkan teori, tetapi juga wawasan praktis mengenai
                                    peta persaingan industri saat ini. Kami mempersiapkan lulusan Universitas YARSI untuk menjadi
                                    individu yang adaptif, kompeten, dan memiliki nilai jual tinggi.
                                </p>

                                {/* Quote */}
                                <div className={`mt-8 p-6 bg-emerald-50 border-l-4 border-emerald-600 rounded-lg shadow-md`}>
                                    <p className={`text-gray-700 italic font-medium text-lg`}>
                                        <span className="text-2xl font-serif font-bold mr-2 text-emerald-600">"</span>
                                        Success occurs when opportunity meets preparation.
                                        <span className="text-2xl font-serif font-bold ml-2 text-emerald-600">"</span>
                                    </p>
                                    <span className="block text-sm text-gray-500 mt-2 text-right">- Seneca</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- KEY TOPICS (CARDS) SECTION --- */}
                <section className={`py-20 bg-gradient-to-br from-white to-emerald-50`}>
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className={`text-emerald-800 font-semibold uppercase tracking-widest mb-2 block`}>Kurikulum Puskaka</span>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Materi Pembekalan Inti</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {materiList.map((item, index) => (
                                <div key={index} className={`relative bg-white p-8 rounded-3xl shadow-xl border-t-4 border-emerald-500/0 hover:border-emerald-500 transform hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl`}>

                                    <div className={`w-14 h-14 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mb-5 shadow-inner`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA / CLOSING SECTION --- */}
                <section className={`py-20 bg-emerald-800 relative overflow-hidden`}>

                    {/* Pattern Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/bg-pattern-subtle-white.svg')] pointer-events-none"></div>

                    <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-white mb-6 drop-shadow-md">
                            Siap Memulai Karir Profesional Anda?
                        </h2>
                        <p className={`text-emerald-200 text-xl max-w-3xl mx-auto mb-10 font-light`}>
                            Dapatkan bekal terbaik dan jaringan eksklusif yang akan membawa Anda selangkah lebih maju.
                        </p>
                        <a href="#" className={`inline-flex items-center justify-center bg-emerald-600 text-white font-bold py-4 px-10 rounded-full hover:bg-emerald-600 transition-all transform hover:-translate-y-1 shadow-2xl shadow-emerald-500/50 text-lg`}>
                            Daftar & Hubungi Kami
                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2-3a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2V5z"></path></svg>
                        </a>
                    </div>
                </section>

                <Footer />

            </MainLayout>
        </>
    );
}
