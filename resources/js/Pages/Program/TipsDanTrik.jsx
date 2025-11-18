import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import Footer from '@/Components/Footer'; 
import { Head } from '@inertiajs/react';

export default function TipsDanTrik(props) {
    
    return (
        <>
            <Head title="Tips & Trik" />
            
            <MainLayout user={props.auth.user}>

                <div
                    className="min-h-screen flex flex-col justify-start pt-20 pb-40 relative overflow-hidden" 
                    style={{
                        backgroundImage: "url('/images/bg-dreamina.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="container mx-auto px-6 lg:px-8 z-10 pt-16 md:pt-24">

                        <h1 className="text-4xl md:text-5xl font-extrabold font-kaisei text-black mb-16 tracking-wide max-w-7xl">
                            TIPS & TRIK
                        </h1>

                        <div className="w-full max-w-7xl bg-white p-10 md:p-12 rounded-3xl shadow-2xl border border-gray-200 mx-auto">
                            
                            
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
                                Tips Pertama Kali Masuk Kerja Untuk Fresh Graduate
                            </h2>

                            <p className="text-gray-600 mb-8 leading-relaxed text-xl">
                                Untuk *fresh graduate* yang baru pertama kali masuk ke dunia kerja, pasti hari pertama
                                masuk kerja adalah hari terpenting untuk Anda, maka dari itu perlu kesan baik ketika
                                baru masuk kerja, berikut tips yang bisa dilakukan:
                            </p>

                            <ol className="list-none space-y-8 text-gray-700 text-lg">
                                
                                
                                <li>
                                    <span className="font-bold text-[#115C47] text-2xl">1. Siapkan Peralatan</span><br />
                                    Bawa alat yang diperlukan untuk memulai hari kerja. Yang perlu dibawa seperti laptop,
                                    buku catatan dan alat tulis. Buku dan alat tulis perlu Anda bawa apabila ada penjelasan
                                    yang penting dari atasan atau rekan kerja yang perlu Anda catat seperti ketentuan dan
                                    peraturan di kantor.
                                </li>
                            
                                <li>
                                    <span className="font-bold text-[#115C47] text-2xl">2. Gunakan Pakaian Formal yang Rapi dan Sopan</span><br />
                                    Apabila Anda menjaga penampilan, Anda akan mendapatkan nilai kesan pertama yang baik
                                    oleh rekan kerja Anda, Anda bisa menyesuaikan pakaian dengan ruang lingkup kerja Anda,
                                    bisa menggunakan setelan jas atau *blazer* bisa juga menggunakan *outer* dan lainnya sesuai
                                    dengan lingkungan kerja yang ada.
                                </li>
         
                                <li>
                                    <span className="font-bold text-[#115C47] text-2xl">3. Datang Tepat Waktu atau Sebelum Waktu yang Ditetapkan</span><br />
                                    Selain menghindari kemungkinan dalam perjalanan yang membuat Anda terlambat,
                                    sampai sebelum waktunya akan membuat Anda terlihat lebih profesional dan
                                    bertanggung jawab akan pekerjaan Anda.
                                </li>
                
                                <li>
                                    <span className="font-bold text-[#115C47] text-2xl">4. Menjaga Attitude atau Perilaku</span><br />
                                    Dalam dunia kerja Anda perlu bersikap profesional dengan tidak membawa kebiasaan
                                    buruk. Contohnya berbicara kotor ketika sedang kesal, mengeluarkan sumpah serapah ketika
                                    sedang marah, berbicara dengan volume tinggi dan keras, atau selalu berkomentar akan hal yang
                                    dilakukan orang lain. Jika Anda seperti itu di tempat kerja, Anda akan dinilai tidak
                                    profesional dan ber attitude buruk.
                                </li>
           
                                <li>
                                    <span className="font-bold text-[#115C47] text-2xl">5. Aktif Bertanya</span><br />
                                    Pastikan Anda aktif bertanya terkait pekerjaan atau tentang tempat kerja Anda apabila
                                    memang belum paham, dengan begitu Anda akan dinilai tertarik dengan tempat Anda
                                    beralih. Memiliki semangat untuk belajar dan meningkatkan *skill*. Namun ketika bertanya jangan
                                    mengulangi pertanyaan yang sama secara berulang, karena hal itu akan membuat Anda
                                    terlihat sulit untuk belajar dan memahami.
                                </li>
                            </ol>
                            
                            
                            <p className="mt-8 text-xl text-blue-600 truncate">
                                https://www.kantorkita.co.id/blog/kumpulan-tips-dunia-kerja-yang-bermanfaat-untuk-anda/
                            </p>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white"></div>
                
                <Footer />
                
            </MainLayout>
        </>
    );
}