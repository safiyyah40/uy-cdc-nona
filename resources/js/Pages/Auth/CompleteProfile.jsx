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
        phone: '',
    });

    const [phoneStatus, setPhoneStatus] = useState(null); // "valid", "invalid", null

    // Validasi format nomor telepon real-time
    useEffect(() => {
        if (!data.phone || data.phone.length < 10) {
            setPhoneStatus(null);
            return;
        }

        validatePhoneFormat(data.phone);
    }, [data.phone]);

    const validatePhoneFormat = (phone) => {
        // Hapus karakter non-digit
        const cleaned = phone.replace(/[^0-9]/g, '');
        
        // Validasi: Harus diawali 08 atau 628, Panjang 10-15 digit (Indonesia)
        const isValid = /^(08|628)[0-9]{8,13}$/.test(cleaned);
        
        setPhoneStatus(isValid ? 'valid' : 'invalid');
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (phoneStatus !== 'valid') {
            return;
        }
        
        post(route('profile.complete.store'));
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;
        
        // Hapus karakter selain angka
        value = value.replace(/[^0-9]/g, '');
        
        setData('phone', value);
    };

    const openWhatsAppTest = () => {
        if (phoneStatus === 'valid') {
            let phone = data.phone.replace(/[^0-9]/g, '');
            
            // Konversi 08xxx ke 628xxx
            if (phone.startsWith('0')) {
                phone = '62' + phone.substring(1);
            }
            
            // Buka wa.me untuk test nomor
            window.open(`https://wa.me/${phone}?text=Halo, ini test nomor WhatsApp dari CDC YARSI`, '_blank');
        }
    };

    const isButtonDisabled = processing || phoneStatus !== 'valid';

    return (
        <div
    className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4"
    style={{
        backgroundImage: 'url(/images/bg-swirl.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
    <Head title="Lengkapi Data Dirimu" />
    <div className="w-full max-w-3xl rounded-[2.5rem] bg-white p-6 shadow-2xl relative">
        
        {/* Ikon Close (Tombol "X") */}
        <button className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="mb-6 flex justify-center">
            <img src={LOGO_YARSI_CDC} alt="Logo CDC YARSI" className="h-16" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-yarsi-green">
            Lengkapi Data Dirimu!
        </h2>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Nama Lengkap (Read-only) */}
                        <div>
                            <InputLabel htmlFor="name" value="Nama Lengkap" className="font-semibold text-gray-700" />
                            <TextInput
                                id="name"
                                value={user.name}
                                className="mt-1 w-full bg-gray-100"
                                disabled
                            />
                        </div>

                        {/* Nomor WhatsApp */}
                        <div>
                            <InputLabel htmlFor="phone" value="Nomor WhatsApp" className="font-semibold text-gray-700" />
                            <TextInput
                                id="phone"
                                type="tel"
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={handlePhoneChange}
                                placeholder="08xxxxxxxxxx"
                                maxLength="15"
                                required
                            />
                            <InputError message={errors.phone} className="mt-2" />

                            {/* Status Validasi */}
                            {phoneStatus === 'valid' && (
                                <div className="mt-2">
                                    <p className="flex items-center gap-2 text-green-600 text-sm">
                                        <CheckCircle size={16} />
                                        Format nomor valid
                                    </p>
                                    <button
                                        type="button"
                                        onClick={openWhatsAppTest}
                                        className="mt-1 text-xs text-blue-600 hover:underline"
                                    >
                                        🔍 Test nomor ini di WhatsApp
                                    </button>
                                </div>
                            )}

                            {phoneStatus === 'invalid' && data.phone.length >= 10 && (
                                <p className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                                    <XCircle size={16} />
                                    Format nomor tidak valid (harus 08xxx atau 628xxx)
                                </p>
                            )}

                            <p className="mt-1 text-xs text-gray-500">
                                Contoh: 081234567890 atau 6281234567890
                            </p>
                        </div>

                        {/* ID Number (Read-only) */}
                        <div>
                            <InputLabel 
                                htmlFor="id_number" 
                                value={user.id_label || 'NPM/NIP'}
                                className="font-semibold text-gray-700" 
                            />
                            <TextInput
                                id="id_number"
                                value={user.id_number || '-'}
                                className="mt-1 w-full bg-gray-100"
                                disabled
                            />
                        </div>

                        {/* E-mail (Read-only) */}
                        <div>
                            <InputLabel htmlFor="email" value="E-mail" className="font-semibold text-gray-700" />
                            <TextInput
                                id="email"
                                value={user.email}
                                className="mt-1 w-full bg-gray-100"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center rounded-lg bg-yarsi-gradient-button py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isButtonDisabled}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </PrimaryButton>
                    </div>

                    <div className="mt-3 text-center">
                        <Link 
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Batal
                        </Link>
                  </div>
                </form>
            </div>
        </div>
    );
}