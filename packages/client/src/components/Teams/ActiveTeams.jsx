import { useEffect, useState } from "react";
import TeamCard from "./TeamCard.jsx";

const ActiveTeams = ({ searchQuery, onTeamClick }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    const fetchActiveTeams = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://3.133.155.165:3000/api/data/teams");
        const teamsData = await response.json();

        if (token) {
          const favoritesResponse = await fetch(
            "http://3.133.155.165:3000/api/favorites/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (favoritesResponse.ok) {
            const favoritesData = await favoritesResponse.json();
            setFavoriteTeams(
              favoritesData.favoriteTeams.map((team) => team._id),
            );
          } else {
            console.error(
              "Could not fetch favorites. Status:",
              favoritesResponse.status,
            );
            setFavoriteTeams([]);
          }
        } else {
          setFavoriteTeams([]);
        }

        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTeams();
  }, []);

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (team.nationality &&
        team.nationality.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleAddFavorite = async (type, favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://3.133.155.165:3000/api/favorites/add/${type}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item: favoriteId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Error adding item to favorites:", data.message);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Active F1 Teams
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeams.map((team, index) => (
            <TeamCard
              key={index}
              team={team}
              onTeamClick={onTeamClick}
              onAddFavorite={handleAddFavorite}
              favorite={favoriteTeams.includes(team._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveTeams;
