import { useEffect, useState } from "react";
import TeamCard from "./TeamCard.jsx";
import TeamModal from "./TeamModal";

const ActiveTeams = ({ searchQuery }) => {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const limit = 12;

  useEffect(() => {
    const fetchActiveTeams = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/data/teams");
        const teamsData = await response.json();

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

  const startIndex = page * limit;
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + limit);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Active F1 Teams
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedTeams.map((team, index) => (
            <TeamCard key={index} team={team} onTeamClick={setSelectedTeam} />
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="border-accent bg-light-bg2 dark:bg-dark-bg3 hover mr-2 cursor-pointer rounded border px-4 py-2 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={page === 0 || loading}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-accent hover:bg-accent/80 disabled:hover:bg-accent cursor-pointer rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={startIndex + limit >= teams.length || loading}
        >
          Next
        </button>
      </div>
      {selectedTeam && (
        <TeamModal
          handleCloseModal={() => setSelectedTeam(null)}
          teamId={selectedTeam}
        />
      )}
    </div>
  );
};

export default ActiveTeams;
