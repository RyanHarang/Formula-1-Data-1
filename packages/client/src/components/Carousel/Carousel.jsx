import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import RaceCard from "../Races/RaceCard";

const Carousel = ({
  ids,
  titles,
  dates,
  tracks,
  winners,
  fastestLaps,
  polePositions,
  onRaceClick,
  onAddFavorite,
  onRemoveFavorite,
  favorites,
  interval = 2500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const nextIndex = (lastIndex) => {
    return (lastIndex + 1) % itemCount;
  };
  const prevIndex = (lastIndex) => {
    return (lastIndex - 1 + itemCount) % itemCount;
  };

  const itemCount = titles.length;
  ~useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(nextIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval, isPaused]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {titles.map((title, index) => (
            <div key={title} className="min-w-full flex-shrink-0">
              <div className="bg-lightgray p-4 dark:bg-gray-800 dark:text-white">
                <RaceCard
                  id={ids[index]}
                  title={title}
                  date={dates[index]}
                  track={tracks[index]}
                  winner={winners[index]}
                  fastestLap={fastestLaps[index]}
                  polePosition={polePositions[index]}
                  onRaceClick={() => onRaceClick}
                  favorite={favorites.includes(ids[index])}
                  onAddFavorite={onAddFavorite}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 transform bg-gray-800 p-2 text-white hover:bg-gray-700"
        onClick={() => setCurrentIndex(prevIndex)}
      >
        <FaArrowLeft />
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 transform bg-gray-800 p-2 text-white hover:bg-gray-700"
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
