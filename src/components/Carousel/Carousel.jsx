import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images, dates, names, locations, distances, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageCount = images.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
        }, interval);

        return () => clearInterval(timer);
    }, [imageCount, interval]);

    return (
        <div className="carousel relative w-full h-full flex overflow-hidden">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel-image w-full h-full object-cover flex" />
            <div className="self-stretch h-[725px] flex-col justify-start items-center gap-[46px] inline-flex">
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 bg-black p-4">
                    <div className="h-[108px] justify-start items-start inline-flex">
                        <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                            <div className="px-3 py-1.5 bg-[#1a1b25] rounded-[100px] justify-center items-center gap-2.5 inline-flex">
                                <div className="text-white text-sm font-normal font-['Manrope']">
                                    {dates[currentIndex]}
                                </div>
                            </div>
                            <div className="self-stretch text-white text-[32px] font-bold font-['Manrope']">
                                {names[currentIndex]}
                            </div>
                            <div className="self-stretch text-gray-300 text-lg font-normal font-['Manrope']">
                                {locations[currentIndex]}
                            </div>
                        </div>
                        <div className="text-white text-2xl font-bold font-['Manrope']">
                            {distances[currentIndex]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    dates: PropTypes.arrayOf(PropTypes.string).isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    distances: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.number,
};

export default Carousel;
