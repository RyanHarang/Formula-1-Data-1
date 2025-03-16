import { useState } from "react";
import { useSelector } from "react-redux";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const DriverCard = ({
  driver,
  favorite,
  onDriverClick,
  onAddFavorite,
  onRemoveFavorite,
}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [added, setAdded] = useState(favorite);

  const handleAddFavorite = (e) => {
    e.stopPropagation();
    if (onAddFavorite) {
      onAddFavorite("drivers", driver._id);
      setAdded(true);
    }
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    if (onRemoveFavorite) {
      onRemoveFavorite("drivers", driver._id);
    }
  };

  if (!driver) return null;
  return (
    <div
      onClick={() => onDriverClick(driver)}
      className="dark:border-accent hover:border-accent dark:bg-dark-bg2 flex cursor-pointer flex-col rounded-lg border-2 border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
    >
      <div className="relative h-full max-h-[350px] w-full overflow-hidden rounded-t-md">
        {onAddFavorite && isAuthenticated && (
          <button
            onClick={handleAddFavorite}
            disabled={added}
            className="bg-accent hover:bg-accent/80 absolute top-2 right-2 cursor-pointer rounded-md px-2 py-1 text-white disabled:cursor-not-allowed"
          >
            {added ? "Favorited!" : "Add Favorite"}
          </button>
        )}
        {onRemoveFavorite && isAuthenticated && (
          <button
            onClick={handleRemoveFavorite}
            className="absolute top-2 right-2 cursor-pointer rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-500/80"
          >
            Remove Favorite
          </button>
        )}
        {driver.image ? (
          <img
            src={driver.image}
            alt={`${driver.name}-headshot`}
            loading="lazy"
            className="object-cover"
            onError={(error) => {
              error.target.src = noDriverIcon;
              error.target.alt = "Placeholder driver image";
              error.target.onerror = null;
            }}
          />
        ) : (
          <img
            src={noDriverIcon}
            className="object-cover"
            alt="Placeholder driver image"
          />
        )}
      </div>
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-left text-xl font-semibold">
          {(() => {
            const parts = driver.name.split(" ");
            return parts
              .map((part, index) =>
                index === parts.length - 1
                  ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                  : part,
              )
              .join(" ");
          })()}
        </h2>
        <div>
          <span className={`fi size-10 px-8 fi-${driver.natCode}`}></span>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
