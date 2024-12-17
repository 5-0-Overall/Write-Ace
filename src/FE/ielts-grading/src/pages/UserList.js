import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin.js";
import {
  Bell,
  ArrowUpRight,
  TrendingUp,
  Users,
  File,
  Book,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import "../styles/Common.css";
import "../styles/Dashboard.css";
import ContributionChart from "../components/ContributionChart";
import api from "../services/ApiService.js";
import AuthService from "../services/AuthService.js";

function UserList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [user, setUser] = useState(null);

  const handleResize = () => {
    setIsSidebarExpanded(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const mockUsers = [
    { id: 1, username: "user1", email: "user1@example.com", role: "Admin" },
    { id: 2, username: "user2", email: "user2@example.com", role: "User " },
    { id: 3, username: "user3", email: "user3@example.com", role: "User " },
    { id: 4, username: "user4", email: "user4@example.com", role: "User " },
    { id: 5, username: "user5", email: "user5@example.com", role: "User " },
  ];

  return (
    <div className="dashboard-container">
      <SidebarAdmin
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <div>
            <h2 className="main-title">Admin Dashboard</h2>
            <p className="welcome-text">
              Welcome back, {user?.username || "Admin"}
            </p>
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
            <Link to="/profile" className="icon-button">
              <img
                src="https://avatar.iran.liara.run/public/4"
                alt="Profile"
                className="profile-image"
              />
            </Link>
          </div>
        </div>

        <div className="content-grid">
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Total Users</h3>
              <Users size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{mockUsers.length}</span>
              <span className="card-label">users</span>
            </div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default UserList;
