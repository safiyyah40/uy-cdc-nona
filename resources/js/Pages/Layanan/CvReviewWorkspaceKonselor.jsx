// src/Pages/Layanan/CvReviewWorkspaceKonselor.jsx

import React, { useState, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import { ArrowLeft, Send, FileText, Download, Upload, Trash2, Link, User, CheckCircle } from 'lucide-react';

import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';

// Komponen Pembantu untuk Kartu Detail
const DetailCard = ({ title, value, icon: Icon }) => (
    <div className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500">{title}</p>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

// Komponen Utama
export default function CvReviewWorkspaceKonselor() {
    const { reviewId } = usePage().props;

    // SIMULASI DATA DETAIL
    const submissionData = {
        id: reviewId,
        user: "Siti K. (siti@mail.com)",
        posisi: "UI/UX Designer",
        tanggalSubmit: "2025-12-08",
        prioritas: "Tinggi",
    };

    const [feedback, setFeedback] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const fileInputRef = useRef(null);

    const reviewDetails = {
        ...submissionData,
        documentLink: `/dokumen/cv-${submissionData.id}.pdf`,
    };

    // Handler saat file dipilih
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5 - attachments.length);
        setAttachments(prev => [...prev, ...files]);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    // Handler untuk menghapus lampiran
    const handleRemoveAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    // Handler untuk Simpan dan Kirim
    const handleSaveAndSendFeedback = () => {
        if (feedback.trim() === '' && attachments.length === 0) {
            alert("Mohon berikan umpan balik teks atau lampirkan dokumen sebelum mengirim.");
            return;
        }

        setIsSaving(true);

        const sentData = {
            review_id: reviewDetails.id,
            feedback_text: feedback,
            attachments_count: attachments.length,
        };

        setTimeout(() => {
            console.log("Data dikirim:", sentData);
            setIsSaving(false);

            setShowSuccessModal(true);

        }, 2000);
    };

    // Handler saat Modal ditutup
    const handleModalClose = () => {
        setShowSuccessModal(false);
        router.visit(route('layanan.tabel.cv.review'));
    };

    const isSendDisabled = isSaving || (feedback.trim() === '' && attachments.length === 0);

    return (
        <MainLayout>
            <div className="relative z-10 min-h-screen pt-12 pb-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-7xl">

                    <button
                        onClick={() => router.visit(route('layanan.tabel.cv.review'))}
                        className="flex items-center text-gray-600 hover:text-emerald-700 transition duration-200 font-medium text-sm mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Kembali ke Daftar Tinjauan
                    </button>

                    <div className="bg-white shadow-xl ring-1 ring-gray-100 rounded-xl p-8 lg:p-10">

                        <h2 className="text-4xl font-extrabold mb-1 text-gray-900">
                            Workspace Review CV
                        </h2>

                        <p className="text-lg text-gray-600 mb-6 flex items-center">
                            <User className="w-5 h-5 mr-2 text-emerald-500" />
                            Review untuk: <span className="font-bold ml-1 text-emerald-800">{reviewDetails.user}</span>
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                            {/* KIRI: DETAIL DAN DOKUMEN (Col 4) */}
                            <div className="lg:col-span-4 space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                                    Detail Permintaan
                                </h3>

                                <div className="space-y-3">
                                    <DetailCard title="ID Tinjauan" value={`#${reviewDetails.id}`} icon={Link} />
                                    <DetailCard title="Posisi Target" value={reviewDetails.posisi} icon={FileText} />
                                    <DetailCard title="Tanggal Submit" value={reviewDetails.tanggalSubmit} icon={FileText} />
                                </div>

                                <div className="p-5 bg-yellow-50 rounded-xl border border-yellow-200">
                                    <h4 className="font-bold text-yellow-800 mb-2">Prioritas</h4>
                                    <span className={`px-3 py-1 inline-flex text-sm leading-5 rounded-full font-bold ${
                                        reviewDetails.prioritas === 'Tinggi'
                                            ? 'bg-red-100 text-red-800 ring-1 ring-red-300'
                                            : 'bg-gray-100 text-gray-800 ring-1 ring-gray-300'
                                    }`}>
                                        {reviewDetails.prioritas}
                                    </span>
                                </div>

                                <a
                                    href={reviewDetails.documentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-4 flex items-center justify-center px-4 py-2 font-bold rounded-lg shadow-md text-emerald-600 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Unduh Dokumen CV Asli
                                </a>
                            </div>

                            {/* KANAN: FORM UMPAN BALIK & LAMPIRAN (Col 8) */}
                            <div className="lg:col-span-8 space-y-6">

                                <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
                                    Konten Umpan Balik Konselor
                                </h3>

                                {/* TEXTAREA - Umpan Balik */}
                                <div>
                                    <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-1">
                                        Tulis Umpan Balik (Teks):
                                    </label>
                                    <textarea
                                        id="feedback"
                                        rows="10"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="block w-full rounded-xl border-gray-300 shadow-inner focus:border-emerald-500 focus:ring-emerald-500 p-4 transition duration-150"
                                        placeholder="Berikan masukan mendalam, poin-poin revisi, atau kesimpulan review di sini..."
                                    />
                                </div>

                                {/* LAMPIRAN UPLOAD */}
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Lampiran Tambahan (Max 5 file):
                                    </label>

                                    {/* Area Unggah */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        multiple
                                        accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={attachments.length >= 5}
                                        className="w-full border-2 border-dashed border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium"
                                    >
                                        <Upload className="w-5 h-5" />
                                        <span>{attachments.length >= 5 ? "Batas Maksimum 5 File Tercapai" : "Klik untuk Unggah Lampiran (Dokumen Revisi, Gambar, dsb.)"}</span>
                                    </button>

                                    {/* Daftar File yang Diunggah */}
                                    {attachments.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {attachments.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg text-sm shadow-sm">
                                                    <span className="truncate flex-1 text-gray-800">
                                                        **{file.name}**
                                                        <span className="text-xs text-gray-500 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveAttachment(index)}
                                                        className="ml-4 text-red-500 hover:text-white hover:bg-red-600 p-1 rounded-full transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* TOMBOL KIRIM UTAMA */}
                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleSaveAndSendFeedback}
                                        disabled={isSendDisabled}
                                        className="w-full flex items-center justify-center px-6 py-4 font-extrabold text-lg rounded-xl shadow-2xl text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:opacity-80 transition transform hover:scale-[1.005]"
                                    >
                                        {isSaving ? "⏳ Memproses dan Mengirim Hasil Review..." : (
                                            <>
                                                <Send className="w-5 h-5 mr-3" />
                                                KIRIM HASIL AKHIR KE PENGGUNA
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NOTIFIKASI SUKSES (MODAL KUSTOM) */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center transform scale-100 transition-transform duration-300">

                        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Review Berhasil Dikirim!
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Umpan balik telah berhasil dikirimkan kepada pengguna {reviewDetails.user}. Anda akan diarahkan kembali ke antrian tinjauan.
                        </p>

                        <button
                            onClick={handleModalClose}
                            className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                        >
                            Tutup & Kembali
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </MainLayout>
    );
}
