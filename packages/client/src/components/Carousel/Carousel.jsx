import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import RaceCard from '../Races/RaceCard';

const Carousel = ({ ids, titles, dates, tracks, winners, fastestLaps, polePositions, onRaceClick, onAddFavorite, onRemoveFavorite, interval = 2500 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const nextIndex = (lastIndex) => {
        // console.log(`itemCount = ${itemCount}, currentIndex = ${lastIndex}`);
        return (lastIndex + 1) % (itemCount);
    }
    const prevIndex = (lastIndex) => {
        // console.log(`itemCount = ${itemCount}, currentIndex = ${lastIndex}`);
        return (lastIndex - 1 + itemCount) % (itemCount);
    }

    const itemCount = titles.length;~

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex(nextIndex);
        }, interval);

        return () => clearInterval(timer);
    }, [itemCount, interval, isPaused]);

    return (
        <div className="relative w-full h-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {titles.map((title, index) => (
                        <div key={title} className="min-w-full flex-shrink-0">
                            <div className="p-4 bg-lightgray dark:bg-gray-800 dark:text-white">
                                <RaceCard 
                                id={ids[index]}
                                title={title} 
                                date={dates[index]} 
                                track={tracks[index]} 
                                winner={winners[index]} 
                                fastestLap={fastestLaps[index]} 
                                polePosition={polePositions[index]}
                                onRaceClick={() => onRaceClick}
                                onAddFavorite={onAddFavorite}
                                onRemoveFavorite={onRemoveFavorite} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 hover:bg-gray-700"
                onClick={() => setCurrentIndex(prevIndex)}
            >
                <FaArrowLeft />
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 hover:bg-gray-700"
                onClick={() => setCurrentIndex(nextIndex)}
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
