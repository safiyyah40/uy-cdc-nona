import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Clock, MapPin, ExternalLink, AlertCircle, Plus, X, 
    Calendar as CalendarIcon, Type, AlignLeft, Link as LinkIcon,
    CheckCircle2, Pencil, Trash2, Lock 
} from 'lucide-react'; 

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

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
        'custom': 'Acara Pribadi'
    };
    return labels[type] || type;
};

const getEventTypeColor = (type) => {
    const colors = {
        'seminar': 'bg-blue-100 text-blue-700',
        'campus_hiring': 'bg-purple-100 text-purple-700',
        'konsultasi': 'bg-emerald-100 text-emerald-700 border-emerald-500',
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

    const showStatus = (type, text) => {
        setStatusMsg({ type, text });
        setTimeout(() => setStatusMsg({ type: '', text: '' }), 5000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenAddModal = () => {
        setEditingEventId(null);
        const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        setFormData({ title: '', description: '', start_date: dateKey, start_time: '', end_time: '', event_type: 'custom', location: '', link: '' });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (event) => {
        setEditingEventId(event.id);
        setFormData({
            title: event.title, description: event.description || '', start_date: event.date,
            start_time: event.start_time || '', end_time: event.end_time || '',
            event_type: event.event_type, location: event.location || '', link: event.link || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (event) => {
        if (!window.confirm('Hapus kegiatan ini dari kalender?')) return;
        try {
            await axios.delete(`/api/calendar/events/${event.id}`);
            showStatus('success', 'Kegiatan berhasil dihapus');
            fetchEvents();
        } catch (error) {
            showStatus('error', 'Gagal menghapus kegiatan');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingEventId) {
                await axios.put(`/api/calendar/events/${editingEventId}`, formData);
                showStatus('success', 'Berhasil diperbarui!');
            } else {
                await axios.post('/api/calendar/events', formData);
                showStatus('success', 'Berhasil ditambahkan!');
            }
            setIsModalOpen(false);
            fetchEvents();
        } catch (error) {
            showStatus('error', 'Gagal menyimpan.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const navigateMonth = (amount) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + amount, 1);
        setCurrentDate(newDate);
        setSelectedDate(null);
    };

    return (
        <section className="py-20 bg-white">
            {/* Toast Notification */}
            {statusMsg.text && (
                <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all animate-in slide-in-from-right ${statusMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                    <p className="font-semibold text-sm">{statusMsg.text}</p>
                    <button onClick={() => setStatusMsg({type:'', text:''})}><X className="w-4 h-4" /></button>
                </div>
            )}

            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                {/* Header */}
                <div className="flex items-center mb-10">
                    <h2 className="text-5xl font-serif font-bold text-green-900 pr-4 whitespace-nowrap uppercase">KALENDER</h2>
                    <div className="flex-grow border-b-4 border-green-700 h-px"></div>
                    <button onClick={handleOpenAddModal} className="ml-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
                        <Plus className="w-5 h-5" /> Tambah Kegiatan
                    </button>
                </div>

                {/* Navigasi Bulan */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <button onClick={() => navigateMonth(-1)} className="p-2 text-xl text-green-700 hover:text-green-900">&larr; {monthNames[(currentDate.getMonth() - 1 + 12) % 12]}</button>
                    <div className="text-xl font-semibold text-gray-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                    <button onClick={() => navigateMonth(1)} className="p-2 text-xl text-green-700 hover:text-green-900">{monthNames[(currentDate.getMonth() + 1) % 12]} &rarr;</button>
                </div>

                {/* Grid Kalender */}
                <div className="grid grid-cols-7 border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className={`text-center font-semibold py-3 text-sm ${(index === 0 || index === 6) ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}>{day}</div>
                    ))}
                    {getDaysInMonth(currentDate, eventsData).map((day, index) => {
                        const today = new Date();
                        const isToday = day && day.fullDate.toDateString() === today.toDateString();
                        const isSelected = selectedDate && day && day.fullDate.toDateString() === selectedDate.toDateString();
                        if (!day) return <div key={index} className="aspect-square bg-white border-t border-r border-gray-200"></div>;
                        return (
                            <div key={day.dateKey} className={`relative aspect-square border-t border-r border-gray-200 text-center cursor-pointer transition-colors ${isSelected ? 'bg-green-200' : isToday ? 'bg-green-100 hover:bg-green-50' : day.hasEvent ? 'hover:bg-green-100' : 'hover:bg-gray-50'}`} onClick={() => setSelectedDate(day.fullDate)}>
                                <span className={`absolute top-2 right-2 text-sm font-medium ${isSelected ? 'text-green-800 font-extrabold' : isToday ? 'text-green-700 font-extrabold' : 'text-gray-700'}`}>{day.date}</span>
                                {day.hasEvent && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>}
                                {isToday && !isSelected && <div className="absolute inset-0 border-2 border-green-500 rounded pointer-events-none"></div>}
                            </div>
                        );
                    })}
                </div>

                {/* Timeline */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Rencana Kegiatan</h3>
                    {selectedDate && <h4 className="text-lg font-medium mb-4 text-gray-700">{selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h4>}
                    
                    <div className="space-y-4">
                        {isLoading ? <div className="p-4 text-center text-gray-500">Memuat kegiatan...</div> : selectedEvents.length > 0 ? (
                            selectedEvents.map((event) => (
                                <div key={event.id} className="p-5 bg-white border border-gray-300 rounded-lg shadow-md flex justify-between items-center group transition-all hover:shadow-lg">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${getEventTypeColor(event.event_type)}`}>{getEventTypeLabel(event.event_type)}</span>
                                            {event.is_system_event && <Lock className="w-3 h-3 text-gray-400" />}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-lg mb-1">{event.title}</h4>
                                        <p className="text-sm text-gray-500 line-clamp-1 mb-2">{event.description}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                                            {event.time_range && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.time_range}</span>}
                                            {event.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {event.link && <a href={event.link} target="_blank" className="p-2 text-gray-400 hover:text-green-600"><ExternalLink className="w-5 h-5" /></a>}
                                        {!event.is_system_event && (
                                            <>
                                                <button onClick={() => handleOpenEditModal(event)} className="p-2 text-gray-400 hover:text-blue-600"><Pencil className="w-5 h-5" /></button>
                                                <button onClick={() => handleDelete(event)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : <div className="p-8 text-center text-gray-400 border-2 border-dashed rounded-lg">{selectedDate ? 'Tidak ada kegiatan terjadwal.' : 'Pilih tanggal di kalender.'}</div>}
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="px-8 py-6 bg-green-600 text-white flex justify-between items-center">
                            <h3 className="text-2xl font-bold">{editingEventId ? 'Edit Kegiatan' : 'Buat Kegiatan'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-4">
                            <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Nama Kegiatan *"/>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" name="start_date" required value={formData.start_date} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none"/>
                                <select name="event_type" value={formData.event_type} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none">
                                    <option value="custom">Acara Pribadi</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="konsultasi">Konsultasi</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none" placeholder="Mulai"/>
                                <input type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none" placeholder="Selesai"/>
                            </div>
                            <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none" placeholder="Link (Opsional)"/>
                            <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none" placeholder="Lokasi (Opsional)"/>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" className="w-full px-5 py-3.5 bg-gray-50 border-transparent rounded-2xl outline-none resize-none" placeholder="Deskripsi..."></textarea>
                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700">{isSubmitting ? 'Memproses...' : 'Simpan Agenda'}</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default KalenderSection;