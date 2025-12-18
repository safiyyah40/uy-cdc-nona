import { useForm, usePage, Link } from '@inertiajs/react';
import { useState } from "react";
import ProfilePhotoUploader from '@/Components/ProfilePhotoUploader';
import { Phone, Mail, User, Shield, X, ArrowLeft } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function EditProfile() {
    const { user } = usePage().props;

    // Popup state
    const [showConfirm, setShowConfirm] = useState(false);

    const getInitials = (name) => {
        if (!name) return "";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0][0].toUpperCase();

        return (
            parts[0][0].toUpperCase() +
            parts[parts.length - 1][0].toUpperCase()
        );
    };

    const { data, setData, post, processing, errors } = useForm({
        phone: user.phone ?? '',
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const confirmSave = () => {
        setShowConfirm(false);
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handlePhoneChange = (e) => {
        let p = e.target.value.replace(/[^0-9]/g, "");
        if (p.startsWith("0")) p = "62" + p.substring(1);
        setData("phone", p);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                backgroundImage: 'url(/images/bg-swirl.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm z-0"></div>

            <form
                onSubmit={submit}
                className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-in-up"
            >

                {/* Header & Close Button */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Edit Profil
                    </h2>
                    <Link
                        href={route('profile.show')}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Tutup"
                    >
                        <X className="h-6 w-6" />
                    </Link>
                </div>

                {/* FOTO PROFIL */}
                <div className="flex flex-col items-center space-y-4">
                    <ProfilePhotoUploader
                        initialName={getInitials(user.name)}
                        existingPhoto={user.photo_url}
                        onPhotoSelect={(file) => setData("photo", file)}
                    />
                    {errors.photo && (
                        <InputError message={errors.photo} className="mt-2 text-center" />
                    )}
                </div>

                <div className="space-y-5">

                    {/* Nama Lengkap (Read-only) */}
                    <div>
                        <InputLabel value="Nama Lengkap" className="text-gray-700 font-bold mb-2 ml-1" />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                type="text"
                                value={user.name}
                                className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    {/* ID Number (Read-only) */}
                    <div>
                        <InputLabel value={user.role === 'mahasiswa' ? 'NPM' : 'NIP'} className="text-gray-700 font-bold mb-2 ml-1" />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Shield className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                type="text"
                                value={user.id_number || '-'}
                                className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <InputLabel value="Email Institusi" className="text-gray-700 font-bold mb-2 ml-1" />
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <TextInput
                                type="email"
                                value={user.email}
                                className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                disabled
                            />
                        </div>
                    </div>

                    {/* Nomor Telepon (Editable) */}
                    <div>
                        <InputLabel htmlFor="phone" value="Nomor Telepon/WhatsApp" className="text-gray-700 font-bold mb-2 ml-1" />
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                            </div>
                            <TextInput
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={handlePhoneChange}
                                className="pl-12 pr-4 py-3.5 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 shadow-sm transition-all"
                                placeholder="628xxxxxx (Otomatis diubah dari 08xx)"
                            />
                        </div>
                        <InputError message={errors.phone} className="mt-2 ml-1" />
                    </div>

                    {/* Button Simpan */}
                    <PrimaryButton
                        type="submit"
                        className="w-full justify-center py-4 text-base font-bold tracking-wide rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:translate-y-0"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </PrimaryButton>

                    {/* Back to Profile Link */}
                    <div className="text-center mt-4">
                        <Link
                            href={route('profile.show')}
                            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-emerald-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Profil
                        </Link>
                    </div>
                </div>
            </form>

            {/* Popup Konfirmasi */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center animate-scaleIn border border-emerald-500/30">
                        <h2 className="text-2xl font-extrabold text-emerald-800 mb-3">
                            Konfirmasi Penyimpanan
                        </h2>

                        <p className="text-gray-600 mb-6 text-base">
                            Apakah Anda yakin ingin menyimpan perubahan data profil ini?
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Batal
                            </button>

                            <button
                                onClick={confirmSave}
                                className="flex-1 justify-center py-3 text-base font-bold tracking-wide rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
                            >
                                Ya, Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Text Kecil */}
            <div className="absolute bottom-4 text-center w-full z-10 text-white/60 text-xs">
                &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI. All rights reserved.
            </div>

            <style>{`
                .animate-fadeIn {
                    animation: fadeIn 0.25s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.25s ease-out forwards;
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
