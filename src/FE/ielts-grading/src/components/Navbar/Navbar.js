import React from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  Bell,
  PenLine,
} from "lucide-react";
import AuthService from '../../services/AuthService';
import "./Navbar.css";
import favicon from '../../assets/images/logo.svg';

function Navbar() {
  const location = useLocation();
  const user = AuthService.getCurrentUser();
  const isTeacher = AuthService.isTeacher();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      AuthService.logout();
      window.location.href = '/login';
    }
  };

  // Tạo mảng navItems cơ bản cho tất cả users
  const baseNavItems = [
    { path: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/problems", icon: <BookOpen size={20} />, label: "Problems" },
    { path: "/history", icon: <History size={20} />, label: "History" },
    { path: "/recommend", icon: <BarChart2 size={20} />, label: "Recommended" },
  ];

  // Thêm Grading option nếu user là teacher
  const navItems = isTeacher 
    ? [...baseNavItems, { path: "/teacher/grading", icon: <PenLine size={20} />, label: "Grading" }]
    : baseNavItems;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-brand">
            <img src={favicon} alt="WriteAce" className="navbar-logo" />
          </Link>
          
          <div className="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-right">
          <button className="nav-icon-btn">
            <Bell size={20} />
          </button>
          
          <div className="profile-dropdown">
            <button className="profile-btn">
              <img
                src={`https://avatar.iran.liara.run/public/${user?.id || 1}`}
                alt="Profile"
                className="profile-image"
              />
            </button>
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                <User size={16} />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="dropdown-item">
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <button onClick={handleSignOut} className="dropdown-item">
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 