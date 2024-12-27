import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin.js";
import {
  Bell,
  Users,
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  Ban,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Common.css";
import "../styles/Dashboard.css";
import "../styles/UserList.css";
import ContributionChart from "../components/ContributionChart";
import api from "../services/ApiService.js";
import AuthService from "../services/AuthService.js";

function UserList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleBanUser = (userId) => {
    // Xử lý logic ban user
    console.log(`Banning user ${userId}`);
  };

  const handleEditUser = (user) => {
    // Xử lý logic chỉnh sửa user
    console.log(`Editing user`, user);
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className={`sidebar-admin ${isSidebarExpanded ? "expanded" : ""}`}>
        <SidebarAdmin
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
      </div>

      <main
        className={`main-content ${
          isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
      >
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

        <div className="users-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users by username or email"
              className="search-input"
            />
            <button className="search-button">
              <Search size={18} />
            </button>
          </div>
          <div className="user-actions">
            <button className="btn-primary">
              <Plus size={16} /> Add User
            </button>
            <button className="btn-secondary">
              <Filter size={16} /> Filter
            </button>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="ban-btn"
                        onClick={() => handleBanUser(user.id)}
                      >
                        <Ban size={16} />
                      </button>
                    </div>
                  </td>
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
