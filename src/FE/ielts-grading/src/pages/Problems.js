import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Search, SlidersHorizontal, Eye, Pen } from "lucide-react";
import "../assets/styles/Dashboard.css";

function Problems() {
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

  const problemData = [
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
        id: "#1",
        writing: "Writing 1",
        topic: "Graph",
        task: "1",
        description: "Driving test pass rates",
    },
    {
        id: "#1",
        writing: "Writing 1",
        topic: "Graph",
        task: "1",
        description: "Driving test pass rates",
    },
    {
        id: "#1",
        writing: "Writing 1",
        topic: "Graph",
        task: "1",
        description: "Driving test pass rates",
    },
    {
        id: "#1",
        writing: "Writing 1",
        topic: "Graph",
        task: "1",
        description: "Driving test pass rates",
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Problem list</h2>
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
                <th>Topics</th>
                <th>Task</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {problemData.map((problem, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>
                    {problem.id} {problem.writing}
                  </td>
                  <td>{problem.topic}</td>
                  <td>{problem.task}</td>
                  <td>{problem.description}</td>
                  <td>
                    <button className="view-button" onClick={() => console.log(`View details of essay`)}>
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
