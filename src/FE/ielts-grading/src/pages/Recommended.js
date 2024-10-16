import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import DataManipulator from "../components/common/DataManipulator";
import "../assets/styles/Dashboard.css";
import { Eye } from "lucide-react";

function Recommended() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarExpanded(false);
    } else {
      setIsSidebarExpanded(true);
    }
  };

  const [recommendedData, setRecommendedData] = useState([
    {
      exam: "Writing 1",
      topic: "Environment",
      task: "1",
      author: "John Doe",
      overallBand: 7.5,
      action: "Review"
    },
    {
      exam: "Writing 2",
      topic: "Technology",
      task: "2",
      author: "Jane Smith",
      overallBand: 8.0,
      action: "Read"
    },
    {
      exam: "Writing 3",
      topic: "Education",
      task: "1",
      author: "Alice Johnson",
      overallBand: 7.0,
      action: "Practice"
    },
    {
      exam: "Writing 4",
      topic: "Health",
      task: "2",
      author: "Bob Brown",
      overallBand: 7.5,
      action: "Review"
    },
    {
      exam: "Writing 5",
      topic: "Globalization",
      task: "1",
      author: "Charlie Davis",
      overallBand: 8.0,
      action: "Read"
    },
    {
      exam: "Writing 6",
      topic: "Travel",
      task: "2",
      author: "Diana Evans",
      overallBand: 7.0,
      action: "Practice"
    },
    {
      exam: "Writing 7",
      topic: "Work",
      task: "1",
      author: "Ethan Harris",
      overallBand: 7.5,
      action: "Review"
    },
    {
      exam: "Writing 8",
      topic: "Culture",
      task: "2",
      author: "Fiona Lewis",
      overallBand: 8.0,
      action: "Read"
    },
    {
      exam: "Writing 9",
      topic: "Science",
      task: "1",
      author: "George Martin",
      overallBand: 7.5,
      action: "Practice"
    },
    {
      exam: "Writing 10",
      topic: "Sports",
      task: "2",
      author: "Hannah Walker",
      overallBand: 7.0,
      action: "Review"
    }
  ]);  

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const handleDataChange = (newData) => {
    setRecommendedData(newData);
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
            initialData={recommendedData}
            onDataChange={handleDataChange}
          />
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
