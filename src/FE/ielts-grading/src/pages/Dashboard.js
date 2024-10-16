// Dashboard.js
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Bell, ChevronDown, ArrowUpRight } from "lucide-react";
import "../assets/styles/Dashboard.css";

function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarExpanded(false);
    } else {
      setIsSidebarExpanded(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <main className="main-content">
        <div className="main-header">
          <div>
            <h2 className="main-title">Dashboard</h2>
            <p className="welcome-text">Welcome back, Jack</p>
          </div>
          <div className="header-controls">
            <select className="time-selector">
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <button className="icon-button">
              <img
                src="https://avatar.iran.liara.run/public/4"
                alt="Profile"
                className="profile-image"
              />
            </button>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Your writing</h3>
              <ArrowUpRight size={16} className="card-icon" />
            </div>
            <div className="card-content">20 essays</div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Average band</h3>
              <ChevronDown size={16} className="card-icon" />
            </div>
            <div className="card-content">6.0/9.0</div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Top topics</h3>
              <ChevronDown size={16} className="card-icon" />
            </div>
            <div className="card-content"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
