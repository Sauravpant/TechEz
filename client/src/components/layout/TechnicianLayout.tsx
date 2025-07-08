import { useState } from "react";
import Sidebar from "../../pages/technician/Sidebar";
import { Outlet } from "react-router-dom";
import { ThemeProvider, useTheme } from "../../Context/ThemeContext";

const TechnicianLayoutContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode } = useTheme();

  return (
    <div className={`flex h-screen font-sans ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-20 md:ml-64" : "ml-20 md:ml-20"}`}
        style={{ marginLeft: sidebarOpen ? "5rem" : "5rem" }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const TechnicianLayout = () => {
  return (
    <ThemeProvider>
      <TechnicianLayoutContent />
    </ThemeProvider>
  );
};

export default TechnicianLayout;
