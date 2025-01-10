import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from '../services/ApiService';
import "../styles/Result.css";
import "../styles/Article.css";

const TeacherGrading = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const submissionResponse = await api.get(`/submissions/${id}`);
        setSubmission(submissionResponse.data);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Analyzing essay...</p>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="error-container">
        <p>No submission found</p>
        <Link to="/teacher/pending" className="btn">Pending List</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="article-container">
        <header className="article-header">
          <div className="header-left">
            <h2 className="recommended-title">Review Essay</h2>
          </div>
          <div className="header-right">
            <Link to="/teacher/pending" className="dashboard-link">
              <ArrowLeft className="back-icon" />
              Pending List
            </Link>
          </div>
        </header>

        <div className="writing-card">
          <div className="card-header">
            <h3>{submission.problem.title}</h3>
          </div>

          <div className="content-section">
            <div className="task-section">
              <div className="task-content">
                <h4 className="task-title">Task {submission.problem.task_id}</h4>
                <p className="task-description">
                  {submission.problem.description}
                </p>
              </div>
            </div>
          </div>

          <div className="detail-band">
            <div className="band-item">
              <span className="band-label">Task Achievement</span>
              <input 
                type="number" 
                className="band-score" 
                defaultValue={submission.scoreTA}
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Coherence & Cohesion</span>
              <input 
                type="number" 
                className="band-score" 
                defaultValue={submission.scoreCC}
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Lexical Resource</span>
              <input 
                type="number" 
                className="band-score" 
                defaultValue={submission.scoreLR}
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Grammatical Range & Accuracy</span>
              <input 
                type="number" 
                className="band-score" 
                defaultValue={submission.scoreGRA}
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Overall Band</span>
              <input 
                type="number" 
                className="band-score" 
                defaultValue={submission.scoreOVR}
                min="0"
                max="9"
                step="0.5"
              />
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <h4 className="feedback-title">Your Essay</h4>
          <div className="columns-container">
            <div className="writing-column">
              <div className="writing-content">
                {submission.essay}
              </div>
            </div>
            <div className="improvement-column">
              <div className="feedback-block section-task-response">
                <h4 className="section-title">
                  <i className="fas fa-tasks"></i>
                  Task Response
                </h4>
                <div className="feedback-item">
                  <textarea 
                    className="feedback-explanation" 
                    defaultValue={submission.teacherReview || ""}
                    rows="6"
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Enter your Task Response feedback here..."
                  />
                </div>
              </div>

              <div className="feedback-block section-coherence">
                <h4 className="section-title">
                  <i className="fas fa-link"></i>
                  Coherence & Cohesion
                </h4>
                <div className="feedback-item">
                  <textarea 
                    className="feedback-explanation" 
                    defaultValue={submission.teacherReview || ""}
                    rows="6"
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Enter your Coherence & Cohesion feedback here..."
                  />
                </div>
              </div>

              <div className="feedback-block section-lexical">
                <h4 className="section-title">
                  <i className="fas fa-book"></i>
                  Lexical Resource
                </h4>
                <div className="feedback-item">
                  <textarea 
                    className="feedback-explanation" 
                    defaultValue={submission.teacherReview || ""}
                    rows="6"
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Enter your Lexical Resource feedback here..."
                  />
                </div>
              </div>

              <div className="feedback-block section-grammar">
                <h4 className="section-title">
                  <i className="fas fa-check"></i>
                  Grammatical Range & Accuracy
                </h4>
                <div className="feedback-item">
                  <textarea 
                    className="feedback-explanation" 
                    defaultValue={submission.teacherReview || ""}
                    rows="6"
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Enter your Grammar feedback here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGrading;
