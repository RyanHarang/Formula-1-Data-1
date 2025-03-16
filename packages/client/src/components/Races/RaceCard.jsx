import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const RaceCard = ({ id, title, date, track, winner, fastestLap, polePosition, race, onRaceClick, onAddFavorite, onRemoveFavorite }) => {

    const RacerId2Name = async (racerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/data/driver-single?id=${racerId}`);
            if (!response.ok) throw new Error(`Failed to fetch driver: ${response.status}`);
            const driver = await response.json();
            return driver?.name || "Unknown";
        } catch (error) {
            console.error(error);
            return "Unknown";
        }
    };

    const [winnerName, setWinnerName] = useState("Loading...");
    const [polePositionName, setPolePositionName] = useState("Loading...");
    const [currentDate, setCurrentDate] = useState("Loading...");
    const [currentTrack, setCurrentTrack] = useState("Loading...");
    const [currentFastestLap, setCurrentFastestLap] = useState("Loading...");
    const [currentTitle, setCurrentTitle] = useState("Loading...");
    const [currentId, setCurrentId] = useState(id);

    React.useEffect(() => {
        const fetchNames = async () => {
            if (race) {
                id = race.id;
                title = race.title;
                date = race.date;
                track = race.track;
                winner = race.winner;
                fastestLap = race.fastestLap;
                polePosition = race.polePosition;
            }
            setCurrentTitle(title);
            setCurrentDate(date);
            setCurrentTrack(track);
            setCurrentFastestLap(fastestLap);
            setCurrentId(id);
            try {
                const winnerFetched = await RacerId2Name(winner);
                const polePositionFetched = await RacerId2Name(polePosition);
                setWinnerName(winnerFetched);
                setPolePositionName(polePositionFetched);
            } catch (error) {
                console.error(error);
                setWinnerName("Unknown");
                setPolePositionName("Unknown");
            }
        };
        fetchNames();
    }, [winner, polePosition]);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [added, setAdded] = useState(false);

    const handleAddFavorite = (e) => {
        e.stopPropagation();
        if (onAddFavorite) {
            onAddFavorite("races", id);
            setAdded(true);
        }
    };

    React.useEffect(() => {
        setAdded(false);
    }, [currentId]);

    const handleRemoveFavorite = (e) => {
        e.stopPropagation();
        if (onRemoveFavorite) {
            onRemoveFavorite("races", currentId);
            setAdded(false);
        }
    };

    return (
        <div onClick={() => onRaceClick(currentId)} className='dark:border-accent hover:border-accent dark:bg-dark-bg2 flex cursor-pointer flex-col rounded-lg border-2 border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105' style={{ padding: '30px' }}>
            <div>
                {isAuthenticated && (
                    <div className='relative h-full w-full overflow-hidden rounded-t-md'>
                        {!added && onAddFavorite && (
                            <button
                                onClick={handleAddFavorite}
                                className="bg-accent hover:bg-accent/80 top-2 right-2 cursor-pointer rounded-md px-2 py-1 text-white disabled:cursor-not-allowed"
                            >
                                Add Favorite
                            </button>
                        )}
                        {added && onRemoveFavorite && (
                            <button
                                onClick={handleRemoveFavorite}
                                className="absolute top-2 right-2 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-500/80"
                            >
                                Remove Favorite
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div key={id} className="mb-2 flex flex-col gap-2" style={{ paddingBottom: '30px' }}>
                <h2 className="text-left text-xl font-semibold">{currentTitle || "Unknown"}</h2>
                <p className='text-left'>Date : {currentDate || "Unknown"}</p>
                <p className='text-left'>Track : {currentTrack || "Unknown"}</p>
                <p className='text-left'>Winner : {winnerName || "Unknown"}</p>
                <p className='text-left'>Fastest Lap : {currentFastestLap || "Unknown"}</p>
                <p className='text-left'>Pole Position : {polePositionName || "Unknown"}</p>
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