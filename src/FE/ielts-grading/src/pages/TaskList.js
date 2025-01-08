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
import axios from "axios";
import AuthService from "../services/AuthService.js";

// task.enum.js
export const Task = {
  TASK_1: 1,
  TASK_2: 2,
};

function TaskList() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]); // State để lưu trữ dữ liệu từ API
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    task_id: null,
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/problems", {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`, // Nếu cần token
          },
        });
        setTasks(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Gọi hàm fetchTasks khi component được mount
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

  const handleAddTask = async () => {
    try {
      console.log("Adding task:", newTask);
      const response = await axios.post(
        "http://localhost:3000/problems",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      setShowAddTaskForm(false);
      setNewTask({ task: null, title: "", description: "", image: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/problems/${taskId}`, {
        headers: {
          Authorization: `Bearer ${AuthService.getToken()}`, // Nếu cần token
        },
      });
      // Cập nhật lại state sau khi xóa
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log(`Task ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    // Xử lý logic chỉnh sửa task
    console.log(`Editing task`, task);
  };

  const filteredTasks = tasks.filter(
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
              <span className="card-value">{tasks.length}</span>
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
            <button
              className="btn-primary"
              onClick={() => setShowAddTaskForm(true)}
            >
              <Plus size={16} /> Add Task
            </button>
            <button className="btn-secondary">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {showAddTaskForm && (
          <div className="add-task-form">
            <h3>Add New Task</h3>
            <select
              className="select-task"
              value={newTask.task_id || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, task_id: e.target.value })
              }
            >
              <option value="" disabled>
                Select a task
              </option>
              <option value={Task.TASK_1}>Task 1</option>
              <option value={Task.TASK_2}>Task 2</option>
              {/* Thêm các task khác nếu cần */}
            </select>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image Link"
              value={newTask.image}
              onChange={(e) =>
                setNewTask({ ...newTask, image: e.target.value })
              }
            />
            <button className="btn-submit" onClick={handleAddTask}>
              Submit
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowAddTaskForm(false)}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.task_id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
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
