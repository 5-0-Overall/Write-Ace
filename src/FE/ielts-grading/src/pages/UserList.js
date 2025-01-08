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
import axios from "axios";

function UserList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  const handleBanUser = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}/toggle-enabled`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        }
      );

      // Cập nhật lại danh sách người dùng sau khi toggle
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, is_enabled: response.data.is_enabled }
            : user
        )
      );

      console.log(
        `User  ${userId} has been toggled to ${
          response.data.is_enabled ? "Enabled" : "Disabled"
        }`
      );
    } catch (error) {
      console.error("Error toggling user enabled status:", error);
    }
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

  const handleRoleChange = async (userId, newRoleId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}/role`,
        {
          role_id: newRoleId,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        }
      );

      // Cập nhật lại danh sách người dùng sau khi cập nhật vai trò
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, role_id: response.data.role_id }
            : user
        )
      );

      console.log(`User  ${userId} role updated to ${response.data.role_id}`);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

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
                <th>Enabled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.username === "admin" ? (
                      <span>Admin</span> // Hiển thị vai trò là Admin nếu username là admin
                    ) : (
                      <select
                        value={user.role_id}
                        onChange={(e) =>
                          handleRoleChange(user.id, Number(e.target.value))
                        }
                      >
                        <option value={0}>User </option>
                        <option value={1}>Admin</option>
                        <option value={2}>Teacher</option>
                      </select>
                    )}
                  </td>
                  <td>{user.is_enabled ? "Enabled" : "Disabled"}</td>
                  <td>
                    <div className="action-buttons">
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
