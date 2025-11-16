import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const DUMMY_API_DATA = [
    { name: 'Tes Minat dan Bakat', value: 50 },
    { name: 'CV Review', value: 33 },
    { name: 'Konsultasi', value: 17 },
];

const COLORS = ['#FF8042', '#8884d8', '#FF4242'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"
              className="text-2xl font-bold">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const StatistikLayanan = () => {
    const [dataStatistik, setDataStatistik] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStatistik = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setDataStatistik(DUMMY_API_DATA);

            } catch (error) {
                console.error("Gagal mengambil data statistik:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatistik();
    }, []);


    if (isLoading) {
        return (
            <div className="container mx-auto px-4 md:px-8 max-w-6xl py-12 text-center text-gray-500">
                Memuat data statistik layanan...
            </div>
        );
    }

    if (dataStatistik.length === 0) {
        return null;
    }

    return (

        <section className="py-20 bg-gradient-to-b from-green-500 to-white">

            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <div className="flex items-center mb-10">
                    <h2 className="text-5xl font-serif font-bold text-white pr-4 whitespace-nowrap">
                        STATISTIK LAYANAN
                    </h2>
                    <div className="flex-grow border-b-4 border-white h-px"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                <div className="mt-12 w-full h-[650px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={dataStatistik}
                                cx="50%"
                                cy="50%"
                                innerRadius={120}
                                outerRadius={260}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                labelLine={false}
                                label={renderCustomizedLabel}
                            >
                                {dataStatistik.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${(value / DUMMY_API_DATA.reduce((sum, entry) => sum + entry.value, 0) * 100).toFixed(0)}%`]} />
                            <Legend
                                align="right"
                                verticalAlign="middle"
                                layout="vertical"
                                wrapperStyle={{ paddingLeft: '20px', fontSize: '1.5rem', fill: 'white' }}
                                iconType="square"
                                iconSize={28}
                                payload={
                                    dataStatistik.map((item, index) => ({
                                        id: item.name,
                                        type: 'square',
                                        value: item.name,
                                        color: COLORS[index % COLORS.length],
                                    }))
                                }
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default StatistikLayanan;
