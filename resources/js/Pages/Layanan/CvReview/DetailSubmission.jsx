import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    ArrowLeft, Clock, MessageCircle, FileText, Download,
    User, Phone, Mail, Building, GraduationCap, BookOpen,
    AlertCircle, XCircle, UserCheck, Loader2, PenTool, Paperclip
} from 'lucide-react';

// Helper Components
const Icons = {
    Document: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
    ),
    CheckCircle: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
    )
};

const DataRow = ({ label, value, icon: Icon, highlight = false }) => (
    <div className="group">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
        <div className={`mt-1.5 p-3 sm:p-4 rounded-xl border transition-colors duration-300 font-semibold flex items-center gap-3 shadow-sm ${highlight
            ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
            : 'bg-gray-50 border-gray-100 text-gray-800 group-hover:border-emerald-200 group-hover:bg-emerald-50/30'
            }`}>
            {Icon && <Icon className={`w-5 h-5 flex-shrink-0 ${highlight ? 'text-indigo-600' : 'text-emerald-600/70'}`} />}
            <span className="truncate text-sm sm:text-base">{value || '-'}</span>
        </div>
    </div>
);

const DetailSubmission = () => {
    const { reviewData, auth, contactInfo } = usePage().props;
    const user = auth.user;
    const isCounselor = user?.role === 'konselor';
    const handleChatAdminCv = (item) => {
        const adminPhone = contactInfo?.whatsapp_number || "6281295986204";
        const messageText =
            `Assalamualaikum Wr. Wb.\n` +
            `Selamat Pagi/Siang Admin PUSKAKA.\n\n` +
            `Perkenalkan, nama saya *${user.name}* (NPM: ${reviewData.npm}) dari Fakultas ${reviewData.faculty}, Program Studi ${reviewData.study_program}.\n\n` +
            `Saya bermaksud menanyakan mengenai status pengajuan *Review CV* yang telah saya ajukan melalui website CDC dengan detail sebagai berikut:\n\n` +
            `Tanggal Pengajuan: ${reviewData.tanggalPengajuan}\n` +
            `Posisi Target: ${reviewData.posisi}\n` +
            `Status Saat Ini: ${reviewData.statusPeninjauan}\n\n` +
            `Mohon informasinya terkait perkembangan verifikasi dokumen tersebut. Terima kasih banyak atas bantuan dan waktunya.\n\n` +
            `Wassalamualaikum Wr. Wb.`;

        window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(messageText)}`, '_blank');
    };

    // Handle jika data kosong
    if (!reviewData) {
        return (
            <MainLayout user={user}>
                <Head title="Data Tidak Ditemukan" />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-700">Data tidak ditemukan</h2>
                        <Link href={route('layanan.tabel.cv.review')} className="mt-4 inline-block text-emerald-600 hover:underline">
                            Kembali ke Tabel
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleDownload = (url) => {
        if (url) window.open(url, '_blank');
        else alert('File tidak tersedia');
    };

    // Helper warna status (Header Badge)
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Selesai':
                return { wrapper: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: <Icons.CheckCircle className="w-5 h-5" /> };
            case 'Sedang Direview':
                return { wrapper: 'bg-blue-50 border-blue-200 text-blue-700', icon: <Clock className="w-5 h-5 animate-pulse" /> };
            case 'Ditugaskan':
                return { wrapper: 'bg-violet-50 border-violet-200 text-violet-700', icon: <UserCheck className="w-5 h-5" /> };
            case 'Perlu Revisi':
                return { wrapper: 'bg-amber-50 border-amber-200 text-amber-700', icon: <AlertCircle className="w-5 h-5" /> };
            case 'Dibatalkan':
                return { wrapper: 'bg-red-50 border-red-200 text-red-700', icon: <XCircle className="w-5 h-5" /> };
            default:
                return { wrapper: 'bg-gray-50 border-gray-200 text-gray-600', icon: <Clock className="w-5 h-5" /> };
        }
    };

    const statusStyle = getStatusStyle(reviewData.statusPeninjauan);

    // LOGIKA PESAN STATUS DINAMIS (HANYA UNTUK MAHASISWA)
    const getPendingStateConfig = () => {

        switch (reviewData.status_raw) {
            case 'assigned':
                return {
                    bg: 'bg-violet-50/60', border: 'border-violet-200', text: 'text-violet-800',
                    icon: <UserCheck className="w-8 h-8 text-violet-600 animate-bounce" />,
                    title: 'Telah Ditugaskan',
                    desc: `Mohon menunggu, konselor akan segera memeriksa dokumen Anda.`
                };
            case 'in_review':
                return {
                    bg: 'bg-blue-50/60', border: 'border-blue-200', text: 'text-blue-800',
                    icon: <PenTool className="w-8 h-8 text-blue-600 animate-pulse" />,
                    title: 'Sedang Direview',
                    desc: `Konselor yang ditugaskan sedang meninjau detail CV Anda. Hasil review akan segera tersedia.`
                };

            default:
                return {
                    bg: 'bg-yellow-50/50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-900',
                    icon: <Clock className="text-yellow-600 w-10 h-10" />,
                    title: 'Menunggu Antrian',
                    desc: (
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-gray-600">CV Anda telah masuk ke dalam sistem dan sedang menunggu ketersediaan konselor.</p>
                            <button
                                onClick={handleChatAdminCv}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-6 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-green-100 active:scale-95"
                            >
                                <MessageCircle size={18} />
                                Konfirmasi ke Admin Sekarang
                            </button>
                        </div>
                    )
                };
        }
    };

    const pendingState = getPendingStateConfig();

    return (
        <MainLayout user={user}>
            <Head title={`Review CV - ${reviewData.posisi}`} />

            <div className="bg-[#F8FAFC] min-h-screen py-8 sm:py-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/50 to-transparent -z-10"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                    {/* Header Back Button */}
                    <div className="mb-8">
                        <Link
                            href={route('layanan.tabel.cv.review')}
                            className="group inline-flex items-center text-gray-500 hover:text-emerald-800 transition-colors duration-300"
                        >
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mr-4 group-hover:border-emerald-200 group-hover:shadow-md group-hover:bg-emerald-50 transition-all duration-300">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </div>
                            <span className="font-bold text-base font-sans tracking-wide">
                                {isCounselor ? "Kembali ke Antrian" : "Kembali ke Riwayat"}
                            </span>
                        </Link>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white overflow-hidden relative">

                        {/* Header Status Bar */}
                        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                                        Detail Pengajuan
                                    </span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {reviewData.tanggalPengajuan}
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                                    {reviewData.posisi}
                                </h1>
                            </div>

                            <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 shadow-sm ${statusStyle.wrapper}`}>
                                {statusStyle.icon}
                                <span className="font-bold text-sm sm:text-base">{reviewData.statusPeninjauan}</span>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 lg:p-10">

                            {/* SECTION: Informasi */}
                            <div className="mb-12">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                                    <User className="w-5 h-5 text-emerald-500" />
                                    Informasi & Status
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                                    <DataRow label="Nama Lengkap" value={reviewData.namaLengkap} icon={User} />
                                    <DataRow label="NPM" value={reviewData.npm} icon={BookOpen} />
                                    <DataRow label="Fakultas" value={reviewData.faculty} icon={Building} />
                                    <DataRow label="Program Studi" value={reviewData.study_program} icon={GraduationCap} />
                                    <DataRow label="Email" value={reviewData.email} icon={Mail} />
                                    <DataRow label="WhatsApp" value={reviewData.phone} icon={Phone} />
                                </div>

                                {/* SECTION: DOKUMEN CV ASLI */}
                                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                        {isCounselor ? "Dokumen CV Pemohon" : "Dokumen yang Anda Kirim"}
                                    </h3>
                                    <a
                                        href={route('layanan.cv.download', reviewData.id)}
                                        className="group flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300 max-w-md cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm group-hover:bg-emerald-200 group-hover:border-emerald-300 transition-colors">
                                                <Paperclip className="w-5 h-5 text-gray-500 group-hover:text-emerald-700" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm group-hover:text-emerald-900 transition-colors line-clamp-1">
                                                    {reviewData.cv_file_name || "File CV"}
                                                </p>
                                                <p className="text-xs text-gray-500 group-hover:text-emerald-600 mt-0.5">
                                                    Klik untuk mengunduh dokumen
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-2 text-gray-400 group-hover:text-emerald-600 transition-colors">
                                            <Download className="w-5 h-5" />
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* SECTION: Catatan Tambahan */}
                            {reviewData.keterangan && reviewData.keterangan !== '-' && (
                                <div className="mb-12">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        {isCounselor ? "Catatan Tambahan Pemohon" : "Catatan Tambahan Anda"}
                                    </h3>
                                    <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5 sm:p-6 relative">
                                        <div className="absolute top-6 left-0 w-1 h-12 bg-blue-400 rounded-r-full"></div>
                                        <p className="text-gray-600 italic leading-relaxed pl-2">
                                            "{reviewData.keterangan}"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* SECTION: Hasil Review (JIKA SELESAI) */}
                            {reviewData.status_raw === 'completed' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-100">
                                        <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <FileText className="w-4 h-4 text-emerald-600" />
                                            </span>
                                            Hasil Review & Saran
                                        </h3>
                                        <div className="prose prose-emerald max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {reviewData.feedback_text}
                                        </div>
                                    </div>

                                    {reviewData.feedback_files && reviewData.feedback_files.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-4 ml-1">Dokumen Hasil Revisi</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {reviewData.feedback_files.map((file, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleDownload(file.url)}
                                                        className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 text-left w-full"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                                            <Icons.Document className="w-6 h-6 text-gray-400 group-hover:text-emerald-600" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-gray-800 truncate group-hover:text-emerald-700 transition-colors">{file.name}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">Klik untuk mengunduh</p>
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                                                            <Download className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SECTION: Status Pending Dynamic (HANYA MAHASISWA) */}
                            {!isCounselor && reviewData.status_raw !== 'completed' && reviewData.status_raw !== 'cancelled' && (
                                <div className={`text-center py-12 rounded-3xl border border-dashed ${pendingState.bg} ${pendingState.border}`}>
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                        {pendingState.icon}
                                    </div>
                                    <h3 className={`text-lg font-bold mb-1 ${pendingState.text}`}>{pendingState.title}</h3>
                                    <div className="text-gray-500 max-w-lg mx-auto leading-relaxed px-4">
                                        {pendingState.desc}
                                    </div>
                                </div>
                            )}

                            {/* SECTION: Cancelled State */}
                            {reviewData.status_raw === 'cancelled' && (
                                <div className="text-center py-12 bg-red-50/50 rounded-3xl border border-dashed border-red-200">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-red-100">
                                        <XCircle className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-red-800 mb-1">Pengajuan Dibatalkan</h3>
                                    <p className="text-red-600/80 max-w-sm mx-auto">
                                        {isCounselor ? "Pemohon telah membatalkan pengajuan review CV ini." : "Anda telah membatalkan pengajuan review CV ini."}
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default DetailSubmission;