import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Facebook, Twitter, Instagram } from "lucide-react";
import Swal from 'sweetalert2';
import "../styles/Result.css";
import "../styles/Article.css";
import "../styles/Grading.css";

const MOCK_SUBMISSION = {
  id: 1,
  essay: `The impact of technology on modern society is a topic of intense debate. While some argue that technological advancements have revolutionized our lives positively, others contend that they have led to significant social problems. This essay will examine both perspectives before reaching a balanced conclusion.

On the positive side, technology has undeniably improved many aspects of our daily lives. In healthcare, for instance, modern medical equipment and techniques have significantly increased life expectancy and treatment success rates. Additionally, communication technology has made it possible for people to connect instantly across the globe, fostering international collaboration and understanding. In education, digital tools have expanded access to learning resources, making quality education available to more people than ever before.

However, critics argue that technology has also brought notable drawbacks. One major concern is the increasing social isolation, as many people, especially younger generations, prefer virtual interactions over face-to-face communication. Furthermore, the rise of social media has been linked to mental health issues such as anxiety and depression. There are also valid concerns about privacy and data security in our increasingly connected world.

In my opinion, while technology does present certain challenges, its benefits substantially outweigh its drawbacks. The key lies in how we choose to implement and regulate technological developments. By establishing proper guidelines and promoting responsible use of technology, we can maximize its benefits while minimizing potential negative impacts.

In conclusion, technology's influence on society is complex and multifaceted. Rather than viewing it as entirely good or bad, we should focus on harnessing its potential while actively addressing its challenges. This balanced approach will help ensure that technological progress continues to serve humanity's best interests.`,
  problemId: 1,
  userId: "user123",
  status: "submitted",
  submittedAt: "2024-03-20T10:30:00Z"
};

const MOCK_PROBLEM = {
  id: 1,
  title: "Technology's Impact on Society",
  type: "Writing Task 2",
  question: "Some people believe that technological developments bring greater benefits, others believe it will lead to a negative impact on society. Discuss both views and give your opinion.",
  description: "In this essay, you should:\n- Discuss the positive impacts of technology\n- Discuss the negative impacts of technology\n- Give your personal opinion with supporting reasons",
  timeLimit: 40,
  wordLimit: 250
};

const TeacherGrading = () => {
  const [scores, setScores] = useState({
    scoreTA: 0,
    scoreCC: 0,
    scoreLR: 0,
    scoreGRA: 0,
    scoreOVR: 0
  });

  const [feedback, setFeedback] = useState({
    task_response: {
      band_score: 0,
      feedback: {
        main_ideas: { detailed_explanation: '', how_to_improve: '' },
        development: { detailed_explanation: '', how_to_improve: '' },
        relevance: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    coherence_cohesion: {
      band_score: 0,
      feedback: {
        organization: { detailed_explanation: '', how_to_improve: '' },
        cohesion: { detailed_explanation: '', how_to_improve: '' },
        progression: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    lexical_resource: {
      band_score: 0,
      feedback: {
        vocabulary_range: { detailed_explanation: '', how_to_improve: '' },
        word_choice: { detailed_explanation: '', how_to_improve: '' },
        spelling: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    grammatical_range_accuracy: {
      band_score: 0,
      feedback: {
        sentence_structure: { detailed_explanation: '', how_to_improve: '' },
        grammar_accuracy: { detailed_explanation: '', how_to_improve: '' },
        punctuation: { detailed_explanation: '', how_to_improve: '' }
      }
    },
    introduction: {
      clear_position: '',
      relevance: '',
      improved_introduction: ''
    },
    conclusion: {
      feedback: {
        summary_strength: '',
        suggestions: ''
      }
    },
    upgrade_vocabulary_and_grammar: []
  });

  const handleScoreChange = (criterion, value) => {
    setScores(prev => ({
      ...prev,
      [criterion]: parseFloat(value)
    }));

    // Automatically calculate overall score
    const newScores = { ...scores, [criterion]: parseFloat(value) };
    const overall = (
      newScores.scoreTA + 
      newScores.scoreCC + 
      newScores.scoreLR + 
      newScores.scoreGRA
    ) / 4;
    
    setScores(prev => ({
      ...prev,
      scoreOVR: parseFloat(overall.toFixed(1))
    }));
  };

  const handleFeedbackChange = (section, subsection, field, value) => {
    setFeedback(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        feedback: {
          ...prev[section].feedback,
          [subsection]: {
            ...prev[section].feedback[subsection],
            [field]: value
          }
        }
      }
    }));
  };

  const handleSubmitGrading = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Grading submitted successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    console.log('Submitted scores:', scores);
    console.log('Submitted feedback:', feedback);
  };

  const renderFeedbackInput = (section, subsection, field, label) => (
    <div className="feedback-input-group">
      <label>{label}</label>
      <textarea
        value={feedback[section].feedback[subsection][field]}
        onChange={(e) => handleFeedbackChange(section, subsection, field, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        className="feedback-textarea"
      />
    </div>
  );

  const renderScoreInput = (criterion, label) => (
    <div className="score-input-group">
      <label>{label}</label>
      <input
        type="number"
        min="0"
        max="9"
        step="0.5"
        value={scores[criterion]}
        onChange={(e) => handleScoreChange(criterion, e.target.value)}
        className="score-input"
      />
    </div>
  );

  return (
    <div className="grading-container">
      <header className="article-header">
        <div className="header-left">
          <Link to="/dashboard" className="back-link">
            <ArrowLeft className="back-icon" />
            Back to Dashboard
          </Link>
          <h2 className="article-title">Grade Student Submission</h2>
        </div>
      </header>

      <div className="article-content">
        <div className="content-left">
          <div className="writing-section">
            <div className="writing-header">
              <h3>Writing Task 2</h3>
              <div className="writing-meta">
                <span>Word count: {MOCK_SUBMISSION.essay.split(' ').length}</span>
                <span>Time limit: {MOCK_PROBLEM.timeLimit} minutes</span>
              </div>
            </div>

            <div className="question-box">
              <h4>Question:</h4>
              <p>{MOCK_PROBLEM.question}</p>
              <div className="task-description">
                {MOCK_PROBLEM.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            <div className="essay-box">
              <h4>Student's Essay:</h4>
              <div className="writing-content">
                {MOCK_SUBMISSION.essay.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="grading-section">
            <div className="scores-box">
              <h3>Band Scores</h3>
              <div className="score-grid">
                {renderScoreInput('scoreTA', 'Task Achievement')}
                {renderScoreInput('scoreCC', 'Coherence & Cohesion')}
                {renderScoreInput('scoreLR', 'Lexical Resource')}
                {renderScoreInput('scoreGRA', 'Grammatical Range & Accuracy')}
              </div>
              <div className="overall-score">
                <span>Overall Band Score</span>
                <span className="score-value">{scores.scoreOVR.toFixed(1)}</span>
              </div>
            </div>

            <div className="feedback-sections">
              {Object.entries(feedback).map(([section, content]) => (
                <div key={section} className="feedback-box">
                  <h3>{section.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h3>
                  {Object.entries(content.feedback || {}).map(([subsection, fields]) => (
                    <div key={subsection} className="feedback-category">
                      <h4>{subsection.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h4>
                      <div className="feedback-inputs">
                        {Object.entries(fields).map(([field, _]) => (
                          renderFeedbackInput(section, subsection, field, 
                            field.split('_').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button 
              className="submit-grading-btn"
              onClick={handleSubmitGrading}
            >
              Submit Grading
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

export default TeacherGrading;
