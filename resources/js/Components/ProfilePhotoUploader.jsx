import { useState, useRef } from "react";

export default function ProfilePhotoUploader({
    initialName = "",
    existingPhoto = null,
    onPhotoSelect,
}) {
    const [preview, setPreview] = useState(existingPhoto);
    const fileInputRef = useRef();

    // ketika file diganti
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        onPhotoSelect(file);
    };

    return (
        <div className="flex flex-col items-center mt-2 mb-6">

            {/* Pembungkus Foto */}
            <div className="relative w-28 h-28">

                {/* FOTO / PRATINJAU / INISIAL */}
                {preview ? (
                    <img
                        src={preview} className="w-full h-full object-cover rounded-full border" alt="Pratinjau Profil"
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                        {initialName}
                    </div>
                )}

                <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                    {/* ICON Pensil */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yarsi-green">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34c.38-.38.38-1.02 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                </button>

            </div>

            {/* Input File Hidden */}
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleChange}/>
        </div>
    );
}
