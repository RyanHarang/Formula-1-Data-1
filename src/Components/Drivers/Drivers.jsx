import { useState } from "react";
import ActiveDrivers from "./ActiveDrivers.jsx";
import AllDrivers from "./AllDrivers.jsx";

function Drivers() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`py-2 px-4 rounded-lg ${
            activeTab === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-300`}
        >
          Active Drivers
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`py-2 px-4 rounded-lg ${
            activeTab === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-300`}
        >
          All Drivers
        </button>
      </div>

      {activeTab === "active" ? <ActiveDrivers /> : <AllDrivers />}
    </div>
  );
}

export default Drivers;
