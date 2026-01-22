import React from 'react';
import { X, ShieldAlert, MessageCircle } from 'lucide-react';

const CounselorRoleAccessModal = ({ isOpen, onClose, userName, contactInfo }) => {
    if (!isOpen) return null;

    const waNumber = contactInfo?.whatsapp_number || "6281295986204";
    const message = `Assalamualaikum Admin, nama saya ${userName}. Saya saat ini terdaftar sebagai Dosen/Staf di website CDC YARSI. Saya ingin meminta bantuan untuk memperbarui peran (role) saya menjadi Konselor agar dapat mengelola jadwal konsultasi. Terima kasih.`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            ></div>

            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-[#004d40]"></div>
                
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                        <ShieldAlert className="w-10 h-10 text-[#00ca65]" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                        Akses Terbatas
                    </h3>
                    
                    {/* PERBAIKAN: Gunakan satu <div> atau satu <p> saja */}
                    <div className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
                        Maaf, akun Anda saat ini terdaftar sebagai <span className="font-bold text-emerald-600 px-1.5 py-0.5 bg-emerald-50 rounded">Dosen/Staf</span>. 
                        Untuk mengakses fitur ini, Anda memerlukan peran sebagai <b>Konselor</b>. Silakan hubungi tim Admin untuk memperbarui status akun Anda.
                    </div>

                    <div className="w-full space-y-3">
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#004d40] text-white font-bold rounded-2xl hover:bg-[#00382e] shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Hubungi Admin via WA
                        </a>

                        <button
                            onClick={onClose}
                            className="w-full py-3 text-gray-400 font-medium hover:text-gray-600 transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounselorRoleAccessModal;