import React from 'react';
import { Link } from '@inertiajs/react';

const IMAGE_PATH = '/images/berita.jpeg';

const NewsCard = ({ title, imageSrc, link }) => {
    return (
        <Link
            href={link} // Inertia akan mengurus navigasi
            className="block relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white group cursor-pointer"
        >
            <div className="relative w-full pb-[42.85%]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${imageSrc || IMAGE_PATH})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white text-shadow">
                        {/* Judul Berita */}
                        <p className="text-lg font-semibold leading-snug">
                            {title}
                        </p>
                        <span className="mt-1 inline-block text-sm text-yellow-300 transition duration-300 opacity-0 group-hover:opacity-100">
                            Baca Selengkapnya
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
