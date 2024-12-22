import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Facebook, Twitter, Instagram } from "lucide-react";
import { JSONFormatter } from '../services/JSONFormatter';
import api from '../services/ApiService';
import Swal from 'sweetalert2';
import "../styles/Result.css";
import "../styles/Article.css";
import { useProblem } from "../contexts/ProblemContext";

const Result = () => {
  const [highlightedText, setHighlightedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState(null);
  const [aiReview, setAiReview] = useState(null);
  const writingRef = useRef(null);
  const { id } = useParams();
  const { currentProblem, setCurrentProblem } = useProblem();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching submission data...');
        
        const submissionResponse = await api.get(`/submissions/${id}`);
        console.log('Submission data:', submissionResponse.data);
        setSubmission(submissionResponse.data);
        
        if (!currentProblem) {
          console.log('Fetching problem data...');
          const problemResponse = await api.get(`/problems/1`); // Hardcode id=1. waiting for backend
          console.log('Problem data:', problemResponse.data);
          setCurrentProblem(problemResponse.data);
        }
        
        const formattedReview = JSONFormatter.formatAIReview(submissionResponse.data.aiReview);
        setAiReview(formattedReview);
      } catch (error) {
        console.error('Error in fetchData:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load submission details',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const renderTaskContent = () => {
    if (!currentProblem) return null;

    return (
      <div className="content-section">
        <div className="task-section">
          <div className="task-content">
            <h4 className="task-title">Task {currentProblem.task_id}</h4>
            <p className="task-description">
              {currentProblem.description}
            </p>
            <p className="task-instruction">
              {currentProblem.task_id === 1 
                ? "Summarise the information by selecting and reporting the main features, and make comparisons where relevant."
                : "Write at least 250 words about the given topic."}
            </p>
            <p className="time-note">
              You should spend about {currentProblem.task_id === 1 ? "20" : "40"} minutes on this task.
            </p>
          </div>
          {currentProblem.task_id === 1 && (
            <div className="chart-section">
              <img
                src={currentProblem.image}
                alt={currentProblem.title}
                className="task-chart"
              />
            </div>
          )}
        </div>

        <div className="action-section">
          <div className="button-group">
            <button className="btn task-btn">Task {currentProblem.task_id}</button>
            <button className="btn topic-btn">{currentProblem.title}</button>
          </div>
        </div>
      </div>
    );
  };

  const handleHighlight = (text) => {
    if (!text) return;
    
    setHighlightedText(text);

    if (writingRef.current) {
      // Remove existing highlights
      const content = writingRef.current.innerHTML.replace(
        /<span class="highlighted">|<\/span>/g,
        ''
      );
      writingRef.current.innerHTML = content;

      // Add new highlights
      const regex = new RegExp(`(${text})`, 'gi');
      const newContent = content.replace(regex, '<span class="highlighted">$1</span>');
      writingRef.current.innerHTML = newContent;
    }
  };

  const handleMouseLeave = () => {
    setHighlightedText("");
    if (writingRef.current) {
      const content = writingRef.current.innerHTML.replace(
        /<span class="highlighted">|<\/span>/g,
        ''
      );
      writingRef.current.innerHTML = content;
    }
  };

  const renderVocabularyImprovements = () => {
    if (!aiReview?.feedback?.upgrade_vocabulary_and_grammar?.length) return null;

    return (
      <div className="feedback-block section-vocabulary">
        <h4 className="section-title">
          <i className="fas fa-book"></i>
          Vocabulary Improvements
        </h4>
        <div className="vocabulary-grid">
          {aiReview.feedback.upgrade_vocabulary_and_grammar.map((item, index) => (
            <div 
              key={index} 
              className="vocabulary-card"
              onMouseEnter={() => handleHighlight(item.your_words)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="card-header">
                <span className="card-number">#{item.comment_id}</span>
              </div>
              <div className="card-content">
                <div className="text-comparison">
                  <div className="original">
                    <label>Original:</label>
                    <p>{item.your_words}</p>
                  </div>
                  <div className="improved">
                    <label>Improved:</label>
                    <p>{item.recommend_upgrade_words}</p>
                  </div>
                </div>
                <div className="explanation">
                  <label>Why?</label>
                  <p>{item.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeedbackSection = () => {
    if (!aiReview || !aiReview.feedback) return null;

    return (
      <div className="improvement-column">
        {/* Vocabulary Improvements */}
        {renderVocabularyImprovements()}
        
        {/* Introduction Section */}
        {aiReview.feedback.introduction && (
          <div className="feedback-block section-introduction">
            <h4 className="section-title">
              <i className="fas fa-paragraph"></i>
              Introduction
            </h4>
            <div className="feedback-item">
              <p className="feedback-title">Clear Position</p>
              <p className="feedback-explanation">{aiReview.feedback.introduction.clear_position}</p>
            </div>
            <div className="feedback-item">
              <p className="feedback-title">Relevance</p>
              <p className="feedback-explanation">{aiReview.feedback.introduction.relevance}</p>
            </div>
            <div className="feedback-item">
              <p className="feedback-title">Suggested Improvement</p>
              <p className="feedback-improvement">{aiReview.feedback.introduction.improved_introduction}</p>
            </div>
          </div>
        )}

        {/* Conclusion Section */}
        {aiReview.feedback.conclusion && (
          <div className="feedback-block section-conclusion">
            <h4 className="section-title">
              <i className="fas fa-flag-checkered"></i>
              Conclusion
            </h4>
            <div className="feedback-item">
              <p className="feedback-title">Summary Analysis</p>
              <p className="feedback-explanation">{aiReview.feedback.conclusion.feedback.summary_strength}</p>
              <p className="feedback-improvement">{aiReview.feedback.conclusion.feedback.suggestions}</p>
            </div>
          </div>
        )}

        {/* Task Response Section */}
        {aiReview.feedback.task_response && (
          <div className="feedback-block section-task-response">
            <h4 className="section-title">
              <i className="fas fa-tasks"></i>
              Task Response
              <span className="band-score-label" style={{background: '#10b981'}}>
                Band {aiReview.feedback.task_response.band_score}
              </span>
            </h4>
            {Object.entries(aiReview.feedback.task_response.feedback).map(([key, value]) => (
              <div key={key} className="feedback-item">
                <p className="feedback-title">{key.replace(/_/g, ' ')}</p>
                <p className="feedback-explanation">{value.detailed_explanation}</p>
                <p className="feedback-improvement">{value.how_to_improve}</p>
              </div>
            ))}
          </div>
        )}

        {/* Coherence & Cohesion Section */}
        {aiReview.feedback.coherence_cohesion && (
          <div className="feedback-block section-coherence">
            <h4 className="section-title">
              <i className="fas fa-link"></i>
              Coherence & Cohesion
              <span className="band-score-label" style={{background: '#f59e0b'}}>
                Band {submission.scoreCC}
              </span>
            </h4>
            {Object.entries(aiReview.feedback.coherence_cohesion.feedback).map(([key, value]) => (
              <div key={key} className="feedback-item">
                <p className="feedback-title">{key.replace(/_/g, ' ')}</p>
                <p className="feedback-explanation">{value.detailed_explanation}</p>
                <p className="feedback-improvement">{value.how_to_improve}</p>
              </div>
            ))}
          </div>
        )}

        {/* Lexical Resource Section */}
        {aiReview.feedback.lexical_resource && (
          <div className="feedback-block section-lexical">
            <h4 className="section-title">
              <i className="fas fa-book"></i>
              Lexical Resource
              <span className="band-score-label" style={{background: '#ef4444'}}>
                Band {submission.scoreLR}
              </span>
            </h4>
            {Object.entries(aiReview.feedback.lexical_resource.feedback).map(([key, value]) => (
              <div key={key} className="feedback-item">
                <p className="feedback-title">{key.replace(/_/g, ' ')}</p>
                <p className="feedback-explanation">{value.detailed_explanation}</p>
                <p className="feedback-improvement">{value.how_to_improve}</p>
              </div>
            ))}
          </div>
        )}

        {/* Grammatical Range Section */}
        {aiReview.feedback.grammatical_range_accuracy && (
          <div className="feedback-block section-grammar">
            <h4 className="section-title">
              <i className="fas fa-check-double"></i>
              Grammatical Range & Accuracy
              <span className="band-score-label" style={{background: '#6366f1'}}>
                Band {submission.scoreGRA}
              </span>
            </h4>
            {Object.entries(aiReview.feedback.grammatical_range_accuracy.feedback).map(([key, value]) => (
              <div key={key} className="feedback-item">
                <p className="feedback-title">{key.replace(/_/g, ' ')}</p>
                <p className="feedback-explanation">{value.detailed_explanation}</p>
                <p className="feedback-improvement">{value.how_to_improve}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Analyzing your essay...</p>
      </div>
    );
  }

  if (!submission || !aiReview) {
    return (
      <div className="error-container">
        <p>No submission found</p>
        <Link to="/dashboard" className="btn">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="article-container">
        <header className="article-header">
          <div className="header-left">
            <h2 className="recommended-title">Let's see your result</h2>
          </div>
          <div className="header-right">
            <Link to="/problems" className="dashboard-link">
              <ArrowLeft className="back-icon" />
              Problems
            </Link>
          </div>
        </header>

        <div className="writing-card">
          <div className="card-header">
            <h3>{currentProblem?.title || 'Writing Task'}</h3>
          </div>

          {renderTaskContent()}

          <div className="detail-band">
            <div className="band-item">
              <span className="band-label">Task Achievement</span>
              <div className={`band-score ${getBandScoreClass(submission.scoreTA)}`}>
                {submission.scoreTA.toFixed(1)}
              </div>
            </div>
            <div className="band-item">
              <span className="band-label">Coherence & Cohesion</span>
              <div className={`band-score ${getBandScoreClass(submission.scoreCC)}`}>
                {submission.scoreCC.toFixed(1)}
              </div>
            </div>
            <div className="band-item">
              <span className="band-label">Lexical Resource</span>
              <div className={`band-score ${getBandScoreClass(submission.scoreLR)}`}>
                {submission.scoreLR.toFixed(1)}
              </div>
            </div>
            <div className="band-item">
              <span className="band-label">Grammatical Range & Accuracy</span>
              <div className={`band-score ${getBandScoreClass(submission.scoreGRA)}`}>
                {submission.scoreGRA.toFixed(1)}
              </div>
            </div>
            <div className="band-item">
              <span className="band-label">Overall Band</span>
              <div className={`band-score ${getBandScoreClass(submission.scoreOVR)}`}>
                {submission.scoreOVR.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <h4 className="feedback-title">Your Essay</h4>
          <div className="columns-container">
            <div className="writing-column">
              <div className="writing-content" ref={writingRef}>
                {submission.essay}
              </div>
            </div>
            {renderFeedbackSection()}
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

const getBandScoreClass = (score) => {
  if (score >= 7) return 'green';
  if (score >= 6) return 'yellow';
  if (score >= 5) return 'orange';
  return 'red';
};

export default Result;
