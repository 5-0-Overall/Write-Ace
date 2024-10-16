import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({ isSidebarExpanded, toggleSidebar }) {
  const location = useLocation(); // Get the current location

  // Function to check if the current location matches the button's link
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        {isSidebarExpanded && <h1 className="sidebar-title">WriteAce</h1>}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarExpanded ? (
            <ChevronLeft size={24} />
          ) : (
            <ChevronRight size={24} />
          )}
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={`nav-button ${isActive("/dashboard") ? "active" : ""}`}>
          <Home size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Dashboard</span>}
        </Link>
        <Link to="/problems" className={`nav-button ${isActive("/problems") ? "active" : ""}`}>
          <BookOpen size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Problems</span>}
        </Link>
        <Link to="/history" className={`nav-button ${isActive("/history") ? "active" : ""}`}>
          <History size={20} className="nav-icon" />
          {isSidebarExpanded && <span>History</span>}
        </Link>
        <Link to="/recommend" className={`nav-button ${isActive("/recommend") ? "active" : ""}`}>
          <BarChart2 size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Recommended</span>}
        </Link>
        <Link to="/account" className={`nav-button ${isActive("/account") ? "active" : ""}`}>
          <User size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Account</span>}
        </Link>
      </nav>
      <div className="sidebar-footer">
        <Link to="/settings" className={`nav-button ${isActive("/settings") ? "active" : ""}`}>
          <Settings size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Settings</span>}
        </Link>
        <Link to="/" className={`nav-button ${isActive("/signout") ? "active" : ""}`}>
          <LogOut size={20} className="nav-icon" />
          {isSidebarExpanded && <span>Sign out</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;