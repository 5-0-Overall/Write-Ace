import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../assets/styles/Dashboard.css";
import DataManipulator from "../components/common/DataManipulator";
import { Pen } from "lucide-react";

function Problems() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const [problemData, setProblemData] = useState([
    {
      id: "#1",
      writing: "Writing 1",
      topic: "Graph",
      task: "1",
      description: "Driving test pass rates",
    },
    {
      id: "#2",
      writing: "Writing 2",
      topic: "Chart",
      task: "2",
      description: "Internet usage statistics",
    },
    {
      id: "#3",
      writing: "Writing 3",
      topic: "Pie",
      task: "3",
      description: "Market share of smartphone brands",
    },
    {
      id: "#4",
      writing: "Writing 4",
      topic: "Table",
      task: "4",
      description: "Population growth rates",
    },
    {
      id: "#5",
      writing: "Writing 5",
      topic: "Line",
      task: "5",
      description: "Annual rainfall data",
    },
    {
      id: "#6",
      writing: "Writing 6",
      topic: "Bar",
      task: "6",
      description: "Sales revenue comparison",
    },
    {
      id: "#7",
      writing: "Writing 7",
      topic: "Scatter",
      task: "7",
      description: "Correlation between height and weight",
    },
    {
      id: "#8",
      writing: "Writing 8",
      topic: "Histogram",
      task: "8",
      description: "Age distribution of employees",
    },
    {
      id: "#9",
      writing: "Writing 9",
      topic: "Heatmap",
      task: "9",
      description: "Website click-through rates",
    },
    {
      id: "#10",
      writing: "Writing 10",
      topic: "Bubble",
      task: "10",
      description: "GDP vs. Life expectancy",
    },
    {
      id: "#11",
      writing: "Writing 11",
      topic: "Area",
      task: "11",
      description: "Energy consumption over time",
    },
    {
      id: "#12",
      writing: "Writing 12",
      topic: "Radar",
      task: "12",
      description: "Skill proficiency levels",
    }
  ]);
  

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

  const handleDataChange = (newData) => {
    setProblemData(newData);
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />

      <main className="main-content">
        <div className="main-header">
        <h2 className="main-title">Recommended Writing</h2>
          <DataManipulator
            initialData={problemData}
            onDataChange={handleDataChange}
          />
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
