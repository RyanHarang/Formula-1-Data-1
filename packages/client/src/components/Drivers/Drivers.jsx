import ActiveDrivers from "./ActiveDrivers.jsx";
import AllDrivers from "./AllDrivers.jsx";

const Drivers = ({ activeTab, setActiveTab, searchQuery, onDriverClick }) => {
  return (
    <div>
      {activeTab === "activeDrivers" ? (
        <ActiveDrivers searchQuery={searchQuery} onDriverClick={onDriverClick}/>
      ) : (
        <AllDrivers searchQuery={searchQuery} onDriverClick={onDriverClick} sortBy={activeTab}/>
      )}
    </div>
  );
};

export default Drivers;
