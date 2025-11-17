import { useForm, usePage, Link } from '@inertiajs/react';
import { useState } from "react";
import ProfilePhotoUploader from '@/Components/ProfilePhotoUploader';

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
        setShowConfirm(true); // buka popup dulu
    };

    const confirmSave = () => {
        setShowConfirm(false);
        post(route('profile.update'), {
            forceFormData: true,
        });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100"
            style={{
                backgroundImage: 'url(/images/bg-swirl.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <form
                onSubmit={submit}
                className="rounded-[2.5rem] bg-white p-6 shadow-2xl relative w-full max-w-sm"
            >
                {/* Close Button */}
                <div className="flex justify-end">
                    <Link 
                        href={route('profile.show')} 
                        className="text-gray-600 text-4xl font-bold leading-none"
                    >
                        ×
                    </Link>
                </div>

                {/* FOTO PROFIL */}
                <ProfilePhotoUploader
                    initialName={getInitials(user.name)}
                    existingPhoto={user.photo_url}
                    onPhotoSelect={(file) => setData("photo", file)}
                />

                {errors.photo && (
                    <div className="text-red-500 text-sm text-center">{errors.photo}</div>
                )}

                <div className="space-y-4 mt-4">
                    
                    {/* Nama Lengkap */}
                    <div>
                        <label className="font-black text-yarsi-green">Nama Lengkap</label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* ID Number */}
                    <div>
                        <label className="font-black text-yarsi-green">
                            {user.role === 'mahasiswa' ? 'NPM' : 'NIP'}
                        </label>
                        <input
                            type="text"
                            value={user.id_number || '-'}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-black text-yarsi-green">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <label className="font-black text-yarsi-green">Nomor Telepon</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => {
                                let p = e.target.value.replace(/[^0-9]/g, "");
                                if (p.startsWith("0")) p = "62" + p.substring(1);
                                setData("phone", p);
                            }}
                            className="w-full p-2 border rounded-md"
                        />
                        {errors.phone && (
                            <div className="text-red-500 text-sm">{errors.phone}</div>
                        )}
                    </div>

                    {/* Button Simpan */}
                    <button
                        type="submit"
                        className="w-full justify-center rounded-lg bg-yarsi-gradient-button py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity"
                        disabled={processing}
                    >
                        Simpan
                    </button>
                </div>
            </form>

            {/* Popup Konfirmasi*/}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center animate-scaleIn border border-yarsi-green/30">
                        <h2 className="text-xl font-bold text-yarsi-green mb-2">
                            Konfirmasi Penyimpanan
                        </h2>

                        <p className="text-gray-700 mb-6">
                            Apakah Anda yakin ingin menyimpan perubahan profil?
                        </p>

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Batal
                            </button>

                            <button
                                onClick={confirmSave}
                                className="px-4 py-2 rounded-lg bg-yarsi-gradient-button py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity transition"
                            >
                                Ya, Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation Classes */}
            <style>{`
                .animate-fadeIn {
                    animation: fadeIn 0.25s ease-out forwards;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.25s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
