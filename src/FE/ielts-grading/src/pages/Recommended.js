import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Search, SlidersHorizontal, Eye } from "lucide-react";
import "../assets/styles/Dashboard.css";

function Recommended() {
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

  const recommendedData = [
    {
      exam: "#1 Writing 1",
      topic: "Graph",
      task: "1",
      author: "John Doe",
      overallBand: "8.0",
    },
    {
      exam: "#1 Writing 1",
      topic: "Graph",
      task: "1",
      author: "Jack",
      overallBand: "8.0",
    },
    {
      exam: "#1 Writing 1",
      topic: "Graph",
      task: "1",
      author: "Jane Doe",
      overallBand: "8.0",
    },
    {
      exam: "#1 Writing 1",
      topic: "Graph",
      task: "1",
      author: "Sam",
      overallBand: "8.0",
    },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Recommended Writing</h2>
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
                <th>Author</th>
                <th>Overall Band</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recommendedData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{item.exam}</td>
                  <td>{item.topic}</td>
                  <td>{item.task}</td>
                  <td>{item.author}</td>
                  <td>{item.overallBand}</td>
                  <td>
                    <button
                      className="view-button"
                      onClick={() => console.log(`View details of essay`)}
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

export default Recommended;
