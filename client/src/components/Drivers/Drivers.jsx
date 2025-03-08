import ActiveDrivers from "./ActiveDrivers.jsx";
import AllDrivers from "./AllDrivers.jsx";

const Drivers = ({ activeTab, setActiveTab, searchQuery }) => {
  return (
    <div>
      {activeTab === "activeDrivers" ? (
        <ActiveDrivers searchQuery={searchQuery} />
      ) : (
        <AllDrivers />
      )}
    </div>
  );
};

export default Drivers;
