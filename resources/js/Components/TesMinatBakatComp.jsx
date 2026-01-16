import React from 'react';
import { Link } from '@inertiajs/react';

const LAYANAN_TES = [
    {
        id: 1,
        judul: "Analisis Kepribadian Akurat",
        kategori: "Psikologi",
        deskripsi: "Mengukur preferensi kerja, gaya komunikasi, dan kecenderungan perilaku untuk menentukan lingkungan kerja yang paling cocok.",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        judul: "Identifikasi Potensi Unik",
        kategori: "Bakat",
        deskripsi: "Menyingkap bakat tersembunyi dan kekuatan alami (natural strength) yang dapat dioptimalkan menjadi keunggulan karir.",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        judul: "Rekomendasi Karir Personal",
        kategori: "Karir",
        deskripsi: "Mencocokkan profil minat dan bakatmu dengan database profesi industri terkini yang paling prospektif.",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    },
];

const TesMinatBakatComp = () => {
    return (
        <section id="layanan-tes" className="relative py-14 pb-8 bg-white overflow-hidden">

            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Layanan Persiapan Karir
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] font-serif">
                            Tes Minat <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                & Bakat.
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed text-left md:text-right font-medium">
                        Temukan potensi tersembunyi dan arah karir yang paling sesuai dengan kepribadianmu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {LAYANAN_TES.map((layanan) => (
                        <Link
                            key={layanan.id}
                            href={route('layanan.tes.minat.bakat')}
                            className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <img
                                    src={layanan.imageUrl}
                                    alt={layanan.judul}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute top-5 left-5 z-20">
                                    <span className="backdrop-blur-xl bg-white/90 text-emerald-800 border border-white/40 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {layanan.kategori}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow relative">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors font-serif">
                                    {layanan.judul}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {layanan.deskripsi}
                                </p>

                                <div className="pt-6 border-t border-gray-100 mt-auto">
                                    <div className="text-sm font-bold text-emerald-600 group-hover:text-emerald-800 transition-colors flex items-center gap-2">
                                        Pelajari Selengkapnya
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TesMinatBakatComp;
