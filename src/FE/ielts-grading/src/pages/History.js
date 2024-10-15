import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Search, SlidersHorizontal, Eye } from "lucide-react";
import "../assets/styles/Dashboard.css";

function History() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarExpanded(false);
    } else {
      setIsSidebarExpanded(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const historyData = [
    { id: 1, exam: "Writing 1", topic: "Graph", task: "1", date: "2023-10-15", score: "7.5" },
    { id: 2, exam: "Writing 2", topic: "Essay", task: "2", date: "2023-10-18", score: "7.0" },
    { id: 3, exam: "Writing 1", topic: "Map", task: "1", date: "2023-10-20", score: "8.0" },
    { id: 4, exam: "Writing 2", topic: "Opinion", task: "2", date: "2023-10-22", score: "7.5" },
    { id: 5, exam: "Writing 1", topic: "Graph", task: "1", date: "2023-10-25", score: "6.5" },
    { id: 6, exam: "Writing 2", topic: "Essay", task: "2", date: "2023-10-28", score: "7.0" },
    { id: 7, exam: "Writing 1", topic: "Map", task: "1", date: "2023-10-30", score: "8.0" },
    { id: 8, exam: "Writing 2", topic: "Opinion", task: "2", date: "2023-11-01", score: "7.5" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Writing History</h2>
          <div className="header-controls">
            <button className="button-secondary">
              <Search size={16} />
              <span>Sort</span>
            </button>
            <button className="button-secondary">
              <SlidersHorizontal size={16} />
              <span>Filter</span>
            </button>
          </div>
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
              {historyData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{item.exam}</td>
                  <td>{item.topic}</td>
                  <td>{item.task}</td>
                  <td>{item.date}</td>
                  <td>{item.score}</td>
                  <td>
                    <button className="view-button" onClick={() => console.log(`View details of essay ${item.id}`)}>
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