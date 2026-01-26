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
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            
            <Head title="Masuk" />
            
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0"
                    style={{ 
                        backgroundImage: 'url(/images/bg-swirl.jpg)', 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center' 
                    }}
                ></div>
                <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm"></div>
            </div>

            {/* MAIN CARD CONTAINER */}
            <div className="relative z-10 w-full max-w-6xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] md:min-h-[700px] animate-fade-in-up">
                
                {/* BAGIAN KIRI (Visual Branding - Hidden on Mobile) */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-50 to-teal-100 flex-col items-center justify-center p-10 lg:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <img
                            src={LOGO_YARSI_CDC}
                            alt="Logo CDC YARSI"
                            className="w-80 lg:w-100 h-auto mb-8 lg:mb-10 drop-shadow-lg mx-auto"
                        />
                       <h2 className="text-3xl font-extrabold text-emerald-800 mb-4 font-serif">
                            Career Development Center
                        </h2>
                        <p className="text-emerald-600 text-xl lg:text-2xl font-medium">
                            Universitas YARSI
                        </p>
                        <div className="mt-8 lg:mt-10 w-20 lg:w-24 h-1.5 bg-emerald-500 rounded-full mx-auto"></div>
                        <p className="mt-6 lg:mt-8 text-sm lg:text-lg text-gray-500 max-w-sm mx-auto leading-relaxed">
                            Platform pengembangan karir dan sertifikasi untuk masa depan profesional Anda.
                        </p>
                    </div>
                </div>

                {/* BAGIAN KANAN (Form Login) */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                    
                    {/* Logo Mobile Only - Diperkecil di HP agar pas */}
                    <div className="md:hidden flex justify-center mb-6">
                        <img src={LOGO_YARSI_CDC} alt="Logo" className="w-24 sm:w-28" />
                    </div>

                    <div className="mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Selamat Datang! 👋</h2>
                        <p className="text-base md:text-lg text-gray-600">Silakan masuk untuk mengakses akun Anda.</p>
                    </div>

                    {status && (
                        <div className="mb-6 md:mb-8 p-4 md:p-5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl md:rounded-2xl text-sm md:text-base font-medium flex items-center">
                            ✅ {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5 md:space-y-8">
                        {/* Username Input */}
                        <div>
                            <InputLabel htmlFor="username" value="Nama Pengguna" className="text-gray-800 text-sm md:text-base font-bold mb-2 md:mb-3 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <TextInput
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    className="pl-11 md:pl-14 pr-4 py-3 md:py-4 block w-full text-base md:text-lg rounded-xl md:rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 shadow-sm transition-all"
                                    placeholder="Username Anda"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.username} className="mt-1.5 md:mt-2 text-xs md:text-sm" />
                        </div>

                        {/* Password Input */}
                        <div>
                            <InputLabel htmlFor="password" value="Kata Sandi" className="text-gray-800 text-sm md:text-base font-bold mb-2 md:mb-3 ml-1" />
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                                </div>
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="pl-11 md:pl-14 pr-11 md:pr-14 py-3 md:py-4 block w-full text-base md:text-lg rounded-xl md:rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 shadow-sm transition-all"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 md:pr-5 flex items-center text-gray-400 hover:text-emerald-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 md:h-6 md:w-6" /> : <Eye className="h-5 w-5 md:h-6 md:w-6" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5 md:mt-2 text-xs md:text-sm" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="h-5 w-5 md:h-6 md:w-6 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 md:ml-3 text-sm md:text-base text-gray-600 font-semibold">Ingat Saya</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton 
                            className="w-full justify-center py-3.5 md:py-5 text-base md:text-lg font-extrabold tracking-widest rounded-xl md:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                            disabled={processing}
                        >
                            {processing ? 'Memproses...' : 'MASUK SEKARANG'}
                        </PrimaryButton>

                        {/* Back to Home */}
                        <div className="text-center mt-6 md:mt-10">
                            <Link
                                href="/"
                                className="inline-flex items-center text-sm md:text-base font-bold text-gray-400 hover:text-emerald-600 transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:-translate-x-1.5 transition-transform" />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-4 md:bottom-6 text-center w-full z-10 text-white/70 text-[10px] md:text-sm font-medium px-4">
                &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI.
            </div>
        </div>
    );
}