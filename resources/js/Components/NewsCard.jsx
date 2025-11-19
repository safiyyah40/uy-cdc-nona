import React from 'react';

const IMAGE_PATH = '/images/berita.jpeg';

const NewsCard = ({ title, imageSrc }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white group cursor-pointer">
            <div className="relative w-full pb-[42.85%]">
                {

                }
                <div

                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${imageSrc || IMAGE_PATH})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white text-shadow">
                        {

                        }
                        <p className="text-lg font-semibold leading-snug">
                            {title}
                        </p>
                        {
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
