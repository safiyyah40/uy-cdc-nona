import React, { useState, useEffect, useRef } from 'react';
import { useForm, router, usePage, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import {
    Upload, Trash2, Info, CheckCircle, ArrowLeft,
    FileText, User, Phone, Mail, Building,
    GraduationCap, BookOpen, AlertCircle
} from 'lucide-react';

/**
 * KOMPONEN: ReadOnlyField
 * Menampilkan data profil yang tidak dapat diubah oleh user.
 */
const ReadOnlyField = ({ label, value, icon: Icon }) => (
    <div className="flex flex-col">
        <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5 ml-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                {Icon && <Icon className="w-4 h-4 text-emerald-600 transition-colors group-hover:text-emerald-500" />}
            </div>
            <div className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm sm:text-base shadow-sm ring-1 ring-black/5 select-none overflow-hidden truncate">
                {value || '-'}
            </div>
        </div>
    </div>
);

const FormUnggahCv = () => {
    const { auth } = usePage().props;
    const user = auth?.user || {};

    const { data, setData, post, processing, errors, reset } = useForm({
        target_position: '',
        additional_notes: '',
        cv_file: null,
    });

    // STATES & REFS
    const [fileError, setFileError] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    // HANDLERS
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');

        // Batasan: 10MB & Format Dokumen
        const maxSize = 10 * 1024 * 1024;
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                setFileError('Format file tidak didukung. Gunakan PDF, DOC, atau DOCX.');
                handleRemoveFile();
                return;
            }
            if (file.size > maxSize) {
                setFileError('Ukuran file terlalu besar. Maksimal 10MB.');
                handleRemoveFile();
                return;
            }
            setData('cv_file', file);
        }
    };

    const handleRemoveFile = () => {
        setData('cv_file', null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.cv_file) {
            setFileError("Silakan unggah file CV Anda terlebih dahulu.");
            return;
        }

        post(route('layanan.cv.review.store'), {
            forceFormData: true,
            onSuccess: () => setIsSuccessModalOpen(true),
        });
    };

    const handleSuccessNavigate = () => {
        setIsSuccessModalOpen(false);
        router.visit(route('layanan.tabel.cv.review'));
    };

    return (
        <MainLayout user={user}>
            {/* Background Layer */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 to-white"></div>

            <div className="min-h-screen pt-8 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    
                    {/* Tombol Kembali */}
                    <div className="mb-6">
                        <Link
                            href={route('layanan.cv.review')}
                            className="inline-flex items-center gap-3 text-gray-500 hover:text-emerald-700 transition-all font-semibold group"
                        >
                            <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:border-emerald-200 group-hover:shadow-md transition-all">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-sm uppercase tracking-widest">Kembali</span>
                        </Link>
                    </div>

                    {/* Card Utama */}
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-emerald-900/5 border border-gray-100 overflow-hidden">
                        
                         {/* Header Form */}
                        <div className="bg-gradient-to-br from-emerald-50 to-white p-4 sm:p-6 lg:p-8 border-b border-gray-100">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 text-center mb-1 sm:mb-2">
                                Formulir Unggah CV
                            </h2>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center max-w-2xl mx-auto">
                                Lengkapi data di bawah ini untuk mendapatkan review profesional.
                            </p>
                        </div>

                        <div className="p-6 sm:p-10 lg:p-12">
                            <form onSubmit={handleSubmit} className="space-y-10">

                                {/* SEKSI 1: DATA MAHASISWA */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">Identitas Mahasiswa</h3>
                                    </div>
                                    <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ReadOnlyField label="Nama Lengkap" value={user?.name} icon={User} />
                                        <ReadOnlyField label="NPM" value={user?.id_number} icon={BookOpen} />
                                        <ReadOnlyField label="Fakultas" value={user?.faculty} icon={Building} />
                                        <ReadOnlyField label="Program Studi" value={user?.study_program} icon={GraduationCap} />
                                        <ReadOnlyField label="Email Yarsi" value={user?.email} icon={Mail} />
                                        <ReadOnlyField label="No. WhatsApp" value={user?.phone} icon={Phone} />
                                    </div>
                                </section>

                                {/* SEKSI 2: FORM INPUT */}
                                <section className="space-y-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-800">Detail Pengajuan</h3>
                                    </div>

                                    {/* Input Target Posisi */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm sm:text-base font-bold text-gray-700 flex items-center gap-1.5 ml-1">
                                            Posisi yang Dilamar <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.target_position}
                                            onChange={e => setData('target_position', e.target.value)}
                                            placeholder="Misal: Frontend Developer, Admin Hospital, dll."
                                            className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-200 outline-none
                                                ${errors.target_position 
                                                    ? 'border-red-200 bg-red-50 focus:border-red-500' 
                                                    : 'border-gray-100 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10'
                                                }`}
                                        />
                                        {errors.target_position && (
                                            <span className="text-red-500 text-xs font-bold mt-1 ml-1 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.target_position}
                                            </span>
                                        )}
                                    </div>

                                    {/* Upload Area */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm sm:text-base font-bold text-gray-700 flex items-center gap-1.5 ml-1">
                                            Unggah Dokumen CV <span className="text-red-500">*</span>
                                        </label>
                                        
                                        {!data.cv_file ? (
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`relative border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 group
                                                    ${fileError 
                                                        ? 'border-red-200 bg-red-50' 
                                                        : 'border-emerald-100 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50'
                                                    }`}
                                            >
                                                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                                    <Upload className={`w-8 h-8 ${fileError ? 'text-red-400' : 'text-emerald-600'}`} />
                                                </div>
                                                <h4 className="text-base font-bold text-gray-800 mb-1">Pilih file atau seret ke sini</h4>
                                                <p className="text-xs text-gray-500">Mendukung PDF atau Word (Maks. 10MB)</p>
                                                <input 
                                                    type="file" 
                                                    ref={fileInputRef} 
                                                    onChange={handleFileChange} 
                                                    accept=".pdf,.doc,.docx" 
                                                    className="hidden" 
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between p-5 bg-white border-2 border-emerald-500 rounded-2xl shadow-md animate-in fade-in zoom-in duration-300">
                                                <div className="flex items-center gap-4 truncate">
                                                    <div className="p-3 bg-emerald-500 text-white rounded-xl">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div className="truncate">
                                                        <p className="text-sm font-black text-gray-800 truncate">{data.cv_file.name}</p>
                                                        <p className="text-xs text-emerald-600 font-bold uppercase">{(data.cv_file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveFile}
                                                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                    title="Hapus file"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        )}
                                        {fileError && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1"><Info className="w-3 h-3" /> {fileError}</p>}
                                    </div>

                                    {/* Textarea Catatan */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm sm:text-base font-bold text-gray-700 ml-1">
                                            Catatan Tambahan <span className="text-gray-400 font-normal">(Opsional)</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={data.additional_notes}
                                            onChange={e => setData('additional_notes', e.target.value)}
                                            placeholder="Tuliskan poin spesifik yang ingin Anda konsultasikan..."
                                            className="w-full px-5 py-4 border-2 border-gray-100 bg-gray-50 rounded-2xl text-sm sm:text-base focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                                        ></textarea>
                                    </div>
                                </section>

                                {/* Tombol Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-5 bg-emerald-800 text-white font-black text-lg rounded-2xl hover:bg-emerald-900 shadow-xl shadow-emerald-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Memproses Data...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-6 h-6" />
                                                <span>Ajukan Review Sekarang</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md"></div>
                    <div className="relative bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3">Pengiriman Berhasil!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                            CV Anda telah diterima. Pantau statusnya di halaman riwayat.
                        </p>
                        <button
                            onClick={handleSuccessNavigate}
                            className="w-full py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 transition-all shadow-lg active:scale-95"
                        >
                            Lihat Riwayat Review
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default FormUnggahCv;