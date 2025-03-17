import React, { useEffect, useState } from "react";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const TeamModal = ({ handleCloseModal, teamId }) => {
  const [team, setTeam] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const teamsResponse = await fetch("http://3.133.155.165:3000/api/data/teams");
        if (!teamsResponse.ok) throw new Error(`Failed to fetch teams: ${teamsResponse.status}`);
        const teams = await teamsResponse.json();
        const teamData = teams.find(team => team.id === teamId);

        if (!teamData) {
          console.error(`Team with id ${teamId} not found.`);
          return;
        }

        const driversResponse = await fetch("http://3.133.155.165:3000/api/data/drivers");
        if (!driversResponse.ok) throw new Error(`Failed to fetch drivers: ${driversResponse.status}`);
        const drivers = await driversResponse.json();
        const teamDrivers = drivers.filter(driver => driver.team === teamId);

        setTeam(teamData);
        setDrivers(teamDrivers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  if (loading) return <div></div>;
  if (!team) return <div></div>;

  return (
    <div className="z-100 flex justify-center items-center fixed inset-0 bg-opacity-50">
      <div className="relative max-w-5xl w-full max-h-[90vh] dark:bg-dark-bg2 bg-light-bg light-bg rounded-xl overflow-hidden border-2 border-black dark:border-accent">
        <div className="drag-handle cursor-grab active:cursor-grabbing relative flex items-center justify-start dark:bg-dark-bg bg-white dark:text-white text-black border-b-2 border-black dark:border-accent rounded-t-xl">
          <div className="rounded-tl-2xl border-accent pl-2.5 py-0.75">
            {team.natCode ? (
              <span className={`fi size-10 px-8 fi-${team.natCode}`}></span>
            ) : (
              <span className="text-sm text-gray-400">N/A</span>
            )}
          </div>
          <h2 className="text-2xl pl-4 select-none">
            {team.name || "Unknown Team"}
          </h2>
          <div
            onClick={handleCloseModal}
            className="text-2xl pr-4 ml-auto hover:cursor-pointer"
          >
            <p className="pr-1.5 dark:text-accent dark:hover:text-white hover:text-accent transition-all duration-300">
              X
            </p>
          </div>
        </div>
        <div className="flex flex-row p-3 gap-3">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
              <h3 className="text-l dark:text-white border-b-1 dark:border-accent border-black text-left text-dark-bg w-[80%] mx-auto">
                Team Info
              </h3>
              <p className="text-2xl font-bold mt-4 w-[80%] pb-2 mx-auto">
                {team.name || "Unknown Team"}
              </p>
              <p className="text-xl text-dark-bg dark:text-light-bg2">
                Nationality: {team.nationality || "N/A"}
              </p>
              <p className="text-xl text-dark-bg dark:text-light-bg2">
                Total Wins: {team.wins ?? "N/A"}
              </p>
              <p className="text-xl text-dark-bg dark:text-light-bg2">
                Total Races: {team.races ?? "N/A"}
              </p>
            </div>
            <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
              <h3 className="text-l dark:text-white border-b-1 dark:border-accent border-black text-left text-dark-bg w-[80%] mx-auto">
                Drivers
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[80%] mx-auto h-64 overflow-y-auto">
                {drivers.map(driver => (
                  <div key={driver.id} className="flex flex-col items-center">
                    <div className="w-full h-full overflow-hidden rounded-t-md">
                      <img
                        src={driver.image || noDriverIcon}
                        alt={`${driver.name || "Driver"}-headshot`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = noDriverIcon;
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <p className="text-xl font-semibold mt-2">
                      {driver.name || "Unknown Driver"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full h-64 overflow-hidden rounded-t-md flex items-center justify-center bg-gray-300 text-gray-700 text-4xl font-righteous">
              {team.image ? (
                <img
                  src={team.image}
                  alt={"No image available"}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "";
                    e.target.onerror = null;
                  }}
                />
              ) : (
                team.name
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
// import React, { useEffect, useState } from "react";
// import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

// const TeamModal = ({ handleCloseModal, teamId }) => {
//   const [team, setTeam] = useState(null);
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const teamsResponse = await fetch("http://3.133.155.165:3000/api/data/teams");
//         if (!teamsResponse.ok) throw new Error(`Failed to fetch teams: ${teamsResponse.status}`);
//         const teams = await teamsResponse.json();
//         const teamData = teams.find(team => team.id === teamId);

//         if (!teamData) {
//           console.error(`Team with id ${teamId} not found.`);
//           return;
//         }

//         const driversResponse = await fetch("http://3.133.155.165:3000/api/data/drivers");
//         if (!driversResponse.ok) throw new Error(`Failed to fetch drivers: ${driversResponse.status}`);
//         const drivers = await driversResponse.json();
//         const teamDrivers = drivers.filter(driver => driver.team === teamId);

//         setTeam(teamData);
//         setDrivers(teamDrivers);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [teamId]);

//   if (loading) return <div></div>;
//   if (!team) return <div></div>;

//   return (
//     <div className="z-100 flex justify-center items-center fixed inset-0 bg-opacity-50">
//       <div className="relative max-w-5xl w-full max-h-[90vh] dark:bg-dark-bg2 bg-light-bg light-bg rounded-xl overflow-hidden border-2 border-black dark:border-accent">
//         <div className="drag-handle cursor-grab active:cursor-grabbing relative flex items-center justify-start dark:bg-dark-bg bg-white dark:text-white text-black border-b-2 border-black dark:border-accent rounded-t-xl">
//           <div className="rounded-tl-2xl border-accent pl-2.5 py-0.75">
//             {team.natCode ? (
//               <span className={`fi size-10 px-8 fi-${team.natCode}`}></span>
//             ) : (
//               <span className="text-sm text-gray-400">N/A</span>
//             )}
//           </div>
//           <h2 className="text-2xl pl-4 select-none">
//             {team.name || "Unknown Team"}
//           </h2>
//           <div
//             onClick={handleCloseModal}
//             className="text-2xl pr-4 ml-auto hover:cursor-pointer"
//           >
//             <p className="pr-1.5 dark:text-accent dark:hover:text-white hover:text-accent transition-all duration-300">
//               X
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-row p-3 gap-3">
//           <div className="flex flex-col gap-3 w-full md:w-1/2">
//             <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
//               <h3 className="text-l dark:text-white border-b-1 dark:border-accent border-black text-left text-dark-bg w-[80%] mx-auto">
//                 Team Info
//               </h3>
//               <p className="text-2xl font-bold mt-4 w-[80%] pb-2 mx-auto">
//                 {team.name || "Unknown Team"}
//               </p>
//               <p className="text-xl text-dark-bg dark:text-light-bg2">
//                 Nationality: {team.nationality || "N/A"}
//               </p>
//               <p className="text-xl text-dark-bg dark:text-light-bg2">
//                 Total Wins: {team.wins ?? "N/A"}
//               </p>
//               <p className="text-xl text-dark-bg dark:text-light-bg2">
//                 Total Races: {team.races ?? "N/A"}
//               </p>
//             </div>
//             <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
//               <h3 className="text-l dark:text-white border-b-1 dark:border-accent border-black text-left text-dark-bg w-[80%] mx-auto">
//                 Drivers
//               </h3>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[80%] mx-auto h-64 overflow-y-auto">
//                 {drivers.map(driver => (
//                   <div key={driver.id} className="flex flex-col items-center">
//                     <div className="w-full h-full overflow-hidden rounded-t-md">
//                       <img
//                         src={driver.image || noDriverIcon}
//                         alt={`${driver.name || "Driver"}-headshot`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = noDriverIcon;
//                           e.target.onerror = null;
//                         }}
//                       />
//                     </div>
//                     <p className="text-xl font-semibold mt-2">
//                       {driver.name || "Unknown Driver"}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center">
//             <div className="w-full h-64 overflow-hidden rounded-t-md flex items-center justify-center bg-gray-300 text-gray-700 text-4xl font-righteous">
//               {team.image ? (
//                 <img
//                   src={team.image}
//                   alt={`${team.name || "Team"}-logo`}
//                   className="w-full h-full object-contain"
//                   onError={(e) => {
//                     e.target.src = "";
//                     e.target.onerror = null;
//                   }}
//                 />
//               ) : (
//                 team.name
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamModal;