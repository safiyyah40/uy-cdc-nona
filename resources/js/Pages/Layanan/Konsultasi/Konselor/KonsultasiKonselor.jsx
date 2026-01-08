import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { useScrollFadeIn } from '@/Hooks/useScrollFadeIn';
import { Head, Link, useForm, router } from "@inertiajs/react"; 
import { 
    Briefcase, Plus, Calendar, Clock, 
    Trash2, Check, User, AlertCircle
} from "lucide-react";

const Icons = {
    Academic: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
    ),
};

// COMPONENT: FORM TAMBAH SLOT
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
        <div className="mb-8 bg-white/50 backdrop-blur-sm border border-emerald-100 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#004d40]">
                <Plus className="w-5 h-5" />
                <h3 className="font-bold text-lg font-serif">Tambah Jadwal Baru</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Tanggal */}
                <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Tanggal</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent text-sm"
                        required
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>

                {/* Jam Mulai */}
                <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Jam Mulai</label>
                    <input
                        type="time"
                        value={data.start_time}
                        onChange={e => setData('start_time', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent text-sm"
                        required
                    />
                    {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
                </div>

                {/* Jam Selesai */}
                <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Jam Selesai</label>
                    <input
                        type="time"
                        value={data.end_time}
                        onChange={e => setData('end_time', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00CA65] focus:border-transparent text-sm"
                        required
                    />
                    {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
                </div>

                {/* Tombol */}
                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-2.5 bg-[#004d40] hover:bg-[#00382e] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : (
                            <>
                                <Plus className="w-4 h-4" /> Simpan Slot
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

const handleUpdate = (slotId, data) => {
    router.patch(route('konselor.slots.update', slotId), data, {
        onSuccess: () => {
            // Tutup modal / Reset form
            alert("Jadwal update berhasil");
        },
        onError: (errors) => {
            alert(errors.error || "Gagal update");
        }
    });
};

// --- COMPONENT: CARD SLOT  ---
const CounselorCardSelf = ({ counselor }) => {
    const [imageError, setImageError] = useState(false);

    const handleDelete = (slotId) => {
        if (confirm("Yakin ingin menghapus slot jadwal ini?")) {
            router.delete(route('konselor.slots.delete', slotId), {
                preserveScroll: true,
            });
        }
    };

    if (!counselor) return null;

    return (
        <div className="group bg-white rounded-2xl border border-[#00CA65] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-full">
            {/* FOTO & IDENTITAS */}
            <div className="md:w-2/5 relative p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[#00CA65]/30 bg-gray-50">
                <div className="absolute inset-0 bg-[#00CA65]/10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-multiply"></div>

                <div className="relative mb-4 z-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg relative bg-white">
                        {counselor.photo_url && !imageError ? (
                            <img 
                                src={counselor.photo_url} 
                                alt={counselor.name} 
                                onError={() => setImageError(true)} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                        ) : (
                            <div className="w-full h-full bg-[#004d40] flex items-center justify-center text-white">
                                <span className="text-3xl font-serif font-bold">{counselor.name ? counselor.name.charAt(0) : 'K'}</span>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#004d40] text-white p-1 rounded-full border-2 border-white z-20">
                        <User className="w-4 h-4" />
                    </div>
                </div>

                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 relative z-10 line-clamp-2">{counselor.name}</h3>
                <p className="text-xs text-[#004d40] font-medium mb-2 flex items-center justify-center gap-1 relative z-10">
                    <Icons.Academic /> {counselor.title}
                </p>
                <div className="mt-2 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-[10px] font-bold text-[#004d40] border border-emerald-100 shadow-sm relative z-10">
                    Anda (Mode Edit)
                </div>
            </div>

            {/* JADWAL LIST */}
            <div className="md:w-3/5 p-4 flex flex-col justify-between bg-white">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-emerald-800/10 text-emerald-800 rounded"><Calendar className="w-4 h-4" /></div>
                            <h4 className="font-semibold text-xs text-gray-800">Daftar Jadwal Aktif</h4>
                        </div>
                    </div>

                    {counselor.slots && counselor.slots.length > 0 ? (
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                            {counselor.slots.map((slot) => (
                                <div
                                    key={slot.id}
                                    className="flex items-center justify-between p-2 rounded border border-gray-100 bg-gray-50 hover:border-red-200 hover:bg-red-50 transition-colors group/item"
                                >
                                    <div>
                                        <div className="text-xs font-bold text-gray-800">{slot.date_string}</div>
                                        <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" /> {slot.time_string} WIB
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(slot.id)}
                                        className="p-1.5 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-600 shadow-sm transition-all"
                                        title="Hapus Jadwal"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center flex flex-col items-center justify-center h-32">
                             <AlertCircle className="w-8 h-8 text-gray-300 mb-2" />
                            <p className="text-xs text-gray-500 font-medium">Belum ada slot jadwal.</p>
                            <p className="text-[10px] text-gray-400">Gunakan form di atas untuk menambah.</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                     <div className="w-full py-2 bg-gray-100 text-gray-500 text-xs text-center rounded border border-gray-200 flex items-center justify-center gap-2">
                        <Check className="w-3 h-3" /> Tampilan ini hanya terlihat oleh Anda
                     </div>
                </div>
            </div>
        </div>
    );
};

// HERO SECTION
const HeroSection = ({ user }) => {
    const heroTitle = useScrollFadeIn(0.2);
    // Mengarahkan ke Tabel Sesi Konsultasi List Konselor
    const bookingListUrl = route('konselor.table_konsultasi');

    return (
        <div className="min-h-[80vh] bg-white relative overflow-hidden flex items-center">
             {/* Background Blob */}
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#00CA65] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
            
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

// --- MAIN COMPONENT ---
const KonsultasiKonselor = ({ user, counselor }) => { 
    return (
        <MainLayout user={user}>
            <Head title="Manajemen Jadwal Konselor" />

            <div className="min-h-screen bg-white relative overflow-hidden">
                {/* Hero Section */}
                <HeroSection user={user} />

                <section className="bg-[#004d40] py-20 relative bg-no-repeat min-h-screen">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        {/* Container Putih */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 border border-gray-200 relative">
                            
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 font-serif">Kelola Slot Waktu</h2>
                                <p className="text-gray-600 mt-2">Tambahkan jadwal kosong agar mahasiswa dapat memilih waktu bimbingan.</p>
                            </div>

                            {/* Form Input Slot */}
                            <AddSlotForm />

                            {/* Card Konselor Sendiri */}
                            <div className="max-w-4xl mx-auto">
                                <CounselorCardSelf counselor={counselor} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </MainLayout>
    );
};

export default KonsultasiKonselor;