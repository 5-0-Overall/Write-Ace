import React, { useState, useRef, useEffect } from "react";
import "../styles/Result.css";
import "../styles/Article.css";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
  const [highlightedText, setHighlightedText] = useState("");
  const writingRef = useRef(null);
  const navigate = useNavigate();

  const handleHighlight = (text) => {
    setHighlightedText(text);

    if (writingRef.current) {
      const content = writingRef.current.innerHTML;
      const highlightedContent = content.replace(
        new RegExp(`(${text})`, "g"),
        '<span class="highlighted">$1</span>'
      );
      writingRef.current.innerHTML = highlightedContent;
    }
  };

  const handleMouseLeave = () => {
    setHighlightedText("");
    if (writingRef.current) {
      const content = writingRef.current.innerHTML;
      const cleanContent = content.replace(
        /<span class="highlighted">(.*?)<\/span>/g,
        "$1"
      );
      writingRef.current.innerHTML = cleanContent;
    }
  };

  return (
    <div>
      <div className="article-container">
        <header className="article-header">
          <div className="header-left">
            <h2 className="recommended-title">Let's see your result</h2>
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
              <button
                className="btn writing-btn"
                onClick={() => navigate("/writing")}
              >
                Try again
              </button>
            </div>

            <div className="detail-band">
              <div className="band-item">
                <span className="band-label">Task Achievement</span>
                <div className="band-score green">7.0</div>
              </div>
              <div className="band-item">
                <span className="band-label">Coherence & Cohesion</span>
                <div className="band-score yellow">7.0</div>
              </div>
              <div className="band-item">
                <span className="band-label">Lexical Resource</span>
                <div className="band-score red">7.0</div>
              </div>
              <div className="band-item">
                <span className="band-label">Grammatical Range & Accuracy</span>
                <div className="band-score blue">7.0</div>
              </div>
              <div className="band-item">
                <span className="band-label">Overall Band</span>
                <div className="band-score gray">7.0</div>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-section">
          <h4 className="feedback-title">Feedback</h4>
          <div className="columns-container">
            <div className="writing-column">
              <div className="writing-content" ref={writingRef}>
                <p>
                  The chart illustrates the percentage of women and men who
                  passed their driving tests in a specific Asian country between
                  1980 and 2010. Overall, it is evident that there were notable
                  changes in the passing rates for both genders during this
                  period.
                </p>
                <p>
                  In 1980, the percentage of men who passed the driving test was
                  significantly higher than that of women, with around 80% of
                  men passing compared to about 50% of women. This gap indicates
                  that men were more successful in passing the driving test at
                  that time. Over the next two decades, the passing rates for
                  both genders showed an upward trend, but the increase was more
                  pronounced for women.
                </p>
                <p>
                  By 1990, the percentage of women who passed the test rose to
                  approximately 60%, while the percentage of men was slightly
                  increased to about 85%. This shows that the gender gap was
                  narrowing, although men still had a higher passing rate.
                </p>
                <p>
                  In 2000, the passing rates for both genders continued to rise,
                  reaching about 70% for women and 90% for men. This pattern
                  suggests that both genders were improving their driving
                  skills, but men maintained a lead.
                </p>
                <p>
                  Finally, by 2010, the passing rate for women had increased to
                  nearly 80%, while men's passing rate remained around 95%.
                  Although men consistently outperformed women in passing the
                  driving test, the gap had decreased over the years.
                </p>
                <p>
                  In summary, the data reveals an overall improvement in the
                  driving test passing rates for both men and women from 1980 to
                  2010. While men remained the dominant gender in terms of
                  passing rates throughout the period, women made significant
                  progress, leading to a gradual reduction in the gender gap.
                </p>
              </div>
            </div>

            <div className="improvement-column">
              <div className="vocabulary-section">
                <h4 className="section-title">Vocabulary enhancement</h4>

                <div
                  className="improvement-item"
                  onMouseEnter={() => handleHighlight("The chart illustrates")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="original-text">
                    The chart illustrates-&gt;
                  </div>
                  <div className="improved-text">The graph depicts</div>
                  <div className="explanation">
                    Explanation: 'Graph' is a more specific term than 'chart' in
                    academic contexts, and 'depicts' is more formal than
                    'illustrates,' enhancing the academic tone.
                  </div>
                </div>

                <div
                  className="improvement-item"
                  onMouseEnter={() =>
                    handleHighlight("passed their driving tests")
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="original-text">
                    passed their driving tests -&gt;
                  </div>
                  <div className="improved-text">
                    successfully completed their driving tests
                  </div>
                  <div className="explanation">
                    Explanation: 'Successfully completed' is more precise and
                    formal than 'passed,' which is somewhat vague and informal
                    for academic writing.
                  </div>
                </div>
              </div>

              <div className="grammar-section">
                <h4 className="section-title">Grammar correction</h4>
                <div className="correction-item">
                  <p>
                    1. Error: "the percentage of men who passed the driving test
                    was significantly higher than that of women"
                  </p>
                  <p>
                    Correction: "the percentage of men who passed the driving
                    test was significantly higher than that of the women"
                  </p>
                  <p>
                    Explanation: The phrase 'that of women' is grammatically
                    correct, but adding 'the' before 'women' clarifies that we
                    are referring to a specific group of women (those taking the
                    driving test). This helps maintain consistency in referring
                    to both groups.
                  </p>
                </div>
              </div>

              <div className="general-comments">
                <h4 className="section-title">General comments</h4>
                <div className="correction-item">
                  <p>
                    Overall, the essay is well-written and demonstrates a solid
                    understanding of the topic.
                  </p>
                  <p>
                    However, implementing these minor adjustments can
                    significantly enhance clarity and coherence, making it
                    easier for readers to follow your arguments and fully grasp
                    your ideas. By refining specific sections and ensuring a
                    smooth flow between concepts, you can elevate the overall
                    quality of your work, ultimately leading to a more impactful
                    and engaging reading experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
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

export default Result;
