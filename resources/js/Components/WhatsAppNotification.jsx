import React from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppNotification = ({ waUrls, onClose }) => {
    if (!waUrls || (Object.keys(waUrls).length === 0)) return null;

    const handleOpenWhatsApp = (url, label) => {
        window.open(url, '_blank');
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 border-b pb-2">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-green-100 rounded-full">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm">Kirim Notifikasi</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <p className="text-xs text-gray-600 mb-3">
                    Klik tombol di bawah untuk membuka WhatsApp dan mengirim notifikasi:
                </p>

                {/* Buttons */}
                <div className="space-y-2">
                    {waUrls.wa_student_url && (
                        <button
                            onClick={() => handleOpenWhatsApp(waUrls.wa_student_url, 'Mahasiswa')}
                            className="w-full flex items-center justify-between px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                        >
                            <span>📱 Notifikasi ke Mahasiswa</span>
                            <MessageCircle className="w-4 h-4" />
                        </button>
                    )}

                    {waUrls.wa_counselor_url && (
                        <button
                            onClick={() => handleOpenWhatsApp(waUrls.wa_counselor_url, 'Konselor')}
                            className="w-full flex items-center justify-between px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                        >
                            <span>👨‍🏫 Notifikasi ke Konselor</span>
                            <MessageCircle className="w-4 h-4" />
                        </button>
                    )}

                    {waUrls.wa_admin_url && (
                        <button
                            onClick={() => handleOpenWhatsApp(waUrls.wa_admin_url, 'Admin')}
                            className="w-full flex items-center justify-between px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm font-medium"
                        >
                            <span>🔔 Notifikasi ke Admin</span>
                            <MessageCircle className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Footer Info */}
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Notifikasi akan terbuka di WhatsApp Web/App
                </p>
            </div>
        </div>
    );
};

export default WhatsAppNotification;