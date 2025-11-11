import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/BerandaTamu'; // <-- Kita akan buat file ini di Langkah 2

export default function Welcome(props) {
    return (
        // Gunakan MainLayout sebagai pembungkus
        <MainLayout>
            <Head title="Selamat Datang di CDC YARSI" />

            {/* "Hero Section" sesuai desain Anda */}
            <div
                className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden"
                // Ganti 'bg-swirl.jpg' dengan path gambar latar belakang Anda
                style={{ backgroundImage: 'url(/images/bg-dreamina.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* Konten Teks di Tengah */}
                <div className="z-10 text-center">
                    <div className="relative mb-4 inline-block">
                        {/* Garis dekoratif */}
                        <span className="absolute left-[-110px] top-1/2 block h-0.5 w-24 bg-gray-800"></span>
                        <h3 className="text-xl font-medium text-gray-700">
                            SELAMAT DATANG DI
                        </h3>
                        {/* Garis dekoratif */}
                        <span className="absolute right-[-110px] top-1/2 block h-0.5 w-24 bg-gray-800"></span>
                    </div>

                    <h1 className="text-5xl font-extrabold text-yarsi-green md:text-6xl">
                        CAREER DEVELOPMENT CENTRE
                    </h1>
                    <h1 className="text-5xl font-extrabold text-yarsi-green md:text-6xl">
                        UNIVERSITAS YARSI
                    </h1>
                </div>
            </div>

            {/* Bagian Halaman Lainnya (misal: tentang kami, berita) */}
            <div className="py-24 bg-white">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-yarsi-green">Tentang Kami</h2>
                    <p className="mt-4 text-center text-gray-600">
                        Konten tentang CDC YARSI akan ditampilkan di sini...
                    </p>
                </div>
            </div>

        </MainLayout>
    );
}
