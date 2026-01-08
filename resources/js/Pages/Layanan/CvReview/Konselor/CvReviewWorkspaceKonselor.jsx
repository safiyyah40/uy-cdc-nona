import React, { useState, useRef } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft, Send, FileText, Download, Upload, Trash2, Link,
    User, CheckCircle, Smartphone, Mail, Building, GraduationCap, Hash, AlertCircle
} from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';

// Komponen Kartu Detail Kecil
const DetailCard = ({ title, value, icon: Icon, isLink = false }) => (
    <div className="flex items-start space-x-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-emerald-100 transition">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 flex-shrink-0 mt-0.5">
            <Icon className="w-4 h-4" />
        </div>
        <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
            {isLink ? (
                <a href={`https://wa.me/${value}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-emerald-600 hover:underline truncate block">
                    {value}
                </a>
            ) : (
                <p className="text-sm font-semibold text-gray-800 truncate">{value || '-'}</p>
            )}
        </div>
    </div>
);

export default function CvReviewWorkspaceKonselor() {
    const { review, auth } = usePage().props;
    const user = auth.user;

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const fileInputRef = useRef(null);

    // Inertia Form Helper
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        feedback_text: '',
        feedback_files: [],
    });

    // Helper: Validasi tipe file di sisi Client
    const validateFile = (file) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/jpg'
        ];

        // Cek MIME type
        if (!allowedTypes.includes(file.type)) {
            return false;
        }
        return true;
    };

    // Handle File Change
    const handleFileChange = (e) => {
        clearErrors('feedback_files');
        const newFiles = Array.from(e.target.files);

        // Filter file yang tidak valid
        const validFiles = newFiles.filter(file => validateFile(file));

        if (newFiles.length !== validFiles.length) {
            alert("Beberapa file diabaikan karena format tidak didukung (Excel/PPT tidak boleh). Hanya PDF, Word, dan Gambar.");
        }

        const updatedFiles = [...data.feedback_files, ...validFiles].slice(0, 5);
        setData('feedback_files', updatedFiles);
    };

    const handleRemoveAttachment = (index) => {
        const updatedFiles = data.feedback_files.filter((_, i) => i !== index);
        setData('feedback_files', updatedFiles);
    };

    const handleSaveAndSendFeedback = () => {
        // Validasi Text Manual
        if (data.feedback_text.length < 50) {
            setError('feedback_text', 'Umpan balik minimal 50 karakter agar lebih bermanfaat bagi mahasiswa.');
            return;
        }

        post(route('layanan.konselor.feedback', review.id), {
            forceFormData: true,
            onSuccess: () => {
                setShowSuccessModal(true);
            },
            onError: (err) => {
                console.error(err);
                if (err.feedback_files) {
                    alert(err.feedback_files);
                } else {
                    alert("Gagal mengirim feedback. Periksa kembali form anda.");
                }
            }
        });
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        router.visit(route('layanan.tabel.cv.review'));
    };

    return (
        <MainLayout user={user}>
            <div className="relative z-10 min-h-screen pt-12 pb-20 bg-gray-50 font-sans">
                <div className="container mx-auto px-4 max-w-7xl">

                    {/* Header Nav */}
                    <button
                        onClick={() => router.visit(route('layanan.tabel.cv.review'))}
                        className="flex items-center text-gray-500 hover:text-emerald-700 transition duration-200 font-bold text-sm mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Antrian
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* KOLOM KIRI: INFORMASI*/}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Card 1: Data Mahasiswa */}
                            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-emerald-600" /> Data Mahasiswa
                                </h3>
                                <div className="space-y-3">
                                    <DetailCard title="Nama Lengkap" value={review.nama} icon={User} />
                                    <DetailCard title="NPM" value={review.npm} icon={Hash} />
                                    <DetailCard title="Fakultas" value={review.fakultas} icon={Building} />
                                    <DetailCard title="Program Studi" value={review.prodi} icon={GraduationCap} />
                                    <DetailCard title="Email" value={review.email} icon={Mail} />
                                    <DetailCard title="WhatsApp" value={review.phone} icon={Smartphone} isLink={true} />
                                </div>
                            </div>

                            {/* Card 2: Detail Request */}
                            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-emerald-600" /> Detail Dokumen
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <DetailCard title="Posisi Target" value={review.posisi} icon={FileText} />
                                    <DetailCard title="Tanggal Submit" value={review.tanggalSubmit} icon={FileText} />

                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                                        <span className="text-xs font-bold text-yellow-700 uppercase">Prioritas</span>
                                        <span className="px-3 py-1 text-xs font-bold bg-white text-yellow-800 rounded-full shadow-sm">{review.prioritas}</span>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">File CV Mahasiswa</p>
                                    {review.cv_url ? (
                                        <a
                                            href={route('layanan.cv.download', review.id)}
                                            className="flex items-center justify-center w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-md group"
                                        >
                                            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" /> Unduh CV
                                        </a>
                                    ) : (
                                        <div className="p-3 bg-red-50 text-red-600 text-center text-sm rounded-xl border border-red-100">
                                            File tidak ditemukan
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN: FORM FEEDBACK */}
                        <div className="lg:col-span-8">
                            <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="bg-emerald-800 p-6">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <FileText className="w-6 h-6 mr-3" /> Lembar Kerja Konselor
                                    </h2>
                                    <p className="text-emerald-100 text-sm mt-1">Berikan masukan yang konstruktif dan detail untuk mahasiswa.</p>
                                </div>

                                <div className="p-8 space-y-8">

                                    {/* Text Area */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Umpan Balik / Catatan Revisi <span className="text-red-500 text-xs ml-1">(Wajib Diisi, Min. 50 Karakter)</span>
                                        </label>
                                        <textarea
                                            rows="12"
                                            value={data.feedback_text}
                                            onChange={(e) => setData('feedback_text', e.target.value)}
                                            className={`block w-full rounded-xl shadow-sm p-4 text-base transition ${errors.feedback_text ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'}`}
                                            placeholder="Tuliskan analisis kekuatan, kelemahan, dan saran perbaikan secara mendetail di sini..."
                                        />
                                        {errors.feedback_text && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <span className="mr-1">⚠️</span> {errors.feedback_text}
                                            </p>
                                        )}
                                        <div className="text-right text-xs text-gray-400 mt-2">
                                            {data.feedback_text.length} / 50 Karakter Minimum
                                        </div>
                                    </div>

                                    {/* File Upload */}
                                    <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Lampiran File Revisi / Contoh <span className="text-gray-400 text-xs font-normal ml-1">(Opsional, Max 5 File)</span>
                                        </label>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={data.feedback_files.length >= 5}
                                            className="w-full border-2 border-dashed border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-600 py-4 rounded-xl flex flex-col items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Upload className="w-6 h-6 mb-2" />
                                            <span className="font-semibold">Klik untuk Unggah Lampiran</span>
                                            <span className="text-xs text-gray-400 mt-1">PDF, Word, JPG, PNG (Max 10MB)</span>
                                            <span className="text-[10px] text-red-400 mt-1">*Excel dan PPT tidak didukung</span>
                                        </button>

                                        {/* List Uploaded Files */}
                                        {data.feedback_files.length > 0 && (
                                            <div className="mt-4 space-y-3">
                                                {data.feedback_files.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                                        <div className="flex items-center overflow-hidden">
                                                            <div className="bg-emerald-100 p-2 rounded text-emerald-600 mr-3">
                                                                <FileText className="w-4 h-4" />
                                                            </div>
                                                            <div className="flex flex-col overflow-hidden">
                                                                <span className="truncate text-sm font-medium text-gray-700">{file.name}</span>
                                                                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAttachment(index)}
                                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition"
                                                            title="Hapus Lampiran"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {errors.feedback_files && <p className="text-red-500 text-sm mt-2">{errors.feedback_files}</p>}
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <button
                                            onClick={handleSaveAndSendFeedback}
                                            disabled={processing}
                                            className="w-full flex items-center justify-center px-6 py-4 font-bold text-lg rounded-xl shadow-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 disabled:opacity-70 disabled:cursor-not-allowed transition transform hover:-translate-y-0.5"
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Sedang Mengirim...
                                                </span>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-3" /> KIRIM HASIL & SELESAIKAN
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center transform scale-100 transition-all">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review Terkirim!</h3>
                        <p className="text-gray-500 mb-8">
                            Hasil review telah berhasil dikirim ke mahasiswa dan status diperbarui menjadi Selesai.
                        </p>
                        <button
                            onClick={handleModalClose}
                            className="w-full py-3 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition"
                        >
                            Kembali ke Daftar
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </MainLayout>
    );
}