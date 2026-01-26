import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, User, Phone, Briefcase, GraduationCap, Mail, ArrowLeft, X } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

export default function CompleteProfile({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone || '',
    });

    const [phoneStatus, setPhoneStatus] = useState(null);

    // Validasi Phone Effect
    useEffect(() => {
        if (!data.phone || data.phone.length < 10) {
            setPhoneStatus(null);
            return;
        }
        validatePhoneFormat(data.phone);
    }, [data.phone]);

    const validatePhoneFormat = (phone) => {
        const cleaned = phone.replace(/[^0-9]/g, '');
        // Pola: dimulai 08 atau 628, diikuti 8-13 digit
        const isValid = /^(08|628)[0-9]{8,13}$/.test(cleaned);
        setPhoneStatus(isValid ? 'valid' : 'invalid');
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;
        // Hanya izinkan angka
        value = value.replace(/[^0-9]/g, '');
        setData('phone', value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (phoneStatus !== 'valid') return;

        // Kirim data
        post(route('profile.complete.store'));
    };

    // Tombol WA Test
    const openWhatsAppTest = () => {
        if (phoneStatus === 'valid') {
            let phone = data.phone.replace(/[^0-9]/g, '');
            if (phone.startsWith('0')) phone = '62' + phone.substring(1);
            window.open(`https://wa.me/${phone}?text=Halo%20${user.name}%2C%20ini%20adalah%20tes%20koneksi%20WhatsApp%20dari%20CDC%20YARSI.`, '_blank');
        }
    };

    const isButtonDisabled = processing || phoneStatus !== 'valid';

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Lengkapi Data Dirimu" />

            {/* Background Layer */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/bg-swirl.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm"></div>
            </div>

            {/* MAIN CARD CONTAINER */}
            <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">

                {/* --- BAGIAN KIRI --- */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-50 to-teal-100 flex-col items-center justify-center p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-300 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <img
                            src={LOGO_YARSI_CDC}
                            alt="Logo CDC YARSI"
                            className="w-90 h-auto mb-8 drop-shadow-md mx-auto"
                        />
                        <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 font-serif">
                            Career Development Center
                        </h2>
                        <p className="text-emerald-600 text-lg leading-relaxed">
                            Universitas YARSI
                        </p>
                        <div className="mt-8 w-16 h-1 bg-emerald-500 rounded-full mx-auto"></div>
                        <p className="mt-6 text-sm text-gray-500 max-w-xs mx-auto">
                            Mohon lengkapi data dirimu untuk melanjutkan akses ke platform.
                        </p>
                    </div>
                </div>

                {/* BAGIAN KANAN */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">

                    {/* Logout Button (Close Icon) */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-20 p-2"
                        title="Logout / Keluar"
                    >
                        <X className="h-6 w-6" />
                    </Link>

                    {/* Logo Mobile Only */}
                    <div className="md:hidden flex justify-center mb-6">
                        <img src={LOGO_YARSI_CDC} alt="Logo" className="w-24" />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lengkapi Data Dirimu! 👋</h2>
                        <p className="text-gray-500">Data ini dibutuhkan untuk melengkapi profil Anda.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-1 gap-5">

                            {/* Nama Lengkap (Read-only) */}
                            <div className='flex flex-col space-y-1'>
                                <InputLabel value="Nama Lengkap" className="text-gray-700 font-bold ml-1" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <TextInput
                                        value={user.name}
                                        className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Nomor WhatsApp */}
                            <div className='flex flex-col space-y-1'>
                                <InputLabel htmlFor="phone" value="Nomor WhatsApp (Aktif)" className="text-gray-700 font-bold ml-1" />
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                    </div>
                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        className={`pl-12 pr-12 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-emerald-500 shadow-sm transition-all
                                            ${phoneStatus === 'valid' ? 'border-green-500 focus:border-green-500' : 'focus:border-emerald-500'}`}
                                        onChange={handlePhoneChange}
                                        placeholder="08xxxxxxxxxx atau 628xxxxxxxxxx"
                                        required
                                    />
                                    {/* Icon Validasi / Test WA */}
                                    {phoneStatus === 'valid' && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.phone} className="mt-1 ml-1" />

                                {/* Indikator Validasi & Test WA */}
                                {phoneStatus === 'valid' && (
                                    <div className="flex items-center justify-between mt-1 ml-1">
                                        <p className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                            <CheckCircle size={14} /> Format valid
                                        </p>
                                        <button type="button" onClick={openWhatsAppTest} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                            Test WhatsApp
                                        </button>
                                    </div>
                                )}
                                {phoneStatus === 'invalid' && data.phone.length > 5 && (
                                    <p className="mt-1 flex items-center gap-1 text-red-600 text-xs ml-1">
                                        <XCircle size={14} /> Format salah (Gunakan 08.. atau 628..)
                                    </p>
                                )}
                            </div>

                            
                                {/* ID Number (Read-only) */}
                                <div className='flex flex-col space-y-1'>
                                    <InputLabel value={user.id_label || 'NPM/NIP'} className="text-gray-700 font-bold ml-1" />
                                    <div className="relative">
                                        <TextInput
                                            value={user.id_number || '-'}
                                            className="w-full pl-4 pr-4 py-3.5 rounded-xl border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                                            disabled
                                        />
                                    </div>
                                </div>
                            

                            {/* --- BAGIAN KHUSUS MAHASISWA (Read-only) --- */}
                            {user.role === 'mahasiswa' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Fakultas */}
                                    <div className='flex flex-col space-y-1'>
                                        <InputLabel value="Fakultas" className="text-gray-700 font-bold ml-1" />
                                        <div className="relative">
                                            <TextInput
                                                value={user.faculty || '-'}
                                                className="w-full pl-4 pr-4 py-3.5 rounded-xl border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    {/* Program Studi */}
                                    <div className='flex flex-col space-y-1'>
                                        <InputLabel value="Program Studi" className="text-gray-700 font-bold ml-1" />
                                        <div className="relative">
                                            <TextInput
                                                value={user.study_program || '-'}
                                                className="w-full pl-4 pr-4 py-3.5 rounded-xl border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* E-mail Institusi (Read-only, selalu muncul) */}
                            <div className='flex flex-col space-y-1'>
                                <InputLabel value="E-mail Institusi" className="text-gray-700 font-bold ml-1" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <TextInput
                                        value={user.email}
                                        className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <PrimaryButton
                                className="w-full justify-center py-4 text-base font-bold tracking-wide rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:translate-y-0"
                                disabled={isButtonDisabled}
                            >
                                {processing ? 'Menyimpan Data...' : 'Simpan Data'}
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* Back to Home*/}
                    <div className="text-center mt-6">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-emerald-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Keluar / Kembali ke Halaman Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Text Kecil */}
            <div className="absolute bottom-4 text-center w-full z-10 text-white/60 text-xs">
                &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI. All rights reserved.
            </div>
        </div>
    );
}
