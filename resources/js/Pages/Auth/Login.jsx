import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, User, Lock, ArrowLeft } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            
            <Head title="Masuk - CDC UY" />
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
                
                {/* --- BAGIAN KIRI (Visual Branding - Desktop Only) --- */}
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
                            Platform pengembangan karir dan sertifikasi untuk masa depan profesional Anda.
                        </p>
                    </div>
                </div>

                {/* BAGIAN KANAN (Form Login) */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    
                    {/* Logo Mobile Only */}
                    <div className="md:hidden flex justify-center mb-8">
                        <img src={LOGO_YARSI_CDC} alt="Logo" className="w-24" />
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang! 👋</h2>
                        <p className="text-gray-500">Silakan masuk untuk mengakses akun Anda.</p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium flex items-center">
                            ✅ {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <InputLabel htmlFor="username" value="Nama Pengguna" className="text-gray-700 font-bold mb-2 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <TextInput
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 shadow-sm transition-all"
                                    placeholder="Masukkan nama pengguna Anda"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.username} className="mt-2 ml-1" />
                        </div>

                        {/* Password Input */}
                        <div>
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-gray-700 font-bold mb-2 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="pl-12 pr-12 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 shadow-sm transition-all"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2 ml-1" />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-emerald-500 checked:bg-emerald-500 hover:border-emerald-400"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600 font-medium">Ingat Saya</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton 
                            className="w-full justify-center py-4 text-base font-bold tracking-wide rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                            disabled={processing}
                        >
                            {processing ? 'Memproses...' : 'Masuk Sekarang'}
                        </PrimaryButton>

                        {/* Back to Home */}
                        <div className="text-center mt-8">
                            <Link
                                href="/"
                                className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-emerald-600 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Footer Text Kecil */}
            <div className="absolute bottom-4 text-center w-full z-10 text-white/60 text-xs">
                &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI. All rights reserved.
            </div>
        </div>
    );
}