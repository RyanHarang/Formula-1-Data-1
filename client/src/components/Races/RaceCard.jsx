import React from 'react';
import PropTypes from 'prop-types';

const RaceCard = ({ title, date, track, winner, fastestLap, polePosition, onRaceClick }) => {
    return (
        <div
            onClick={onRaceClick}
            className="dark:border-accent hover:border-accent dark:bg-dark-bg2 flex cursor-pointer flex-col rounded-lg border-2 border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
        >
            <div className="flex flex-col h-100 p-4">
                <div key={title} className="mb-2 flex flex-col gap-2">
                    <h2 className="text-left text-xl font-semibold">{title}</h2>
                    <p className='text-left'>Date : {date}</p>
                    <p className='text-left'>Track : {track}</p>
                    <p className='text-left'>Winner : {winner}</p>
                    <p className='text-left'>Fastest Lap : {fastestLap}</p>
                    <p className='text-left'>Pole Position : {polePosition}</p>
                </div>
            </div>
        </div>
    );
};

RaceCard.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,
    dates: PropTypes.arrayOf(PropTypes.string).isRequired,
    tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    winners: PropTypes.arrayOf(PropTypes.string).isRequired,
    fastestLaps: PropTypes.arrayOf(PropTypes.string).isRequired,
    polePositions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRaceClick: PropTypes.func.isRequired,
};

export default RaceCard;