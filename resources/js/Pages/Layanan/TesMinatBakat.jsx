import React from 'react';
import MainLayout from '../../Layouts/MainLayout';


const Konsultasi = () => {
  return (
    <MainLayout>

      <div className="fixed inset-0 bg-[url('/images/bg-dreamina.jpg')] bg-cover bg-center bg-fixed -z-10">
      </div>

      <div className="relative z-10">

        <div className="min-h-screen pt-4 pb-20 flex flex-col items-center justify-center">

          <div className="container mx-auto px-4 max-w-5xl">

            <div className="text-center">

              {/* JUDUL */}
              <h1 className="text-4xl md:text-5xl font-kaisei font-extrabold mb-8 tracking-wide text-gray-800">
                  TES MINAT BAKAT
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-800 font-sans
                                          font-light tracking-wide">
                  Temukan potensi terbaikmu melalui Tes Minat dan Bakat. Kenali kepribadian, kemampuan, dan aran karier yang paling sesuat untuk pengembangan dirimu di masa depan
              </p>

              <div>
                <button
                  className="px-10 py-3 bg-[#004d40] text-white font-semibold text-lg rounded-lg shadow-xl hover:bg-green-700 transition duration-300 transform hover:scale-[1.05]"
                >
                    Mulai Sekarang
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Konsultasi;
