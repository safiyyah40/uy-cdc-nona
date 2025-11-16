import { Link, usePage } from '@inertiajs/react';

export default function ViewProfile() {
    const { user } = usePage().props;

    // Fungsi ambil inisial nama
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

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100"
            style={{
                backgroundImage: 'url(/images/bg-swirl.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm">

                {/* Close button */}
                <div className="flex justify-end">
                    <Link href="/dashboard" className="text-gray-600 text-4xl font-bold leading-none">×</Link>
                </div>

                {/* Foto Profil */}
                <div className="flex flex-col items-center mt-2 mb-6">
                    <div className="relative w-28 h-28">
                        {/* Jika ada foto, tampilkan gambar */}
                        {user.photo_url ? (
                            <img
                                src={user.photo_url}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full border"
                            />
                        ) : (
                            // Jika tidak ada foto → tampilkan inisial
                            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                                {getInitials(user.name)}
                            </div>
                        )}
                    </div>
                </div>


                {/* Fields */}
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between">
                            <label className="font-black text-yarsi-green">Nama Lengkap</label>
                            <Link href={route('profile.edit')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30 30"
                                    className="w-[34px] h-[34px] text-gray-500 hover:text-yarsi-green transition-colors duration-200"
                                    fill="currentColor"
                                >
                                    <path d="M23.4375 3.7793C22.7197 3.7793 22.0166 4.05762 21.4746 4.59961L12.1875 13.8574L11.9824 14.0625L11.9238 14.3555L11.2793 17.6367L10.9863 19.0137L12.3633 18.7207L15.6445 18.0762L15.9375 18.0176L16.1426 17.8125L25.4004 8.52539C26.4807 7.44507 26.4807 5.67993 25.4004 4.59961C24.8584 4.05762 24.1553 3.7793 23.4375 3.7793ZM23.4375 5.5957C23.6572 5.5957 23.8733 5.70923 24.082 5.91797C24.4995 6.33545 24.4995 6.78955 24.082 7.20703L15 16.2891L13.3887 16.6113L13.7109 15L22.793 5.91797C23.0017 5.70923 23.2178 5.5957 23.4375 5.5957ZM3.75 7.5V26.25H22.5V13.8867L20.625 15.7617V24.375H5.625V9.375H14.2383L16.1133 7.5H3.75Z" />
                                </svg>
                            </Link>
                        </div>
                        <p className="w-full bg-gray-100 p-2 rounded-md">{user.name}</p>
                    </div>

                    <div>
                        <label className="font-black text-yarsi-green">{user.role === 'mahasiswa' ? 'NPM' : 'NIP'}</label>
                        <p className="w-full bg-gray-100 p-2 rounded-md">{user.id_number || '-'}</p>
                    </div>

                    <div>
                        <label className="font-black text-yarsi-green">Email</label>
                        <p className="w-full bg-gray-100 p-2 rounded-md">{user.email}</p>
                    </div>

                    <div>
                        <label className="font-black text-yarsi-green">Nomor Telepon</label>
                        <p className="w-full bg-gray-100 p-2 rounded-md">{user.phone}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
