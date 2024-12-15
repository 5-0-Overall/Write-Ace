import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Bell, ArrowUpRight, TrendingUp, Users, Book } from "lucide-react";
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
import Loading from "../components/common/Loading.js";
import { useSidebar } from '../context/SidebarContext';

function Dashboard() {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const topTopicsData = [
    { topic: "Education", count: 10 },
    { topic: "Technology", count: 9 },
    { topic: "Environment", count: 8 },
    { topic: "Health", count: 8 },
    { topic: "Society", count: 7 },
    { topic: "Economy", count: 6 },
    { topic: "Culture", count: 6 },
    { topic: "Politics", count: 5 },
    { topic: "Sports", count: 5 },
    { topic: "Science", count: 4 },
    { topic: "Transportation", count: 4 },
    { topic: "Tourism", count: 3 },
    { topic: "Agriculture", count: 3 },
    { topic: "Energy", count: 2 },
    { topic: "Art", count: 2 },
    { topic: "Business", count: 2 },
    { topic: "Communications", count: 1 },
    { topic: "Food", count: 1 },
    { topic: "History", count: 1 },
    { topic: "Law", count: 1 },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

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
              <h3 className="card-title">Your writing</h3>
              <ArrowUpRight size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">36</span>
              <span className="card-label">essays</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Average band</h3>
              <TrendingUp size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">6.0</span>
              <span className="card-label">/9.0</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Total words</h3>
              <Book size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">15,000</span>
              <span className="card-label">words</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Peer reviews</h3>
              <Users size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">12</span>
              <span className="card-label">reviews</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Top topics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart key={JSON.stringify(topTopicsData)} data={topTopicsData}>
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
