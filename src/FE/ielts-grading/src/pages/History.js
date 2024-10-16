import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Eye } from "lucide-react";
import "../assets/styles/Dashboard.css";
import DataManipulator from "../components/common/DataManipulator";

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

  const [historyData, setHistoryData] = useState([
    {
      exam: "Writing 1",
      topic: "Environment",
      task: "1",
      date: "2024-04-10",
      score: 7.5
    },
    {
      exam: "Writing 2",
      topic: "Technology",
      task: "2",
      date: "2024-05-15",
      score: 8.0
    },
    {
      exam: "Writing 3",
      topic: "Education",
      task: "1",
      date: "2024-06-20",
      score: 7.0
    },
    {
      exam: "Writing 4",
      topic: "Health",
      task: "2",
      date: "2024-07-25",
      score: 7.5
    },
    {
      exam: "Writing 5",
      topic: "Globalization",
      task: "1",
      date: "2024-08-05",
      score: 8.0
    },
    {
      exam: "Writing 6",
      topic: "Travel",
      task: "2",
      date: "2024-09-10",
      score: 7.0
    },
    {
      exam: "Writing 7",
      topic: "Work",
      task: "1",
      date: "2024-10-15",
      score: 7.5
    },
    {
      exam: "Writing 8",
      topic: "Culture",
      task: "2",
      date: "2024-11-20",
      score: 8.0
    },
    {
      exam: "Writing 9",
      topic: "Science",
      task: "1",
      date: "2024-12-25",
      score: 7.5
    },
    {
      exam: "Writing 10",
      topic: "Sports",
      task: "2",
      date: "2025-01-30",
      score: 7.0
    },
    {
      exam: "Writing 11",
      topic: "Media",
      task: "1",
      date: "2025-02-20",
      score: 7.5
    },
    {
      exam: "Writing 12",
      topic: "Economy",
      task: "2",
      date: "2025-03-25",
      score: 8.0
    }
  ]);  

  const handleDataChange = (newData) => {
    setHistoryData(newData);
  };

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
            data={historyData}
            handleDataChange={handleDataChange}
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