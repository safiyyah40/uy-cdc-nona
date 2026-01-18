/**
 * Komponen ODKCard (Orientasi Dunia Kerja)
 * Menampilkan grid materi pembekalan karir dengan efek hover kartu 3D dan background dekoratif.
 */
import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { ArrowRight, Calendar, MapPin, Briefcase } from 'lucide-react';

const ODKCard = ({ latestODK = [] }) => {
    const { auth } = usePage().props;
    const isGuest = !auth.user;

    // Fungsi handle klik kartu
    const handleCardClick = (id, slug) => {
        if (isGuest) {
            router.visit(route('login'));
        } else {
            router.visit(route('program.odk.show', { id, slug }));
        }
    };

    return (
        <section id="odk-section" className="relative py-20 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Program Pembekalan
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Orientasi <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                Dunia Kerja.
                            </span>
                        </h2>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                         <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed text-left md:text-right">
                            Persiapan strategis untuk membantu calon lulusan bertransformasi menjadi profesional yang kompeten.
                        </p>
                        
                        {/* TOMBOL LIHAT SEMUA (DESKTOP) */}
                        <Link
                            href={route('program.odk.index')}
                            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                        >
                            Lihat Semua Program
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Grid Kartu */}
                {latestODK && latestODK.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestODK.map((materi) => (
                            <div
                                key={materi.id}
                                onClick={() => handleCardClick(materi.id, materi.slug)}
                                className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer hover:-translate-y-2"
                            >
                                {/* Image Wrapper */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                    <img
                                        src={materi.imageUrl}
                                        alt={materi.judul}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/odk.jpg"; 
                                        }}
                                    />

                                    {/* Badge Kategori */}
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="backdrop-blur-xl bg-white/90 text-emerald-800 border border-white/40 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                                            {materi.kategori}
                                        </span>
                                    </div>
                                    
                                    {/* Info Tanggal & Lokasi (Overlay) */}
                                    <div className="absolute bottom-5 left-5 z-20 text-white text-xs font-medium flex flex-col gap-1">
                                        {materi.date && (
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                                                <span>{materi.date}</span>
                                            </div>
                                        )}
                                        {materi.location && (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                                                <span className="truncate max-w-[200px]">{materi.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow relative">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                                        {materi.judul}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {materi.deskripsi}
                                    </p>

                                    {/* Action */}
                                    <div className="pt-6 border-t border-gray-100 mt-auto">
                                        <div className="text-sm font-bold text-emerald-600 group-hover:text-emerald-800 transition-colors flex items-center gap-2">
                                            {isGuest ? "Login untuk Detail" : "Pelajari Materi"}
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-16 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Belum Ada Program</h3>
                        <p className="text-gray-500">Nantikan program orientasi terbaru dari kami.</p>
                    </div>
                )}

                 {/* Tombol Lihat Semua (Mobile) */}
                 <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('program.odk.index')}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm"
                    >
                        Lihat Semua Program
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ODKCard;