import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
// MEMASTIKAN SEMUA IKON YANG DIGUNAKAN DIIMPORT
import { ArrowLeft, Calendar, User, Share2, CornerDownRight, Clock, ArrowRight } from 'lucide-react'; 

export default function DetailSeminar({ seminar, auth }) {
    
    // Konstanta Warna Tema
    const mainGreen = "text-emerald-700";
    const darkGreenBg = "bg-emerald-800";
    const accentColor = "bg-yellow-500"; 
    const lightestGreenBg = "bg-emerald-50";

    if (!seminar) {
        return (
            <MainLayout user={auth.user}>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-500">Seminar tidak ditemukan.</p>
                </div>
            </MainLayout>
        );
    }

    // Penanganan data gambar yang lebih aman
    const images = seminar.images && Array.isArray(seminar.images) && seminar.images.length > 0
        ? seminar.images
        : (seminar.image_url ? [seminar.image_url] : []);

    // State dan fungsi Slideshow tetap dipertahankan
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const formattedDate = new Date(seminar.published_date || seminar.date || new Date()).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <MainLayout user={auth.user}>
            <Head title={seminar.title} />

            {/* HEADER SECTION: Light Gradient for Content Focus */}
            <div className={`pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-white to-emerald-50 border-b border-emerald-200`}>
                <div className="container mx-auto px-6 max-w-6xl">
                    
                    {/* Back Button */}
                    <div className="mb-8 pt-4">
                        <Link
                            href={route('program.seminar')}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-700 transition-all font-medium text-sm uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke Daftar Seminar
                        </Link>
                    </div>

                    {/* Judul Detail */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-4">
                        {seminar.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center text-gray-600 text-sm md:text-base font-medium space-x-6 space-y-2 mt-4">
                        <span className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${mainGreen}`} />
                            Tanggal: {formattedDate}
                        </span>
                        <span className="flex items-center gap-2">
                            <User className={`w-4 h-4 ${mainGreen}`} />
                            Speaker: <span className="font-semibold text-gray-800">{seminar.speaker || 'Belum Ditentukan'}</span>
                        </span>
                        {seminar.time && (
                            <span className="flex items-center gap-2">
                                <Clock className={`w-4 h-4 ${mainGreen}`} />
                                Waktu: <span className="font-semibold text-gray-800">{seminar.time}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENT AND SLIDESHOW SECTION: Two Columns Layout */}
            <div className="bg-white py-16 md:py-20">
                <div className="container mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Kiri: Konten Utama (2/3 Kolom) */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* Slideshow/Featured Image */}
                        {images.length > 0 && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-100 group border border-gray-100">
                                <img
                                    src={images[currentSlide]}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                    alt={seminar.title}
                                />

                                {images.length > 1 && (
                                    <>
                                        {/* Navigation Arrows */}
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                                            {images.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${idx === currentSlide ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
                                                    onClick={() => setCurrentSlide(idx)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        
                        {/* Deskripsi Singkat */}
                        {seminar.description && (
                            <div className={`p-6 border-l-4 border-emerald-600 ${lightestGreenBg} rounded-r-lg shadow-sm`}>
                                <p className="text-xl md:text-2xl italic text-gray-800 font-serif leading-relaxed">
                                    "{seminar.description}"
                                </p>
                            </div>
                        )}
                        
                        {/* Konten Detail */}
                        {seminar.content && (
                            <article
                                className="prose prose-lg max-w-none text-gray-800 leading-loose border-t border-gray-100 pt-6"
                                dangerouslySetInnerHTML={{ __html: seminar.content }}
                            />
                        )}

                    </div>

                    {/* Kanan: Sidebar (1/3 Kolom) */}
                    <div className="lg:col-span-1 space-y-8 sticky top-24 h-fit">

                        {/* Tombol Pendaftaran/Link Eksternal */}
                        {seminar.registration_link && (
                            <div className="p-6 rounded-xl shadow-xl border border-gray-100 bg-white text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Bergabunglah Sekarang</h3>
                                <a
                                    href={seminar.registration_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full inline-flex items-center justify-center gap-3 px-8 py-4 ${accentColor} text-gray-900 font-extrabold text-lg rounded-xl shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-[1.01] uppercase tracking-wider`}
                                >
                                    Daftar Seminar
                                    <CornerDownRight className="w-5 h-5" />
                                </a>
                                <p className="text-sm text-gray-500 mt-3">Pastikan Anda sudah login untuk mendaftar.</p>
                            </div>
                        )}

                        {/* Bagikan */}
                        <div className="p-6 rounded-xl shadow-md border border-gray-100 bg-white">
                            <p className="text-gray-600 mb-4 font-semibold text-lg border-b border-gray-100 pb-3">
                                <Share2 className={`w-5 h-5 inline mr-2 ${mainGreen}`} />
                                Bagikan Informasi
                            </p>
                            <div className="flex justify-start gap-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 text-sm transition">Facebook</button>
                                <button className="px-4 py-2 bg-sky-500 text-white rounded-full shadow-sm hover:bg-sky-600 text-sm transition">Twitter</button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-sm hover:bg-green-600 text-sm transition">WhatsApp</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <Footer />
        </MainLayout>
    );
}