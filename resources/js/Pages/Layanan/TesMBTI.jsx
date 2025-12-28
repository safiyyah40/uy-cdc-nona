import React, { useState, useEffect, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Footer from "@/Components/Footer";
import { Head, router } from "@inertiajs/react";
import axios from 'axios';
import html2canvas from "html2canvas";
import {
    ArrowRight, ArrowLeft, RotateCcw, Home,
    Clock, Compass, Trophy, Download, CheckCircle2,
    TrendingUp, Zap, Target, Loader2,
    Wrench, Search, Palette, HeartHandshake, Briefcase, FileText, HelpCircle
} from "lucide-react";

const RIASEC_STYLES = {
    R: {
        icon: Wrench,
        color: {
            text: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            badge: 'bg-orange-100 text-orange-700'
        }
    },
    I: {
        icon: Search,
        color: {
            text: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            badge: 'bg-blue-100 text-blue-700'
        }
    },
    A: {
        icon: Palette,
        color: {
            text: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            badge: 'bg-purple-100 text-purple-700'
        }
    },
    S: {
        icon: HeartHandshake,
        color: {
            text: 'text-rose-600',
            bg: 'bg-rose-50',
            border: 'border-rose-200',
            badge: 'bg-rose-100 text-rose-700'
        }
    },
    E: {
        icon: Briefcase,
        color: {
            text: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            badge: 'bg-emerald-100 text-emerald-700'
        }
    },
    C: {
        icon: FileText,
        color: {
            text: 'text-slate-600',
            bg: 'bg-slate-50',
            border: 'border-slate-200',
            badge: 'bg-slate-100 text-slate-700'
        }
    }
};

const TesMBTI = ({ auth }) => {
    // State Management
    const [step, setStep] = useState("intro"); // intro, quiz, result
    const [loading, setLoading] = useState(false);

    // Data Soal & Jawaban
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    // Data Hasil
    const [resultData, setResultData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Timer & Refs
    const [timeLeft, setTimeLeft] = useState(600); // 10 menit default
    const [isActive, setIsActive] = useState(false);
    const timeoutRef = useRef(null);
    const resultRef = useRef(null);

    // FETCH SOAL
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(route('riasec.questions'));
                setQuestions(response.data.questions);
            } catch (error) {
                console.error("Gagal memuat soal:", error);
            }
        };
        fetchQuestions();
    }, []);

    // TIMER LOGIC
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && step === 'quiz') {
            clearInterval(interval);
            submitTest(); // Auto submit
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, step]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // NAVIGASI QUIZ
    const startTest = () => {
        if (questions.length === 0) {
            alert("Sedang memuat soal, mohon tunggu sebentar...");
            return;
        }
        setStep("quiz");
        setIsActive(true);
        setTimeLeft(600);
        setCurrentIndex(0);
        setAnswers({});
    };

    const handleAnswer = (value) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const qId = questions[currentIndex].id;
        setAnswers(prev => ({ ...prev, [qId]: value }));

        if (currentIndex < questions.length - 1) {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
            }, 250);
        }
    };

    const handlePrev = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    // SUBMIT
    const submitTest = async () => {
        setIsActive(false);
        setLoading(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        try {
            const payload = {
                answers: answers,
                time_taken: 600 - timeLeft
            };
            const response = await axios.post(route('riasec.submit'), payload);

            if (response.data.success) {
                setResultData(response.data.result);
                setStep("result");
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menyimpan jawaban.");
            setIsActive(true);
        } finally {
            setLoading(false);
        }
    };

    // DOWNLOAD
    const handleDownloadImage = async () => {
        if (!resultRef.current) return;
        setIsDownloading(true);
        try {
            const canvas = await html2canvas(resultRef.current, {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `${auth.user.name} - Hasil RIASEC.png`;
            link.click();
        } catch (error) {
            console.error("Gagal download:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
    const currentQuestion = questions[currentIndex];
    const isAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;

    return (
        <MainLayout user={auth.user}>
            <Head title="Tes Minat Karir RIASEC" />

            <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">

                    {/* INTRO */}
                    {step === "intro" && (
                        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 mt-10 md:mt-20">
                            <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-8 border border-emerald-100 shadow-sm">
                                <Compass className="w-4 h-4" /> Career Journey
                            </div>
                            <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8">
                                Temukan <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600">Potensi Sejati</span> <br className="hidden md:block" /> Karir Masa Depanmu.
                            </h1>
                            <p className="text-gray-500 max-w-2xl text-base md:text-xl leading-relaxed mb-12 px-4">
                                Analisis minat profesional Anda menggunakan standar Holland RIASEC.
                            </p>

                            {questions.length === 0 ? (
                                <div className="flex items-center gap-2 text-gray-500 mt-8">
                                    <Loader2 className="w-5 h-5 animate-spin" /> Memuat Soal...
                                </div>
                            ) : (
                                <button
                                    onClick={startTest}
                                    className="group bg-gray-900 text-white px-10 md:px-14 py-4 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-emerald-600 transition-all duration-500 shadow-xl hover:shadow-emerald-900/20 flex items-center gap-4 active:scale-95 mt-8"
                                >
                                    Mulai Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* QUIZ */}
                    {step === "quiz" && currentQuestion && (
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-600 font-black tracking-widest uppercase">
                                        <Clock className="w-4 h-4 animate-pulse" /> {formatTime(timeLeft)}
                                    </div>
                                    <p className="text-lg md:text-xl font-bold text-gray-900">Pertanyaan {currentIndex + 1} <span className="text-gray-300 font-medium">/ {questions.length}</span></p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">{Math.round(progress)}%</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[400px] flex flex-col relative">
                                <div className="h-2 bg-gray-100 w-full">
                                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                </div>

                                <div className="p-8 md:p-12 flex flex-col justify-center flex-grow text-center">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12 leading-snug">
                                        "{currentQuestion.text}"
                                    </h2>
                                    <div className="grid grid-cols-5 gap-3 md:gap-6 w-full max-w-xl mx-auto">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                onClick={() => handleAnswer(num)}
                                                className={`aspect-square rounded-2xl md:rounded-3xl border-2 font-black text-lg md:text-2xl transition-all duration-300 flex items-center justify-center ${answers[currentQuestion.id] === num
                                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-110"
                                                    : "bg-white text-gray-300 border-gray-100 hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-10 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] px-2">
                                        <span>Sangat Tidak Setuju</span>
                                        <span>Sangat Setuju</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-colors ${currentIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-100"}`}
                                >
                                    <ArrowLeft className="w-4 h-4" /> Sebelumnya
                                </button>

                                {currentIndex === questions.length - 1 && isAnswered && (
                                    <button
                                        onClick={submitTest}
                                        disabled={loading}
                                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Selesaikan Tes"}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* RESULT */}
                    {step === "result" && resultData && (
                        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="text-center mb-8 pt-10">
                                <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
                                    <Trophy className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">
                                    Hasil <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Analisis Karir</span> Anda
                                </h2>
                                <p className="text-gray-500">Berdasarkan metode Holland Code (RIASEC)</p>
                            </div>

                            <div ref={resultRef} className="bg-white p-8 rounded-[2.5rem] shadow-none border border-white">
                                <div className="text-center mb-8 border-b-2 border-gray-100 pb-6">
                                    <h3 className="text-xl font-bold text-gray-800">Laporan Hasil Tes RIASEC</h3>
                                    <p className="text-emerald-600 font-bold text-lg">{auth.user?.name}</p>
                                    <p className="text-gray-400 text-sm">{auth.user?.study_program || 'Mahasiswa'} - {new Date().toLocaleDateString('id-ID')}</p>
                                </div>

                                <div className="bg-slate-900 text-white p-6 rounded-2xl mb-10 flex flex-wrap justify-center gap-6">
                                    {resultData.scores.map(({ code, score }) => (
                                        <div key={code} className="text-center">
                                            <div className="text-xs font-bold text-slate-400 mb-1">{code}</div>
                                            <div className="text-2xl font-black text-white">{score}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-8">
                                    {resultData.top_three.map((item, index) => {
                                        const interpretation = item.interpretation;
                                        const style = RIASEC_STYLES[item.code] || RIASEC_STYLES.R;
                                        const Icon = style.icon;
                                        const colors = style.color;

                                        return (
                                            <div key={item.code} className={`rounded-[2rem] border-2 ${colors.border} overflow-hidden bg-white`}>
                                                <div className={`${colors.bg} p-8 border-b ${colors.border}`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-16 h-16 ${colors.bg} rounded-2xl border-2 ${colors.border} flex items-center justify-center`}>
                                                                <Icon className={`w-8 h-8 ${colors.text}`} />
                                                            </div>
                                                            <div>
                                                                <div className={`text-sm font-bold ${colors.text} uppercase tracking-wider mb-1`}>
                                                                    Dominan #{index + 1}
                                                                </div>
                                                                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                                                                    {interpretation ? interpretation.nickname : "Tipe " + item.code}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className={`text-4xl font-black ${colors.text} opacity-20`}>
                                                            {item.code}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8">
                                                    <div className="mb-6">
                                                        <p className="text-gray-700 leading-relaxed font-medium">
                                                            {interpretation ? interpretation.description : "Deskripsi tidak tersedia."}
                                                        </p>
                                                    </div>
                                                    {interpretation && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            {/* KOLOM KARAKTERISTIK */}
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                                    <Zap className="w-4 h-4 text-yellow-500" /> Karakteristik
                                                                </h4>
                                                                <ul className="space-y-2">
                                                                    {interpretation.traits && interpretation.traits.map((trait, i) => (
                                                                        <li key={i} className="flex gap-2 text-sm text-gray-600">
                                                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.bg.replace('bg-', 'bg-slate-400 ').split(' ')[0]} flex-shrink-0`}></div>
                                                                            <span>{trait}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* KOLOM BRANDING */}
                                                            <div>
                                                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                                    <Target className="w-4 h-4 text-emerald-500" /> Branding Strategy
                                                                </h4>
                                                                <ul className="space-y-2">
                                                                    {interpretation.branding && interpretation.branding.map((brand, i) => (
                                                                        <li key={i} className="flex gap-2 text-sm text-gray-600">
                                                                            <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                                                                            <span>{brand}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* KOLOM REKOMENDASI KARIR */}
                                                            <div className="md:col-span-2 border-t border-dashed border-gray-200 pt-6 mt-2">
                                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                                    <TrendingUp className="w-4 h-4 text-blue-500" /> Rekomendasi Karir & Profesi
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {interpretation.careers && interpretation.careers.map((career, i) => (
                                                                        <span
                                                                            key={i}
                                                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 ${colors.bg} ${colors.text} ${colors.border}`}
                                                                        >
                                                                            <Briefcase className="w-3 h-3" />
                                                                            {career}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 text-center text-xs text-gray-400">
                                    Dicetak dari Career Development Center - Universitas YARSI
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center print:hidden">
                                <button
                                    onClick={handleDownloadImage}
                                    disabled={isDownloading}
                                    className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-95 w-full md:w-auto"
                                >
                                    {isDownloading ? "Memproses..." : <><Download className="w-5 h-5" /> Simpan Hasil (PNG)</>}
                                </button>
                            </div>

                            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-[3rem] p-10 md:p-20 text-center border border-emerald-100 shadow-2xl shadow-emerald-900/10 mt-20">
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 mb-8 text-emerald-600 font-black uppercase text-xs tracking-[0.3em]">
                                        <TrendingUp className="w-5 h-5" /> Langkah Selanjutnya
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                        Siap Melangkah Sesuai <br className="hidden md:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">Passion Anda?</span>
                                    </h3>
                                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                                        <button
                                            onClick={() => router.get(route('loker.index'))}
                                            className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-95 w-full md:w-auto"
                                        >
                                            Cari Pekerjaan Cocok <ArrowRight className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setStep("intro");
                                                setResultData(null);
                                            }}
                                            className="bg-white text-emerald-700 border-2 border-emerald-100 px-10 py-5 rounded-2xl font-bold hover:bg-emerald-50 hover:border-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 w-full md:w-auto shadow-sm"
                                        >
                                            <RotateCcw className="w-5 h-5" /> Ulangi Tes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-8 mb-20">
                                <button onClick={() => router.get('/layanan/tes-minat-bakat')} className="text-sm font-bold text-gray-400 hover:text-emerald-600 flex items-center justify-center gap-2 w-full">
                                    <Home className="w-4 h-4" /> Kembali ke Beranda
                                </button>
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