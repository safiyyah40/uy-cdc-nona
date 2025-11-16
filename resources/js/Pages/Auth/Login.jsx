import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

const LOGO_YARSI_CDC = '/images/LOGO CDC-UY.png';

export default function Login({ status }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4"
             style={{ backgroundImage: 'url(/images/bg-swirl.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <Head title="Masuk" />

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                {/* Logo */}
                <div className="mb-6 flex justify-start">
                    <img
                        src={LOGO_YARSI_CDC}
                        alt="Logo CDC YARSI"
                    />
                </div>

                <h2 className="mb-4 text-center text-xl font-bold text-yarsi-green">
                    Halo, Selamat Datang di <br/> CDC Universitas Yarsi
                </h2>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={submit}>
                    {/* Nama Pengguna */}
                    <div>
                        <InputLabel htmlFor="username" value="Nama Pengguna" className="font-black text-yarsi-green" />
                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>

                    {/* Kata Sandi */}
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="font-black text-yarsi-green" />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm pr-10"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {/* Tombol ikon mata */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    // Ikon Mata Terbuka (SVG untuk 'eye-slash')
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-5.858-.908a3 3 0 00-4.243-4.243" /></svg>
                                ) : (
                                    // Ikon Mata Tertutup (SVG untuk 'eye')
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.543-7z" /></svg>
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Checkbox "Ingat Saya" */}
                    <div className="mt-4 flex justify-end">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-yarsi-green shadow-sm focus:ring-yarsi-green"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                        </label>
                    </div>
                    

                    {/* Tombol Masuk */}
                    <div className="mt-6">
                        <PrimaryButton className="w-full justify-center rounded-lg bg-yarsi-gradient-button py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity" disabled={processing}>
                            Masuk
                        </PrimaryButton>
                    </div>

                    {/* Tombol Batal */}
                    <div className="mt-3 text-center">
                        <Link
                            href="/" // link ke halaman beranda tamu
                            className="text-sm text-gray-400 hover:text-gray-600"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}