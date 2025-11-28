import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head, Link } from '@inertiajs/react';

// ===================================
// KOMPONEN UTAMA: CAMPUS HIRING
// ===================================
export default function CampusHiring(props) {

    // Data Program Campus Hiring
    const hiringPrograms = [
        {
            id: 101,
            slug: "brilian-internship-program-2025",
            title: "Campus Hiring BRILiaN Internship Program (BIP)",
            subtitle: "Career Day 2025 Universitas YARSI",
            description: "Jakarta, 19 September 2025 — Sebagai bagian dari rangkaian Career Day 2025 Universitas YARSI – Walk Interview. Universitas YARSI bekerja sama dengan @tauwork_id dan PT. Siaga Abdi Utama menyelenggarakan Campus Hiring BRILiaN Internship Program (BIP) secara langsung di Kampus Universitas YARSI. Acara dibuka secara resmi oleh Wakil Rektor 1 Universitas YARSI, Dr. dr. Wening Sari, M.Kes. Dalam sambutannya, beliau menegaskan pentingnya sinergi antara perguruan tinggi dan dunia industri dalam mempersiapkan lulusan yang siap kerja dan mampu beradaptasi dengan kebutuhan pasar.",
            imageSrc: "/images/campushiring.jpg",
        },
        {
            id: 102,
            slug: "talent-acquisition-samsung-electronics-2025",
            title: "Talent Acquisition Program Samsung Electronics Indonesia",
            subtitle: "Walk-in Interview & Assessment Center",
            description: "Jakarta, 25 Oktober 2025 — Program rekrutmen eksklusif untuk lulusan terbaik Universitas YARSI dari berbagai fakultas, khususnya Teknik Informatika dan Ekonomi. Samsung mencari kandidat yang proaktif, inovatif, dan siap menghadapi tantangan global. Acara ini mencakup sesi presentasi perusahaan, wawancara, dan tes kemampuan dasar yang akan diselenggarakan di Aula Serbaguna YARSI.",
            imageSrc: "/images/campushiring.jpg",
        },
    ];

    // Warna Primer Hijau (emerald/green)
    const primaryDark = "text-emerald-800";
    const accentGreen = "bg-emerald-600";
    const lightestGreen = "bg-emerald-50";


    return (
        <>
            <Head title="Campus Hiring" />

            <MainLayout user={props.auth.user}>

                {/* --- HERO SECTION: Fresh, Minimalist Gradient, and Clean Shapes --- */}
                <div className={`relative w-full py-24 md:py-36 bg-gradient-to-br from-white to-emerald-50 overflow-hidden`}>

                    {/* Abstract Shapes (Minimalist Diagonal Lines/Waves) */}
                    <div className="absolute inset-0 opacity-10">
                        {/* Diagonal Shape / Subtle Wave (Emerald-200) */}
                        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path fill="#d1fae5" fillOpacity="1" d="M0,192L80,192C160,192,320,192,480,186.7C640,181,800,171,960,165.3C1120,160,1280,160,1360,160L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                            {/* Shape Kedua: Lebih gelap dan lebih rendah */}
                            <path fill="#a7f3d0" fillOpacity="1" d="M0,256L80,245.3C160,235,320,213,480,208C640,203,800,213,960,224C1120,235,1280,245,1360,250.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 lg:px-8 z-10 relative">

                        <span className="inline-block text-lg font-semibold mb-4 text-emerald-700 border-b-2 border-emerald-300 pb-1">
                            Pusat Karir Puskaka UY
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight drop-shadow-sm">
                            Temukan <span className="text-emerald-600">Karir Impian</span> <br/> di <span className="font-serif italic">Campus Hiring</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed max-w-4xl text-gray-700 font-light">
                            Jelajahi kesempatan karir eksklusif. Program Campus Hiring ini membuka pintu bagi mahasiswa dan alumni YARSI
                            untuk langsung berinteraksi dan bergabung dengan mitra perusahaan terkemuka.
                        </p>
                    </div>
                </div>

                {/* --- PROGRAM LIST SECTION --- */}
                <div className={`py-16 md:py-24 ${lightestGreen}`}>
                    <div className="container mx-auto px-6 lg:px-8 space-y-12">

                        <div className="max-w-4xl mb-16">
                             <h2 className={`${primaryDark} text-3xl md:text-4xl font-bold mb-4`}>
                                Program Terbaru
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Universitas YARSI berkomitmen mendukung pengembangan karier mahasiswa dan alumni
                                melalui penyelenggaraan Career Day dan kemitraan strategis dengan dunia industri.
                            </p>
                        </div>

                        {hiringPrograms.map((program) => (
                            <ProgramCard
                                key={program.id}
                                id={program.id}
                                slug={program.slug}
                                title={program.title}
                                subtitle={program.subtitle}
                                description={program.description}
                                imageSrc={program.imageSrc}
                                primaryDark={primaryDark}
                                accentGreen={accentGreen}
                            />
                        ))}
                    </div>
                </div>

                <Footer />

            </MainLayout>
        </>
    );
}

// ===================================
// KOMPONEN CARD PROGRAM
// ===================================
const ProgramCard = ({ id, slug, title, subtitle, description, imageSrc, primaryDark, accentGreen }) => {
    // Fungsi 'route' harus tersedia dari konfigurasi Inertia Anda
    const detailUrl = route('program.campus.hiring.show', { id: id, slug: slug });

    return (
        <Link
            href={detailUrl}
            className="block transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl rounded-2xl group"
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 md:flex">

                {/* Image Section */}
                <div className="md:w-5/12 aspect-w-16 aspect-h-9 md:aspect-none">
                    <img
                        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                        src={imageSrc}
                        alt={title}
                    />
                </div>

                {/* Content Section */}
                <div className="p-8 md:w-7/12 flex flex-col justify-center">

                    {/* Badge/Title */}
                    <div className={`uppercase tracking-widest text-xs font-bold ${primaryDark}`}>{title}</div>

                    {/* Subtitle */}
                    <p className="mt-1 text-3xl font-extrabold text-gray-900 leading-snug">{subtitle}</p>

                    {/* Description */}
                    <p className="mt-4 text-gray-500 text-base leading-relaxed line-clamp-3">{description}</p>

                    {/* CTA Button */}
                    <div className="mt-6">
                         <span className={`inline-flex items-center px-6 py-2 ${accentGreen} border border-transparent rounded-full font-semibold text-sm text-white uppercase tracking-wider shadow-md
                                        hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150`}>
                            Lihat Detail Program
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
