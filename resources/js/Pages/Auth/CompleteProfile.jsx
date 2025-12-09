import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

export default function CompleteProfile({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone || '',
        gender: user.gender || '', 
    });

    const [phoneStatus, setPhoneStatus] = useState(null);

    // Cek apakah gender dikunci (read-only) atau bisa diedit
    // Jika user.gender dari backend sudah ada isinya, maka locked = true
    const isGenderLocked = !!user.gender; 

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
        const isValid = /^(08|628)[0-9]{8,13}$/.test(cleaned);
        setPhoneStatus(isValid ? 'valid' : 'invalid');
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;
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
            window.open(`https://wa.me/${phone}?text=Test`, '_blank');
        }
    };

    const isButtonDisabled = processing || phoneStatus !== 'valid' || !data.gender;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4"
             style={{ backgroundImage: 'url(/images/bg-swirl.jpg)', backgroundSize: 'cover' }}>
            
            <Head title="Lengkapi Data Dirimu" />
            
            <div className="w-full max-w-3xl rounded-[2.5rem] bg-white p-6 shadow-2xl relative">
                <Link href={route('logout')} method="post" as="button" className="absolute top-4 left-4 text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </Link>

                <div className="mb-6 flex justify-center">
                    <img src={LOGO_YARSI_CDC} alt="Logo CDC YARSI" className="h-16" />
                </div>

                <h2 className="mb-6 text-center text-2xl font-bold text-yarsi-green">
                    Lengkapi Data Dirimu!
                </h2>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Nama Lengkap (Read-only) */}
                        <div className="md:col-span-2">
                            <InputLabel value="Nama Lengkap" />
                            <TextInput value={user.name} className="mt-1 w-full bg-gray-100" disabled />
                        </div>

                        {/* Nomor WhatsApp (Wajib Semua User) */}
                        <div className="md:col-span-2">
                            <InputLabel htmlFor="phone" value="Nomor WhatsApp (Aktif)" className="font-semibold text-gray-700" />
                            <TextInput
                                id="phone"
                                type="tel"
                                value={data.phone}
                                className={`mt-1 block w-full ${phoneStatus === 'valid' ? 'border-green-500 focus:ring-green-500' : ''}`}
                                onChange={handlePhoneChange}
                                placeholder="08xxxxxxxxxx"
                                required
                            />
                            <InputError message={errors.phone} className="mt-2" />
                            
                            {/* Indikator Validasi */}
                            {phoneStatus === 'valid' && (
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="flex items-center gap-2 text-green-600 text-sm">
                                        <CheckCircle size={16} /> Format valid
                                    </p>
                                    <button type="button" onClick={openWhatsAppTest} className="text-xs text-blue-600 hover:underline">
                                        Test WhatsApp
                                    </button>
                                </div>
                            )}
                            {phoneStatus === 'invalid' && data.phone.length > 5 && (
                                <p className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <XCircle size={16} /> Format salah (Gunakan 08.. atau 628..)
                                </p>
                            )}
                        </div>

                        {/* Gender (Kondisional: Read-only jika dari LDAP, Editable jika kosong) */}
                        <div>
                            <InputLabel htmlFor="gender" value="Jenis Kelamin" className="font-semibold text-gray-700" />
                            <div className="relative mt-1">
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    disabled={isGenderLocked}
                                    className={`w-full rounded-md border-gray-300 shadow-sm focus:border-yarsi-green focus:ring-yarsi-green 
                                        ${isGenderLocked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}`}
                                >
                                    <option value="" disabled>Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>
                            {isGenderLocked && (
                                <p className="text-xs text-gray-400 mt-1">*Data dari sistem akademik</p>
                            )}
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        {/* ID Number (Read-only) */}
                        <div>
                            <InputLabel value={user.id_label || 'NPM/NIP'} />
                            <TextInput value={user.id_number || '-'} className="mt-1 w-full bg-gray-100" disabled />
                        </div>

                        {/* --- BAGIAN KHUSUS MAHASISWA --- */}
                        {user.role === 'mahasiswa' && (
                            <>
                                <div>
                                    <InputLabel value="Fakultas" />
                                    <TextInput 
                                        value={user.faculty || '-'} 
                                        className="mt-1 w-full bg-gray-100 text-gray-600" 
                                        disabled 
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Program Studi" />
                                    <TextInput 
                                        value={user.study_program || '-'} 
                                        className="mt-1 w-full bg-gray-100 text-gray-600" 
                                        disabled 
                                    />
                                </div>
                            </>
                        )}

                        {/* E-mail (Read-only) */}
                        <div className="md:col-span-2">
                            <InputLabel value="E-mail Institusi" />
                            <TextInput value={user.email} className="mt-1 w-full bg-gray-100" disabled />
                        </div>
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center rounded-lg bg-yarsi-gradient-button py-3 text-white shadow-lg disabled:opacity-50"
                            disabled={isButtonDisabled}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Data'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}