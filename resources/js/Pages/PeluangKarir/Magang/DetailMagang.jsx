import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Calendar, MapPin, Briefcase, Clock, ArrowLeft, ExternalLink, Share2, Building2, Wallet, Timer, CheckCircle, Copy, CornerDownRight, Image as ImageIcon } from 'lucide-react';

export default function DetailMagang({ auth, magang }) {
    // LOGIKA SHARE 
    const [copied, setCopied] = useState(false);
    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Lihat lowongan magang: ${magang.title} di ${magang.company}`;
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

    // Check deadline urgency
    const isDeadlineSoon = () => {
        const deadline = new Date(magang.deadline);
        const today = new Date();
        const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays > 0;
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <MainLayout user={auth?.user}>
            <Head title={`${magang.title} - Lowongan Magang`} />

            {/* --- HEADER SECTION --- */}
            <div className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-b border-emerald-100/50">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-yarsi-green-light/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yarsi-accent/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 pt-4">
                        <Link
                            href={route('magang.index')}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-yarsi-green transition-all font-medium text-sm group"
                        >
                            <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-yarsi-green transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="uppercase tracking-wider text-xs">Kembali ke Daftar Magang</span>
                        </Link>
                    </div>

                    {/* Badge Tipe & Waktu Post */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm bg-emerald-50 text-emerald-700 border-emerald-200">
                            <Briefcase className="w-3.5 h-3.5 mr-2" />
                            {magang.type}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-400 font-medium">
                            <Timer className="w-3.5 h-3.5 mr-1.5" />
                            Diposting {new Date(magang.posted_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        {isDeadlineSoon() && (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-white shadow-md animate-pulse">
                                <Clock className="w-3.5 h-3.5 mr-2" />
                                Segera Berakhir!
                            </span>
                        )}
                    </div>

                    {/* Judul Utama */}
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-3">
                        {magang.title}
                    </h1>
                    <p className="text-2xl text-yarsi-green font-bold mb-6 flex items-center gap-2">
                        <Building2 className="w-6 h-6" />
                        {magang.company}
                    </p>

                    {/* Info Grid (Date, Location, Salary, Categories) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
                        {/* Deadline */}
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${isDeadlineSoon() ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-yarsi-green'}`}>
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Deadline</p>
                                <p className={`font-bold ${isDeadlineSoon() ? 'text-amber-700' : 'text-gray-800'}`}>
                                    {new Date(magang.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                                <p className="font-bold text-gray-800 leading-snug">{magang.location}</p>
                            </div>
                        </div>

                        {/* Gaji */}
                        {magang.salary_min && magang.salary_max && (
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Estimasi Gaji</p>
                                    <p className="font-bold text-gray-800 text-sm leading-tight">
                                        {formatCurrency(magang.salary_min)}
                                    </p>
                                    <p className="text-xs text-gray-500">- {formatCurrency(magang.salary_max)}</p>
                                </div>
                            </div>
                        )}

                        {/* Jenis Pekerjaan */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Jenis</p>
                                <p className="font-bold text-gray-800">{magang.type}</p>
                            </div>
                        </div>
                    </div>

                    {/* Categories Tags */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {magang.categories.map((cat, idx) => (
                            <span
                                key={idx}
                                className="px-4 py-2 bg-white/80 backdrop-blur text-yarsi-green text-sm font-bold rounded-full border border-yarsi-green/20 shadow-sm"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-[90rem] grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">

                        {/* Description */}
                        {magang.description && (
                            <div className="p-8 bg-gradient-to-r from-emerald-50 to-white rounded-3xl border border-emerald-100/50 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-yarsi-green" />
                                <h3 className="font-kaisei font-bold text-2xl text-yarsi-green-dark mb-4">Deskripsi Program</h3>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{ __html: magang.description }}
                                />
                            </div>
                        )}

                        {/* FLYER / FOTO KEGIATAN */}
                        {magang.image && (
                            <div className="bg-white rounded-3xl p-2 border border-gray-100 shadow-sm overflow-hidden">
                                <div className="flex items-center gap-3 mb-4 px-6 pt-4">
                                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Flyer / Dokumentasi</h3>
                                </div>
                                <div className="rounded-2xl overflow-hidden bg-gray-100">
                                    <img
                                        src={`/storage/${magang.image}`}
                                        alt={`Flyer ${magang.title}`}
                                        className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 cursor-zoom-in"
                                        onClick={() => window.open(`/storage/${magang.image}`, '_blank')}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {magang.requirements && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Persyaratan</h3>
                                </div>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{ __html: magang.requirements }}
                                />
                            </div>
                        )}

                        {/* Benefits */}
                        {magang.benefits && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-kaisei font-bold text-2xl text-gray-900">Yang Akan Kamu Dapatkan</h3>
                                </div>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{ __html: magang.benefits }}
                                />
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
                                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yarsi-green to-yarsi-accent rounded-2xl flex items-center justify-center shadow-lg">
                                            <Building2 className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="font-kaisei font-bold text-2xl text-yarsi-green-dark mb-2">Tertarik Melamar?</h3>
                                        <p className="text-gray-500 text-sm mb-6 font-sans">Segera kirimkan lamaranmu dan raih kesempatan emas ini!</p>

                                        {magang.application_url ? (
                                            <a
                                                href={magang.application_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                            >
                                                Lamar Sekarang di Situs Perusahaan
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <div className="w-full py-4 bg-gray-100 text-gray-400 font-bold rounded-xl border border-gray-200 cursor-not-allowed">
                                                Lowongan Ditutup
                                            </div>
                                        )}

                                        {/* Deadline Warning */}
                                        {isDeadlineSoon() && (
                                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                                                <p className="text-amber-700 text-xs font-bold flex items-center justify-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Segera berakhir! Lamar sebelum deadline
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Share Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Share2 className="w-5 h-5 text-yarsi-green" />
                                    <h4 className="font-bold text-gray-900 font-kaisei text-lg">Bagikan Lowongan</h4>
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

            {/* Related Opportunities Section */}
            <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                <div className="container mx-auto px-6 max-w-[90rem]">
                    <div className="text-center mb-8">
                        <h2 className="font-kaisei text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Lowongan Magang Lainnya
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Temukan peluang magang lainnya yang sesuai dengan minatmu
                        </p>
                    </div>
                    <div className="text-center">
                        <Link
                            href={route('magang.index')}
                            className="inline-flex items-center gap-2 bg-yarsi-green hover:bg-yarsi-green-light text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            Lihat Semua Lowongan Magang
                            <ArrowLeft className="w-5 h-5 rotate-180" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 lg:hidden shadow-2xl z-50">
                <a
                    href={magang.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-yarsi-gradient-button text-white py-4 rounded-xl font-bold text-center shadow-lg flex items-center justify-center gap-2"
                >
                    <span>Lamar Sekarang</span>
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>
            <Footer />
        </MainLayout>
    );
}