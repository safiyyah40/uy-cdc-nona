import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import {
    Calendar, MapPin, Briefcase, Building2, Wallet,
    Clock, ExternalLink, CheckCircle, AlertCircle,
    ArrowLeft, Share2, Award,
    Target, TrendingUp, Globe
} from 'lucide-react';

export default function DetailLoker({ auth, loker }) {
    const [showShareMenu, setShowShareMenu] = useState(false);

    // Format Currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate Days Remaining
    const deadline = new Date(loker.deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const isUrgent = diffDays <= 7 && diffDays > 0;
    const isExpired = diffDays < 0;

    // Share Function
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: loker.title,
                text: `Lowongan ${loker.title} di ${loker.company}`,
                url: window.location.href
            });
        } else {
            setShowShareMenu(!showShareMenu);
        }
    };

    // Pastikan kategori adalah array
    const categories = Array.isArray(loker.categories) ? loker.categories : [];

    return (
        <MainLayout user={auth?.user}>
            <Head title={`${loker.title} - ${loker.company}`} />

            {/* HERO SECTION */}
            <div className="pt-20 pb-8 bg-gradient-to-br from-white via-emerald-50 to-teal-50 border-b border-emerald-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href={route('loker.index')}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-yarsi-green transition-all font-medium text-sm group"
                    >
                        <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-yarsi-green transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="uppercase tracking-wider text-xs">Kembali ke Daftar Lowongan Pekerjaan</span>
                    </Link>

                    {/* Job Header */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white p-3 rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                                    {loker.logo ? (
                                        <img
                                            src={loker.logo.startsWith('http') ? loker.logo : `/storage/${loker.logo}`}
                                            alt={loker.company}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <Building2 className="w-16 h-16 text-gray-300" />
                                    )}
                                </div>
                            </div>

                            {/* Job Info */}
                            <div className="flex-grow">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {isExpired ? (
                                        <span className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200">
                                            EXPIRED
                                        </span>
                                    ) : isUrgent ? (
                                        <span className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-200 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            Segera Berakhir ({diffDays} Hari)
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-200">
                                            AKTIF
                                        </span>
                                    )}
                                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100 uppercase">
                                        {loker.work_model || 'Onsite'}
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                                    {loker.title}
                                </h1>

                                <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                                    <Building2 className="w-5 h-5" />
                                    <span className="font-semibold">{loker.company}</span>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                                    <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <MapPin className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Lokasi</p>
                                            <p className="text-sm font-bold text-gray-900">{loker.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <Briefcase className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Tipe</p>
                                            <p className="text-sm font-bold text-gray-900">{loker.type}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Level</p>
                                            <p className="text-sm font-bold text-gray-900">{loker.experience_level}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Deadline</p>
                                            <p className="text-sm font-bold text-gray-900">
                                                {new Date(loker.deadline).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Salary */}
                                {loker.salary_min && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <Wallet className="w-6 h-6 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase mb-0.5">Range Gaji</p>
                                                <p className="text-lg sm:text-xl font-bold text-gray-900">
                                                    {formatCurrency(loker.salary_min)} - {formatCurrency(loker.salary_max)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {!isExpired && loker.application_url && (
                                        <a
                                            href={loker.application_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Lamar Sekarang di Situs Perusahaan
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}

                                    <div className="relative">
                                        <button
                                            onClick={handleShare}
                                            className="px-4 py-3 bg-white border-2 border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 rounded-xl font-bold transition-all"
                                        >
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT COLUMN - Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Job Image */}
                            {loker.image && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <img
                                        src={loker.image.startsWith('http') ? loker.image : `/storage/${loker.image}`}
                                        alt={loker.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <Target className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Deskripsi Pekerjaan</h2>
                                </div>
                                <div
                                    className="content-body"
                                    dangerouslySetInnerHTML={{ __html: loker.description }}
                                />
                            </div>

                            {/* Requirements */}
                            {loker.requirements && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Persyaratan</h2>
                                    </div>
                                    <div
                                        className="content-body"
                                        dangerouslySetInnerHTML={{ __html: loker.requirements }}
                                    />
                                </div>
                            )}

                            {/* Benefits */}
                            {loker.benefits && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Award className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Benefit & Fasilitas</h2>
                                    </div>
                                    <div
                                        className="content-body"
                                        dangerouslySetInnerHTML={{ __html: loker.benefits }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN - Sidebar */}
                        <div className="space-y-6">

                            {/* Categories */}
                            {categories.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-emerald-600" />
                                        Kategori Industri
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Job Summary */}
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Lowongan</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start py-2 border-b border-emerald-100">
                                        <span className="text-sm text-gray-600 font-medium">Dipublikasikan</span>
                                        <span className="text-sm font-bold text-gray-900 text-right">
                                            {new Date(loker.posted_date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start py-2 border-b border-emerald-100">
                                        <span className="text-sm text-gray-600 font-medium">Batas Akhir</span>
                                        <span className="text-sm font-bold text-gray-900 text-right">
                                            {new Date(loker.deadline).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start py-2 border-b border-emerald-100">
                                        <span className="text-sm text-gray-600 font-medium">Tipe Pekerjaan</span>
                                        <span className="text-sm font-bold text-gray-900">{loker.type}</span>
                                    </div>
                                    <div className="flex justify-between items-start py-2 border-b border-emerald-100">
                                        <span className="text-sm text-gray-600 font-medium">Lokasi</span>
                                        <span className="text-sm font-bold text-gray-900 text-right">{loker.location}</span>
                                    </div>
                                    <div className="flex justify-between items-start py-2">
                                        <span className="text-sm text-gray-600 font-medium">Level</span>
                                        <span className="text-sm font-bold text-gray-900">{loker.experience_level}</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            {!isExpired && loker.application_url && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            Tertarik dengan posisi ini?
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Jangan lewatkan kesempatan emas ini! Segera kirim lamaran Anda sebelum {diffDays} hari lagi.
                                        </p>
                                        <a
                                            href={loker.application_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Lamar Sekarang di Situs Perusahaan
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Warning if Expired */}
                            {isExpired && (
                                <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                                    <div className="text-center">
                                        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                                        <h3 className="text-lg font-bold text-red-900 mb-2">
                                            Lowongan Sudah Ditutup
                                        </h3>
                                        <p className="text-sm text-red-700">
                                            Maaf, lowongan ini sudah melewati batas waktu pendaftaran. Silakan cari lowongan lainnya.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Related Opportunities Section */}
                    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-16">
                        <div className="container mx-auto px-6 max-w-[90rem]">
                            <div className="text-center mb-8">
                                <h2 className="font-kaisei text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Lowongan Pekerjaan Lainnya
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Temukan peluang pekerjaan lainnya yang sesuai dengan keahlianmu
                                </p>
                            </div>
                            <div className="text-center">
                                <Link
                                    href={route('loker.index')}
                                    className="inline-flex items-center gap-2 bg-yarsi-green hover:bg-yarsi-green-light text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    Lihat Semua Lowongan Pekerjaan
                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
}