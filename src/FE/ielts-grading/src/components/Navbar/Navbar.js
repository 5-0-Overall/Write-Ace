import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  History,
  BarChart2,
  User,
  Settings,
  LogOut,
  Menu,
  Bell,
  X
} from "lucide-react";
import AuthService from '../../services/AuthService';
import "./Navbar.css";
import favicon from '../../assets/images/logo.svg';

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = AuthService.getCurrentUser();

  const isActive = (path) => location.pathname === path;

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to sign out?");
    if (confirmSignOut) {
      AuthService.logout();
      window.location.href = '/login';
    }
  };

  const navItems = [
    { path: "/dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { path: "/problems", icon: <BookOpen size={20} />, label: "Problems" },
    { path: "/history", icon: <History size={20} />, label: "History" },
    { path: "/recommend", icon: <BarChart2 size={20} />, label: "Recommended" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-brand">
            <img src={favicon} alt="WriteAce" className="navbar-logo" />
          </Link>
          
          <div className="navbar-links desktop-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
              >
                {item.label}
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

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="mobile-menu-footer">
            <Link to="/profile" className="mobile-nav-link">
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="mobile-nav-link">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
            <button onClick={handleSignOut} className="mobile-nav-link">
              <LogOut size={20} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 