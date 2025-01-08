import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const [filterParams, setFilterParams] = useState({});
  const navigate = useNavigate();

  // Sử dụng useCallback để tránh tạo function mới mỗi lần render
  const fetchProblems = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      // Only add params if they have values
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

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
  }, []); // Empty dependencies array since it doesn't depend on any props or state

  // Sử dụng useMemo để memorize filterParams object
  const memoizedFilterParams = useMemo(() => filterParams, [filterParams]);

  // Chỉ gọi API khi filterParams thực sự thay đổi
  useEffect(() => {
    fetchProblems(memoizedFilterParams);
  }, [fetchProblems, memoizedFilterParams]);

  // Debounce handleFilterChange để tránh gọi API quá nhiều
  const handleFilterChange = useCallback((criteria) => {
    setFilterParams({
      task: criteria.task || undefined,
      tagName: criteria.topic || undefined,
    });
  }, []);

  const handleDataManipulation = useCallback(({
    searchQuery,
    sortOrder,
    filterCriteria,
  }) => {
    let newData = [...problemData];

    // Apply search locally
    if (searchQuery) {
      newData = newData.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting locally
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
  }, [problemData]); // Chỉ phụ thuộc vào problemData

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
