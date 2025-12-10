import React from 'react';
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft, User, Calendar, Clock, FileText,
    CheckCircle, XCircle, AlertCircle, Download,
    List, Lightbulb, MapPin, MessageSquare, Image as ImageIcon
} from 'lucide-react';

const DetailKonsultasi = ({ consultation, auth }) => {
    const user = auth.user;

    // Helper Status Badge
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            accepted: 'bg-green-100 text-green-800 border-green-200',
            completed: 'bg-blue-100 text-blue-800 border-blue-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
            cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
        };
        const labels = {
            pending: 'Menunggu Persetujuan',
            accepted: 'Disetujui / Akan Datang',
            completed: 'Selesai',
            rejected: 'Ditolak',
            cancelled: 'Dibatalkan',
        };
        return (
            <span className={`px-6 py-2 rounded-full text-base font-bold uppercase tracking-wide border ${styles[status]}`}>
                {labels[status] || status}
            </span>
        );
    };

    // Helper Cek Tipe File (Gambar vs Dokumen)
    const isImageFile = (filename) => {
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
    };

    return (
        <MainLayout user={user}>
            <Head title="Detail Konsultasi" />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                    {/* Tombol Kembali */}
                    <Link
                        href={route('konsultasi.list')}
                        className="inline-flex items-center text-gray-600 hover:text-[#004d40] mb-8 font-bold text-lg transition-colors group"
                    >
                        <div className="bg-white p-2 rounded-full border border-gray-300 mr-3 group-hover:border-[#004d40]">
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        Kembali ke Riwayat
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

                        {/* Header Banner */}
                        <div className={`h-3 w-full ${consultation.status === 'completed' ? 'bg-blue-500' :
                                consultation.status === 'accepted' ? 'bg-green-500' :
                                    consultation.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-400'
                            }`}></div>

                        <div className="p-8 md:p-12">
                            {/* Judul & Status */}
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 border-b border-gray-100 pb-8">
                                <div>
                                    <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider mb-2">Topik Konsultasi</p>
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#004d40] font-serif leading-tight">
                                        {consultation.topic}
                                    </h1>
                                    <p className="text-gray-500 mt-3 text-lg">Diajukan pada: {consultation.created_at}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    {getStatusBadge(consultation.status)}
                                </div>
                            </div>

                            {/* Informasi Jadwal & Konselor */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                    <h3 className="text-base font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2" /> Konselor Akademik
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        {consultation.counselor_photo ? (
                                            <img src={consultation.counselor_photo} alt="Foto" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-[#004d40] flex items-center justify-center text-white font-bold text-2xl">
                                                {consultation.counselor_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">{consultation.counselor_name}</p>
                                            <p className="text-sm text-gray-500">{consultation.counselor_title}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                    <h3 className="text-base font-bold text-[#004d40] uppercase tracking-wider mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2" /> Jadwal Pelaksanaan
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <Calendar className="w-6 h-6 text-[#004d40] mr-3 opacity-70" />
                                            <span className="text-xl font-bold text-gray-900">{consultation.date_formatted}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-6 h-6 text-[#004d40] mr-3 opacity-70" />
                                            <span className="text-xl font-bold text-gray-900">{consultation.time_formatted}</span>
                                        </div>
                                        {consultation.report && consultation.report.session_location && (
                                            <div className="flex items-center pt-2 mt-2 border-t border-emerald-200">
                                                <MapPin className="w-6 h-6 text-[#004d40] mr-3 opacity-70" />
                                                <span className="text-lg font-medium text-gray-800">
                                                    {consultation.report.session_type === 'online' ? 'Online (Daring)' : 'Offline (Tatap Muka)'} - {consultation.report.session_location}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Keluhan Awal */}
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">Catatan / Keluhan Awal Anda</h3>
                                <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl text-lg text-gray-700 leading-relaxed italic">
                                    "{consultation.notes || 'Tidak ada catatan tambahan.'}"
                                </div>
                            </div>

                            {/* --- STATUS: DITOLAK --- */}
                            {consultation.status === 'rejected' && (
                                <div className="bg-red-50 border-l-8 border-red-500 p-8 rounded-r-2xl">
                                    <h3 className="text-2xl font-bold text-red-800 mb-3 flex items-center">
                                        <XCircle className="w-8 h-8 mr-3" /> Permintaan Ditolak
                                    </h3>
                                    <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mb-2">Alasan dari Konselor:</p>
                                    <p className="text-red-900 text-xl leading-relaxed font-medium">
                                        "{consultation.rejection_reason || 'Mohon maaf, jadwal tidak tersedia.'}"
                                    </p>
                                </div>
                            )}

                            {/* --- STATUS: SELESAI (LAPORAN) --- */}
                            {consultation.status === 'completed' && consultation.report && (
                                <div className="mt-12 pt-10 border-t-2 border-gray-100">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <FileText className="w-8 h-8 text-blue-700" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 font-serif">Hasil & Feedback Konseling</h2>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Feedback Utama */}
                                        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                                            <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-3">Catatan dari Konselor</h4>
                                            <p className="text-gray-900 text-xl leading-relaxed whitespace-pre-wrap">
                                                {consultation.report.feedback}
                                            </p>
                                        </div>

                                        {/* Action Plan & Rekomendasi */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {consultation.report.action_plan && (
                                                <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                                                    <h4 className="text-sm font-bold text-[#004d40] uppercase tracking-wider mb-3 flex items-center">
                                                        <List className="w-5 h-5 mr-2" /> Rencana Tindak Lanjut
                                                    </h4>
                                                    <p className="text-gray-800 text-lg">{consultation.report.action_plan}</p>
                                                </div>
                                            )}
                                            {consultation.report.recommendations && (
                                                <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm">
                                                    <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center">
                                                        <Lightbulb className="w-5 h-5 mr-2" /> Rekomendasi
                                                    </h4>
                                                    <p className="text-gray-800 text-lg">{consultation.report.recommendations}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Files */}
                                        {consultation.report.files && consultation.report.files.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Dokumen Hasil / Lampiran</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {consultation.report.files.map((file, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={file.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center p-5 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition group bg-white"
                                                        >
                                                            <div className={`p-3 rounded-xl mr-4 group-hover:bg-white ${isImageFile(file.name) ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                                {isImageFile(file.name) ? (
                                                                    <ImageIcon className="w-6 h-6" />
                                                                ) : (
                                                                    <FileText className="w-6 h-6" />
                                                                )}
                                                            </div>

                                                            <div className="overflow-hidden flex-1">
                                                                <p className="text-base font-bold text-gray-800 truncate" title={file.name}>
                                                                    {file.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 font-medium mt-0.5 flex items-center">
                                                                    <Download className="w-3 h-3 mr-1" />
                                                                    {isImageFile(file.name) ? 'Lihat Gambar' : 'Download Dokumen'}
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

                            {/* --- STATUS: DISETUJUI --- */}
                            {consultation.status === 'accepted' && (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center mt-8">
                                    <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-emerald-900 mb-2">Jadwal Telah Dikonfirmasi</h3>
                                    <p className="text-emerald-800 text-lg">
                                        Silakan hadir tepat waktu sesuai jadwal di atas. <br />
                                        Laporan hasil konseling akan muncul di halaman ini setelah sesi selesai.
                                    </p>
                                </div>
                            )}

                            {/* --- STATUS: MENUNGGU --- */}
                            {consultation.status === 'pending' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center mt-8">
                                    <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-yellow-900 mb-2">Menunggu Persetujuan Konselor</h3>
                                    <p className="text-yellow-800 text-lg">
                                        Permintaan Anda sedang ditinjau. Mohon cek halaman ini secara berkala untuk update status.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default DetailKonsultasi;