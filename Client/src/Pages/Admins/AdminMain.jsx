import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashborad";

const AdminMain = () => {
  const [activeOption, setActiveOption] = useState("dashboard");

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div>
      <Navbar />
      {/* Side bar for full screen */}
      <div className="flex">
        <div>
          <Sidebar
            activeOption={activeOption}
            handleOptionClick={handleOptionClick}
          />
        </div>
        <div  className="flex-1">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
