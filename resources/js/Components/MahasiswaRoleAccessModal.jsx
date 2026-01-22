import React from 'react';
import { X, ShieldAlert, MessageCircle } from 'lucide-react';

const MahasiswaRoleAccessModal = ({ isOpen, onClose, userName, contactInfo }) => {
    // Guard: Jika modal tidak open, return null (tidak render apapun)
    if (!isOpen) return null;

    // Nomor WhatsApp Admin (default atau dari props)
    const waNumber = contactInfo?.whatsapp_number || "6281295986204";
    
    // Template pesan WhatsApp otomatis untuk mahasiswa
    const message = `Assalamualaikum Admin, nama saya ${userName}. Saya saat ini terdaftar sebagai Dosen/Staf di website CDC YARSI. Saya ingin meminta bantuan untuk memperbarui peran (role) saya menjadi Konselor agar dapat mengelola jadwal konsultasi. Terima kasih.`;
    
    // Generate WhatsApp link dengan message terenkode
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop - Blur background dengan opacity */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
                aria-label="Close modal"
            ></div>

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Top Accent Bar - Gradient emerald */}
                <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-[#004d40]"></div>
                
                {/* Modal Content */}
                <div className="p-8 flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                        <ShieldAlert className="w-10 h-10 text-[#00ca65]" />
                    </div>

                    {/* Modal Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                        Akses Terbatas
                    </h3>
                    
                    {/* Modal Description */}
                    <div className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
                        Halaman ini diperuntukkan khusus untuk akun dengan peran{' '}
                        <span className="font-bold text-[#004d40] px-1.5 py-0.5 bg-emerald-50 rounded">
                            Mahasiswa
                        </span>
                        . Akun Anda saat ini terdaftar sebagai{' '}
                        <span className="font-bold text-emerald-600 px-1.5 py-0.5 bg-emerald-50 rounded">
                            Dosen/Staf
                        </span>
                        . Jika Anda merasa ini adalah kesalahan, silakan hubungi tim Admin untuk verifikasi.
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-3">
                        {/* WhatsApp Button - Primary Action */}
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-[#004d40] text-white font-bold rounded-2xl hover:bg-[#00382e] shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Hubungi Admin via WA
                        </a>

                        {/* Close Button - Secondary Action */}
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

export default MahasiswaRoleAccessModal;