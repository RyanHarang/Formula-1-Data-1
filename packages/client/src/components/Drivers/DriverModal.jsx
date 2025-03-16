import React from "react";
import "flag-icons/css/flag-icons.min.css";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const DriverModal = ({ handleCloseModal, natCode, name, teamName, DOB, lastYear, totalRaces, wins, image }) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="dark:bg-dark-bg2 bg-light-bg dark:border-accent relative h-full w-full overflow-hidden rounded-xl border-2 border-black">
        <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex cursor-grab items-center justify-start rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
          <div className="border-accent rounded-tl-2xl py-0.75 pl-2.5">
            {natCode ? (
              <span
                className={`fi size-10 px-8 fi-${natCode}`}
              ></span>
            ) : (
              <span className="text-sm text-gray-400">N/A</span>
            )}
          </div>
          <h2 className="pl-4 text-2xl select-none">
            {name || "Unknown Driver"}
          </h2>
          <div
            onClick={handleCloseModal}
            className="ml-auto pr-4 text-2xl hover:cursor-pointer"
          >
            <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
              &#10006;
            </button>
          </div>
        </div>
        <div className="flex h-[calc(100%-3.5rem)] flex-row gap-3 overflow-y-auto p-3">
          <div className="flex w-full flex-col gap-3 md:w-1/2">
            <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
              <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                Last Team
              </h3>
              <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                {teamName || "Unknown Team"}
              </p>
            </div>
            <div className="dark:bg-dark-bg h-full rounded-lg bg-white p-3 shadow-md overflow-y-auto">
              <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                Driver Bio
              </h3>
              <div className="text-dark-bg mx-auto flex w-[80%] flex-col gap-3 border-black text-left">
                <div>
                  <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                    DOB
                  </h2>
                  <p className="text-dark-bg dark:text-light-bg2 text-xl">
                    {DOB
                      ? DOB.split("(")[0]
                      : "DOB not available"}
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
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center md:w-1/2">
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