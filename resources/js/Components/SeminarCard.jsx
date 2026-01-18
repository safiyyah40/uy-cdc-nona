/**
 * Komponen SeminarCard
 * Menampilkan daftar agenda seminar terbaru dalam bentuk kartu interaktif dengan indikator tipe event (Online/Offline).
 */
import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, Wifi, ArrowRight, BookOpen } from 'lucide-react';

const SeminarCard = ({ seminars = [] }) => {
    if (!seminars || seminars.length === 0) return null;

    return (
        <section id="seminar-section" className="relative py-20 bg-white overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[110px] opacity-50 mix-blend-multiply"></div>
                <div className="absolute bottom-[0%] right-[-5%] w-[450px] h-[450px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Program Pembekalan
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                            Agenda <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                Seminar Terbaru.
                            </span>
                        </h2>
                    </div>
                    <div className="md:text-right">
                        <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed mb-4">
                            Tingkatkan wawasan dan kompetensi melalui rangkaian seminar eksklusif kami.
                        </p>
                        <Link
                            href={route('program.seminar')}
                            className="group inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 transition-all"
                        >
                            Eksplorasi Semua
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Grid Kartu Seminar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {seminars.slice(0, 3).map((item) => {
                        const isOnline = item.type === 'Online';

                        return (
                            <Link
                                key={item.id}
                                href={route('program.seminar')} // Arahkan ke list atau detail
                                className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-2"
                            >
                                {/* Media Section */}
                                <div className="relative h-60 w-full overflow-hidden">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.currentTarget.src="https://placehold.co/600x400/f1f5f9/059669?text=Seminar+YARSI";
                                        }}
                                    />

                                    {/* Type Badge */}
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="backdrop-blur-xl bg-white/90 text-gray-800 border border-white/40 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                            {isOnline ? <Wifi className="w-3 h-3 text-sky-500" /> : <MapPin className="w-3 h-3 text-orange-500" />}
                                            {item.type || 'Event'}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-4 bg-emerald-50 w-fit px-3 py-1 rounded-lg">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {item.date}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                                        {item.title.replace(/^"|"$/g, '')}
                                    </h3>

                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-gray-400 group-hover:text-emerald-600 transition-colors">
                                        <span className="text-sm font-bold">Lihat Detail</span>
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SeminarCard;
