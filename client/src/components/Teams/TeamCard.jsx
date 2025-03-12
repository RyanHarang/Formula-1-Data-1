const TeamCard = ({ team, onTeamClick }) => {
  return (
    <div
      onClick={() => onTeamClick(team.id)}
      className="dark:border-accent hover:border-accent dark:bg-dark-bg2 flex cursor-pointer flex-col rounded-lg border-2 border-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
    >
      <div
        style={{
          fontFamily: "Righteous",
          justifyContent: "left",
          fontSize: 36,
          color: "#808080",
        }}
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-t-md"
      >
        {team.image ? (
          <img
            src={team.image}
            alt={team.name}
            className="h-full w-full object-cover"
            onError={(error) => {
              error.target.src = "";
              error.target.onerror = null;
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 text-4xl text-gray-700">
            {team.name}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-left text-xl font-semibold">
          {(() => {
            const parts = team.name.split(" ");
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
          <span className={`fi size-10 px-8 fi-${team.natCode}`}></span>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
