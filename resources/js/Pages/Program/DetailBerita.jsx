import React, { useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';

const createNewsItems = () => [
    {
        id: 1,
        title: "Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025",
        description: "Informasi terbaru mengenai jadwal lengkap pelatihan pengembangan karier untuk mahasiswa di semester ini.",
        date: "Senin, 4 September 2025",
        content: `Universitas YARSI resmi menerima 59 mahasiswa baru sebagai penerima Beasiswa Kartu Indonesia Pintar (KIP) Kuliah pada tahun 2025. Dari jumlah tersebut, sebanyak 24 mahasiswa diterima melalui kuota reguler, dan 35 mahasiswa melalui jalur usulan masyarakat.

Para penerima beasiswa KIP Kuliah tahun ini berasal dari lima program studi, yaitu:
• Ilmu Hukum
• Manajemen
• Akuntansi
• Teknik Informatika
• Psikologi

Sebagai tindak lanjut dari penerimaan tersebut, telah dilaksanakan pertemuan dengan para penerima Beasiswa KIP Kuliah pada:
Selasa, 7 Oktober 2025
Pukul 09.00 WIB
Ruang Seminar Rektorat, Universitas YARSI

Pertemuan ini bertujuan memberikan pengarahan, sosialisasi hak dan kewajiban penerima beasiswa, serta memperkuat komitmen mahasiswa dalam menjalankan studi dengan integritas dan tanggung jawab.

Program KIP Kuliah merupakan wujud nyata komitmen pemerintah untuk memperluas akses pendidikan tinggi bagi mahasiswa berprestasi dari keluarga kurang mampu. Universitas YARSI turut mendukung program ini sebagai bagian dari upaya menghadirkan pendidikan tinggi yang bermutu, inklusif, dan berdaya saing.

Dengan bergabungnya para penerima beasiswa KIP Kuliah tahun 2025, diharapkan mereka dapat menorehkan prestasi akademik dan non-akademik, serta menjadi bagian dari generasi muda yang berkontribusi positif bagi masyarakat dan bangsa.`,
        imageSrc: "/images/berita.jpeg",
        slug: 'universitas-yarsi-terima-59-mahasiswa-baru-penerima-beasiswa-kip-kuliah-tahun-2025'
    },
    {
        id: 2,
        title: "Campus Hiring Terbaru dari PT. Teknologi Maju",
        description: "PT. Teknologi Maju membuka kesempatan bagi lulusan baru untuk posisi pengembang perangkat lunak.",
        date: "05 November 2025",
        content: `Kami dengan bangga mengumumkan kerjasama dengan PT. Teknologi Maju. Acara Campus Hiring akan diselenggarakan secara daring pada tanggal 20 Desember.

Persyaratan utama meliputi pengalaman project tim dan nilai IPK minimal 3.2. Segera kirimkan lamaran Anda melalui portal karier PUSKAKA.`,
        imageSrc: "/images/berita.jpeg",
        slug: 'campus-hiring-pt-teknologi-maju'
    },
    {
        id: 3,
        title: "Tips Sukses Wawancara Online Era New Normal",
        description: "Pelajari trik terbaik untuk meninggalkan kesan mendalam saat wawancara kerja virtual.",
        date: "28 Oktober 2025",
        content: `Wawancara kerja kini banyak dilakukan secara virtual. Beberapa tips penting termasuk memastikan koneksi internet stabil, pencahayaan yang baik, dan memilih latar belakang profesional.

Selain itu, pastikan Anda berlatih menjawab pertanyaan umum sambil menatap kamera, bukan layar, untuk membangun kontak mata yang efektif dengan pewawancara.`,
        imageSrc: "/images/berita.jpeg",
        slug: 'tips-sukses-wawancara-online-era-new-normal'
    },
];

export default function DetailBerita({ newsId, auth }) {
    const allNews = createNewsItems();

    const currentNews = useMemo(() => {
        return allNews.find(item => item.id === newsId);
    }, [newsId, allNews]);

    if (!currentNews) {
        return (
            <MainLayout user={auth.user}>
                <Head title="Berita Tidak Ditemukan" />
                <div className="min-h-screen pt-32 pb-16 text-center bg-gray-50">
                    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
                        <p className="text-gray-700 mb-6">Berita dengan ID {newsId} tidak ditemukan.</p>
                        <Link
                            href={route('program.berita')}
                            className="text-green-600 hover:text-green-800 font-medium transition"
                        >
                            &larr; Kembali ke Daftar Berita
                        </Link>
                    </div>
                </div>
                <Footer />
            </MainLayout>
        );
    }

    return (
        <MainLayout user={auth.user}>
            <Head title={currentNews.title} />

            <div
                className="relative pt-16 pb-32 md:pt-28 md:pb-48 overflow-hidden text-gray-900 min-h-[90vh]"
                style={{
                    backgroundImage: "url('/images/bg-dreamina.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="relative z-10 text-center px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="mb-8 text-left">
                        <Link
                            href={route('program.berita')}
                            className="inline-flex items-center text-gray-900 hover:text-green-600 font-medium transition text-base bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md"
                        >
                            &larr; Kembali
                        </Link>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-normal pt-1 pb-3 font-kaisei whitespace-nowrap overflow-hidden text-ellipsis">
                        {currentNews.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-10">
                        {currentNews.date}
                    </p>

                    {currentNews.imageSrc && (
                        <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border border-gray-100 mt-6">
                            <img
                                src={currentNews.imageSrc}
                                alt={currentNews.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-6 max-w-4xl">

                    <div className="prose max-w-none text-gray-900 leading-relaxed space-y-6">
                        <p className="text-lg italic text-gray-700 mb-6 font-medium font-kaisei">
                            {currentNews.description}
                        </p>

                        {currentNews.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-base md:text-2xl text-gray-900 font-sans">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </MainLayout>
    );
}
