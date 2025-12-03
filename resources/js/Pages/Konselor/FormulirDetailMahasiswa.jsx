import React, { useState } from 'react'; 
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeft, User, Calendar, MessageSquare, Clock, Mail, Phone, Users, XCircle, AlertTriangle } from 'lucide-react'; 

const mapStatusToIndonesian = (status) => {
    switch (status) {
        case 'Pending':
            return 'Tertunda';
        case 'Accepted':
            return 'Diterima';
        case 'Completed':
            return 'Selesai';
        case 'Rejected':
            return 'Ditolak';
        default:
            return status;
    }
};

const DUMMY_CONSULTATION_DATA = {
    id: 1,
    student_name: 'Budi Santoso',
    student_nim: '1201211001',
    student_phone: '0812-3456-7890',
    student_email: 'budi.santoso@students.ac.id',
    topic: 'Masalah Skripsi dan Metodologi Penelitian',
    reason: 'Saya merasa buntu dalam menyusun Bab 3 (Metode Penelitian). Perlu bantuan untuk memvalidasi instrumen dan teknik analisis data yang akan digunakan agar skripsi saya valid.',
    date_submitted: '2025-12-08',
    preferred_date: '2025-12-10',
    preferred_time: '10:00 WIB',
    preferred_counselor: 'Dr. Rina Puspita, M.Psi',
    status: 'Pending'
};

const FormulirDetailMahasiswa = ({ consultation = DUMMY_CONSULTATION_DATA }) => {
    const { auth } = usePage().props;
    const user = auth.user;
    
    const [showRejectModal, setShowRejectModal] = useState(false);

    const isPending = consultation.status === 'Pending';

    const getStatusClass = (status) => {
        if (status === 'Pending') return 'bg-yellow-500';
        if (status === 'Accepted') return 'bg-[#00CA65]';
        if (status === 'Rejected') return 'bg-red-500';
        if (status === 'Completed') return 'bg-blue-500'; 
        return 'bg-gray-500';
    };

    return (
        <MainLayout user={user}>
            <Head title={`Detail Konsultasi ${consultation.student_name}`} />

            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                    <div className="flex justify-between items-center mb-6">
                        <Link
                            href={route('konselor.table_konsultasi')} 
                            className="flex items-center text-gray-700 hover:text-[#004d40] transition font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Daftar Konsultasi
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                        <h1 className="text-3xl text-center font-serif font-extrabold text-[#004d40] mb-6 border-b pb-3">
                            Formulir Konsultasi Mahasiswa
                        </h1>

                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">
                            Data Mahasiswa
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                            <DetailItem icon={<User />} label="Nama Mahasiswa" value={consultation.student_name} />
                            <DetailItem icon={<User />} label="NIM / NPM" value={consultation.student_nim} />
                            <DetailItem icon={<Mail />} label="Email" value={consultation.student_email} />
                            <DetailItem icon={<Phone />} label="Nomor Telepon" value={consultation.student_phone} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2 pt-4">
                            Jadwal & Konselor Pilihan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                            <DetailItem icon={<Clock />} label="Tanggal Pengajuan" value={consultation.date_submitted} />
                            <DetailItem icon={<Calendar />} label="Jadwal Diminta" value={`${consultation.preferred_date} (${consultation.preferred_time})`} />

                            <div className="md:col-span-2">
                                <DetailItem icon={<Users />} label="Konselor Pilihan" value={consultation.preferred_counselor} />
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    *Konselor yang dipilih bersifat indikatif dan dapat berubah menyesuaikan ketersediaan.
                                </p>
                            </div>
                        </div>


                        <h2 className="text-xl font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2 pt-4">
                            Detail Konseling
                        </h2>

                        <div className="mb-6">
                            <DetailItem icon={<MessageSquare />} label="Topik Konseling" value={consultation.topic} />
                        </div>

                        <div className="mb-8 p-4 bg-gray-50 border rounded-xl">
                            <p className="text-sm font-bold text-[#004d40] mb-2">
                                <MessageSquare className="w-4 h-4 inline-block mr-1"/> Alasan/Deskripsi Masalah
                            </p>
                            <p className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
                                {consultation.reason}
                            </p>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="text-lg font-bold">
                                Status:
                                <span className={`ml-2 px-4 py-1 rounded-full text-white font-medium ${getStatusClass(consultation.status)}`}>
                                    {mapStatusToIndonesian(consultation.status)} 
                                </span>
                            </span>

                            {isPending && (
                                <div className="space-x-3">
                                    <Link
                                        href={route('konselor.approve', consultation.id)}
                                        method="post"
                                        as="button"
                                        className="px-4 py-2 rounded-xl bg-[#00CA65] text-black font-semibold hover:bg-[#009c50] transition"
                                    >
                                        Setujui Jadwal
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => setShowRejectModal(true)}
                                        className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                    >
                                        Tolak
                                    </button>
                                </div>
                            )}
                            
                            {!isPending && (
                                <div className="text-sm text-gray-500 italic">
                                    Aksi tidak tersedia: Konsultasi ini sudah **{mapStatusToIndonesian(consultation.status)}**.
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            {showRejectModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
                        
                        <div className="bg-red-500 p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <AlertTriangle className="w-6 h-6 text-white mr-3" />
                                <h3 className="text-xl font-bold text-white">Konfirmasi Penolakan</h3>
                            </div>
                            <button onClick={() => setShowRejectModal(false)} className="text-white hover:text-gray-200">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 text-center">
                            <p className="text-gray-700 mb-6 font-medium">
                                Apakah Anda yakin ingin menolak permintaan konsultasi dari {consultation.student_name}? Aksi ini tidak dapat dibatalkan.
                            </p>
                            
                            <div className="flex justify-center space-x-4">
                                <Link
                                    href={route('konselor.reject', consultation.id)}
                                    method="post"
                                    as="button"
                                    className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg"
                                >
                                    Ya, Tolak Sekarang
                                </Link>

                                <button
                                    onClick={() => setShowRejectModal(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </MainLayout>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-500 flex items-center mb-1">
            {React.cloneElement(icon, { className: 'w-4 h-4 mr-2 text-[#004d40]' })}
            {label}
        </p>
        <p className="text-gray-900 text-lg font-semibold">
            {value}
        </p>
    </div>
);

export default FormulirDetailMahasiswa;