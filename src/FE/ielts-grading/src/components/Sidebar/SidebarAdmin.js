import React, { useState, useEffect } from "react";
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
import "./SidebarAdmin.css";
import AuthService from "../../services/AuthService";

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      AuthService.logout();
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        {isExpanded && <h1 className="sidebar-title">WriteAce</h1>}
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link
          to="/admin/dashboard"
          className={`nav-button ${
            isActive("/admin/dashboard") ? "active" : ""
          }`}
        >
          <Home size={20} className="nav-icon" />
          {isExpanded && <span>Dashboard</span>}
        </Link>
        <Link
          to="/users"
          className={`nav-button ${isActive("/users") ? "active" : ""}`}
        >
          <BookOpen size={20} className="nav-icon" />
          {isExpanded && <span>User List</span>}
        </Link>
        <Link
          to="/tasks"
          className={`nav-button ${isActive("/tasks") ? "active" : ""}`}
        >
          <History size={20} className="nav-icon" />
          {isExpanded && <span>Task List</span>}
        </Link>
        <Link
          to="/profile_admin"
          className={`nav-button ${isActive("/profile_admin") ? "active" : ""}`}
        >
          <User size={20} className="nav-icon" />
          {isExpanded && <span>Account</span>}
        </Link>
      </nav>
      <div className="sidebar-footer">
        <Link
          to="/settings"
          className={`nav-button ${isActive("/settings") ? "active" : ""}`}
        >
          <Settings size={20} className="nav-icon" />
          {isExpanded && <span>Settings</span>}
        </Link>
        <Link className="nav-button" onClick={handleSignOut}>
          <LogOut size={20} className="nav-icon" />
          {isExpanded && <span>Sign out</span>}
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
