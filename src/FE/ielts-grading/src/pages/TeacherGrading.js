import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from '../services/ApiService';
import "../styles/Result.css";
import "../styles/Article.css";
import axios from 'axios';
import Swal from 'sweetalert2';

const TeacherGrading = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    upgrade_vocabulary_and_grammar: [],
    introduction: {
      clear_position: '',
      relevance: '',
      brief_overview: '',
      improved_introduction: ''
    },
    main_points: [],
    task_response: {
      band_score: null,
      feedback: {
        answer_all_parts_of_question: { detailed_explanation: '', how_to_improve: '' },
        present_clear_position_throughout: { detailed_explanation: '', how_to_improve: '' },
        present_extend_support_ideas: { detailed_explanation: '', how_to_improve: '' },
        stay_on_topic: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    coherence_cohesion: {
      band_score: null,
      feedback: {
        organize_information_logically: { detailed_explanation: '', how_to_improve: '' },
        use_paragraphs: { detailed_explanation: '', how_to_improve: '' },
        use_cohesive_devices: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    lexical_resource: {
      band_score: null,
      feedback: {
        wide_range_vocabulary: { detailed_explanation: '', how_to_improve: '' },
        use_precise_vocabulary: { detailed_explanation: '', how_to_improve: '' },
        correct_spelling: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    grammatical_range_accuracy: {
      band_score: null,
      feedback: {
        wide_range_structures: { detailed_explanation: '', how_to_improve: '' },
        grammar_punctuation_accuracy: { detailed_explanation: '', how_to_improve: '' }
      }
    }
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/submissions/${id}`);
        setSubmission(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const scoreTA = parseFloat(document.querySelector('input[name="scoreTA"]').value);
      const scoreCC = parseFloat(document.querySelector('input[name="scoreCC"]').value);
      const scoreLR = parseFloat(document.querySelector('input[name="scoreLR"]').value);
      const scoreGRA = parseFloat(document.querySelector('input[name="scoreGRA"]').value);
      const scoreOVR = parseFloat(document.querySelector('input[name="scoreOVR"]').value);
      
      if (!scoreTA || !scoreCC || !scoreLR || !scoreGRA || !scoreOVR) {
        Swal.fire({
          title: 'Error!',
          text: 'Please enter all scores',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      const requestBody = {
        teacherReview: JSON.stringify({ feedback }),
        scoreTA,
        scoreCC,
        scoreLR,
        scoreGRA,
        scoreOVR,
        status: "REVIEWED"
      };

      console.log('Request body as plain text:', JSON.stringify(requestBody, null, 2));

      const response = await api.put(`/submissions/${id}/teacher-review`, requestBody);

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Review submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit review. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!submission) {
    return <div>No submission found</div>;
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
                name="scoreTA"
                className="band-score" 
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Coherence & Cohesion</span>
              <input 
                type="number" 
                name="scoreCC"
                className="band-score" 
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Lexical Resource</span>
              <input 
                type="number" 
                name="scoreLR"
                className="band-score" 
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Grammatical Range & Accuracy</span>
              <input 
                type="number" 
                name="scoreGRA"
                className="band-score" 
                min="0"
                max="9"
                step="0.5"
              />
            </div>
            <div className="band-item">
              <span className="band-label">Overall Band</span>
              <input 
                type="number" 
                name="scoreOVR"
                className="band-score"
                min="0"
                max="9"
                step="0.5"
              />
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <h4 className="feedback-title">Student Essay</h4>
          <div className="columns-container">
            <div className="writing-column">
              <div className="writing-content">
                {submission.essay}
              </div>
            </div>
            <div className="improvement-column">
              {/* Vocabulary Upgrade Section */}
              <div className="feedback-block section-vocabulary-upgrade">
                <h4 className="section-title">Vocabulary and Grammar Upgrades</h4>
                <div className="vocabulary-upgrades">
                  {feedback.upgrade_vocabulary_and_grammar.map((item, index) => (
                    <div key={index} className="upgrade-item">
                      <div className="feedback-field">
                        <label>Original Text:</label>
                        <textarea
                          value={item.your_words}
                          onChange={(e) => {
                            const newUpgrades = [...feedback.upgrade_vocabulary_and_grammar];
                            newUpgrades[index].your_words = e.target.value;
                            setFeedback(prev => ({...prev, upgrade_vocabulary_and_grammar: newUpgrades}));
                          }}
                          rows="2"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <div className="feedback-field">
                        <label>Recommended Upgrade:</label>
                        <textarea
                          value={item.recommend_upgrade_words}
                          onChange={(e) => {
                            const newUpgrades = [...feedback.upgrade_vocabulary_and_grammar];
                            newUpgrades[index].recommend_upgrade_words = e.target.value;
                            setFeedback(prev => ({...prev, upgrade_vocabulary_and_grammar: newUpgrades}));
                          }}
                          rows="2"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <div className="feedback-field">
                        <label>Explanation:</label>
                        <textarea
                          value={item.explanation}
                          onChange={(e) => {
                            const newUpgrades = [...feedback.upgrade_vocabulary_and_grammar];
                            newUpgrades[index].explanation = e.target.value;
                            setFeedback(prev => ({...prev, upgrade_vocabulary_and_grammar: newUpgrades}));
                          }}
                          rows="3"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <button 
                        className="delete-button"
                        onClick={() => {
                          const newUpgrades = feedback.upgrade_vocabulary_and_grammar.filter((_, i) => i !== index);
                          setFeedback(prev => ({...prev, upgrade_vocabulary_and_grammar: newUpgrades}));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button 
                    className="add-vocabulary-button"
                    onClick={() => {
                      const newComment = {
                        comment_id: feedback.upgrade_vocabulary_and_grammar.length + 1,
                        your_words: '',
                        recommend_upgrade_words: '',
                        explanation: ''
                      };
                      setFeedback(prev => ({
                        ...prev, 
                        upgrade_vocabulary_and_grammar: [...prev.upgrade_vocabulary_and_grammar, newComment]
                      }));
                    }}
                  >
                    Add Vocabulary Upgrade
                  </button>
                </div>
              </div>

              {/* Introduction Section */}
              <div className="feedback-block section-introduction">
                <h4 className="section-title">Introduction Analysis</h4>
                <div className="feedback-field">
                  <label>Clear Position:</label>
                  <textarea
                    value={feedback.introduction.clear_position}
                    onChange={(e) => setFeedback(prev => ({
                      ...prev,
                      introduction: {...prev.introduction, clear_position: e.target.value}
                    }))}
                    rows="3"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
                <div className="feedback-field">
                  <label>Relevance:</label>
                  <textarea
                    value={feedback.introduction.relevance}
                    onChange={(e) => setFeedback(prev => ({
                      ...prev,
                      introduction: {...prev.introduction, relevance: e.target.value}
                    }))}
                    rows="3"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
                <div className="feedback-field">
                  <label>Brief Overview:</label>
                  <textarea
                    value={feedback.introduction.brief_overview}
                    onChange={(e) => setFeedback(prev => ({
                      ...prev,
                      introduction: {...prev.introduction, brief_overview: e.target.value}
                    }))}
                    rows="3"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
                <div className="feedback-field">
                  <label>Improved Introduction:</label>
                  <textarea
                    value={feedback.introduction.improved_introduction}
                    onChange={(e) => setFeedback(prev => ({
                      ...prev,
                      introduction: {...prev.introduction, improved_introduction: e.target.value}
                    }))}
                    rows="3"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Main Points Section */}
              <div className="feedback-block section-main-points">
                <h4 className="section-title">Paragraph Analysis</h4>
                <div className="paragraphs-container">
                  {feedback.main_points.map((point, index) => (
                    <div key={index} className="paragraph-item">
                      <div className="feedback-field">
                        <label>Argumentative Logic:</label>
                        <textarea
                          value={point.feedback.argumentative_logic}
                          onChange={(e) => {
                            const newPoints = [...feedback.main_points];
                            newPoints[index].feedback.argumentative_logic = e.target.value;
                            setFeedback(prev => ({...prev, main_points: newPoints}));
                          }}
                          rows="3"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <div className="feedback-field">
                        <label>Suggestions for Improvement:</label>
                        <textarea
                          value={point.feedback.suggestions_for_improvement?.examples_of_success || ''}
                          onChange={(e) => {
                            const newPoints = [...feedback.main_points];
                            newPoints[index].feedback.suggestions_for_improvement = {
                              examples_of_success: e.target.value
                            };
                            setFeedback(prev => ({...prev, main_points: newPoints}));
                          }}
                          rows="3"
                          style={{ width: '100%', resize: 'vertical' }}
                        />
                      </div>
                      <button 
                        className="delete-button"
                        onClick={() => {
                          const newPoints = feedback.main_points.filter((_, i) => i !== index);
                          setFeedback(prev => ({...prev, main_points: newPoints}));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button 
                    className="add-paragraph-button"
                    onClick={() => {
                      const newParagraph = {
                        paragraph: feedback.main_points.length + 1,
                        feedback: {
                          argumentative_logic: '',
                          suggestions_for_improvement: {
                            examples_of_success: ''
                          }
                        }
                      };
                      setFeedback(prev => ({
                        ...prev, 
                        main_points: [...prev.main_points, newParagraph]
                      }));
                    }}
                  >
                    Add Paragraph Analysis
                  </button>
                </div>
              </div>

              {/* Original feedback sections (Task Response, Coherence & Cohesion, etc.) */}
              {Object.entries(feedback).map(([category, data]) => {
                if (['task_response', 'coherence_cohesion', 'lexical_resource', 'grammatical_range_accuracy'].includes(category)) {
                  return (
                    <div key={category} className={`feedback-block section-${category}`}>
                      <h4 className="section-title">
                        {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h4>
                      {Object.entries(data.feedback).map(([criterion, content]) => (
                        <div key={criterion} className="feedback-item">
                          <h5>{criterion.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h5>
                          <div className="feedback-content">
                            <div className="feedback-field">
                              <label>Detailed Explanation:</label>
                              <textarea
                                value={content.detailed_explanation}
                                onChange={(e) => {
                                  setFeedback(prev => ({
                                    ...prev,
                                    [category]: {
                                      ...prev[category],
                                      feedback: {
                                        ...prev[category].feedback,
                                        [criterion]: {
                                          ...prev[category].feedback[criterion],
                                          detailed_explanation: e.target.value
                                        }
                                      }
                                    }
                                  }));
                                }}
                                rows="3"
                                style={{ width: '100%', resize: 'vertical' }}
                              />
                            </div>
                            <div className="feedback-field">
                              <label>How to Improve:</label>
                              <textarea
                                value={content.how_to_improve}
                                onChange={(e) => {
                                  setFeedback(prev => ({
                                    ...prev,
                                    [category]: {
                                      ...prev[category],
                                      feedback: {
                                        ...prev[category].feedback,
                                        [criterion]: {
                                          ...prev[category].feedback[criterion],
                                          how_to_improve: e.target.value
                                        }
                                      }
                                    }
                                  }));
                                }}
                                rows="3"
                                style={{ width: '100%', resize: 'vertical' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}

              {/* Submit button at the bottom of improvement column */}
              <div className="submit-section">
                <button 
                  className="submit-button"
                  onClick={handleSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGrading;
