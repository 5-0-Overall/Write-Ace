import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Article.css";

const WritingPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    navigate("/result");
  };

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
            <h3>Writing 1</h3>
          </div>

          <div className="content-section">
            <div className="task-section">
              <div className="task-content">
                <h4 className="task-title">Task 1</h4>
                <p className="task-description">
                  The chart shows the percentage of women and men in one Asian
                  country who passed when they took their driving test between
                  1980 and 2010.
                </p>
                <p className="task-instruction">
                  Summarise the information by selecting and reporting the main
                  features, and make comparisons where relevant.
                </p>
                <p className="time-note">
                  You should spend about 20 minutes on this task.
                </p>
              </div>
              <div className="chart-section">
                <img
                  src="/api/placeholder/400/300"
                  alt="Chart showing driving test pass rates"
                  className="task-chart"
                />
              </div>
            </div>

            <div className="action-section">
              <div className="button-group">
                <button className="btn task-btn">Task 1</button>
                <button className="btn topic-btn">Chart</button>
              </div>
              <button className="btn writing-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="feedback-section">
          <h4 className="feedback-title">Your Writing</h4>
          <textarea
            className="text-editor"
            placeholder="Write your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-copyright">© WriteAce 2024</div>
          <div className="footer-social">
            <span>Follow us:</span>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
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
