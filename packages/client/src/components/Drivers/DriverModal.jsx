import { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";
import { ScatterChart, Scatter, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid, LabelList } from 'recharts';

// Pass in all the driver data so that it does'nt have to be queried when opened
const DriverModal = ({
  handleCloseModal,
  natCode,
  name,
  teamName,
  DOB,
  lastYear,
  totalRaces,
  wins,
  image,
  selectedDrivers
}) => {
  // Create the colors for the modal graphs setting the default values to something nice looking
  const [accentColor, setAccentColor] = useState("#8884d8");
  const [secondColor, setSecondColor] = useState("#82ca9d");
  // Dark mode value incase we wanted to ever add dark mode for the text in the graphs
  const [darkmode, setDarkmode] = useState("#858585");

  useEffect(() => {
    const storedColorVar = localStorage.getItem("accentColor") || "--color-highlight-1";
    console.log(storedColorVar);
    const computedColor = getComputedStyle(document.documentElement).getPropertyValue(storedColorVar).trim();
    console.log(computedColor);
    if (computedColor) {
      setAccentColor(computedColor);
      // Blue
      if (computedColor === "#3b82f6") {
        setSecondColor("#2a5cad");
      }
      // Green
      if (computedColor === "#10b981") {
        setSecondColor("#0f805a");
      }
      // Red
      if (computedColor === "#ef4444") {
        setSecondColor("#9c2d2d");
      }
      // Yellow
      if (computedColor === "#f59e0b") {
        setSecondColor("#b5770e");
      }
    }
  }, []);

  const driverInitials = (name) => {
    const index = name.indexOf(' ');
    if (index === -1) {
      return '';
    }
    const lastInitial = name.substring(index + 1, index + 2);
    const firstInitial = name[0];
    const Initials = firstInitial + "." + lastInitial;
    return Initials;
  }

  const winsData = selectedDrivers.map((driver) => ({
    name: driverInitials(driver.name),
    Wins: driver.wins,
    NonWins: driver.totalRaces - driver.wins
  }))

  const earliestDOB = new Date(Math.min(...selectedDrivers.map(driver => new Date(driver.DOB))));
  const latestYear = Math.max(...selectedDrivers.map(driver => driver.lastYear));

  const birthYearScatter = selectedDrivers.map((driver) => ({
    name: driverInitials(driver.name),
    year: new Date(driver.DOB).getFullYear(),
    event: "DOB"
  }))

  const lastYearScatter = selectedDrivers.map((driver) => ({
    name: driverInitials(driver.name),
    year: driver.lastYear,
    event: "LastYear"
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };
  

  return (
    <div className="mx-auto h-full w-full max-w-[100vw] overflow-hidden sm:max-w-[640px] md:max-w-[768px] md:max-w-none">
      <div className="dark:bg-dark-bg2 bg-light-bg dark:border-accent relative h-full w-full overflow-hidden rounded-xl border-2 border-black">
        <div className="dark:bg-dark-bg dark:border-accent relative flex cursor-grab flex-row items-center rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
          <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex flex-1 items-center rounded-t-xl border-black bg-white text-black active:cursor-grabbing dark:text-white">
            <div className="border-accent rounded-tl-2xl py-0.75 pl-2.5">
              {natCode ? (
                <span className={`fi size-10 px-8 fi-${natCode}`}></span>
              ) : (
                <span className="text-sm text-gray-400">N/A</span>
              )}
            </div>
            <h2 className="pl-4 text-2xl select-none">
              {name || "Unknown Driver"}
            </h2>
          </div>
          <div
            onClick={handleCloseModal}
            className="ml-auto pr-4 text-2xl hover:cursor-pointer"
          >
            <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
              &#10006;
            </button>
          </div>
        </div>
        <div className="flex h-[calc(100%-3.5rem)] flex-col gap-3 overflow-y-auto p-3 md:flex-row">
          <div className="order-2 flex w-full flex-col gap-3 md:order-1 md:w-1/2">
            <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
              <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                Last Team
              </h3>
              <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                {teamName || "Unknown Team"}
              </p>
            </div>
            <div className="dark:bg-dark-bg h-full overflow-y-auto rounded-lg bg-white p-3 shadow-md [scrollbar-gutter:stable]">
              <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                Driver Bio
              </h3>
              <div className="text-dark-bg mx-auto flex w-[80%] flex-col gap-3 border-black text-left">
                <div>
                  <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                    DOB
                  </h2>
                  <p className="text-dark-bg dark:text-light-bg2 text-xl">
                    {DOB ? DOB.split("(")[0] : "DOB not available"}
                  </p>
                </div>
                <div>
                  <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                    Last Year
                  </h2>
                  <p className="text-dark-bg dark:text-light-bg2 text-xl">
                    {lastYear || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                    Total Races
                  </h2>
                  <p className="text-dark-bg dark:text-light-bg2 text-xl">
                    {totalRaces ?? "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                    Wins
                  </h2>
                  <p className="text-dark-bg dark:text-light-bg2 text-xl">
                    {wins ?? "N/A"}
                  </p>
                </div>
                <div>
                  {(selectedDrivers.length > 1) ?
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Charts
                      </h2>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={winsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis
                            dataKey="name"
                            stroke={darkmode}
                          />
                          <YAxis
                            stroke={darkmode}
                          />
                          <Tooltip
                            stroke={darkmode}
                          />
                          <Legend />
                          <Bar dataKey="NonWins" stackId="a" fill={accentColor} />
                          <Bar dataKey="Wins" stackId="a" fill={secondColor} />
                        </BarChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" dataKey="year" name="Year" stroke={darkmode} domain={[earliestDOB.getFullYear() - 5, latestYear + 5]} />
                          <YAxis type="category" dataKey="name" stroke={darkmode} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                          payload={[
                            {
                              value: 'Birth Year',
                              type: 'square',
                              color: secondColor
                            },
                            {
                              value: 'Last Year',
                              type: 'circle',
                              color: accentColor
                            },
                          ]}
                          iconType="square"
                          />

                          <Scatter
                            name="Birth Year"
                            data={birthYearScatter}
                            fill={secondColor}
                            shape="square"
                          />

                          <Scatter
                            name="Last Year"
                            data={lastYearScatter}
                            fill={accentColor}
                            shape="circle"
                          />

                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                    :
                    ""}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 flex w-full justify-center md:order-2 md:w-1/2">
            <div className="h-full w-full overflow-hidden rounded-t-md">
              <img
                src={image || noDriverIcon}
                alt={`${name || "Driver"}-headshot`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = noDriverIcon;
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;
