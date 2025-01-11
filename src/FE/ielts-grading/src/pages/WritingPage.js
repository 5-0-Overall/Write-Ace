import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Article.css";
import api from '../services/ApiService';
import Swal from 'sweetalert2';
import AuthService from "../services/AuthService";
import { useProblem } from '../contexts/ProblemContext';

const WritingPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [text, setText] = useState("");
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [textError, setTextError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const { setCurrentProblem } = useProblem();
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (!user) {
          navigate('/login');
          return;
        }
        setCurrentUser(user);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
        setCurrentProblem(response.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id, setCurrentProblem]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const validateSubmission = () => {
    if (!text.trim()) {
      setTextError("Please write your essay before submitting");
      return false;
    }
    if (text.trim().split(/\s+/).length < 50) {
      setTextError("Your essay is too short. Please write more.");
      return false;
    }
    setTextError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!validateSubmission()) {
      return;
    }
    
    const result = await Swal.fire({
      title: 'Submit Essay',
      text: "Are you sure you want to submit your essay?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setSubmitLoading(true);
      
      // Show loading state with Swal
      Swal.fire({
        title: 'Submitting your essay...',
        html: 'This may take a minute while we analyze your writing.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await api.post('/submissions', {
        problem: id,
        user: currentUser.id,
        essay: text
      });

      if (response.data && response.data.id) {
        // Close loading dialog
        await Swal.close();
        
        // Show success message
        await Swal.fire({
          title: 'Success!',
          text: 'Your essay has been submitted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        // Navigate to result page
        navigate(`/result/${response.data.id}`);
      }
    } catch (err) {
      console.error("Error submitting essay:", err);
      await Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || "Failed to submit essay. Please try again.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleTeacherReviewRequest = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setSubmitLoading(true);

      // Show loading state with Swal
      Swal.fire({
        title: 'Requesting Teacher Review...',
        html: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await api.post('/submissions/manual-request', {
        problem: id,
        user: currentUser.id,
        essay: text
      });

      if (response.data && response.data.id) {
        // Close loading dialog
        await Swal.close();
        
        // Show success message
        await Swal.fire({
          title: 'Success!',
          text: 'Your request for teacher review has been submitted successfully.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Error requesting teacher review:", err);
      await Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || "Failed to request teacher review. Please try again.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderTaskContent = () => {
    if (!problem) return null;

    return (
      <div className="content-section">
        <div className="task-section">
          <div className="task-content">
            <h4 className="task-title">Task {problem.task_id}</h4>
            <p className="task-description">
              {problem.description}
            </p>
            <p className="task-instruction">
              {problem.task_id === 1 
                ? "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
                : "Write at least 250 words about the given topic."}
            </p>
            <p className="time-note">
              You should spend about {problem.task_id === 1 ? "20" : "40"} minutes on this task.
            </p>
          </div>
          {problem.task_id === 1 && (
            <div className="chart-section">
              <img
                src={problem.image}
                alt={problem.title}
                className="task-chart"
              />
            </div>
          )}
        </div>

        <div className="action-section">
          <div className="button-group">
            <button className="btn task-btn">Task {problem.task_id}</button>
            <button className="btn topic-btn">{problem.title}</button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problem) return <div>No problem found</div>;

  return (
    <div>
      <div className="article-container">
        <header className="article-header">
          <div className="header-left">
            <h2 className="recommended-title">Writing Now!</h2>
          </div>
          <div className="header-right">
            <Link to="/dashboard" className="dashboard-link">
              <ArrowLeft className="back-icon" />
              Dashboard
            </Link>
          </div>
        </header>

        <div className="writing-card">
          <div className="card-header">
            <h3>{problem.title}</h3>
          </div>

          {renderTaskContent()}
        </div>

        <div className="feedback-section">
          <h4 className="feedback-title">Your Writing</h4>
          <div className="textarea-container">
            <textarea
              className={`text-editor ${textError ? 'error' : ''}`}
              placeholder="Write your essay here"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (textError) setTextError("");
              }}
            />
            {textError && <div className="error-message">{textError}</div>}
            <div className="word-count">
              Words: {text.trim().split(/\s+/).filter(word => word.length > 0).length}
            </div>
          </div>
          
          <div className="submit-section">
            <button 
              className={`btn writing-btn ${submitLoading ? 'loading' : ''}`}
              onClick={handleSubmit}
              disabled={submitLoading}
            >
              {submitLoading ? 'Submitting...' : 'Submit Essay'}
            </button>
            <button 
              className={`btn review-btn ${submitLoading ? 'loading' : ''}`}
              onClick={handleTeacherReviewRequest}
              disabled={submitLoading}
            >
              {submitLoading ? 'Requesting...' : 'Request Teacher Review'}
            </button>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-copyright">© WriteAce 2024</div>
          <div className="footer-social">
            <span>Follow us:</span>
            <div className="social-links">
              <a href="https://www.facebook.com/writeace" target="_blank" rel="noopener noreferrer" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/writeace" target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/writeace" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WritingPage;
