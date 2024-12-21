import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Bell, ArrowUpRight, TrendingUp, Users, Book } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Common.css";
import "../styles/Dashboard.css";
import ContributionChart from '../components/ContributionChart';
import api from '../services/ApiService.js';
import AuthService from '../services/AuthService.js';

function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [contributionData, setContributionData] = useState({ total: 0, contributions: {} });
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_submission: 0,
    total_essay: 0,
    total_word: 0,
    average_score: null,
    highest_score: null
  });

  const handleResize = () => {
    setIsSidebarExpanded(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const { data } = await api.get('/contributions/me');
        setContributionData(data);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };
    
    fetchContributions();
  }, []);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/analystic/user');
        setStats(data);
      } catch (error) {
        console.error('Error fetching user statistics:', error);
      }
    };
    
    fetchStats();
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

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
            <p className="welcome-text">
              Welcome back, {user?.username || 'User'}
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
                src={`https://avatar.iran.liara.run/public/${user?.id || 1}`}
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
              <span className="card-value">{stats.total_essay}</span>
              <span className="card-label">essays</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Average band</h3>
              <TrendingUp size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.average_score || 0}</span>
              <span className="card-label">/9.0</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Highest band</h3>
              <TrendingUp size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.highest_score || 0}</span>
              <span className="card-label">/9.0</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Total words</h3>
              <Book size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.total_word}</span>
              <span className="card-label">words</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Submissions</h3>
              <ArrowUpRight size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.total_submission}</span>
              <span className="card-label">total</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Your Contributions</h3>
          <ContributionChart data={contributionData} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
