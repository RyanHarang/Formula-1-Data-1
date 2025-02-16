import ActiveDrivers from "./ActiveDrivers.jsx";
import AllDrivers from "./AllDrivers.jsx";

function Drivers({ activeTab, setActiveTab, searchQuery }) {
  return (
    <div className="dark:bg-dark-bg text-light-fg dark:text-dark-fg bg-white">
      {activeTab === "activeDrivers" ? (
        <ActiveDrivers searchQuery={searchQuery} />
      ) : (
        <AllDrivers />
      )}
    </div>
  );
}

export default Drivers;
