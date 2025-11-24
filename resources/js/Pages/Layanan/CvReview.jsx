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
                  CV REVIEW
              </h1>

              <p className="text-xl md:text-2xl leading-relaxed mb-6 text-gray-800 font-sans
                                          font-light tracking-wide">
                  Kami membantu meninjau dan menyempurnakan CV-mu agar tampil lebih rapi, relevan, dan menarik di mata perekrut.
                  Melalur evaluasi menyelurun ternadap ist, struktur, dan tampilan, Kamu akan mendapatkan masukan protesional yane membantu menonjolkan kekuatan serta pencapaianmu secara efektif.
                  Dengan CV yang tersusun lebih strategis, kamu bisa meningkatkan peluang untuk menarik perhatian dan melangkah lebih dekat menuju karier impianmu.
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
