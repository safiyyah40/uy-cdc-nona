import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Calendar, Clock, ArrowRight, UserCheck } from 'lucide-react';
import CounselorRoleAccessModal from '@/Components/CounselorRoleAccessModal';

/**
 * Komponen Seksi Konsultasi
 * Menampilkan ringkasan layanan konsultasi karir dengan deteksi role user.
 */
const KonsultasiComp = () => {
    const { auth } = usePage().props;
    const user = auth?.user;

    // 1. State untuk kontrol Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buttonLabel = !user
        ? 'Cek Jadwal Konselor'
        : (user.role === 'konselor' || user.role === 'dosen_staf')
            ? 'Dasbor Konsultasi'
            : 'Reservasi Sesi Sekarang';

    // 2. Logika handle klik
    const handleMainClick = () => {
        if (!user) {
            router.get(route('layanan.konsultasi.auth') + '#list-konselor');
            return;
        }

        // Jika Dosen/Staf, panggil Modal Custom
        if (user.role === 'dosen_staf') {
            setIsModalOpen(true);
            return;
        }

        if (user.role === 'konselor') {
            router.get(route('konselor.table_konsultasi'));
            return;
        }

        router.get(route('layanan.konsultasi'));
    };

    return (
        <section id="layanan-konsultasi" className="relative pt-20 pb-12 overflow-hidden">
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1.5 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Layanan Persiapan Karir
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] font-serif">
                            Layanan <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004d40] to-emerald-500">
                                Konsultasi.
                            </span>
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-sm text-base md:text-lg leading-relaxed text-left md:text-right font-medium">
                        Sarana bagi mahasiswa untuk berbagi cerita, mendapatkan arahan, serta menemukan solusi akademik maupun personal.
                    </p>
                </div>

                {/* Main Preview Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-[#004d40] rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                    <div className="relative bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center gap-12">
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-video lg:aspect-square">
                                <img
                                    src="/images/pict-profil-konselor.png"
                                    alt="Konsultasi Preview"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/60 to-transparent flex items-end p-6">
                                    <p className="text-white font-serif italic text-lg">
                                        "Kenali dirimu, raih masa depanmu."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-[#004d40]">
                                        <UserCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Konselor Profesional</h4>
                                        <p className="text-gray-500 text-sm">Dibimbing oleh ahli pengembangan karir dan psikologi.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-[#004d40]">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Jadwal Fleksibel</h4>
                                        <p className="text-gray-500 text-sm">Pilih waktu sesi yang paling sesuai dengan jadwal kuliah Anda.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-[#004d40]">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Sesi Tatap Muka</h4>
                                        <p className="text-gray-500 text-sm">Ruang konsultasi nyaman untuk menjaga privasi diskusi.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleMainClick}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                                >
                                    {buttonLabel}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PEMANGGILAN KOMPONEN MODAL --- */}
            <CounselorRoleAccessModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                userName={user?.name} 
            />
            
        </section>
    );
};

export default KonsultasiComp;