import React, { useState, useEffect } from 'react';

const dummyEvents = {
    '2025-11-13': [ 
        { id: 1, title: 'Kegiatan Hari Ini: Rapat Koordinasi Program Studi.' },
        { id: 2, title: 'Pengajuan Proposal Penelitian Dosen.' },
    ],
    '2025-11-22': [ 
        { id: 3, title: 'Universitas YARSI Terima 59 Mahasiswa Baru Penerima Beasiswa KIP Kuliah Tahun 2025' },
        { id: 4, title: 'Pameran Karya Seni Mahasiswa Fakultas Kedokteran.' },
    ],
};

const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); 
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const fullDate = new Date(year, month, i);
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        days.push({ 
            date: i, 
            fullDate: fullDate,
            hasEvent: dummyEvents[dateKey] ? true : false,
            dateKey: dateKey
        });
    }
    return days;
};

const KalenderSection = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); 
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            
            setIsLoading(true); 
            setEvents([]);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const DUMMY_EVENTS_FOR_API = dummyEvents;
            
            const dateKey = selectedDate 
                ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
                : null;
            
            setEvents(DUMMY_EVENTS_FOR_API[dateKey] || []);
            setIsLoading(false);
        };

        fetchEvents();
        
    }, [currentDate, selectedDate]); 


    const navigateMonth = (amount) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + amount);
        setCurrentDate(newDate);

        const today = new Date();
        if (newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
            setSelectedDate(today);
        } else {
            setSelectedDate(null);
        }
    };

    const handleDayClick = (day) => {
        if (day) {
            setSelectedDate(day.fullDate);
            setEvents(dummyEvents[day.dateKey] || []);
        }
    };


    return (
        <section className="py-20 bg-white"> 
            
            <div className="container mx-auto px-4 md:px-8 max-w-6xl"> 
                
                {/* Judul dan Garis */}
                <div className="flex items-center mb-10">
                    <h2 className="text-5xl font-serif text-green-900 pr-4 whitespace-nowrap">
                        KALENDER
                    </h2>
                    <div className="flex-grow border-b-4 border-green-700 h-px"></div>
                </div>
            
                {/* Header Bulan dan Navigasi */}
                <div className="flex justify-between items-center mb-6 px-2">
                    <button onClick={() => navigateMonth(-1)} className="p-2 text-xl text-green-700 hover:text-green-900 transition-colors">
                        &larr; <span className="hidden sm:inline"> {monthNames[(currentDate.getMonth() - 1 + 12) % 12]}</span>
                    </button>
                    <div className="text-xl font-semibold text-gray-800">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </div>
                    <button onClick={() => navigateMonth(1)} className="p-2 text-xl text-green-700 hover:text-green-900 transition-colors">
                        <span className="hidden sm:inline">{monthNames[(currentDate.getMonth() + 1) % 12]} </span> &rarr;
                    </button>
                </div>
                
                {/* Grid Kalender */}
                <div className="grid grid-cols-7 border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
                    {/* Nama Hari */}
                    {daysOfWeek.map((day, index) => (
                        <div key={day} className={`text-center font-semibold py-3 text-sm ${
                            (index === 0 || index === 6) ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                        }`}>
                            {day}
                        </div>
                    ))}

                    {/* Sel Hari */}
                    {getDaysInMonth(currentDate).map((day, index) => {
                        const today = new Date();
                        const isToday = day && day.fullDate.toDateString() === today.toDateString();
                        const isSelected = selectedDate && day && day.fullDate.toDateString() === selectedDate.toDateString();
                        const hasEvent = day && day.hasEvent;
                        
                        if (!day) {
                            return <div key={index} className="aspect-square bg-white border-t border-r border-gray-200 last:border-r-0"></div>;
                        }

                        return (
                            <div
                                key={index}
                                className={`relative aspect-square border-t border-r border-gray-200 text-center cursor-pointer transition-colors ${
                                    isSelected ? 'bg-green-200' : isToday ? 'bg-green-100 hover:bg-green-50' : hasEvent ? 'hover:bg-green-100' : 'hover:bg-gray-50'
                                }`}
                                onClick={() => handleDayClick(day)}
                            >
                                <span className={`absolute top-2 right-2 text-sm font-medium ${
                                    isSelected ? 'text-green-800 font-extrabold' : isToday ? 'text-green-700 font-extrabold' : hasEvent ? 'text-green-600 font-bold' : 'text-gray-700'
                                }`}>
                                    {day.date}
                                </span>
                                {hasEvent && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                )}
                                {isToday && !isSelected && (
                                    <div className="absolute inset-0 border-2 border-green-500 rounded pointer-events-none"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {/* Bagian Daftar Kegiatan */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Rencana Kegiatan</h3>

                    {selectedDate && (
                        <h4 className="text-lg font-medium mb-4 text-gray-700">
                            {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </h4>
                    )}

                    <div className="space-y-4">
                        {isLoading ? ( 
                            <div className="p-4 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
                                Memuat kegiatan...
                            </div>
                        ) : events.length > 0 ? (
                            events.map((event) => (
                                <div key={event.id} className="p-5 bg-white border border-gray-300 rounded-lg shadow-md">
                                    <p className="text-gray-800 text-lg font-medium">{event.title}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
                                {selectedDate ? `Tidak ada kegiatan terjadwal di tanggal ${selectedDate.toLocaleDateString('id-ID')}.` : 'Silakan pilih tanggal di kalender untuk melihat kegiatan.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KalenderSection;