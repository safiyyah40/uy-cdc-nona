import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

// --- KARTU KONSELOR ---
const CounselorCard = ({ counselor }) => {
    return (
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-6 gap-6 w-full max-w-4xl mx-auto transform transition duration-300 hover:scale-[1.01]">
            {/* Foto Konselor */}
            <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-md shadow-sm overflow-hidden">
                    {counselor.photo_url ? (
                        <img 
                            src={counselor.photo_url} 
                            alt={counselor.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                            No Photo
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Informasi */}
            <div className="flex-grow text-center md:text-left w-full">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                    {counselor.name}
                </h3>
                <p className="text-gray-500 font-medium mb-4 text-sm uppercase tracking-wide">
                    {counselor.title}
                </p>

                {/* Jadwal Slot */}
                <div className="space-y-2 border-t border-gray-100 pt-3">
                  {counselor.slots && counselor.slots.length > 0 ? (
                      counselor.slots.map((slot, index) => (
                          <div key={index} className="text-sm md:text-base text-gray-700 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              
                              {/* TANGGAL: Selasa, 25 November 2025 */}
                              <span className="font-bold text-green-800 min-w-[220px]">
                                  {slot.date_string}
                              </span>

                              {/* JAM: Pukul 10.40 - 12.00 WIB */}
                              <span className="font-medium">
                                  Pukul {slot.time_string} WIB
                              </span>
                              
                          </div>
                      ))
                  ) : (
                      <p className="text-xs text-red-400 italic">Jadwal belum tersedia</p>
                  )}
              </div>
            </div>
        </div>
    );
};

// --- 2. HALAMAN UTAMA KONSULTASI ---
const Konsultasi = ({ counselors = [] }) => { 
  return (
    <MainLayout>
      <Head title="Layanan Konsultasi" />
        <div 
            className="absolute top-0 left-0 w-full h-full bg-contain bg-top bg-no-repeat opacity-40 pointer-events-none"
            style={{ backgroundImage: "url('/images/bg-dreamina.jpg')" }} 
        ></div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center mt-10">
            <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold mb-8 tracking-widest text-gray-900 uppercase">
                KONSULTASI
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-10 text-gray-700 font-light max-w-4xl mx-auto text-justify md:text-center">
                Konsultasi ini hadir sebagai sarana bagi mahasiswa untuk berbagi cerita, mendapatkan arahan,
                serta menemukan solusi dari berbagai permasalahan akademik maupun personal. Layanan ini
                dibimbing langsung oleh para dosen Universitas YARSI yang berperan sebagai konselor profesional,
                siap mendengarkan dengan empati dan memberikan pandangan yang membangun.
            </p>

            <div>
                <button className="px-10 py-3 bg-[#004d40] text-white font-bold text-lg rounded-md shadow-lg hover:bg-green-800 transition duration-300 transform hover:-translate-y-1">
                    Mulai Sekarang
                </button>
            </div>
        </div>
      
      {/* --- BAGIAN BAWAH (LIST KONSELOR - BACKGROUND HIJAU + IMAGE) --- */}
      <section 
        className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen" 
        style={{
            backgroundImage: "url('/images/bg-linear.jpg')", // Pastikan file ini ada di public/images/
            backgroundPosition: 'top center',
            backgroundSize: '100% auto', // Gambar melebar penuh, tinggi menyesuaikan
        }}
      >
        

        <div className="container mx-auto px-4 relative z-10">
            
            {/* Banner Judul Section */}
            <div className="flex justify-center mb-16 mt-6">
                <div className="bg-gradient-to-r from-green-100 via-white to-green-100 px-10 py-4 rounded-full shadow-xl border border-green-200">
                    <h2 className="text-xl md:text-3xl font-serif font-bold text-[#004d40] text-center">
                        Berkenalan dengan Para Konselor Kami !
                    </h2>
                </div>
            </div>

            {/* Grid / Stack Kartu Konselor */}
            <div className="flex flex-col gap-8 items-center pb-20">
                {counselors && counselors.length > 0 ? (
                    counselors.map((counselor) => (
                        <CounselorCard key={counselor.id} counselor={counselor} />
                    ))
                ) : (
                    <div className="text-white text-center py-10 opacity-80 bg-black/10 rounded-lg px-6">
                        <p className="text-lg">Belum ada data konselor yang tersedia saat ini.</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      <Footer />
    </MainLayout>
  );
};

export default Konsultasi;