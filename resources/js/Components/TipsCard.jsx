import React from 'react';
import { Link } from '@inertiajs/react';
import { Lightbulb, ArrowRight, Clock, BookOpen } from 'lucide-react';

const TipsCard = ({ tips = [] }) => {
    // Jangan tampilkan section jika data kosong
    if (!tips || tips.length === 0) return null;

    return (
        <section id="tips-section" className="relative py-20 bg-white overflow-hidden">

            {/* Background Decor - Senada dengan SeminarCard */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[110px] opacity-50 mix-blend-multiply"></div>
                <div className="absolute bottom-[0%] left-[-5%] w-[450px] h-[450px] bg-blue-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                {/* Header Section - Mengikuti gaya SeminarCard */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4 border border-emerald-100">
                            <Lightbulb className="w-3.5 h-3.5" />
                            Insight & Career Advice
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Kembangkan Dirimu dengan <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-500">
                                Tips & Trik Pilihan.
                            </span>
                        </h2>
                    </div>
                    <div className="md:text-right">
                        <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed mb-4">
                            Tingkatkan wawasan karier dan soft skill melalui bacaan berkualitas dari para ahli.
                        </p>
                        <Link
                            href={route('program.tips-dan-trik')}
                            className="group inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-all"
                        >
                            Lihat Semua Artikel
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Grid Kartu Tips - Struktur mengikuti SeminarCard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.slice(0, 3).map((item) => (
                        <Link
                            key={item.id}
                            href={route('program.tips-dan-trik.show', { id: item.id, slug: item.slug })}
                            className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2"
                        >
                            {/* Media Section */}
                            <div className="relative h-60 w-full overflow-hidden">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src="https://placehold.co/600x400/f1f5f9/059669?text=Tips+Karir";
                                    }}
                                />

                                {/* Category Badge */}
                                <div className="absolute top-5 left-5 z-20">
                                    <span className="backdrop-blur-xl bg-white/90 text-gray-800 border border-white/40 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <BookOpen className="w-3 h-3 text-emerald-500" />
                                        {item.category || 'Career'}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-gray-400 text-xs font-bold mb-4">
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
                                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                        {item.reading_time || '5 mnt baca'}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                                    {item.title.replace(/^"|"$/g, '')}
                                </h3>

                                <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                    {item.summary}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-gray-400 group-hover:text-emerald-600 transition-colors">
                                    <span className="text-sm font-bold">Baca Selengkapnya</span>
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TipsCard;
