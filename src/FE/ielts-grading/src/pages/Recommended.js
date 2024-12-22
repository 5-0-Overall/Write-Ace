import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Common.css";
import "../styles/Recommended.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Recommended() {
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

  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
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
                      onClick={() => navigate(`/sample-article`)}
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
