import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import { 
    ChevronLeft, Send, User, Phone, Mail, BookOpen, 
    Calendar, Clock, CheckCircle, AlertTriangle, 
    Building, GraduationCap, X, MessageCircle
} from "lucide-react";

// --- 1. SUCCESS MODAL (POP-UP) ---
const SuccessModal = ({ isOpen, waUrl, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6 sm:px-0">
            {/* Background Gelap */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            {/* Konten Modal */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:max-w-md w-full relative z-10 p-8 border border-emerald-100">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-6">
                        <CheckCircle className="h-10 w-10 text-emerald-600" />
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3 font-serif">
                        Reservasi Berhasil!
                    </h3>
                    
                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                        Data Reservasi Sesi Anda telah tersimpan. Mohon tunggu verifikasi maksimal <strong>2x24 jam</strong>. 
                        Anda dapat menghubungi Admin untuk konfirmasi lebih cepat.
                    </p>

                    <div className="space-y-3">
                        {waUrl && (
                            <a 
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <MessageCircle className="w-5 h-5" /> Chat Admin Sekarang
                            </a>
                        )}
                        
                        <button 
                            onClick={onNavigate} 
                            className="w-full py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                        >
                            Lihat Riwayat Saya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. WARNING MODAL ---
const WarningModal = ({ isOpen, onClose, missingFields }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 py-6 sm:px-0">
            <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all sm:max-w-sm w-full relative z-10 border border-red-100">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
                        <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Data Belum Lengkap</h3>
                    <p className="text-sm text-gray-500 mb-4">Harap lengkapi kolom berikut:</p>
                    <ul className="text-sm text-left bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 list-disc list-inside mb-6 font-medium">
                        {missingFields.map(field => (
                            <li key={field}>{field}</li>
                        ))}
                    </ul>
                    <button onClick={onClose} className="w-full py-2 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition">
                        Oke, Saya Lengkapi
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const BookingForm = ({ counselor_id, counselor_name, slot_date, slot_time, slot_id }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    
    // State Modal
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [waAdminUrl, setWaAdminUrl] = useState(null); // State untuk link WA

    const { data, setData, post, processing, errors, reset } = useForm({
        counselor_id: counselor_id || '',
        slot_id: slot_id || '',
        topic: '',
        notes: '',
    });

    const topics = [
        "Perencanaan Karier", "Konsultasi Minat & Bakat", "Simulasi Wawancara",
        "Persiapan Psikotes", "Studi Lanjut (S2/S3)", "Masalah Akademik",
        "Masalah Pribadi/Sosial", "Lainnya"
    ];

    // HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Cek Validasi Manual (Warning Modal)
        const missing = [];
        if (!data.topic) missing.push("Topik Konsultasi");
        if (!data.notes || data.notes.trim().length < 20) missing.push("Deskripsi Masalah (Min. 20 karakter)");

        if (missing.length > 0) {
            setMissingFields(missing);
            setIsWarningModalOpen(true);
            return;
        }

        // 2. Kirim Data (Jika valid)
        post(route('konsultasi.submit'), {
            preserveScroll: true, // PENTING: Agar posisi scroll tidak loncat
            onSuccess: (page) => {
                // Ambil URL WA dari flash message controller (jika ada)
                if (page.props.flash.wa_admin_url) {
                    setWaAdminUrl(page.props.flash.wa_admin_url);
                }
                // Tampilkan Modal Sukses
                setIsSuccessModalOpen(true);
                reset('topic', 'notes');
            },
            onError: (errors) => {
                console.log("Error submit:", errors);
            }
        });
    };

    const handleNavigation = () => {
        window.location.href = route('konsultasi.list');
    };

    const ReadOnlyField = ({ label, value, icon: Icon }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <input type="text" value={value || '-'} disabled className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed"/>
            </div>
        </div>
    );

    return (
        <MainLayout user={user}>
            <Head title="Formulir Konsultasi" />
            
            {/* --- MOUNT MODALS --- */}
            <SuccessModal 
                isOpen={isSuccessModalOpen} 
                waUrl={waAdminUrl} 
                onNavigate={handleNavigation} 
            />
            
            <WarningModal 
                isOpen={isWarningModalOpen} 
                onClose={() => setIsWarningModalOpen(false)} 
                missingFields={missingFields} 
            />

            {/* HEADER */}
            <div className="bg-gray-50 pt-16 pb-6 border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link href={route('layanan.konsultasi')} className="inline-flex items-center text-sm text-gray-500 hover:text-[#004d40] transition mb-4">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Konselor
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Formulir Resevasi Sesi Konsultasi</h1>
                    <p className="text-gray-600 mt-1">Lengkapi data diri dan detail sesi Anda.</p>
                </div>
            </div>

            <div className="pb-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border mt-6">

                        {/* Error Global */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="font-bold text-red-700 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-2"/> Kesalahan Sistem:
                                </p>
                                <ul className="list-disc ml-5 mt-1 text-sm text-red-600">
                                    {Object.values(errors).map((err, idx) => <li key={idx}>{err}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* INFO JADWAL */}
                        <div className="mb-8 border border-emerald-300 bg-emerald-50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-[#004d40] mb-3 pb-2 border-b border-emerald-200">Detail Sesi Anda</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-gray-800">
                                    <User className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Konselor:</span><span className="ml-2">{counselor_name}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Tanggal:</span><span className="ml-2">{slot_date}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                    <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Waktu:</span><span className="ml-2">{slot_time} WIB</span>
                                </div>
                            </div>
                        </div>

                        {/* DATA DIRI */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Data Diri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <ReadOnlyField label="Nama" value={user.name} icon={User} />
                            <ReadOnlyField label="NIM" value={user.id_number} icon={BookOpen} />
                            <ReadOnlyField label="Fakultas" value={user.faculty} icon={Building} />
                            <ReadOnlyField label="Prodi" value={user.study_program} icon={GraduationCap} />
                            <ReadOnlyField label="WhatsApp" value={user.phone} icon={Phone} />
                            <ReadOnlyField label="Email" value={user.email} icon={Mail} />
                        </div>

                        {/* FORM INPUT */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Detail Konsultasi</h2>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Topik Konsultasi *</label>
                            <select value={data.topic} onChange={e => setData('topic', e.target.value)} className={`w-full rounded-lg border ${errors.topic ? 'border-red-500' : 'border-gray-300'} focus:ring-emerald-500`}>
                                <option value="">Pilih Topik</option>
                                {topics.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ceritakan Masalah Anda * (Min. 20 karakter)</label>
                            <textarea rows="4" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Jelaskan secara singkat apa yang ingin Anda diskusikan (misalnya: 'Saya kesulitan mengatur waktu untuk tugas akhir', 'Saya merasa cemas menjelang ujian')"
                                className={`block w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm ${errors.notes ? 'border-red-500' : 'border-gray-300'}`}
                            ></textarea>
                            {data.notes.length > 0 && data.notes.length < 20 && <p className="text-xs text-amber-600 mt-1">Minimal 20 karakter lagi.</p>}
                        </div>

                        {/* Peringatan Penting */}
                        <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-lg text-sm text-amber-800">
                            <p className="font-semibold mb-2">Perhatian:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Pastikan <span className="font-semibold">email</span> dan
                                    <span className="font-semibold"> nomor telepon (WhatsApp)</span> Anda aktif,
                                    karena informasi terkait sesi konsultasi akan dikirim melalui kontak tersebut.
                                </li>
                                <li>
                                    Jika terdapat perubahan email atau nomor telepon,
                                    harap <span className="font-semibold">perbarui terlebih dahulu pada halaman Profil</span>.
                                </li>
                                <li>
                                    <span className="font-semibold">Konselor yang dipilih bersifat indikatif </span>
                                    dan dapat berubah menyesuaikan ketersediaan.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <button type="submit" disabled={processing} className="w-full py-3 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition disabled:opacity-50 flex justify-center items-center gap-2">
                                {processing ? 'Memproses...' : <><Send className="w-4 h-4" /> Kirim Permintaan Konsultasi</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default BookingForm;