import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Send, User, Phone, Mail, BookOpen, Calendar, Clock, Info, CheckCircle, AlertTriangle, X } from "lucide-react";


// SUCCESS MODAL (Dipanggil setelah SUBMIT berhasil)
const SuccessModal = ({ isOpen, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-sm mx-auto transform transition-all duration-300 scale-100 border border-gray-100">
                <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Berhasil Disimpan!</h3>
                    <p className="text-sm text-gray-600">
                        Terima kasih, data booking konsultasi Anda telah berhasil kami simpan. Mohon menunggu maksimal 2x24 jam untuk proses verifikasi. Kami akan segera mengirimkan konfirmasi akhir melalui WhatsApp.
                    </p>
                </div>
                <div className="mt-6">
                    <button
                        onClick={onNavigate}
                        className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                    >
                        Lihat Daftar Booking Saya
                    </button>
                </div>
            </div>
        </div>
    );
};


// ERROR/WARNING MODAL (Pop-up jika ada isian kosong)
const WarningModal = ({ isOpen, onClose, missingFields }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="relative inline-block align-middle bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full border border-gray-100">

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                        title="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-6">
                        {/* Icon Area */}
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50">
                            <AlertTriangle className="h-6 w-6 text-amber-600" aria-hidden="true" />
                        </div>

                        {/* Text Content */}
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                                Data Belum Lengkap
                            </h3>
                            <div className="mt-2 text-sm">
                                <p className="text-gray-500 mb-2">
                                    Harap periksa kembali. Anda harus melengkapi kolom berikut sebelum mengirimkan permintaan booking:
                                </p>
                                <ul className="list-disc list-inside text-left mx-auto max-w-xs text-amber-700 font-semibold space-y-1">
                                    {missingFields.map(field => (
                                        <li key={field}>{field}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer/Action Buttons */}
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                            onClick={onClose}
                        >
                            Oke, Saya Perbaiki
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};


// KOMPONEN FORMULIR KONSULTASI
const BookingForm = ({ auth, counselor_id, counselor_name, slot_date, slot_time, slot_id }) => {

    const user = auth.user;

    // State untuk mengontrol Modal Sukses
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    // State untuk mengontrol Modal Peringatan
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [missingFields, setMissingFields] = useState([]);


    const initialData = {
        name: user?.name || '',
        npm: user?.id_number || "",
        phone: user?.phone || '',
        email: user?.email || '',
        topic: '',
        notes: '',
        // Data dari Controller
        counselor_name: counselor_name || '',
        slot_date: slot_date || '',
        slot_time: slot_time || '',
        counselor_id: counselor_id || '',
        slot_id: slot_id || '',
    };

    const topics = [
        "Perencanaan Karier",
        "Konsultasi Minat & Bakat",
        "Simulasi Wawancara (Mock Interview)",
        "Persiapan Psikotes & FGD (Focus Group Discussion)",
        "Konsultasi Studi Lanjut (S2/S3)",
        "Bimbingan Program Magang",
        "Bimbingan Sertifikasi Profesional",
        "Hasil Tinjauan CV",
        "Lainnya"
    ];
    // Pastikan useForm diimpor dari "@inertiajs/react"
    const { data, setData, processing, errors, post } = useForm(initialData);

    const handleNavigation = () => {
        // Navigasi ke halaman daftar booking setelah sukses
        window.location.href = '/konsultasi/daftar-saya';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDASI FRONTEND
        const requiredFields = {
            phone: "Nomor Telepon (Whatsapp)",
            email: "Email Aktif",
            topic: "Topik Konseling",
            notes: "Keterangan Singkat",
        };

        const currentMissingFields = [];
        for (const key in requiredFields) {
            if (!data[key]) {
                currentMissingFields.push(requiredFields[key]);
            }
        }

        // Cek juga apakah slot sudah dipilih
        if (!data.counselor_id || !data.slot_id) {
            currentMissingFields.push("Jadwal Konseling (Tanggal & Waktu)");
        }

        if (currentMissingFields.length > 0) {
            setMissingFields(currentMissingFields);
            setIsWarningModalOpen(true);
            return;
        }
        post(route('konsultasi.submit'), {
            preserveScroll: true,
                onSuccess: () => {
                    // Opsional: Reset form atau tutup modal jika sukses
                    // reset(); 
                },
                onError: (errors) => {
                    console.error("Error submit:", errors);
                }
        });
    };

    // Helper Component untuk Input
    const InputField = ({ label, id, type = 'text', icon: Icon, value, onChange, error, disabled = false }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {error && <span className="text-red-500 font-normal ml-2 text-xs">({error})</span>}
            </label>
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                />
            </div>
        </div>
    );

    // Helper Component untuk Select
    const SelectField = ({ label, id, icon: Icon, value, onChange, error, options }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {error && <span className="text-red-500 font-normal ml-2 text-xs">({error})</span>}
            </label>
            <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <select
                    id={id}
                    name={id}
                    value={value}
                    onChange={e => setData(id, e.target.value)}
                    className={`block appearance-none w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}
                >
                    <option value="" disabled>Pilih {label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout user={user}>
            <Head title="Formulir Konsultasi" />

            {/* Tampilkan Modal di luar struktur utama */}
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onNavigate={handleNavigation}
            />
            {/* Modal Peringatan Baru */}
            <WarningModal
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                missingFields={missingFields}
            />

            {/* CONTAINER UTAMA (HEADER) */}
            <div className="bg-gray-50 pt-16 pb-6 border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link href="/layanan/konsultasi" className="inline-flex items-center text-sm text-gray-500 hover:text-[#004d40] transition mb-4">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Daftar Konselor
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 font-serif">Formulir Booking Konsultasi</h1>
                    <p className="text-gray-600 mt-1">Lengkapi data diri dan detail sesi Anda.</p>
                </div>
            </div>

            {/* FORM SECTION */}
            <div className="pb-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-xl shadow-2xl border border-gray-100">

                        {/* Detail Sesi yang Sudah Dipilih */}
                        <div className="mb-8 border border-emerald-300 bg-emerald-50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-[#004d40] mb-3 border-b border-emerald-200 pb-2">Detail Sesi Anda</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <div className="flex items-center text-gray-800">
                                    <User className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Konselor:</span>
                                    <span className="ml-2 font-medium line-clamp-1">{data.counselor_name || '—'}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Tanggal:</span>
                                    <span className="ml-2 font-medium">{data.slot_date || '—'}</span>
                                </div>
                                <div className="flex items-center text-gray-800">
                                    <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                                    <span className="font-semibold">Waktu:</span>
                                    <span className="ml-2 font-medium">{data.slot_time ? `${data.slot_time} WIB` : '—'}</span>
                                </div>
                            </div>

                            {(!data.counselor_id || !data.slot_id) && (
                                <p className="text-sm text-red-500 mt-3 font-medium flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1"/> Harap kembali dan pilih jadwal spesifik dari konselor.
                                </p>
                            )}
                        </div>

                        {/* DATA DIRI MAHASISWA */}
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Data Diri</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                                label="Nama Lengkap"
                                id="name"
                                icon={User}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                error={errors.name}
                                disabled={!!user}
                            />
                            <InputField
                                label="NPM/Nomor Induk"
                                id="npm"
                                icon={BookOpen}
                                value={data.npm}
                                onChange={e => setData('npm', e.target.value)}
                                error={errors.npm}
                                disabled={!!user}
                            />
                            <InputField
                                label="Nomor Telepon (WhatsApp)"
                                id="phone"
                                type="tel"
                                icon={Phone}
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                error={errors.phone}
                            />
                            <InputField
                                label="Email Aktif"
                                id="email"
                                type="email"
                                icon={Mail}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                error={errors.email}
                            />
                        </div>

                        {/* DETAIL KONSULTASI */}
                        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">Detail Konsultasi</h2>

                        <SelectField
                            label="Topik Konseling"
                            id="topic"
                            icon={BookOpen}
                            value={data.topic}
                            onChange={e => setData('topic', e.target.value)}
                            error={errors.topic}
                            options={topics}
                        />

                        <div className="mb-6">
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                Keterangan Singkat (Keluhan/Pertanyaan Utama)
                                {errors.notes && <span className="text-red-500 font-normal ml-2 text-xs">({errors.notes})</span>}
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows="4"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                placeholder="Jelaskan secara singkat apa yang ingin Anda diskusikan (misalnya: 'Saya kesulitan mengatur waktu untuk tugas akhir', 'Saya merasa cemas menjelang ujian')"
                                className={`block w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm ${errors.notes ? 'border-red-500' : 'border-gray-300'}`}
                            ></textarea>
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

                        {/* TOMBOL SUBMIT */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={processing || !data.counselor_id || !data.slot_id}
                                className="w-full py-3 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all disabled:bg-gray-400 disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    'Memproses...'
                                ) : (
                                    <>
                                        Kirim Permintaan Booking
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
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
