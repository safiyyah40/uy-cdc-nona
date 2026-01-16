import React, { useState, useRef } from 'react';
import { useForm, router, usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import {
    Upload, Trash2, Info, CheckCircle, ArrowLeft,
    FileText, User, Phone, Mail, Building,
    GraduationCap, BookOpen, AlertCircle
} from 'lucide-react';

// Komponen Kecil
const ReadOnlyField = ({ label, value, icon: Icon }) => (
    <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
            </div>
            <input
                type="text"
                value={value || '-'}
                disabled
                className="block w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base cursor-not-allowed select-none"
            />
        </div>
    </div>
);

const FormUnggahCv = () => {
    // Ambil data user dengan aman
    const { auth } = usePage().props;
    const user = auth?.user || {};

    const { data, setData, post, processing, errors } = useForm({
        target_position: '',
        additional_notes: '',
        cv_file: null,
    });

    const [fileError, setFileError] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        // 10MB limit
        const maxSize = 10 * 1024 * 1024;
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                setFileError('Tipe file tidak didukung. Mohon unggah PDF atau DOC/DOCX.');
                setData('cv_file', null);
                if (fileInputRef.current) fileInputRef.current.value = null;
                return;
            }
            if (file.size > maxSize) {
                setFileError('Ukuran file melebihi batas 10MB.');
                setData('cv_file', null);
                if (fileInputRef.current) fileInputRef.current.value = null;
                return;
            }
            setData('cv_file', file);
        }
    };

    const handleRemoveFile = () => {
        setData('cv_file', null);
        setFileError('');
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.cv_file) {
            setFileError("Wajib mengunggah file CV.");
            return;
        }

        post(route('layanan.cv.review.store'), {
            forceFormData: true,
            onSuccess: () => {
                setIsSuccessModalOpen(true);
            },
            onError: (err) => {
                console.error("Error submit:", err);
            }
        });
    };

    const handleSuccessNavigate = () => {
        setIsSuccessModalOpen(false);
        router.visit(route('layanan.tabel.cv.review'));
    };

    return (
    <MainLayout user={user}>
        <div className="fixed inset-0 -z-10 bg-gray-50"></div>

        <div className="min-h-screen pt-12 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                <div className="mb-8 pt-4">
                    <Link
                        href={route('layanan.cv.review')}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-800 transition-all font-medium text-sm group"
                    >
                        <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-emerald-800 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="uppercase tracking-wider text-xs">
                            Kembali ke Layanan Review CV
                        </span>
                    </Link>
                </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Header Form */}
                        <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 lg:p-12 border border-gray-200">

                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Formulir Unggah CV</h2>

                            <p className="text-l text-gray-900  text-center">Lengkapi data di bawah ini untuk mendapatkan review profesional.</p>


                        <div className="p-6 sm:p-8 lg:p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Data Mahasiswa (Read-Only) */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <User className="w-5 h-5 mr-2 text-emerald-600"/> Data Mahasiswa
                                    </h3>
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <ReadOnlyField label="Nama Lengkap" value={user?.name} icon={User} />
                                        <ReadOnlyField label="NPM" value={user?.id_number} icon={BookOpen} />
                                        <ReadOnlyField label="Fakultas" value={user?.faculty} icon={Building} />
                                        <ReadOnlyField label="Program Studi" value={user?.study_program} icon={GraduationCap} />
                                        <ReadOnlyField label="Email" value={user?.email} icon={Mail} />
                                        <ReadOnlyField label="WhatsApp" value={user?.phone} icon={Phone} />
                                    </div>
                                </div>

                                {/* Form Input */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-emerald-600"/> Dokumen & Informasi
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Posisi Target */}
                                        <div>
                                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                                                Posisi / Target Pekerjaan <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.target_position}
                                                onChange={e => setData('target_position', e.target.value)}
                                                placeholder="Contoh: UI/UX Designer, Data Analyst"
                                                className={`w-full px-4 py-3 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${errors.target_position ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                            />
                                            {errors.target_position && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.target_position}</p>}
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                                                File CV (PDF/DOC) <span className="text-red-500">*</span>
                                            </label>

                                            {!data.cv_file ? (
                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition group ${fileError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50'}`}
                                                >
                                                    <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                                        <Upload className={`w-7 h-7 ${fileError ? 'text-red-400' : 'text-gray-400 group-hover:text-emerald-600'}`} />
                                                    </div>
                                                    <p className="text-sm sm:text-base font-bold text-gray-700">Klik untuk memilih file</p>
                                                    <p className="text-xs text-gray-400 mt-1">Maksimal 10MB (PDF, DOC, DOCX)</p>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.doc,.docx"
                                                        className="hidden"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm">
                                                    <div className="flex items-center gap-4 overflow-hidden">
                                                        <div className="p-3 bg-white rounded-lg shadow-sm">
                                                            <FileText className="w-6 h-6 text-emerald-600" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-bold text-gray-800 truncate">{data.cv_file.name}</p>
                                                            <p className="text-xs text-emerald-600 font-medium">{(data.cv_file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemoveFile}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}

                                            {fileError && <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center"><Info className="w-4 h-4 mr-1" /> {fileError}</p>}
                                            {errors.cv_file && <p className="text-red-500 text-xs sm:text-sm mt-2 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.cv_file}</p>}
                                        </div>

                                        {/* Catatan */}
                                        <div>
                                            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                                                Catatan Tambahan (Opsional)
                                            </label>
                                            <textarea
                                                rows="4"
                                                value={data.additional_notes}
                                                onChange={e => setData('additional_notes', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                                placeholder="Pesan khusus untuk reviewer (misal: tolong review bagian pengalaman kerja...)"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-emerald-800 text-white font-bold text-lg rounded-xl hover:bg-emerald-900 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex justify-center items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sedang Mengunggah...
                                        </>
                                    ) : 'Kirim CV untuk Direview'}
                                </button>
                            </form>
                        </div>
                    </div>
                                            </div>
                </div>
            </div>

            {/* Modal Sukses */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-all">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Berhasil!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            CV Anda telah kami terima. Pantau statusnya di halaman riwayat.
                        </p>
                        <button
                            onClick={handleSuccessNavigate}
                            className="w-full py-3 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition shadow-md"
                        >
                            Kembali ke Riwayat
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </MainLayout>
    );
};

export default FormUnggahCv;
