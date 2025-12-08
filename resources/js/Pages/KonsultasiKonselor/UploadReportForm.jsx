import React, { useState } from 'react';
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { 
    ArrowLeft, FileText, Upload, X, AlertCircle, 
    CheckCircle, Clock, MapPin, User
} from 'lucide-react';

const UploadReportForm = ({ booking }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        feedback: '',
        action_plan: '',
        recommendations: '',
        session_duration: '',
        session_type: 'offline',
        session_location: '',
        documentation_files: []
    });

    // Handle File Selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const maxSize = 10 * 1024 * 1024; // 10MB
        const maxFiles = 5;

        // Validasi
        if (selectedFiles.length + files.length > maxFiles) {
            setFileError(`Maksimal ${maxFiles} file`);
            return;
        }

        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                setFileError(`File ${file.name} melebihi 10MB`);
                return false;
            }
            return true;
        });

        setSelectedFiles([...selectedFiles, ...validFiles]);
        setData('documentation_files', [...selectedFiles, ...validFiles]);
        setFileError(null);
    };

    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setData('documentation_files', newFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi Feedback wajib
        if (!data.feedback || data.feedback.trim().length < 50) {
            alert('Feedback minimal 50 karakter');
            return;
        }

        post(route('konselor.report.store', booking.id), {
            forceFormData: true,
            onSuccess: () => {
                
            }
        });
    };

    return (
        <MainLayout user={user}>
            <Head title="Upload Laporan Sesi Konseling" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    
                    {/* Back Button */}
                    <Link 
                        href={route('konselor.konsultasi.show', booking.id)}
                        className="inline-flex items-center text-gray-600 hover:text-[#004d40] mb-6 font-semibold text-lg"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Kembali ke Detail
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                        
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#004d40] to-emerald-600 p-8 text-white">
                            <h1 className="text-3xl font-bold mb-2">Laporan Sesi Konseling</h1>
                            <p className="text-emerald-100">Dokumentasikan hasil sesi dengan mahasiswa</p>
                        </div>

                        {/* Info Sesi */}
                        <div className="p-6 bg-emerald-50 border-b border-emerald-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-[#004d40]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Mahasiswa</p>
                                        <p className="font-bold text-gray-900">{booking.student_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#004d40]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Jadwal</p>
                                        <p className="font-bold text-gray-900">{booking.scheduled_date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-[#004d40]" />
                                    <div>
                                        <p className="text-xs text-gray-500">Topik</p>
                                        <p className="font-bold text-gray-900 line-clamp-1">{booking.topic}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            
                            {/* Feedback (Required) */}
                            <div>
                                <label className="block text-base font-bold text-gray-700 mb-2">
                                    Feedback Sesi <span className="text-red-500">*</span>
                                </label>
                                <p className="text-sm text-gray-500 mb-3">
                                    Tuliskan rangkuman sesi, poin-poin penting yang dibahas, dan hasil konseling (minimal 50 karakter)
                                </p>
                                <textarea
                                    value={data.feedback}
                                    onChange={e => setData('feedback', e.target.value)}
                                    rows="6"
                                    className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                    placeholder="Contoh: Sesi berjalan lancar. Mahasiswa mengalami kesulitan dalam memilih topik skripsi. Kami telah mendiskusikan 3 opsi tema penelitian..."
                                    required
                                />
                                {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
                                <p className="text-xs text-gray-400 mt-1">{data.feedback.length} karakter</p>
                            </div>

                            {/* Action Plan */}
                            <div>
                                <label className="block text-base font-bold text-gray-700 mb-2">
                                    Rencana Tindak Lanjut <span className="text-gray-400">(Opsional)</span>
                                </label>
                                <textarea
                                    value={data.action_plan}
                                    onChange={e => setData('action_plan', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                    placeholder="Langkah-langkah yang harus dilakukan mahasiswa setelah sesi ini..."
                                />
                            </div>

                            {/* Recommendations */}
                            <div>
                                <label className="block text-base font-bold text-gray-700 mb-2">
                                    Rekomendasi <span className="text-gray-400">(Opsional)</span>
                                </label>
                                <textarea
                                    value={data.recommendations}
                                    onChange={e => setData('recommendations', e.target.value)}
                                    rows="3"
                                    className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                    placeholder="Saran atau rekomendasi untuk mahasiswa..."
                                />
                            </div>

                            {/* Session Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-2">Durasi (Menit)</label>
                                    <input
                                        type="number"
                                        value={data.session_duration}
                                        onChange={e => setData('session_duration', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                        placeholder="60"
                                    />
                                </div>
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-2">Tipe Sesi</label>
                                    <select
                                        value={data.session_type}
                                        onChange={e => setData('session_type', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                    >
                                        <option value="offline">Offline</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-base font-bold text-gray-700 mb-2">Lokasi</label>
                                    <input
                                        type="text"
                                        value={data.session_location}
                                        onChange={e => setData('session_location', e.target.value)}
                                        className="w-full rounded-xl border-gray-300 focus:ring-[#004d40] focus:border-[#004d40] shadow-sm text-base"
                                        placeholder="Ruang Konseling / Zoom"
                                    />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50">
                                <label className="block text-base font-bold text-gray-700 mb-3">
                                    Upload Dokumentasi <span className="text-gray-400">(Opsional)</span>
                                </label>
                                <p className="text-sm text-gray-500 mb-4">
                                    Upload foto, PDF, atau dokumen pendukung (Max 10MB per file, maksimal 5 file)
                                </p>
                                
                                <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all text-base font-semibold text-gray-700">
                                    <Upload className="w-5 h-5" />
                                    Pilih File
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>

                                {fileError && (
                                    <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        {fileError}
                                    </div>
                                )}

                                {/* File List */}
                                {selectedFiles.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-5 h-5 text-[#004d40]" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">{file.name}</p>
                                                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <Link
                                    href={route('konselor.konsultasi.show', booking.id)}
                                    className="px-8 py-3 text-base border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !data.feedback || data.feedback.length < 50}
                                    className="px-8 py-3 text-base bg-[#004d40] text-white rounded-xl hover:bg-emerald-700 font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Simpan Laporan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default UploadReportForm;