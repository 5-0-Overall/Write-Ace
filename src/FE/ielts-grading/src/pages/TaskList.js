import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin.js";
import { Bell, Users, Search, Edit, Trash2, Plus, Filter } from "lucide-react";
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
import "../styles/TaskList.css";
import ContributionChart from "../components/ContributionChart.js";
import api from "../services/ApiService.js";
import AuthService from "../services/AuthService.js";

function TaskList() {
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

  const mockTasks = [
    {
      id: 1,
      task: "Task 1",
      title: "Write an essay",
      description: "Write a 250-word essay on a given topic.",
      tag_id: 101,
      created_at: "2023-10-01",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      task: "Task 2",
      title: "Prepare for speaking test",
      description: "Practice speaking for the IELTS test.",
      tag_id: 102,
      created_at: "2023-10-02",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      task: "Task 3",
      title: "Read a book",
      description: "Read 'The Great Gatsby' and summarize it.",
      tag_id: 103,
      created_at: "2023-10-03",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      task: "Task 4",
      title: "Listening practice",
      description: "Complete listening exercises from the IELTS book.",
      tag_id: 104,
      created_at: "2023-10-04",
      image: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      task: "Task 5",
      title: "Take a mock test",
      description: "Take a full-length IELTS mock test.",
      tag_id: 105,
      created_at: "2023-10-05",
      image: "https://via.placeholder.com/40",
    },
  ];

  const handleDelete = (taskId) => {
    // Xử lý logic xóa task
    console.log(`Deleting task ${taskId}`);
  };

  const handleEdit = (task) => {
    // Xử lý logic chỉnh sửa task
    console.log(`Editing task`, task);
  };

  const filteredTasks = mockTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3 className="card-title">Total Tasks</h3>
              <Users size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{mockTasks.length}</span>
              <span className="card-label">tasks</span>
            </div>
          </div>
        </div>

        <div className="users-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks by title or description"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">
              <Search size={18} />
            </button>
          </div>
          <div className="user-actions">
            <button className="btn-primary">
              <Plus size={16} /> Add Task
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
                <th>Task</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tag Id</th>
                <th>Created At</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.task}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.tag_id}</td>
                  <td>{task.created_at}</td>
                  <td>{task.image}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(task)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 size={16} />
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

export default TaskList;
