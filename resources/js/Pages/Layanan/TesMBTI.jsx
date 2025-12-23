import React, { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, router } from "@inertiajs/react";
import { 
    ArrowRight, ArrowLeft, RotateCcw, 
    Sparkles, Wrench, Search, Palette, 
    HeartHandshake, Briefcase, FileText,
    CheckCircle2, Compass, Award, Lightbulb,
    Clock, Trophy, TrendingUp
} from "lucide-react";

// Judul: Komponen Tes Minat Bakat (RIASEC) - Versi Premium
const TesMBTI = ({ auth }) => {
    const [step, setStep] = useState("intro");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    
    // State Timer
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const questions = [
        { id: 1, category: "R", text: "Mengoperasikan mesin atau peralatan teknis dengan presisi." },
        { id: 2, category: "I", text: "Menganalisis data kompleks untuk menemukan pola tersembunyi." },
        { id: 3, category: "A", text: "Merancang konsep visual atau desain yang artistik dan unik." },
        { id: 4, category: "S", text: "Membantu orang lain dalam proses pembelajaran atau pemulihan." },
        { id: 5, category: "E", text: "Memimpin negosiasi untuk mencapai kesepakatan bisnis." },
        { id: 6, category: "C", text: "Mengelola sistem pengarsipan atau database secara terstruktur." },
        { id: 7, category: "R", text: "Membangun atau memperbaiki struktur fisik menggunakan peralatan kerja." },
        { id: 8, category: "I", text: "Melakukan riset mendalam terhadap fenomena alam atau sosial." },
        { id: 9, category: "A", text: "Mengekspresikan ide kreatif melalui tulisan, musik, atau peran." },
        { id: 10, category: "S", text: "Bekerja sebagai relawan atau konselor untuk kesejahteraan masyarakat." },
        { id: 11, category: "E", text: "Memberikan presentasi persuasif untuk mempengaruhi audiens." },
        { id: 12, category: "C", text: "Memastikan kepatuhan terhadap prosedur dan detail dokumen." },
        { id: 13, category: "R", text: "Bekerja dengan hewan atau tanaman di lingkungan terbuka." },
        { id: 14, category: "I", text: "Mempelajari bahasa pemrograman atau algoritma matematika." },
        { id: 15, category: "A", text: "Mengubah ruangan yang biasa menjadi estetis dan menarik." },
        { id: 16, category: "S", text: "Membangun hubungan interpersonal yang harmonis dalam tim." },
        { id: 17, category: "E", text: "Mengambil tanggung jawab sebagai pemimpin dalam situasi krisis." },
        { id: 18, category: "C", text: "Menyusun anggaran keuangan dengan ketelitian tinggi." },
        { id: 19, category: "R", text: "Memperbaiki sirkuit elektronik atau sistem komputer." },
        { id: 20, category: "I", text: "Mengevaluasi teori ilmiah untuk menemukan solusi praktis." },
        { id: 21, category: "A", text: "Menciptakan konten digital yang orisinal dan inspiratif." },
        { id: 22, category: "S", text: "Menjelaskan informasi rumit agar mudah dipahami orang awam." },
        { id: 23, category: "E", text: "Mengorganisir acara besar atau kampanye pemasaran." },
        { id: 24, category: "C", text: "Memverifikasi akurasi data dalam laporan administratif." },
        { id: 25, category: "R", text: "Mengemudikan kendaraan berat atau peralatan transportasi." },
        { id: 26, category: "I", text: "Membaca jurnal ilmiah atau literatur teknis yang mendalam." },
        { id: 27, category: "A", text: "Melakukan improvisasi kreatif saat menghadapi masalah." },
        { id: 28, category: "S", text: "Mendengarkan keluhan orang lain dan memberikan dukungan moral." },
        { id: 29, category: "E", text: "Bersaing dalam lingkungan yang berorientasi pada target." },
        { id: 30, category: "C", text: "Mengelompokkan informasi ke dalam kategori yang logis." },
    ];

    const startTest = () => {
        setStep("quiz");
        setIsActive(true);
        setSeconds(0);
    };

    const handleAnswer = (value) => {
        const qId = questions[currentIndex].id;
        setAnswers(prev => ({ ...prev, [qId]: value }));
        
        if (currentIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 250);
        }
    };

    const calculateResult = () => {
        setIsActive(false);
        const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
        questions.forEach((q) => {
            if (answers[q.id]) scores[q.category] += parseInt(answers[q.id]);
        });
        const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a).slice(0, 3);
        setResults(sorted);
        setStep("result");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getInterpretation = (code) => {
        const info = {
            R: { label: "Realistic", icon: Wrench, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", desc: "Anda praktis, mekanis, dan menyukai aktivitas fisik serta bekerja dengan alat." },
            I: { label: "Investigative", icon: Search, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", desc: "Anda analitis, intelektual, dan senang memecahkan masalah melalui observasi." },
            A: { label: "Artistic", icon: Palette, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", desc: "Anda ekspresif, orisinal, dan independen. Lebih suka lingkungan kreatif." },
            S: { label: "Social", icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", desc: "Anda ramah, memiliki empati tinggi, dan senang membantu serta melayani orang lain." },
            E: { label: "Enterprising", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", desc: "Anda ambisius, persuasif, dan memiliki jiwa kepemimpinan yang kuat." },
            C: { label: "Conventional", icon: FileText, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100", desc: "Anda teliti, teratur, dan menyukai keteraturan data serta prosedur yang jelas." }
        };
        return info[code];
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <MainLayout user={auth.user}>
            <Head title="Tes Minat Bakat RIASEC" />
            
            <div className="relative min-h-screen bg-[#FDFDFD] overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-emerald-50/50 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-green-50/50 rounded-full blur-[120px]"></div>
                </div>

                <div className="flex-grow container mx-auto px-4 md:px-12 relative z-10 max-w-5xl py-12">
                    
                    {step === "intro" && (
                        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 mt-10 md:mt-20">
                            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-8 border border-emerald-100 shadow-sm">
                                <Compass className="w-4 h-4" /> Career Journey
                            </div>
                            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Temukan <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600">Potensi Sejati</span> <br className="hidden md:block"/> Karir Masa Depanmu.
                            </h1>
                            <p className="text-gray-500 max-w-2xl text-base md:text-xl leading-relaxed mb-12 px-4">
                                Analisis minat profesional Anda menggunakan standar Holland RIASEC untuk menentukan lingkungan kerja yang paling optimal bagi pertumbuhan Anda.
                            </p>
                            <button 
                                onClick={startTest}
                                className="group bg-gray-900 text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-emerald-600 transition-all duration-500 shadow-xl hover:shadow-emerald-900/20 flex items-center gap-4 active:scale-95"
                            >
                                Mulai Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}

                    {step === "quiz" && (
                        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-600 font-black tracking-widest uppercase">
                                        <Clock className="w-4 h-4 animate-pulse" /> {formatTime(seconds)}
                                    </div>
                                    <p className="text-lg md:text-xl font-bold text-gray-900">Pertanyaan {currentIndex + 1} <span className="text-gray-300 font-medium">/ {questions.length}</span></p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">{Math.round(progress)}%</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-2xl shadow-emerald-900/5 overflow-hidden flex flex-col min-h-[450px]">
                                <div className="h-2.5 w-full bg-gray-50 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
                                </div>
                                
                                <div className="p-8 md:p-16 flex flex-col justify-center flex-grow text-center">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed mb-16 px-4 italic">
                                        "{questions[currentIndex].text}"
                                    </h2>

                                    <div className="grid grid-cols-5 gap-3 md:gap-6 w-full max-w-xl mx-auto">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleAnswer(num)}
                                                className={`aspect-square rounded-2xl md:rounded-3xl border-2 font-black text-lg md:text-2xl transition-all duration-300 flex items-center justify-center ${
                                                    answers[questions[currentIndex].id] === num 
                                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-110" 
                                                    : "bg-white text-gray-300 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-10 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] px-2">
                                        <span>Sangat Tidak Suka</span>
                                        <span>Sangat Suka</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center px-4">
                                <button 
                                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                    disabled={currentIndex === 0}
                                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-emerald-600 transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Kembali
                                </button>
                                {currentIndex === questions.length - 1 && answers[questions[currentIndex].id] && (
                                    <button 
                                        onClick={calculateResult}
                                        className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-black shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
                                    >
                                        Selesaikan Tes
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {step === "result" && results && (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000 w-full max-w-5xl mx-auto pb-20">
                            <div className="text-center mb-16">
                                <div className="inline-flex p-3 bg-emerald-50 rounded-2xl mb-4 border border-emerald-100">
                                    <Trophy className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                                    Hasil <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Analisis Karir</span> Anda
                                </h2>
                                <div className="flex items-center justify-center gap-6 mt-6">
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                                        <Clock className="w-4 h-4 text-emerald-500" /> {formatTime(seconds)} Durasi
                                    </div>
                                    <div className="w-px h-4 bg-gray-200"></div>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Terverifikasi
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
                                {results.map(([type, score], idx) => {
                                    const info = getInterpretation(type);
                                    const Icon = info.icon;
                                    return (
                                        <div key={type} className={`group relative bg-white p-8 md:p-10 rounded-[3rem] border-2 ${info.border} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden`}>
                                            <div className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-black text-gray-300 text-sm">
                                                #{idx + 1}
                                            </div>
                                            <div className={`${info.bg} ${info.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-500`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight uppercase">{info.label}</h3>
                                                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">{info.desc}</p>
                                            </div>
                                            <div className="pt-6 border-t border-gray-50">
                                                <div className="flex items-end justify-between">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skor Akumulasi</span>
                                                    <span className={`text-3xl font-black ${info.color}`}>{score}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-50 rounded-full mt-3 overflow-hidden">
                                                    <div className={`h-full ${info.color.replace('text', 'bg')} transition-all duration-1000 delay-300`} style={{ width: `${(score/25)*100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-[3rem] p-10 md:p-16 text-center border border-emerald-100 shadow-xl shadow-emerald-900/5">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 mb-6 text-emerald-600 font-black uppercase text-xs tracking-[0.3em]">
                                        <TrendingUp className="w-5 h-5" /> Rekomendasi
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                                        Siap Melangkah Sesuai <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Passion Anda?</span>
                                    </h3>
                                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
                                        Gunakan hasil analisis ini sebagai panduan untuk memilih pekerjaan yang paling cocok dengan kepribadian dominan Anda.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                                        <button 
                                            onClick={() => router.get('/layanan/loker')}
                                            className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            Cari Pekerjaan Cocok <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => {setStep("intro"); setResults(null); setCurrentIndex(0); setAnswers({});}}
                                            className="bg-white text-emerald-700 border-2 border-emerald-100 px-10 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <RotateCcw className="w-4 h-4" /> Ulangi Tes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </MainLayout>
    );
};

export default TesMBTI;