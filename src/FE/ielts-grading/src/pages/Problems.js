import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Common.css";
import "../styles/Problems.css";
import DataManipulator from "../components/common/DataManipulator";
import { Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/ApiService";

function Problems() {
  const [problemData, setProblemData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch problems with updated params structure
  const fetchProblems = async (params = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // Only add params if they have values
      if (params.task) {
        queryParams.append("task", params.task);
      }
      if (params.tagName) {
        queryParams.append("tagName", params.tagName);
      }
      if (params.limit) {
        queryParams.append("limit", params.limit);
      }
      if (params.offset) {
        queryParams.append("offset", params.offset);
      }

      const response = await api.get(`/problems?${queryParams.toString()}`);

      if (response.data) {
        setProblemData(response.data);
        setFilteredData(response.data);
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleDataManipulation = ({
    searchQuery,
    sortOrder,
    filterCriteria,
  }) => {
    let newData = [...problemData];

    // Apply search
    if (searchQuery) {
      newData = newData.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filterCriteria.task) {
      newData = newData.filter(
        (item) => item.task_id?.toString() === filterCriteria.task
      );
    }

    // Apply sorting
    if (sortOrder) {
      newData.sort((a, b) => {
        const titleA = a.title || "";
        const titleB = b.title || "";
        if (sortOrder === "asc") {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      });
    }

    setFilteredData(newData);
  };

  // Refresh data when filter/search applied
  const handleFilterChange = async (criteria) => {
    try {
      await fetchProblems({
        task: criteria.task || undefined,
        tagName: criteria.topic || undefined,
      });
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const getTaskName = (taskId) => {
    const taskTypes = {
      1: "Writing Task 1",
      2: "Writing Task 2",
    };
    return taskTypes[taskId] || "Unknown Task";
  };

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <div className="main-header">
          <DataManipulator
            onDataChange={handleDataManipulation}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="table-container">
          <table className="problems-table">
            <thead>
              <tr>
                <th>Exam</th>
                <th>Topic</th>
                <th>Task</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((problem, index) => (
                <tr
                  key={problem.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{problem.id}</td>
                  <td>{problem.title}</td>
                  <td>{getTaskName(problem.task_id)}</td>
                  <td className="description-cell" title={problem.description}>
                    {problem.description}
                  </td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() =>
                        navigate(`/writing/problems/${problem.id}`)
                      }
                    >
                      <Pen size={16} />
                      <span>Writing</span>
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

export default Problems;
