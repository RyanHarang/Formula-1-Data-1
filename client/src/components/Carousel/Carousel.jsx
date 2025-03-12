import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Carousel = ({ titles, dates, tracks, winners, fastestLaps, polePositions, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const handleMouseClick = () => {
      openModal(currentIndex);  
    };

    const itemCount = titles.length;

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
        }, interval);

        return () => clearInterval(timer);
    }, [itemCount, interval, isPaused]);

    return (
        <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseClick}>
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {titles.map((title, index) => (
                        <div key={title} className="min-w-full flex-shrink-0">
                            <div className="p-4 bg-gray-800 text-white">
                                <h5 className="text-xl font-bold">{title}</h5>
                                <p>{dates[index]}</p>
                                <p>{tracks[index]}</p>
                                <p>{winners[index]}</p>
                                <p>{fastestLaps[index]}</p>
                                <p>{polePositions[index]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount)}
            >
                <FaArrowLeft />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
                onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount)}
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

Carousel.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    dates: PropTypes.arrayOf(PropTypes.string).isRequired,
    tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    winners: PropTypes.arrayOf(PropTypes.string).isRequired,
    fastestLaps: PropTypes.arrayOf(PropTypes.string).isRequired,
    polePositions: PropTypes.arrayOf(PropTypes.string).isRequired,
    interval: PropTypes.number,
};

export default Carousel;
