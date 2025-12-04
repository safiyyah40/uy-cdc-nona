import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, usePage, useForm, Link } from "@inertiajs/react";
import { ChevronLeft, Send, User, Phone, Mail, BookOpen, Calendar, Clock } from "lucide-react";

const BookingForm = ({ auth, counselor_id, counselor_name, slot_date, slot_time, slot_id }) => {

    const user = auth.user;

    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || "",
        npm: user?.id_number || "",
        phone: user?.phone || "",
        email: user?.email || "",
        topic: "",
        notes: "",
        counselor_name,
        slot_date,
        slot_time,
        counselor_id,
        slot_id,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/api/konsultasi/submit");
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
                    onChange={e => onChange(e)}
                    className={`block appearance-none w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm ${error ? 'border-red-500' : 'border-gray-300'} bg-white`}
                >
                    <option value="" disabled>Pilih {label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    );

    return (
        <MainLayout user={user}>
            <Head title="Formulir Konsultasi" />

            {/* HEADER / BREADCRUMB */}
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
            <div className="py-12 bg-white">
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
                                <p className="text-sm text-red-500 mt-3 font-medium">⚠️ Harap kembali dan pilih jadwal spesifik dari konselor.</p>
                            )}
                        </div>

                        {/* DATA DIRI MAHASISWA */}
                        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">Data Diri</h2>
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
                                label="NPM"
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