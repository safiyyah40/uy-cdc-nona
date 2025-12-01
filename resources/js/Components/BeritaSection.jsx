import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Newspaper } from 'lucide-react';

const MAIN_GREEN = "text-emerald-700";

// --- KOMPONEN KARTU BERITA (Reused Style) ---
const CardBerita = ({ item }) => {
    return (
        <Link
            href={route('berita.show', { id: item.id, slug: item.slug })}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1 h-full"
        >
            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image"; }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">No Image</div>
                )}

                {/* Badge Tanggal */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-md border border-emerald-100">
                    {item.formatted_date}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                {/* Judul */}
                <h3 className={`text-xl font-bold ${MAIN_GREEN} mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-tight`}>
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.description}
                </p>

                {/* Footer Card */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                        {item.views}x Dilihat
                    </span>
                    <div className="flex items-center text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors group-hover:underline decoration-2 underline-offset-4">
                        Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- SECTION UTAMA UNTUK DASHBOARD ---
const BeritaSection = ({ latestNews = [] }) => {
    const displayNews = latestNews.slice(0, 4);

    return (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="inline-flex items-center text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
                            <Newspaper className="w-4 h-4 mr-2" />
                            Update Kampus
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                            Berita & Pengumuman <span className="text-emerald-700">Terbaru</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                            Dapatkan informasi terkini seputar kegiatan akademik, prestasi mahasiswa, dan pengumuman penting lainnya.
                        </p>
                    </div>

                    {/* Tombol Lihat Semua (Desktop) */}
                    <Link 
                        href={route('program.berita')} 
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all shadow-sm group"
                    >
                        Lihat Semua Arsip
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid Berita */}
                {displayNews && displayNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {displayNews.map((item) => (
                            <CardBerita key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">Belum ada berita terbaru saat ini.</p>
                    </div>
                )}

                {/* Tombol Lihat Semua (Mobile) */}
                <div className="mt-10 text-center md:hidden">
                    <Link
                        href={route('program.berita')}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm"
                    >
                        Lihat Semua Berita
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default BeritaSection;