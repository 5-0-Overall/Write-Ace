import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ArrowUpRight, TrendingUp, Book } from "lucide-react";
import "../styles/Common.css";
import "../styles/Dashboard.css";
import ContributionChart from '../components/ContributionChart';
import api from '../services/ApiService.js';
import AuthService from '../services/AuthService.js';

function TeacherDashboard() {
  const [contributionData, setContributionData] = useState({ total: 0, contributions: {} });
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_submission: 0,
    total_essay: 0,
    total_word: 0,
    average_score: null,
    highest_score: null,
    essays_graded: 0,
    students_taught: 0,
    average_response_time: 0,
    total_feedback_given: 0
  });

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

  const formatNumber = (number) => {
    if (number === null || number === undefined) return 'N/A';
    return Number(number).toFixed(1);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
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

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Essays Graded</h3>
              <Book size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.essays_graded}</span>
              <span className="card-label">essays</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Students Taught</h3>
              <ArrowUpRight size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.students_taught}</span>
              <span className="card-label">students</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Avg. Response Time</h3>
              <TrendingUp size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.average_response_time}</span>
              <span className="card-label">hours</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Feedback Given</h3>
              <Book size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <span className="card-value">{stats.total_feedback_given}</span>
              <span className="card-label">comments</span>
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

export default TeacherDashboard;
