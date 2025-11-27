import React, { useState } from 'react';

const Icons = {
    User: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
    ),
    Phone: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.408 5.408l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.502-1.21l2.257-1.13a11.042 11.042 0 00-5.408-5.408l-1.13 2.257a1 1 0 01-1.21.502l-4.493-1.498A1 1 0 015 5.28V5z"></path>
        </svg>
    ),
    Mail: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.263M21 8l-7.89 5.263M21 6H3v12h18V6z"></path>
        </svg>
    ),
    Briefcase: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13l-3-3m0 0l-3 3m3-3v10m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    ),
    GraduationCap: (props) => ( 
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5l-9-5l-9 5l9 5zm0 0v10M3 10l9 5l9-5M3 10v9M21 10v9"></path>
        </svg>
    )
};

const InputGroup = ({ id, label, type, placeholder, value, onChange, icon: Icon, isOptional = false }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            {Icon && <Icon className="w-5 h-5 mr-2 text-emerald-600"/>}
            {label}
            {!isOptional && <span className="text-red-500 ml-1 text-base">*</span>}
            {isOptional && <span className="text-gray-500 ml-2 font-normal text-sm">(Opsional)</span>}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={!isOptional}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-inner text-gray-800 
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out 
                       placeholder:text-gray-400"
        />
    </div>
);

const FormTinjauanCV = () => {
    const [namaLengkap, setNamaLengkap] = useState('');
    const [nomorTelp, setNomorTelp] = useState('');
    const [npm, setNPM] = useState('');
    const [email, setEmail] = useState('');
    const [posisi, setPosisi] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [validationError, setValidationError] = useState(''); 

    const onFormSubmit = (data) => {
        console.log("Data CV berhasil dikirim (Simulasi):", data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError(''); 

        if (!namaLengkap || !posisi || !nomorTelp || !email) {
            setValidationError("Harap lengkapi semua kolom wajib (*) sebelum melanjutkan.");
            return;
        }
        
        const newData = {
            id: Date.now(),
            namaLengkap,
            nomorTelp,
            npm,
            email,
            posisi,
            keterangan: keterangan || `Tinjauan untuk ${namaLengkap} - Posisi: ${posisi}.`,
            status: 'Diproses',
            hasil: 'Menunggu',
        };

        onFormSubmit(newData);
        alert("Formulir berhasil disimulasikan!"); 
        
        setNamaLengkap('');
        setNomorTelp('');
        setNPM('');
        setEmail('');
        setPosisi('');
        setKeterangan('');
    };

    return (
        <div className="min-h-screen flex items-start justify-center p-4 sm:p-8">
            <div className="w-full max-w-6xl mt-12 mb-12 bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-14 border border-gray-100">
                
                {/* Header Formulir */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold font-sans text-emerald-700 mb-3 tracking-tight">
                        Formulir Tinjauan CV
                    </h2>
                    <p className="text-lg text-gray-500">
                        Lengkapi data di bawah untuk memulai proses peninjauan CV Anda.
                    </p>
                    <div className="h-1 w-24 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
                </div>
                
                <hr className="my-8 border-t border-gray-200"/>

                <form onSubmit={handleSubmit}>

                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Icons.User className="w-6 h-6 mr-3 text-emerald-600"/>
                        Data Pribadi
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        {/* Nama Lengkap */}
                        <InputGroup 
                            id="namaLengkap" 
                            label="Nama Lengkap" 
                            type="text"
                            placeholder="Masukkan nama lengkap Anda"
                            value={namaLengkap}
                            onChange={(e) => setNamaLengkap(e.target.value)}
                            icon={Icons.User}
                        />

                        {/* E-mail */}
                        <InputGroup 
                            id="email" 
                            label="E-mail" 
                            type="email"
                            placeholder="alamat@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Icons.Mail}
                        />

                        {/* Nomor Telepon */}
                        <InputGroup 
                            id="nomorTelp" 
                            label="Nomor Telepon" 
                            type="tel"
                            placeholder="Contoh: 0812xxxxxx"
                            value={nomorTelp}
                            onChange={(e) => setNomorTelp(e.target.value)}
                            icon={Icons.Phone}
                        />

                        {/* NPM */}
                        <InputGroup 
                            id="npm" 
                            label="NPM" 
                            type="text"
                            placeholder="Jika berlaku"
                            value={npm}
                            onChange={(e) => setNPM(e.target.value)}
                            icon={Icons.GraduationCap}
                            
                        />
                    </div>
                    
                    <hr className="my-8 border-t border-gray-200"/>

                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Icons.Briefcase className="w-6 h-6 mr-3 text-emerald-600"/>
                        Detail Tinjauan
                    </h3>

                    {/* Posisi Target Pekerjaan */}
                    <InputGroup 
                        id="posisi" 
                        label="Posisi/Target Pekerjaan" 
                        type="text"
                        placeholder="Contoh: Senior Frontend Developer"
                        value={posisi}
                        onChange={(e) => setPosisi(e.target.value)}
                        icon={Icons.Briefcase}
                    />

                    {/* Keterangan */}
                    <div className="mb-10">
                        <label htmlFor="keterangan" className="block text-sm font-semibold text-gray-700 mb-2">
                            Keterangan <span className="text-gray-500 ml-2 font-normal text-sm">(Opsional)</span>
                        </label>
                        <textarea
                            id="keterangan"
                            rows="4"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            placeholder="Tuliskan catatan khusus atau fokus yang Anda inginkan dari tinjauan ini. (Maksimal 500 karakter)"
                            maxLength={500}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-inner text-gray-800 resize-none 
                                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out
                                       placeholder:text-gray-400"
                        ></textarea>
                    </div>

                    {/* Pesan Error Validasi */}
                    {validationError && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
                            <p className="font-bold">Kesalahan!</p>
                            <p className="text-sm">{validationError}</p>
                        </div>
                    )}

                    {/* Button Simpan/Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 px-4 rounded-xl shadow-lg text-xl font-extrabold text-white 
                                   bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-offset-2 
                                   focus:ring-emerald-500/70 transition duration-300 transform hover:scale-[1.005] active:scale-[0.99]"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormTinjauanCV;