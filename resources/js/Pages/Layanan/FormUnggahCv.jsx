import React, { useState } from 'react';
import { router } from '@inertiajs/react';

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
    Upload: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
    ),
    Document: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
    ),
    Trash: (props) => (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
    ),
    Info: (props) => (
        <svg {...props} fillRule="evenodd" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    ),
    Done: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
    )
};

const CustomSuccessModal = ({ isOpen, onClose, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all duration-300 scale-100">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
                        <Icons.Done className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="mt-4 text-lg leading-6 font-semibold text-gray-900">Pengunggahan Berhasil!</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Terima kasih, CV Anda telah berhasil diunggah dan disimpan.
                        </p>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-lg border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 sm:text-sm"
                        onClick={onNavigate}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputGroupWithIcon = ({ id, label, type, placeholder, value, onChange, isOptional = false, className = "" }) => (
    <div className={`mb-6 ${className}`}>
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            {label}
            {!isOptional && <span className="text-red-500 ml-1 text-base">*</span>}
            {isOptional && <span className="text-gray-500 ml-2 font-normal text-sm">(Opsional)</span>}
        </label>
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={!isOptional}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800
                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out
                             placeholder:text-gray-400 h-12"
            />
        </div>
    </div>
);

const FileUploadInput = ({ fileCV, handleFileChange, handleRemoveFile, validationError }) => (
    <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            Unggah CV <span className="text-red-500 ml-1 text-base">*</span>
        </label>

        {fileCV ? (
            <div className="flex flex-col sm:flex-row justify-between items-center bg-emerald-50 p-3 rounded-lg shadow-inner border border-emerald-300 min-h-12">
                <div className="flex items-center flex-1 min-w-0 mb-2 sm:mb-0">
                    <Icons.Document className="w-5 h-5 mr-3 text-emerald-700 flex-shrink-0"/>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate" title={fileCV.name}>{fileCV.name}</p>
                        <span className="text-xs text-emerald-600 font-medium hidden sm:inline">
                             (${(fileCV.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="w-full sm:w-auto px-3 py-1 text-sm text-red-600 hover:text-white bg-red-100 hover:bg-red-500 rounded-lg transition font-semibold flex items-center justify-center shadow-sm"
                    title="Hapus File"
                >
                    <Icons.Trash className="w-4 h-4 mr-1"/> Hapus
                </button>
            </div>
        ) : (
            <div className="w-full h-12">
                <input
                    type="file"
                    id="fileCV"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                />
                <label
                    htmlFor="fileCV"
                    className={`cursor-pointer w-full h-full inline-flex items-center justify-center text-gray-500 font-medium text-base
                             px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50
                             hover:border-emerald-500 hover:text-emerald-600 transition duration-200 ease-in-out`}
                >
                    <Icons.Upload className="w-5 h-5 mr-2"/>
                    Pilih File CV (.pdf, .doc, .docx) - Maks. 10 MB
                </label>
            </div>
        )}

        <p className="mt-1 text-xs text-gray-500">
            Unggah CV dalam format .pdf, .doc, atau .docx. Ukuran file maksimal 10 MB.
        </p>

        {validationError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg flex items-start shadow-sm" role="alert">
                <Icons.Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"/>
                <p className="text-sm font-medium">{validationError}</p>
            </div>
        )}
    </div>
);


const FormUnggahCv = ({ onFormSubmit }) => {
    const [namaLengkap, setNamaLengkap] = useState('');
    const [nomorTelp, setNomorTelp] = useState('');
    const [npm, setNPM] = useState('');
    const [email, setEmail] = useState('');
    const [posisi, setPosisi] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [fileCV, setFileCV] = useState(null);
    const [fileError, setFileError] = useState('');
    const [formError, setFormError] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileError('');
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024;

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                setFileError('Tipe file tidak didukung. Mohon unggah PDF atau DOC/DOCX.');
                setFileCV(null);
                return;
            }
            if (file.size > maxSize) {
                setFileError('Ukuran file melebihi batas 10MB.');
                setFileCV(null);
                return;
            }
            setFileCV(file);
        } else {
            setFileCV(null);
        }
    };

    const handleRemoveFile = () => {
        setFileCV(null);
        setFileError('');
        const fileInput = document.getElementById('fileCV');
        if (fileInput) fileInput.value = null;
    };

    const handleModalCloseAndNavigate = () => {
        setIsModalOpen(false);
        router.visit(route('layanan.tabel.cv.review')); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        if (!namaLengkap || !posisi || !nomorTelp || !email || !npm || !fileCV) {
            setFormError("Harap lengkapi semua kolom wajib (*) dan unggah file CV.");
            return;
        }

        if (fileError) {
             setFormError("Terdapat masalah pada file CV. Harap periksa kembali.");
            return;
        }

        const dataSubmission = {
            media: fileCV.name,
            namaLengkap,
            nomorTelp,
            npm,
            email,
            posisi,
            keterangan: keterangan || '-',
            submissionDate: new Date().toISOString(),
        };

        localStorage.setItem('cvSubmissionData', JSON.stringify(dataSubmission));

        if (onFormSubmit) onFormSubmit(dataSubmission);

        setIsModalOpen(true);
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 sm:p-8"
            style={{
                backgroundImage: 'url("/images/bg-dreamina.jpg")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 lg:p-12 border border-gray-200">

                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Formulir Unggah CV</h2>

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        <InputGroupWithIcon
                            id="namaLengkap" label="Nama Lengkap" type="text" placeholder="Nama Lengkap Anda"
                            value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)}
                        />
                        <InputGroupWithIcon
                            id="nomorTelp" label="Nomor Telepon" type="tel" placeholder="Contoh: 081234567890"
                            value={nomorTelp} onChange={(e) => setNomorTelp(e.target.value)}
                        />
                        <InputGroupWithIcon
                            id="npm" label="NPM" type="text" placeholder="Nomor Pokok Mahasiswa"
                            value={npm} onChange={(e) => setNPM(e.target.value)}
                        />
                        <InputGroupWithIcon
                            id="email" label="E-mail" type="email" placeholder="Alamat E-mail Aktif"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <InputGroupWithIcon
                        id="posisi" label="Posisi / Target Pekerjaan" type="text"
                        placeholder="Contoh: Quality Assurance Engineer"
                        value={posisi} onChange={(e) => setPosisi(e.target.value)} className="w-full"
                    />

                    <FileUploadInput
                        fileCV={fileCV} handleFileChange={handleFileChange}
                        handleRemoveFile={handleRemoveFile} validationError={fileError}
                    />

                    <div className="mb-8">
                        <label htmlFor="keterangan" className="block text-sm font-semibold text-gray-700 mb-2">
                            Keterangan <span className="text-gray-500 ml-2 font-normal text-sm">(Opsional)</span>
                        </label>
                        <textarea
                            id="keterangan" rows="4" value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            placeholder="Tambahkan keterangan atau fokus khusus untuk peninjauan (opsional). Maks. 500 karakter."
                            maxLength={500}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-800 resize-none
                                             focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-in-out
                                             placeholder:text-gray-400"
                        ></textarea>
                    </div>

                    {formError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg flex items-start shadow-md" role="alert">
                            <Icons.Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"/>
                            <p className="text-sm font-medium">{formError}</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto py-3 px-12 rounded-lg shadow-xl text-lg font-bold text-white
                                     bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-offset-2
                                     focus:ring-emerald-500/70 transition duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>

            <CustomSuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
                onNavigate={handleModalCloseAndNavigate} 
            />
        </div>
    );
};

export default FormUnggahCv;