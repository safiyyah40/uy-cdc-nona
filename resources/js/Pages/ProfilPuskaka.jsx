import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

function PuskakaTeamCard({ name, title, photoUrl }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-full max-w-[280px] mx-auto flex flex-col items-center">
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

export default function ProfilPuskaka({ teamMembers }) {
    return (
        <>
            <Head title="Profil Puskaka-UY" />
            
            {/* Hero Section dengan Background */}
            <section
                className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-cover bg-no-repeat bg-center pt-32 pb-40"
                style={{
                    backgroundImage: "url('/images/bg-dreamina.jpg')",
                    backgroundSize: 'cover, contain',
                    backgroundPosition: 'center, bottom',
                }}
            >
                {/* ... konten ... */}
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wider text-black font-kaisei">
                        Pusat Kemahasiswaan, <br /> Karir dan Alumni
                    </h1>
                    <p className="mt-6 text-lg max-w-4xl mx-auto text-black">
                        Puskaka-UY (Pusat Kemahasiswaan, Karir, dan Alumni Universitas YARSI) adalah unit kerja di
                        Bidang 1, Universitas YARSI yang bertugas mengelola berbagai layanan kemahasiswaan,
                        pengembangan karir, dan hubungan alumni. Puskaka-UY berperan sebagai pusat pembinaan aktivitas
                        kemahasiswaan, penguatan soft skills, penyelenggaraan bimbingan karir, serta fasilitator jejaring
                        alumni, guna mendukung terciptanya lulusan yang unggul, kompetitif, dan berdaya saing di tingkat
                        nasional maupun internasional.
                    </p>
                </div>
            </section>

            {/* Bagian Struktur Organisasi */}
            <section 
                className="bg-yarsi-green py-20 relative bg-no-repeat" 
                style={{
                    backgroundImage: "url('/images/bg-linear.jpg')", 
                    backgroundPosition: 'top center',
                    backgroundSize: '100% auto', 
                }}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Struktur Organisasi Puskaka
                    </h2>
                        {teamMembers && teamMembers.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-8 max-w-screen-lg mx-auto">
                                
                                {teamMembers.map((member) => (
                                    <PuskakaTeamCard
                                        key={member.id}
                                        name={member.name}
                                        title={member.title}
                                        photoUrl={member.photo_url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center font-bold text-white"> 
                                Belum ada data anggota tim.
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}

ProfilPuskaka.layout = (page) => <MainLayout children={page} />;