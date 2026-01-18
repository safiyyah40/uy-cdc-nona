import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

// Lokasi path gambar buat banner campus hiring
const CAMPUS_HIRING_IMAGE = "/images/campushiring.jpg";

// Data dummy buat keperluan testing tampilan sebelum ditarik dari database
const DUMMY_HIRING = [
    {
        id: 1,
        perusahaan: "PT. Teknologi Bangsa",
        posisi: "Software Engineer Development Program",
        lokasi: "Jakarta Pusat",
        tanggal: "24 Des 2025",
        imageUrl: CAMPUS_HIRING_IMAGE,
    },
    {
        id: 2,
        perusahaan: "Bank Syariah Mandiri",
        posisi: "Officer Development Program (ODP)",
        lokasi: "Surabaya",
        tanggal: "28 Des 2025",
        imageUrl: CAMPUS_HIRING_IMAGE,
    },
];

/**
 * Komponen Section Campus Hiring
 * Nampilin list info lowongan kerja kampus dengan gaya grid horizontal (2 kolom di layar gede).
 */
const CampusHiringCard = () => {
    return (
        <section id="campus-hiring-section" className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

                {/* Header: Judul section dan link buat liat semua jadwal */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Program Pembekalan
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Hiring.</span>
                        </h2>
                    </div>
                    <a href="/program/campus-hiring" className="group flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                        Lihat Semua Jadwal
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Bagian List Kartu: Looping data dari array DUMMY_HIRING */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {DUMMY_HIRING.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col sm:flex-row"
                        >
                            {/* Gambar di sisi kiri (sm:w-2/5) dengan efek zoom pas hover */}
                            <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                                <img
                                    src={item.imageUrl}
                                    alt={item.perusahaan}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/059669/ffffff?text=Campus+Hiring'; }}
                                />
                                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            {/* Info detail lowongan: Nama perusahaan, posisi, tanggal, dan lokasi */}
                            <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                                    {item.perusahaan}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                                    {item.posisi}
                                </h3>

                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                                        {item.tanggal}
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                                        {item.lokasi}
                                    </div>
                                </div>

                                {/* Tombol interaktif buat liat detail program */}
                                <button className="w-fit text-sm font-bold text-gray-900 flex items-center gap-2 group/btn transition-all">
                                    Detail Program
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CampusHiringCard;
