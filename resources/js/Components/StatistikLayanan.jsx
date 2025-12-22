import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';

const DUMMY_API_DATA = [
    { name: 'Tes Minat dan Bakat', value: 50 },
    { name: 'CV Review', value: 33 },
    { name: 'Konsultasi Karir', value: 17 },
];

const COLORS = ['#10B981', '#3B82F6', '#6366F1'];

const StatistikLayanan = () => {
    const [dataStatistik, setDataStatistik] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchStatistik = async () => {
            setIsLoading(true);
            try {
                // Simulasi fetching data
                await new Promise(resolve => setTimeout(resolve, 1000));
                setDataStatistik(DUMMY_API_DATA);
            } catch (error) {
                console.error("Gagal mengambil data statistik:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStatistik();
    }, []);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    if (isLoading) {
        return (
            <div className="w-full py-20 flex justify-center items-center text-gray-400">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <p>Menyiapkan data statistik...</p>
                </div>
            </div>
        );
    }

    // Perhatikan: 'return' harus berada di dalam fungsi StatistikLayanan
    return (
        <section className="bg-white py-12 w-full">
            {/* max-w-7xl membuat konten sejajar dengan Header & Footer */}
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Grid tanpa background abu-abu */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Sisi Kiri: Informasi */}
                    <div className="w-full">
                        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-green-600 uppercase bg-green-50 rounded-full">
                            Insight Data
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Statistik <span className="text-green-600">Layanan</span> Kami
                        </h2>
                        <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-lg">
                            Data partisipasi mahasiswa dalam berbagai program pengembangan karir yang disediakan oleh CDC YARSI.
                        </p>

                        <div className="space-y-5">
                            {dataStatistik.map((entry, index) => (
                                <div 
                                    key={entry.name}
                                    className={`flex items-center justify-between p-2 transition-all duration-300 ${activeIndex === index ? 'translate-x-2' : ''}`}
                                >
                                    <div className="flex items-center">
                                        <div 
                                            className="w-3 h-3 rounded-full mr-4 shadow-sm" 
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></div>
                                        <p className={`text-base font-medium transition-colors ${activeIndex === index ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {entry.name}
                                        </p>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{entry.value}%</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sisi Kanan: Chart */}
                    <div className="h-[450px] w-full relative flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={(props) => (
                                        <Sector
                                            {...props}
                                            outerRadius={props.outerRadius + 8}
                                            fill={props.fill}
                                        />
                                    )}
                                    data={dataStatistik}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="65%"
                                    outerRadius="85%"
                                    paddingAngle={10}
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                    stroke="none"
                                >
                                    {dataStatistik.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                            className="outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-[0.2em] mb-1">Total</p>
                            <p className="text-5xl font-black text-gray-900">100%</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatistikLayanan;