import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, Calendar, User, Clock, Share2,
    CheckCircle, Copy, Facebook, Twitter, MessageCircle
} from 'lucide-react';

export default function DetailTipsDanTrik({ tip, auth }) {
    if (!tip) {
        return (
            <MainLayout user={auth?.user}>
                

                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href={route('program.tips-dan-trik')}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors font-medium text-sm group"
                    >
                        <div className="p-1.5 rounded-full bg-white border border-gray-200 group-hover:border-emerald-500 transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const [copied, setCopied] = useState(false);

    const handleShare = (platform) => {
        const url = window.location.href;
        const text = `Cek tips menarik ini: "${tip.title}"`;
        let shareUrl = "";

        switch (platform) {
            case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`; break;
            case 'whatsapp': shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`; break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
                return;
            default: return;
        }
        if (platform !== 'copy') window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    return (
        <MainLayout user={auth?.user}>
            <Head title={tip.title} />
            {/* HEADER */}
            <div className="pt-24 pb-12 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-b border-emerald-100/50">
                <div className="container mx-auto px-6 max-w-[90rem] relative z-10">
                    <div className="mb-8">
                        <Link href={route('program.tips-dan-trik')} className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-700 transition-colors font-medium text-sm group">
                            <div className="p-1.5 rounded-full bg-white border border-gray-200 group-hover:border-emerald-500 transition-colors shadow-sm">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span>KEMBALI KE DAFTAR TIPS & TRIK</span>
                        </Link>
                    </div>

                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                        {tip.category}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight mb-6">
                        {tip.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-600 text-base md:text-lg border-t border-b border-gray-200 py-4 font-sans">
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-emerald-600" /><span>{tip.formatted_date}</span></div>
                        <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-2"><User className="w-5 h-5 text-emerald-600" /><span>Tim CDC YARSI</span></div>
                        <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-600" /><span>Waktu baca {tip.reading_time}</span></div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="bg-white py-12 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {tip.image_url && (
                        <div className="mb-12 relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-100 aspect-video md:aspect-[21/9]">
                            <img src={tip.image_url} alt={tip.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/e2e8f0/1e293b?text=No+Image"; }} />
                        </div>
                    )}

                    {tip.description && (
                        <div className="mb-12 p-8 md:p-10 bg-emerald-50 rounded-2xl border-l-8 border-emerald-600">
                            <h3 className="font-bold text-emerald-900 text-xl mb-3">Intisari:</h3>
                            <p className="text-xl md:text-2xl text-emerald-800 leading-relaxed font-serif italic">"{tip.description}"</p>
                        </div>
                    )}

                    <div className="font-sans text-gray-900 space-y-8">
                        <div className="content-body" dangerouslySetInnerHTML={{ __html: tip.content }} />
                    </div>

                    <div className="mt-20 pt-10 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                            <div className="text-center md:text-left">
                                <h4 className="font-bold text-gray-900 text-lg flex items-center justify-center md:justify-start gap-2"><Share2 className="w-6 h-6 text-emerald-600" /> Bagikan Tips Ini</h4>
                                <p className="text-base text-gray-500 mt-1">Bantu rekan Anda berkembang dengan membagikan artikel ini.</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button onClick={() => handleShare('whatsapp')} className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-medium transition-transform hover:-translate-y-1 shadow-sm text-base"><MessageCircle className="w-5 h-5" /> WhatsApp</button>
                                <button onClick={() => handleShare('facebook')} className="flex items-center gap-2 px-5 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-lg font-medium transition-transform hover:-translate-y-1 shadow-sm text-base"><Facebook className="w-5 h-5" /> Facebook</button>
                                <button onClick={() => handleShare('twitter')} className="flex items-center gap-2 px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-transform hover:-translate-y-1 shadow-sm text-base"><Twitter className="w-5 h-5" /> X</button>
                                <button onClick={() => handleShare('copy')} className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all shadow-sm text-base">{copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />} {copied ? 'Tersalin' : 'Salin Link'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}