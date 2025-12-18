import { Link, usePage } from '@inertiajs/react';
import { User, Mail, Phone, Shield, Building, GraduationCap, X, Pencil, ArrowLeft } from 'lucide-react';

export default function ViewProfile() {
    const { user } = usePage().props;

    const getInitials = (name) => {
        if (!name) return "";

        const parts = name.trim().split(" ");

        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }

        return (
            parts[0][0].toUpperCase() +
            parts[parts.length - 1][0].toUpperCase()
        );
    };

    const ProfileItem = ({ label, value, icon: Icon }) => (
        <div>
            <label className="text-gray-700 font-bold mb-1.5 ml-1 text-sm block">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="pl-12 pr-4 py-3 block w-full rounded-xl border-gray-200 bg-gray-50 text-gray-800 text-sm font-medium cursor-default border shadow-sm">
                    {value || '-'}
                </div>
            </div>
        </div>
    );

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                backgroundImage: 'url(/images/bg-swirl.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl px-6 py-5 space-y-5 animate-fade-in-up">

                <div className="flex justify-between items-start pb-3 border-b border-gray-100 mb-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Detail Profil
                    </h2>

                    <Link
                        href="/dashboard"
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Tutup / Kembali ke Dashboard"
                    >
                        <X className="h-6 w-6" />
                    </Link>
                </div>

                {/* Foto Profil dan Info Dasar */}
                <div className="flex flex-col items-center mb-3">
                    <div className="relative w-32 h-32 mb-3">
                        {user.photo_url ? (
                            <img
                                src={user.photo_url}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full border-4 border-emerald-500 shadow-lg"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg">
                                {getInitials(user.name)}
                            </div>
                        )}
                    </div>
                    <p className="text-lg font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-emerald-600 font-medium capitalize mb-3">
                        {user.role}
                    </p>

                    {/* Tombol Pensil */}
                    <Link
                        href={route('profile.edit')}
                        className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-600 transition-all text-sm hover:scale-[1.02] active:scale-100"
                        title="Edit Foto & Nomor Telepon"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Profil
                    </Link>
                </div>

                <div className="space-y-4">

                    <ProfileItem
                        label="Nomor Telepon/WhatsApp"
                        value={user.phone}
                        icon={Phone}
                    />

                    <ProfileItem
                        label="Email Institusi"
                        value={user.email}
                        icon={Mail}
                    />

                    <ProfileItem
                        label={user.role === 'mahasiswa' ? 'Nomor Pokok Mahasiswa (NPM)' : 'Nomor Induk Pegawai (NIP)'}
                        value={user.id_number}
                        icon={Shield}
                    />

                    {user.role === 'mahasiswa' && (
                        <>
                            <ProfileItem
                                label="Fakultas"
                                value={user.faculty}
                                icon={Building}
                            />
                            <ProfileItem
                                label="Program Studi"
                                value={user.study_program}
                                icon={GraduationCap}
                            />
                        </>
                    )}

                    {/* Back to Dashboard */}
                    <div className="text-center py-2">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-emerald-600 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Text Kecil */}
            <div className="absolute bottom-8 text-center w-full z-10 text-white/60 text-xs">
                &copy; {new Date().getFullYear()} Career Development Center Universitas YARSI. All rights reserved.
            </div>

            <style>{`
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
