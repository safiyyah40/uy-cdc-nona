import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Clock, MapPin, ExternalLink, AlertCircle, Plus, X,
    Calendar as CalendarIcon, Pencil, Trash2, Lock, ChevronLeft, ChevronRight
} from 'lucide-react';

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const getDaysInMonth = (date, eventsData) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        days.push({
            date: i,
            fullDate: new Date(year, month, i),
            hasEvent: eventsData && eventsData[dateKey] && eventsData[dateKey].length > 0,
            dateKey: dateKey
        });
    }
    return days;
};

const getEventTypeLabel = (type) => {
    const labels = {
        'seminar': 'Seminar',
        'campus_hiring': 'Campus Hiring',
        'konsultasi': 'Konsultasi',
        'deadline_loker': 'Loker',
        'deadline_magang': 'Magang',
        'sertifikasi': 'Sertifikasi',
        'orientasi': 'Orientasi Kerja',
        'custom': 'Pribadi'
    };
    return labels[type] || type;
};

const getEventTypeColor = (type) => {
    const colors = {
        'seminar': 'bg-blue-100 text-blue-700',
        'campus_hiring': 'bg-purple-100 text-purple-700',
        'konsultasi': 'bg-emerald-100 text-emerald-700',
        'sertifikasi': 'bg-cyan-100 text-cyan-700',
        'orientasi': 'bg-violet-100 text-violet-700',
        'custom': 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
};

const KalenderSection = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventsData, setEventsData] = useState({});
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        title: '', description: '', start_date: '', start_time: '',
        end_time: '', event_type: 'custom', location: '', link: ''
    });

    const fetchEvents = async () => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        setIsLoading(true);
        try {
            const response = await axios.get('/api/calendar/events', { params: { year, month } });
            setEventsData(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchEvents(); }, [currentDate]);

    useEffect(() => {
        if (selectedDate) {
            const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            setSelectedEvents(eventsData[dateKey] || []);
            if (!editingEventId) setFormData(prev => ({ ...prev, start_date: dateKey }));
        }
    }, [selectedDate, eventsData, editingEventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getCleanId = (id) => {
        if (!id) return null;
        return id.toString().replace('static-', '').replace('booking-', '');
    };

    // FUNGSI NAVIGASI DETAIL
    const goToDetail = (url) => {
        if (url) window.location.href = url;
    };

    // FUNGSI TAMBAH (MODAL KOSONG)
    const handleOpenAddModal = () => {
        setEditingEventId(null);
        const dateKey = `${selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()}-${String((selectedDate ? selectedDate.getMonth() : new Date().getMonth()) + 1).padStart(2, '0')}-${String(selectedDate ? selectedDate.getDate() : new Date().getDate()).padStart(2, '0')}`;
        setFormData({ title: '', description: '', start_date: dateKey, start_time: '', end_time: '', event_type: 'custom', location: '', link: '' });
        setIsModalOpen(true);
    };

    // FUNGSI EDIT (ISI DATA KE FORM)
    const handleOpenEditModal = (event) => {
        setEditingEventId(event.id); // Simpan ID asli (misal: static-53)
        setFormData({
            title: event.title,
            description: event.description || '',
            start_date: event.date,
            start_time: event.time_range ? event.time_range.split(' ')[0] : '',
            end_time: '',
            event_type: event.event_type,
            location: event.location || '',
            link: event.link || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (event) => {
        if (!window.confirm('Hapus agenda ini?')) return;

        try {
            const cleanId = getCleanId(event.id); // Bersihkan ID jadi angka (53)
            await axios.delete(`/api/calendar/events/${cleanId}`);
            fetchEvents();
        } catch (error) {
            alert('Gagal menghapus agenda');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingEventId) {
                const cleanId = getCleanId(editingEventId); // Bersihkan ID (53)
                await axios.put(`/api/calendar/events/${cleanId}`, formData);
            } else {
                await axios.post('/api/calendar/events', formData);
            }
            setIsModalOpen(false);
            fetchEvents();
        } catch (error) {
            alert('Gagal menyimpan kegiatan');
        } finally {
            setIsSubmitting(false);
        }
    };
    const navigateMonth = (amount) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1));
    };

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div className="flex items-center flex-grow">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-green-900 pr-4 whitespace-nowrap uppercase tracking-tight">KALENDER</h2>
                        <div className="hidden sm:block flex-grow border-b-4 border-green-700 h-px"></div>
                    </div>
                    <button
                        onClick={handleOpenAddModal}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl sm:rounded-full font-bold shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5" /> Tambah Kegiatan
                    </button>
                </div>

                {/* Navigasi Bulan */}
                <div className="flex justify-between items-center mb-6 bg-green-50 p-2 rounded-xl">
                    <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-green-100 rounded-full transition-colors text-green-700">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="text-lg md:text-xl font-bold text-green-900 uppercase tracking-wide">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>
                    <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-green-100 rounded-full transition-colors text-green-700">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Grid Kalender */}
                <div className="grid grid-cols-7 border-l border-t border-gray-200 rounded-2xl overflow-hidden shadow-xl bg-white mb-10">
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className={`text-center font-bold py-3 text-[10px] md:text-xs uppercase tracking-widest border-r border-b border-gray-100 bg-gray-50 text-gray-500`}>
                            {day}
                        </div>
                    ))}
                    {getDaysInMonth(currentDate, eventsData).map((day, index) => {
                        const today = new Date();
                        const isToday = day && day.fullDate.toDateString() === today.toDateString();
                        const isSelected = selectedDate && day && day.fullDate.toDateString() === selectedDate.toDateString();

                        if (!day) return <div key={`empty-${index}`} className="aspect-square bg-gray-50/30 border-r border-b border-gray-50"></div>;

                        return (
                            <div
                                key={day.dateKey}
                                className={`relative aspect-square border-r border-b border-gray-100 p-1 md:p-2 cursor-pointer transition-all ${isSelected ? 'bg-emerald-600 text-white z-10 shadow-inner' : 'hover:bg-emerald-50'
                                    }`}
                                onClick={() => setSelectedDate(day.fullDate)}
                            >
                                <span className={`text-xs md:text-base font-semibold ${isSelected ? 'text-white' : isToday ? 'text-emerald-600 font-bold' : 'text-gray-700'}`}>
                                    {day.date}
                                </span>
                                {day.hasEvent && (
                                    <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-red-500'}`}></div>
                                )}
                                {isToday && !isSelected && (
                                    <div className="absolute inset-0 border-2 border-emerald-500 rounded pointer-events-none"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Agenda Section */}
                <div className="mt-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Agenda Kegiatan</h3>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="py-10 text-center text-gray-400">Memuat agenda...</div>
                        ) : selectedEvents.length > 0 ? (
                            selectedEvents.map((event) => (
                                <div key={event.id} className="p-4 md:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md group">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-[9px] md:text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${getEventTypeColor(event.event_type)}`}>
                                                {getEventTypeLabel(event.event_type)}
                                            </span>
                                            {event.is_system_event && event.event_type !== 'konsultasi' && <Lock className="w-3 h-3 text-gray-400" />}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1 leading-tight">{event.title}</h4>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{event.description}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
                                            {event.time_range && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-600" />{event.time_range}</span>}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end w-full md:w-auto gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                                        {/* TOMBOL DETAIL: Muncul untuk Konsultasi DAN Program Sistem (Seminar, Loker, dll) */}
                                        {event.url_detail ? (
                                            <button
                                                onClick={() => goToDetail(event.url_detail)}
                                                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                {event.event_type === 'konsultasi' ? 'Detail Sesi' : 'Lihat Program'}
                                            </button>
                                        ) : null}

                                        {/* TOMBOL EDIT/HAPUS: Hanya untuk event pribadi yang BUKAN sistem */}
                                        {!event.is_system_event && (
                                            <>
                                                <button onClick={() => handleOpenEditModal(event)} className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors">
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                                <button onClick={() => handleDelete(event)} className="p-2.5 text-gray-400 hover:text-red-600 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
                                Tidak ada kegiatan untuk hari ini.
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10">
                        <div className="sticky top-0 px-6 py-5 bg-[#004d40] text-white flex justify-between items-center z-10">
                            <h3 className="text-xl font-bold">{editingEventId ? 'Edit Agenda' : 'Agenda Baru'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Judul Kegiatan</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" placeholder="Contoh: Webinar Karir..." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tanggal</label>
                                    <input type="date" name="start_date" required value={formData.start_date} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Tipe</label>
                                    <select name="event_type" value={formData.event_type} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm">
                                        <option value="custom">Pribadi</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Jam Mulai</label>
                                    <input type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Jam Selesai</label>
                                    <input type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Lokasi & Link</label>
                                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm mb-2" placeholder="Gedung / Ruangan" />
                                <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm" placeholder="Link Zoom/GMeet (opsional)" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1 tracking-widest">Deskripsi</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm resize-none" placeholder="Detail kegiatan..."></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-[#004d40] hover:bg-black text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Menyimpan...' : editingEventId ? 'Perbarui Agenda' : 'Simpan ke Kalender'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default KalenderSection;