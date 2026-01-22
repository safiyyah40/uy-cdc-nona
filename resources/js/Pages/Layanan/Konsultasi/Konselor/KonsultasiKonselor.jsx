import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, useForm, router } from "@inertiajs/react"; 
import { 
    Briefcase, Plus, Calendar, Clock, 
    Trash2, Check, User, AlertCircle, AlertTriangle, X, Trash
} from "lucide-react";

const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
};

// MODAL KONFIRMASI HAPUS
const DeleteSlotModal = ({ isOpen, onClose, onConfirm, slotInfo, isProcessing }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="h-2 w-full bg-gradient-to-r from-red-400 to-red-600"></div>
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Hapus Jadwal?</h3>
                    <div className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Anda akan menghapus jadwal pada:<br/>
                        <span className="font-black text-gray-900">{slotInfo?.date_string}</span><br/>
                        Pukul <span className="font-black text-gray-900">{slotInfo?.time_string} WIB</span>
                    </div>
                    <div className="w-full space-y-3">
                        <button 
                            onClick={onConfirm}
                            disabled={isProcessing}
                            className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Trash className="w-5 h-5" /> {isProcessing ? 'Menghapus...' : 'Ya, Hapus Jadwal'}
                        </button>
                        <button onClick={onClose} className="w-full py-3 text-gray-400 font-bold hover:text-gray-600">
                            Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// FORM TAMBAH JADWAL
const AddSlotForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        start_time: '',
        end_time: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('konselor.slots.store'), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <div className="mb-10 bg-white border-2 border-emerald-100 p-6 lg:p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-[#004d40]">
                <Plus className="w-6 h-6" />
                <h3 className="font-bold text-xl font-serif">Tambah Jadwal Baru</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <div className="space-y-1">
                    <label className="block text-sm font-black text-gray-600 uppercase tracking-wider">Tanggal</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-[#00CA65] text-base"
                        required
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1 font-bold">{errors.date}</p>}
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-black text-gray-600 uppercase tracking-wider">Jam Mulai</label>
                    <input
                        type="time"
                        value={data.start_time}
                        onChange={e => setData('start_time', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-[#00CA65] text-base"
                        required
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-sm font-black text-gray-600 uppercase tracking-wider">Jam Selesai</label>
                    <input
                        type="time"
                        value={data.end_time}
                        onChange={e => setData('end_time', e.target.value)}
                        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-emerald-100 focus:border-[#00CA65] text-base"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-4 bg-[#004d40] hover:bg-black text-white text-base font-black rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
                </button>
            </form>
        </div>
    );
};

// KARTU DISPLAY JADWAL
const CounselorCardSelf = ({ counselor }) => {
    const [imageError, setImageError] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, slotId: null, slotInfo: null });
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (slot) => {
        setDeleteModal({ isOpen: true, slotId: slot.id, slotInfo: slot });
    };

    const handleConfirmDelete = () => {
        setIsDeleting(true);
        router.delete(route('konselor.slots.delete', deleteModal.slotId), {
            onSuccess: () => {
                setDeleteModal({ isOpen: false, slotId: null, slotInfo: null });
                setIsDeleting(false);
            },
            onError: (errors) => {
                setIsDeleting(false);
                alert('❌ ' + (errors.error || 'Gagal menghapus jadwal'));
            },
            preserveScroll: true,
        });
    };

    const handleCloseModal = () => { if (!isDeleting) setDeleteModal({ isOpen: false, slotId: null, slotInfo: null }); };

    if (!counselor) return null;

    return (
    <>
        <div className="group bg-white rounded-[2.5rem] border-2 border-emerald-100 shadow-xl overflow-hidden flex flex-col lg:flex-row h-full min-h-[450px]">
            {/* SISI KIRI: PROFIL */}
            <div className="lg:w-1/3 relative p-8 flex flex-col items-center justify-center text-center bg-gray-50 border-b lg:border-b-0 lg:border-r-2 border-emerald-50">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent"></div>
                <div className="relative mb-6 z-10">
                    <div className="w-32 h-32 rounded-[2rem] overflow-hidden ring-4 ring-white shadow-xl relative bg-white">
                        {counselor.photo_url && !imageError ? (
                            <img src={counselor.photo_url} alt={counselor.name} onError={() => setImageError(true)} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#004d40] flex items-center justify-center text-white">
                                <span className="text-5xl font-serif font-bold">{counselor.name?.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#004d40] text-white p-2.5 rounded-xl border-4 border-white z-20 shadow-md">
                        <User className="w-6 h-6" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 relative z-10 font-serif uppercase tracking-tight">
                    {counselor.name}
                </h3>
                <p className="text-lg text-[#004d40] font-semibold mb-4 flex items-center justify-center gap-2 relative z-10">
                    <Icons.Academic /> {counselor.title}
                </p>
                <div className="mt-2 px-5 py-2 bg-emerald-100 rounded-full text-xs font-black text-[#004d40] border border-emerald-200 shadow-sm relative z-10 uppercase tracking-widest">
                    Akun Saya (Edit)
                </div>
            </div>

            {/* SISI KANAN: DAFTAR JADWAL */}
            <div className="lg:w-2/3 p-6 lg:p-10 flex flex-col justify-between bg-white">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-emerald-800/10 text-emerald-800 rounded-xl">
                            <Calendar className="w-7 h-7" />
                        </div>
                        <h4 className="font-bold text-xl text-gray-800 tracking-tight uppercase">Daftar Jadwal Aktif</h4>
                    </div>

                    {counselor.slots && counselor.slots.length > 0 ? (
                        <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-3 custom-scrollbar">
                            {counselor.slots.map((slot) => (
                                <div key={slot.id} className="flex items-center justify-between p-5 rounded-3xl border-2 border-gray-100 bg-white hover:border-[#00CA65] hover:bg-emerald-50/20 transition-all shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-gray-50 rounded-2xl text-emerald-700 border border-gray-100">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-lg lg:text-xl font-black text-gray-800">{slot.date_string}</div>
                                            <div className="text-base text-gray-500 font-bold mt-1">Pukul: {slot.time_string} WIB</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDeleteClick(slot)}
                                        className="p-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-600 hover:bg-red-50 shadow-sm transition-all active:scale-90"
                                        title="Hapus Jadwal"
                                    >
                                        <Trash2 className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] text-center flex flex-col items-center justify-center h-48">
                            <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="text-lg text-gray-500 font-bold uppercase tracking-wide">Belum ada slot jadwal.</p>
                            <p className="text-sm text-gray-400 mt-1">Gunakan form di atas untuk mengisi waktu luang Anda.</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                     <div className="w-full py-4 bg-emerald-50/50 text-[#004d40] text-sm font-bold text-center rounded-2xl border border-emerald-100 flex items-center justify-center gap-3 italic">
                        <Check className="w-5 h-5 text-[#00CA65]" /> Hanya Anda yang dapat mengelola jadwal ini
                     </div>
                </div>
            </div>
        </div>

        <DeleteSlotModal
            isOpen={deleteModal.isOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            slotInfo={deleteModal.slotInfo}
            isProcessing={isDeleting}
        />
        
        <style>
            {`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f9fafb; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; border: 2px solid #f9fafb; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
            `}
        </style>
    </>
    );
};

// MAIN COMPONENT (ENTRY POINT)
const HeroSection = ({ user }) => {
    const heroTitle = useScrollFadeIn(0.2);
    // Mengarahkan ke Tabel Sesi Konsultasi List Konselor
    const bookingListUrl = route('konselor.table_konsultasi');

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center">
            {/* Background Decorations */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
            <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
            
            <div className="relative w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24 gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-[#004d40] text-xs font-bold uppercase tracking-wider mb-6" ref={heroTitle.ref} style={heroTitle.style}>
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CA65] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00CA65]"></span>
                                </span>
                                Manajamen Sesi Konsultasi Konselor
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 font-serif text-[#004d40]">
                                HALO, {user?.name?.toUpperCase()}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Kelola jadwal ketersediaan Anda untuk sesi konsultasi mahasiswa. Anda dapat menambah, mengubah, atau menghapus slot waktu secara real-time.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href={bookingListUrl}
                                    className="px-8 py-4 bg-[#004d40] text-white font-bold rounded-xl hover:bg-[#00382e] shadow-lg transition-all transform hover:-translate-y-1 inline-flex items-center gap-2 justify-center"
                                >
                                    <Briefcase className="w-5 h-5" /> Lihat Permintaan Sesi Konsultasi
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <img src="/images/pict-profil-konselor.png" alt="Diskusi Mahasiswa" className="w-full object-cover h-[400px] lg:h-[500px]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/90 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-serif italic text-lg opacity-90">"Dashboard Manajemen Jadwal"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const KonsultasiKonselor = ({ user, counselor }) => { 
    return (
        <MainLayout user={user}>
            <Head title="Manajemen Jadwal Konselor" />
            <div className="min-h-screen bg-white">
                <HeroSection user={user} />
                <section className="bg-gradient-to-br from-[#004d40] to-[#002b23] py-16 lg:py-24">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="bg-white/95 backdrop-blur-md rounded-[3.5rem] p-8 lg:p-16 shadow-2xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 font-serif uppercase tracking-tight">Jadwal Konsultasi</h2>
                                <p className="text-lg lg:text-xl text-gray-600 mt-4 max-w-2xl mx-auto font-bold italic opacity-80">"Jadwalkan ketersediaan Anda agar mahasiswa dapat memilih waktu yang tepat."</p>
                            </div>
                            <AddSlotForm />
                            <div className="max-w-5xl mx-auto">
                                <CounselorCardSelf counselor={counselor} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default KonsultasiKonselor;