import React from 'react';
import { Link } from '@inertiajs/react';

// --- KOMPONEN KARTU ---
const CardBerita = ({ item }) => {
    return (
        <Link
            href={route('berita.show', { id: item.id, slug: item.slug })}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
        >
            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">No Image</div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-green-700 shadow-sm">
                    {item.formatted_date}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                    {item.description}
                </p>
                <div className="flex items-center text-green-600 font-semibold text-sm mt-auto">
                    Baca Selengkapnya <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
            </div>
        </Link>
    );
};

// --- SECTION DASHBOARD ---
const BeritaSection = ({ latestNews = [] }) => {
    return (
        <section className="bg-gray-50 py-16 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section (Judul) */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-300 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-kaisei mb-2">
                            Berita <span className="text-green-600">Terbaru</span>
                        </h2>
                        <p className="text-gray-600">
                            Update terkini seputar kegiatan akademik dan kemahasiswaan.
                        </p>
                    </div>

                    {/* Tombol Lihat Semua Desktop */}
                    <Link 
                        href={route('program.berita')} 
                        className="hidden md:inline-flex items-center font-semibold text-green-600 hover:text-green-800 transition-colors mt-4 md:mt-0"
                    >
                        Lihat Semua Arsip &rarr;
                    </Link>
                </div>

                {/* Grid Content (Layout SAMA PERSIS dengan BeritaIndex) */}
                {latestNews && latestNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {latestNews.map((item) => (
                            <CardBerita key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">Belum ada berita terbaru saat ini.</p>
                    </div>
                )}

                {/* Tombol Mobile */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href={route('program.berita')}
                        className="inline-block px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
                    >
                        Lihat Semua Berita
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default BeritaSection;