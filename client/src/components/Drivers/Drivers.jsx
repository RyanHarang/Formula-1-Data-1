import ActiveDrivers from "./ActiveDrivers.jsx";
import AllDrivers from "./AllDrivers.jsx";

const Drivers = ({ activeTab, setActiveTab, searchQuery, onDriverClick }) => {
  return (
    <div>
      {activeTab === "activeDrivers" ? (
        <ActiveDrivers searchQuery={searchQuery} onDriverClick={onDriverClick}/>
      ) : (
        <AllDrivers />
      )}
    </div>
  );
};

export default Drivers;
