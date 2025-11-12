import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

function PuskakaTeamCard({ name, title, photoPath }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center w-full max-w-[280px] mx-auto flex flex-col items-center">
            <div className="relative w-full h-80 bg-[#FFF0E8] rounded-lg mb-4 overflow-hidden">
                <img
                    src={photoPath ? `/storage/${photoPath}` : '/images/placeholder-avatar.png'}
                    alt={`Foto ${name}`}
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-gray-600 mt-1 whitespace-pre-line">{title}</p>
        </div>
    );
}

export default function ProfilPuskaka({ puskakaTeam }) {
    return (
        <>
            <Head title="Profil Puskaka-UY" />

            <section
                className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-contain bg-no-repeat bg-bottom pt-32 pb-40"
                style={{
                    backgroundImage: "url('/images/wavy-background.svg'), url('/images/bg-dreamina.jpg')",
                    backgroundSize: 'cover, contain',
                    backgroundPosition: 'center, bottom',
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-yarsi-green uppercase tracking-wider">
                        Pusat Kemahasiswaan, <br /> Karir dan Alumni
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
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
            <section className="bg-yarsi-green py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Struktur Organisasi Puskaka
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {puskakaTeam.map((member) => (
                            <PuskakaTeamCard
                                key={member.id}
                                name={member.name}
                                title={member.title}
                                photoPath={member.photo_path}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

ProfilPuskaka.layout = (page) => <MainLayout children={page} />;
