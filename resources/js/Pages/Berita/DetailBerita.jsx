import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';

export default function DetailBerita({ berita, auth }) {
    if (!berita) {
        return (
            <MainLayout user={auth.user}>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-500">Berita tidak ditemukan.</p>
                </div>
            </MainLayout>
        );
    }
    const images = berita.images && berita.images.length > 0 
        ? berita.images 
        : (berita.image_url ? [berita.image_url] : []);

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const formattedDate = new Date(berita.published_date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <MainLayout user={auth.user}>
            <Head title={berita.title} />

            {/* --- HEADER SECTION --- */}
            <div
                className="relative w-full min-h-[85vh] flex items-center justify-center py-20"
                style={{
                    backgroundImage: "url('/images/bg-dreamina.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay Gelap supaya teks kontras jika background terlalu terang/ramai */}
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    {/* Tombol Kembali */}
                    <div className="mb-6">
                        <Link
                            href={route('program.berita')}
                            className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-yarsi-green px-4 py-2 rounded-full shadow-lg transition-all transform hover:-translate-x-1 font-medium text-sm backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            Kembali ke Daftar Berita
                        </Link>
                    </div>

                    {/* Card Header (Glassmorphism) */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl border border-white/20">
                        <span className="inline-block px-3 py-1 bg-green-100 text-yarsi-green text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                            Berita & Kegiatan
                        </span>
                        
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            {berita.title}
                        </h1>

                        <div className="flex items-center text-gray-600 text-sm md:text-base font-medium space-x-4 mb-8">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                {formattedDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                Admin Pusat Karir
                            </span>
                        </div>

                        {/* --- SLIDESHOW COMPONENT --- */}
                        {images.length > 0 && (
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner bg-gray-100 group">
                                {/* Gambar */}
                                <img 
                                    src={images[currentSlide]}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        alt={berita.title}
                                />

                                {/* Tombol Navigasi (Hanya muncul jika gambar > 1) */}
                                {images.length > 1 && (
                                    <>
                                        <button 
                                            onClick={prevSlide}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                        <button 
                                            onClick={nextSlide}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </button>
                                        
                                        {/* Dots Indicator */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                            {images.map((_, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        
                        {/* Caption kecil di bawah slide */}
                        {images.length > 1 && (
                            <p className="text-center text-xs text-gray-500 mt-2">
                                Geser untuk melihat foto lainnya ({currentSlide + 1} dari {images.length})
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="bg-white py-16">
                <div className="container mx-auto max-w-4xl px-6 md:px-8">
                    {/* Deskripsi Singkat / Lead Paragraph */}
                    <div className="border-l-4 border-yarsi-green pl-6 mb-10">
                        <p className="text-xl md:text-2xl italic text-gray-700 font-serif leading-relaxed">
                            "{berita.description}"
                        </p>
                    </div>

                    {/* Konten Utama (Rich Text) */}
                    <article 
                        className="prose prose-lg prose-green max-w-none text-gray-800 leading-loose"
                        dangerouslySetInnerHTML={{ __html: berita.content }}
                    />
                    
                    <hr className="my-12 border-gray-200" />
                    
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">Bagikan berita ini:</p>
                        <div className="flex justify-center gap-4">
                            {/* Tombol Share Dummy */}
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Facebook</button>
                            <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 text-sm">Twitter</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm">WhatsApp</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </MainLayout>
    );
}