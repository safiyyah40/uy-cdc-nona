import React, { useState, useEffect } from 'react';
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import {
    ArrowLeft, User, Calendar, MessageSquare, Clock, Mail, Phone,
    AlertTriangle, XCircle, CheckCircle, MessageCircle, FileText,
    Upload, X, Download, Image, Building, GraduationCap, MapPin, List, Lightbulb
} from 'lucide-react';

const FormulirDetailMahasiswa = ({ consultation }) => {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // State Modal & Notifikasi
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [waNotifyLink, setWaNotifyLink] = useState(null);

    // State untuk File Upload (Laporan)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState(null);

    // Form Khusus Laporan (Inertia useForm)
    const { data, setData, post, processing, errors } = useForm({
        feedback: '',
        action_plan: '',
        recommendations: '',
        session_duration: '60',
        session_type: 'offline',
        session_location: '',
        documentation_files: []
    });

    useEffect(() => {
        if (flash.whatsapp_link) {
            setWaNotifyLink(flash.whatsapp_link);
        }
    }, [flash]);

    // --- LOGIC STATUS ---
    const getStatusInfo = (status) => {
        const map = {
            'pending': { label: 'Menunggu Persetujuan', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            'accepted': { label: 'Sedang Berjalan / Menunggu Laporan', color: 'bg-green-100 text-green-800 border-green-200' },
            'completed': { label: 'Selesai', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            'rejected': { label: 'Ditolak', color: 'bg-red-100 text-red-800 border-red-200' },
            'cancelled': { label: 'Dibatalkan', color: 'bg-gray-100 text-gray-600 border-gray-200' }
        };
        return map[status] || { label: status, color: 'bg-gray-100' };
    };
    const statusInfo = getStatusInfo(consultation.status);

    // --- ACTIONS ---
    const handleReject = () => {
        if (!rejectReason.trim()) return alert("Alasan penolakan wajib diisi.");
        router.post(route('konselor.reject', consultation.id), { reason: rejectReason }, {
            onSuccess: () => setShowRejectModal(false)
        });
    };

    // --- LOGIC UPLOAD FILE LAPORAN ---
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const maxSize = 10 * 1024 * 1024; // 10MB
        const maxFiles = 5;

        if (selectedFiles.length + files.length > maxFiles) {
            setFileError(`Maksimal ${maxFiles} file dokumentasi.`);
            return;
        }

        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                setFileError(`File ${file.name} terlalu besar (Max 10MB)`);
                return false;
            }
            return true;
        });

        const newFileList = [...selectedFiles, ...validFiles];
        setSelectedFiles(newFileList);
        setData('documentation_files', newFileList);
        setFileError(null);
    };

    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setData('documentation_files', newFiles);
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        if (confirm("Apakah Anda yakin data laporan sudah benar? Sesi akan ditandai selesai.")) {
            post(route('konselor.report.store', consultation.id), {
                forceFormData: true,
            });
        }
    };

    return (
        <MainLayout user={user}>
            <Head title={`Detail ${consultation.student_name}`} />

            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                    {/* Tombol Kembali */}
                    <Link
                        href={route('konselor.table_konsultasi')}
                        className="inline-flex items-center text-base text-gray-600 hover:text-[#004d40] mb-6 font-semibold transition-colors group"
                    >
                        <div className="mr-2 p-1 rounded-full bg-white border border-gray-200 group-hover:border-[#004d40] transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        Kembali ke Daftar Konsultasi
                    </Link>

                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-200 relative overflow-hidden">

                        {/* Header dengan Status */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-gray-100 pb-6 mb-8 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-[#004d40] font-serif mb-2">
                                    Detail Konsultasi
                                </h1>
                                <p className="text-gray-500 text-lg">
                                    Diajukan: <span className="font-semibold text-gray-700">{consultation.date_submitted}</span>
                                </p>
                            </div>
                            <div>
                                <span className={`px-5 py-2 rounded-full text-sm md:text-base font-bold uppercase tracking-wider border ${statusInfo.color} whitespace-nowrap inline-block text-center`}>
                                    {statusInfo.label}
                                </span>
                            </div>
                        </div>

                        {/* --- BAGIAN 1: INFORMASI UTAMA (Read Only) --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
                            {/* Kiri: Data Mahasiswa */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                <h3 className="text-sm font-bold text-[#004d40] uppercase tracking-wider border-b border-gray-300 pb-3 mb-4 flex items-center">
                                    <User className="w-4 h-4 mr-2" /> Data Mahasiswa
                                </h3>
                                <div className="space-y-4">
                                    <DetailRow icon={User} label="Nama" value={consultation.student_name} />
                                    <DetailRow icon={User} label="NIM" value={consultation.student_nim} />
                                    <DetailRow icon={Building} label="Fakultas" value={consultation.student_faculty} />
                                    <DetailRow icon={GraduationCap} label="Prodi" value={consultation.student_study_program} />
                                    <div className="pt-2 border-t border-gray-200">
                                        <DetailRow icon={Phone} label="WhatsApp" value={consultation.student_phone} />
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Jadwal & Topik */}
                            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                                <h3 className="text-sm font-bold text-[#004d40] uppercase tracking-wider border-b border-emerald-200 pb-3 mb-4 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" /> Jadwal & Topik
                                </h3>
                                <div className="space-y-5">
                                    <DetailRow icon={Calendar} label="Tanggal" value={consultation.preferred_date} highlight />
                                    <DetailRow icon={Clock} label="Waktu" value={consultation.preferred_time} highlight />
                                    <div className="mt-4 pt-4 border-t border-emerald-200">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Topik</p>
                                        <p className="text-xl font-bold text-[#004d40]">{consultation.topic}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi Masalah */}
                        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 mb-10 shadow-sm">
                            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2 text-[#004d40]" /> Deskripsi / Keluhan Awal
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                "{consultation.reason}"
                            </div>
                        </div>


                        {/* --- BAGIAN 2: LOGIKA TAMPILAN BERDASARKAN STATUS --- */}
                        {/* DITOLAK (Tampilkan Alasan) */}
                        {consultation.status === 'rejected' && (
                            <div className="bg-red-50 border-l-8 border-red-500 p-8 rounded-r-xl mb-8">
                                <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                                    <XCircle className="w-8 h-8 mr-3" /> Permintaan Ditolak
                                </h3>
                                <p className="text-gray-700 font-bold uppercase text-xs tracking-wider mb-2">Alasan Penolakan:</p>
                                <p className="text-red-900 text-xl leading-relaxed font-medium">
                                    "{consultation.rejection_reason || 'Tidak ada alasan spesifik.'}"
                                </p>
                            </div>
                        )}

                        {/* SELESAI (Tampilkan Laporan Lengkap) */}
                        {consultation.status === 'completed' && consultation.report && (
                            <div className="mt-8 border-t-2 border-gray-100 pt-8">
                                <h3 className="text-2xl font-bold text-[#004d40] mb-6 flex items-center font-serif">
                                    <FileText className="w-8 h-8 mr-3" /> Laporan Hasil Konseling
                                </h3>

                                <div className="bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm space-y-6 md:space-y-8 overflow-hidden">
                                    {/* Feedback Utama */}
                                    <div className="min-w-0">
                                        <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            Feedback & Catatan Sesi
                                        </h4>
                                        <div className="bg-gray-50/80 p-4 md:p-6 rounded-2xl text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words border border-gray-100">
                                            {consultation.report.feedback}
                                        </div>
                                    </div>

                                    {/* Action Plan & Rekomendasi */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <div className="bg-blue-50/50 p-5 md:p-6 rounded-2xl border border-blue-100 flex flex-col min-w-0">
                                            <h4 className="text-xs md:text-sm font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center flex-shrink-0">
                                                <List className="w-4 h-4 mr-2 flex-shrink-0" /> Rencana Tindak Lanjut
                                            </h4>
                                            <p className="text-gray-800 text-sm md:text-base break-words">
                                                {consultation.report.action_plan || '-'}
                                            </p>
                                        </div>

                                        <div className="bg-amber-50/50 p-5 md:p-6 rounded-2xl border border-amber-100 flex flex-col min-w-0">
                                            <h4 className="text-xs md:text-sm font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center flex-shrink-0">
                                                <Lightbulb className="w-4 h-4 mr-2 flex-shrink-0" /> Rekomendasi
                                            </h4>
                                            <p className="text-gray-800 text-sm md:text-base break-words">
                                                {consultation.report.recommendations || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Dokumentasi */}
                                    {consultation.report.files && consultation.report.files.length > 0 && (
                                        <div className="pt-2 min-w-0">
                                            <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                                Dokumentasi & Lampiran
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {consultation.report.files.map((file, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center p-3 md:p-4 border-2 border-gray-100 rounded-xl hover:border-[#004d40] hover:bg-emerald-50 transition group bg-white shadow-sm min-w-0"
                                                    >
                                                        <div className="p-2 md:p-3 bg-emerald-100 text-[#004d40] rounded-lg mr-3 flex-shrink-0 group-hover:bg-white transition-colors">
                                                            {file.is_image ? <Image className="w-5 h-5 md:w-6 md:h-6" /> : <FileText className="w-5 h-5 md:w-6 md:h-6" />}
                                                        </div>
                                                        <div className="overflow-hidden min-w-0 flex-1">
                                                            <p className="text-xs md:text-sm font-bold text-gray-700 truncate" title={file.name}>
                                                                {file.name}
                                                            </p>
                                                            <p className="text-[10px] md:text-xs text-emerald-600 font-medium mt-0.5">
                                                                Klik untuk unduh
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* DISETUJUI (Form Input Laporan) */}
                        {consultation.status === 'accepted' && (
                            <div className="mt-8 bg-white border-2 border-[#004d40] rounded-3xl overflow-hidden shadow-lg">
                                <div className="bg-[#004d40] p-6 text-white flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold font-serif">Laporan Sesi</h3>
                                        <p className="text-emerald-100 text-sm mt-1">Isi form ini untuk menyelesaikan sesi.</p>
                                    </div>
                                    <FileText className="w-10 h-10 text-emerald-300 opacity-50" />
                                </div>

                                <form onSubmit={handleSubmitReport} className="p-8 space-y-8">
                                    {/* Detail Teknis */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Durasi (Menit)</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input type="number" value={data.session_duration} onChange={e => setData('session_duration', e.target.value)} className="w-full pl-10 border-gray-300 rounded-xl focus:ring-[#004d40]" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Tipe Sesi</label>
                                            <select value={data.session_type} onChange={e => setData('session_type', e.target.value)} className="w-full border-gray-300 rounded-xl focus:ring-[#004d40] p-2.5">
                                                <option value="offline">Offline (Tatap Muka)</option>
                                                <option value="online">Online (Daring)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-bold mb-2">Lokasi</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input type="text" value={data.session_location} onChange={e => setData('session_location', e.target.value)} className="w-full pl-10 border-gray-300 rounded-xl focus:ring-[#004d40]" placeholder="Ruang / Zoom" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback Utama */}
                                    <div>
                                        <label className="block text-lg font-bold text-gray-800 mb-2">
                                            Feedback & Hasil Diskusi <span className="text-red-500">*</span>
                                        </label>
                                        <textarea value={data.feedback} onChange={e => setData('feedback', e.target.value)} rows="5" className="w-full border-gray-300 rounded-xl p-4 text-lg focus:ring-[#004d40]" placeholder="Rangkuman sesi..." required></textarea>
                                        {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
                                    </div>

                                    {/* Tambahan */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-base font-bold text-gray-700 mb-2">Rencana Tindak Lanjut</label>
                                            <textarea value={data.action_plan} onChange={e => setData('action_plan', e.target.value)} rows="3" className="w-full border-gray-300 rounded-xl p-3" placeholder="Langkah selanjutnya..."></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-base font-bold text-gray-700 mb-2">Rekomendasi</label>
                                            <textarea value={data.recommendations} onChange={e => setData('recommendations', e.target.value)} rows="3" className="w-full border-gray-300 rounded-xl p-3" placeholder="Saran tambahan..."></textarea>
                                        </div>
                                    </div>

                                    {/* Upload */}
                                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
                                        <label className="block text-lg font-bold text-gray-800 mb-2">Dokumentasi (Foto/PDF)</label>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-xl font-bold hover:bg-gray-100 transition shadow-sm">
                                                <Upload className="w-5 h-5" /> Pilih File
                                                <input type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                                            </label>
                                            <span className="text-sm text-gray-500">Max 5 file, 10MB/file.</span>
                                        </div>
                                        {fileError && <p className="text-red-500 mt-2 text-sm">{fileError}</p>}

                                        {selectedFiles.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                                                        <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                                                        <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:bg-red-50 p-1 rounded-full"><X className="w-4 h-4" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {errors['documentation_files'] && <p className="text-red-500 mt-1 text-sm">{errors['documentation_files']}</p>}
                                    </div>

                                    {/* Tombol Submit */}
                                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                                        <button type="submit" disabled={processing} className="px-8 py-4 bg-[#004d40] text-white text-lg font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition flex items-center gap-3 disabled:opacity-50">
                                            {processing ? 'Menyimpan...' : <>Simpan Laporan & Selesaikan <CheckCircle className="w-6 h-6" /></>}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* PENDING (Tombol Terima/Tolak) */}
                        {consultation.status === 'pending' && (
                            <div className="flex flex-col md:flex-row justify-end gap-6 pt-8 mt-8 border-t">
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="px-8 py-3 rounded-xl border-2 border-red-200 text-red-700 font-bold text-lg hover:bg-red-50 transition w-full md:w-auto flex justify-center items-center"
                                >
                                    <XCircle className="w-5 h-5 mr-2" /> Tolak
                                </button>
                                <Link
                                    href={route('konselor.approve', consultation.id)}
                                    method="post"
                                    as="button"
                                    className="px-8 py-3 rounded-xl bg-[#00CA65] text-white font-bold text-lg hover:bg-[#009c50] shadow-lg transition w-full md:w-auto flex justify-center items-center"
                                >
                                    <CheckCircle className="w-5 h-5 mr-2" /> Terima & Jadwalkan
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* MODAL & POPUP (WA & REJECT) */}
            {waNotifyLink && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center transform transition-all scale-100">
                        <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                            <MessageCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Status Diperbarui!</h3>
                        <p className="text-gray-600 mb-8 text-base">Beritahu mahasiswa via WhatsApp?</p>
                        <div className="space-y-3">
                            <a href={waNotifyLink} target="_blank" rel="noreferrer" onClick={() => setWaNotifyLink(null)} className="block w-full py-4 text-base bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1da851] shadow-lg transition">Kirim WA Sekarang</a>
                            <button onClick={() => setWaNotifyLink(null)} className="block w-full py-4 text-base bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition">Tutup</button>
                        </div>
                    </div>
                </div>
            )}

            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    {/* Backdrop dengan Blur */}
                    <div
                        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
                        onClick={() => setShowRejectModal(false)}
                    ></div>

                    {/* Modal Panel */}
                    <div className="relative bg-white rounded-3xl shadow-2xl transform transition-all sm:max-w-lg w-full p-6 sm:p-8 overflow-hidden">

                        <div className="text-center">
                            {/* Icon Warning Besar */}
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6 ring-8 ring-red-50/50">
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Konfirmasi Penolakan
                            </h3>

                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Apakah Anda yakin ingin menolak permintaan konsultasi dari <span className="font-bold text-gray-800">{consultation.student_name}</span>? Aksi ini tidak dapat dibatalkan.
                            </p>

                            {/* Textarea Area */}
                            <div className="text-left mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                    Alasan penolakan (Wajib):
                                </label>
                                <textarea
                                    className="w-full rounded-2xl border-gray-200 bg-gray-50 p-4 text-gray-800 focus:bg-white focus:border-red-500 focus:ring-red-500 transition-all shadow-sm resize-none text-base"
                                    rows="4"
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Contoh: Jadwal bentrok..."
                                ></textarea>
                            </div>

                            {/* Buttons Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="w-full py-3.5 px-4 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={!rejectReason.trim()}
                                    className="w-full py-3.5 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Ya, Tolak sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

// Component Helper untuk Baris Detail
const DetailRow = ({ icon: Icon, label, value, highlight = false }) => (
    <div className="flex items-start">
        <Icon className={`w-6 h-6 mt-1 mr-4 flex-shrink-0 ${highlight ? 'text-[#004d40]' : 'text-gray-400'}`} />
        <div className="flex-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
            <p className={`text-base text-gray-900 leading-snug ${highlight ? 'font-bold text-lg' : 'font-semibold'}`}>
                {value || '-'}
            </p>
        </div>
    </div>
);

export default FormulirDetailMahasiswa;