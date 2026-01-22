import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, MapPin, ArrowRight, Building2 } from 'lucide-react';

const CampusHiringCard = ({ latestCampusHiring = [] }) => {
    // Jika tidak ada data, jangan tampilkan section ini
    if (!latestCampusHiring || latestCampusHiring.length === 0) return null;

    const DEFAULT_IMAGE = '/images/campushiring.jpg'; 

    return (
        <section id="campus-hiring-section" className=" rounded-2xl h-full relative overflow-hidden">
             {/* Background Decor */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] bg-green-50 rounded-full blur-[80px] opacity-40"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Program Karier
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Hiring.</span>
                        </h2>
                    </div>
                    
                    <Link 
                        href={route('program.campus.hiring')} 
                        className="group flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                    >
                        Lihat Semua Jadwal
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {latestCampusHiring.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row h-full hover:-translate-y-1"
                        >
                            {/* Image Section */}
                            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-gray-100">
                                <img
                                    // Cek apakah imageSrc ada? Kalau null/kosong, langsung pakai Default.
                                    src={item.imageSrc ? item.imageSrc : DEFAULT_IMAGE}
                                    
                                    alt={item.company_name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    
                                    // Handle Error (Jika file ada tapi rusak/404)
                                    onError={(e) => { 
                                        e.target.onerror = null; // Mencegah infinite loop
                                        e.target.src = DEFAULT_IMAGE; 
                                    }}
                                />
                                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                
                                {/* Tanggal Badge */}
                                <div className="absolute top-4 left-4 sm:hidden">
                                    <span className="bg-white/90 backdrop-blur text-emerald-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                        {item.formatted_date}
                                    </span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-center relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building2 className="w-3 h-3 text-emerald-600" />
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest line-clamp-1">
                                        {item.company_name}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-2">
                                    {item.title}
                                </h3>

                                <div className="flex flex-col gap-2 mb-6 mt-auto">
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <Calendar className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                        {item.formatted_date}
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                                        <span className="line-clamp-1">{item.location}</span>
                                    </div>
                                </div>

                                <Link 
                                    href={route('program.campus.hiring.show', { id: item.id, slug: item.slug })}
                                    className="w-fit text-sm font-bold text-gray-900 flex items-center gap-2 group/btn transition-all"
                                >
                                    Detail Program
                                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover/btn:bg-emerald-600 group-hover/btn:border-emerald-600 group-hover/btn:text-white transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CampusHiringCard;