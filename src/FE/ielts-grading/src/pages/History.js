import React, { useState, useEffect } from "react";
import { useSidebar } from "../context/SidebarContext";
import { Eye } from "lucide-react";
import axios from "axios";
import "../styles/Common.css";
import "../styles/History.css";
import Sidebar from "../components/Sidebar/Sidebar";
import DataManipulator from "../components/common/DataManipulator";

function History() {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async (params = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Add params if they have values
      if (params.task) {
        queryParams.append("task", params.task);
      }
      if (params.topic) {
        queryParams.append("topic", params.topic);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.offset) {
        queryParams.append("offset", params.offset);
      }

      const response = await axios.get(`http://localhost:3000/history?${queryParams.toString()}`);
      
      if (response.data) {
        setHistoryData(response.data);
        setFilteredData(response.data);
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDataManipulation = ({ searchQuery, sortOrder, filterCriteria }) => {
    let newData = [...historyData];

    // Apply search
    if (searchQuery) {
      newData = newData.filter(item => 
        item.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exam?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filterCriteria.task) {
      newData = newData.filter(item => 
        item.task === filterCriteria.task
      );
    }

    // Apply sorting
    if (sortOrder) {
      newData.sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    }

    setFilteredData(newData);
  };

  // Refresh data when filter/search applied
  const handleFilterChange = async (criteria) => {
    try {
      await fetchHistory({
        task: criteria.task || undefined,
        topic: criteria.topic || undefined,
      });
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Writing History</h2>
          <DataManipulator 
            onDataChange={handleDataManipulation}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>Topic</th>
                <th>Task</th>
                <th>Date</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.exam}</td>
                  <td>{item.topic}</td>
                  <td>{item.task}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.score}</td>
                  <td>
                    <button 
                      className="view-button"
                      onClick={() => console.log(`View details of essay ${item.id}`)}
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
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

export default History;