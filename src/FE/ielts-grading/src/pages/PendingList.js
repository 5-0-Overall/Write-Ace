import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { PenLine } from "lucide-react";
import "../styles/Common.css";
import "../styles/History.css";
import api from '../services/ApiService';

function PendingList() {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await api.get('/submissions/pending');
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
    
    fetchSubmissions();
  }, []);

  const handleViewResult = (id) => {
    navigate(`/teacher/grading/${id}`);
  };

  const truncateEssay = (essay, maxLength = 100) => {
    if (!essay) return '';
    return essay.length > maxLength 
      ? essay.substring(0, maxLength) + '...'
      : essay;
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="main-content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Status</th>
                <th>Score</th>
                <th>Essay</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{index + 1}</td>
                  <td>{item.status}</td>
                  <td>{item.scoreOVR}</td>
                  <td className="essay-preview">{truncateEssay(item.essay)}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="view-button" 
                      onClick={() => handleViewResult(item.id)}
                    >
                      <PenLine size={16} />
                      <span>Review</span>
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

export default PendingList;