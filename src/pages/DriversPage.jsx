import Drivers from "../Components/Drivers/Drivers.jsx";
import Navigation from "../Components/Navigation/Navigation.jsx";
import SearchBar from "../Components/SearchBar/SearchBar.jsx";
import React, { useState } from "react";

function DriversPage() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <>
      <Navigation/>
      <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Drivers activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default DriversPage;
