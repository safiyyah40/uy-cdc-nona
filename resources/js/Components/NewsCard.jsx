import React from 'react';
import NewsCard from '@/Components/NewsCard';
import { Link } from '@inertiajs/react';

const BeritaSection = ({ latestNews = [] }) => {
    return (
        <section className="bg-gray-50 py-16 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-300 pb-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-kaisei mb-2">
                            Berita <span className="text-green-600">Terbaru</span>
                        </h2>
                        <p className="text-gray-600">
                            Update terkini seputar kegiatan akademik dan kemahasiswaan.
                        </p>
                    </div>

                    <Link 
                        href={route('program.berita')} 
                        className="hidden md:inline-flex items-center font-semibold text-green-600 hover:text-green-800 transition-colors mt-4 md:mt-0"
                    >
                        Lihat Semua Arsip &rarr;
                    </Link>
                </div>

                {/* Grid Content */}
                {latestNews && latestNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestNews.map((item) => (
                            // PANGGIL NEWSCARD DISINI
                            <NewsCard 
                                key={item.id}
                                title={item.title}
                                imageSrc={item.image_url}
                                date={item.formatted_date}
                                link={route('berita.show', { id: item.id, slug: item.slug })}
                            />
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