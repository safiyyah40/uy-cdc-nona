import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, User, Share2, CornerDownRight, Clock, ArrowRight, MapPin, Building2, Wifi, CheckCircle, Timer, Copy } from 'lucide-react';

export default function DetailSeminar({ seminar, auth }) {
    if (!seminar) {
        return (
            <MainLayout user={auth?.user}>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-500 font-sans">Seminar tidak ditemukan.</p>
                </div>
            </MainLayout>
        );
    }

    // --- LOGIKA GAMBAR ---
    const images = seminar.images && Array.isArray(seminar.images) && seminar.images.length > 0
        ? seminar.images
        : (seminar.image_url ? [seminar.image_url] : []);

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // --- LOGIKA SHARE ---
    const [copied, setCopied] = useState(false);
    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Ikuti Seminar "${seminar.title}" di Universitas YARSI!`;
        let shareUrl = "";

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
                return;
            default:
                return;
        }

        if (platform !== 'copy') {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };

    // Helper Styles & Logic
    const isOnline = seminar.type === 'Online';
    const TypeIcon = isOnline ? Wifi : MapPin;

    return (
        <MainLayout user={auth?.user}>
            <Head title={seminar.title} />

            {/* --- HEADER SECTION --- */}
            <div className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-b border-emerald-100/50">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-green-light/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yarsi-accent/5 rounded-full blur-3xl" />

                {/* Container basic yang sudah dilebarkan */}
                <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 pt-4">
                        <Link
                            href={route('program.seminar')}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-yarsi-green transition-all font-medium text-sm group"
                        >
                            <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-yarsi-green transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="uppercase tracking-wider text-xs">Kembali ke Daftar Seminar</span>
                        </Link>
                    </div>

                    {/* Badge Tipe & Waktu Post */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${isOnline
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}>
                            <TypeIcon className="w-3.5 h-3.5 mr-2" />
                            {seminar.type || 'Event'}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-400 font-medium">
                            <Timer className="w-3.5 h-3.5 mr-1.5" />
                            Diposting {seminar.posted_at}
                        </span>
                    </div>

                    {/* Judul Utama */}
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
                        {seminar.title}
                    </h1>

                    {/* Info Grid (Date, Loc, Speaker, Organizer) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
                        {/* Waktu */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 text-yarsi-green rounded-xl">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Tanggal & Waktu</p>
                                <p className="font-bold text-gray-800">{seminar.date}</p>
                                <p className="text-sm text-gray-600 font-medium mt-0.5 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> {seminar.time}
                                </p>
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Lokasi</p>
                                <p className="font-bold text-gray-800 leading-snug">{seminar.location}</p>
                                <p className="text-xs text-gray-500 mt-1">{isOnline ? 'Platform Daring' : 'Tatap Muka'}</p>
                            </div>
                        </div>

                        {/* Pembicara */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Narasumber</p>
                                <p className="font-bold text-gray-800">{seminar.speaker}</p>
                            </div>
                        </div>

                        {/* Penyelenggara */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Penyelenggara</p>
                                <p className="font-bold text-gray-800">{seminar.organizer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-[90rem] grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">

                        {(images.length > 0 || seminar.image_url) && (
                            <div className="relative w-full md:w-4/5 mx-auto aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                <img
                                    // Ambil gambar pertama dari array images, atau fallback ke image_url
                                    src={images.length > 0 ? images[0] : seminar.image_url}
                                    className="w-full h-full object-contain bg-gray-50"
                                    alt={seminar.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        // Fallback image jika gambar rusak/tidak ada
                                        e.target.src = "https://placehold.co/600x800/f3f4f6/9ca3af?text=Poster+Tidak+Tersedia";
                                    }}
                                />
                            </div>
                        )}

                        {/* Description */}
                        {seminar.description && (
                            <div className="p-8 bg-gradient-to-r from-emerald-50 to-white rounded-3xl border border-emerald-100/50 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-yarsi-green" />
                                <h3 className="font-kaisei font-bold text-2xl text-yarsi-green-dark mb-4">Tentang Acara</h3>
                                <p className="text-lg text-gray-700 leading-relaxed font-sans">
                                    {seminar.description}
                                </p>
                            </div>
                        )}

                        {/* Benefits */}
                        {seminar.benefits && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Benefit Peserta</h3>
                                </div>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{ __html: seminar.benefits }}
                                />
                            </div>
                        )}

                        {/* Full Content */}
                        {seminar.content && (
                            <div className="space-y-6">
                                <h3 className="font-kaisei font-bold text-3xl text-gray-900 border-l-4 border-yarsi-accent pl-4">
                                    Detail Lengkap
                                </h3>

                                <div className="font-sans text-gray-900">
                                    <div
                                        className="content-body"
                                        dangerouslySetInnerHTML={{ __html: seminar.content }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">

                            {/* CTA Card */}
                            <div className="bg-white p-1 rounded-3xl shadow-xl border border-gray-100 relative group">
                                <div className="absolute inset-0 bg-yarsi-gradient-button rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                                <div className="relative bg-white p-6 rounded-[22px] text-center overflow-hidden">
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 z-0" />

                                    <div className="relative z-10">
                                        <h3 className="font-kaisei font-bold text-2xl text-yarsi-green-dark mb-2">Tertarik Bergabung?</h3>
                                        <p className="text-gray-500 text-sm mb-6 font-sans">Jangan lewatkan kesempatan berharga ini. Daftar segera!</p>

                                        {seminar.registration_link ? (
                                            <a
                                                href={seminar.registration_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-yarsi-accent text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <span>Daftar Sekarang</span>
                                                <CornerDownRight className="w-5 h-5" />
                                            </a>
                                        ) : (
                                            <div className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-xl border border-gray-200 cursor-not-allowed">
                                                Pendaftaran Ditutup
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Share Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Share2 className="w-5 h-5 text-yarsi-green" />
                                    <h4 className="font-bold text-gray-900 font-kaisei text-lg">Bagikan Informasi</h4>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => handleShare('whatsapp')}
                                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-xl transition-all font-bold text-sm group"
                                    >
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all" />
                                        WhatsApp
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-xl transition-all font-bold text-sm"
                                        >
                                            Facebook
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-black/5 text-black hover:bg-black hover:text-white rounded-xl transition-all font-bold text-sm"
                                        >
                                            X / Twitter
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleShare('copy')}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 hover:bg-gray-200 rounded-xl transition-all font-medium text-sm border border-gray-200"
                                    >
                                        {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Tautan Tersalin!' : 'Salin Tautan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
}