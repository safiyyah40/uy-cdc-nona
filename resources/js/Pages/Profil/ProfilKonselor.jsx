import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';

import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn'; 

// Ini adalah komponen card yang sama dengan di halaman Puskaka
// Kita definisikan ulang di sini agar mandiri
function CounselorCard({ name, title, photoUrl }) {
    const { ref, style } = useScrollFadeIn(0.1); // Tambahkan hook animasi

    return (
        <div 
            ref={ref} // Terapkan ref
            style={style} // Terapkan style
            className="bg-white rounded-2xl shadow-lg p-4 text-center w-full max-w-[280px] mx-auto flex flex-col items-center 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1" // Efek hover
        >
            <div className="relative w-full h-80 bg-[#FFF0E8] rounded-lg mb-4 overflow-hidden">
                <img
                    src={photoUrl || '/images/placeholder-avatar.png'}
                    alt={`Foto ${name}`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                        e.target.src = '/images/placeholder-avatar.png';
                    }}
                />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600 mt-1 whitespace-pre-line">{title}</p>
        </div>
    );
}

// Ini adalah komponen halaman utamanya
export default function ProfilKonselor({ counselors }) { // <-- Terima prop 'counselors'
    
    // Inisialisasi hook animasi
    const heroTitle = useScrollFadeIn(0.2);
    const heroText = useScrollFadeIn(0.3);
    const teamTitle = useScrollFadeIn(0.2);

    return (
        <>
            {/* Ganti Judul Halaman */}
            <Head title="Profil Konselor-UY" />
            
            {/* Hero Section - Ganti Teks */}
            <section
                className="relative flex h-[500px] md:h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-cover bg-no-repeat bg-center pt-32 pb-40"
                style={{
                    backgroundImage: "url('/images/bg-dreamina.jpg')",
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 
                        ref={heroTitle.ref} 
                        style={heroTitle.style} 
                        className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-black font-kaisei"
                    >
                        KONSELOR
                    </h1>
                    <p 
                        ref={heroText.ref} 
                        style={heroText.style} 
                        className="text-xl md:text-2xl leading-relaxed mt-8 text-gray-800 font-sans
                                            font-light tracking-wide max-w-4xl mx-auto"
                    >
                        Kami memiliki konselor terbaik yang tidak hanya berkompeten dalam bimbingan, tetapi juga memiliki kepedulian tinggi terhadap perkembangan mahasiswa dan alumni. Dengan pengalaman, dedikasi, serta pendekatan yang personal, para konselor kami siap menjadi partner Anda dalam merencanakan karir, mengatasi tantangan, dan membantu mahasiswa memaksimalkan potensi diri serta mencapai prestasi terbaiknya.
                    </p>
                </div>
            </section>

            {/* Bagian Grid Konselor */}
            <section 
                className="bg-yarsi-green py-20 relative bg-no-repeat" 
                style={{
                    backgroundImage: "url('/images/bg-linear.jpg')", 
                    backgroundPosition: 'top center',
                    backgroundSize: '100% auto', 
                }}
            >
                <div className="container mx-auto px-4">
                    
                    {/* Ganti Judul */}
                    <h2 
                        ref={teamTitle.ref} 
                        style={teamTitle.style} 
                        className="text-4xl font-bold text-white text-center mb-12"
                    >
                        Tim Konselor Kami
                    </h2>

                    {/* Ganti 'teamMembers' menjadi 'counselors' */}
                    {counselors && counselors.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-8 max-w-screen-lg mx-auto">
                            {counselors.map((counselor) => (
                                <CounselorCard
                                    key={counselor.id}
                                    name={counselor.name}
                                    title={counselor.title}
                                    photoUrl={counselor.photo_url}
                                />
                            ))}
                        </div>
                    ) : (
                        <div 
                            ref={teamTitle.ref} 
                            style={teamTitle.style} 
                            className="text-center font-bold text-white"
                        > 
                            Belum ada data konselor yang ditambahkan.
                        </div>
                    )}
                    
                    {/* Bagian Slider Galeri Dihapus (sesuai desain) */}

                </div>
            </section>
            
            {/* Panggil Footer */}
            <Footer />
        </>
    );
}

// Pastikan layout dipanggil
ProfilKonselor.layout = (page) => <MainLayout children={page} />;