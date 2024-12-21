import React from "react";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Article.css";

const SampleArticle = () => {
  return (
    <div>
      <div className="article-container">
        <header className="article-header">
          <div className="header-left">
            <h2 className="recommended-title">Recommended Writing</h2>
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
              <button className="btn writing-btn">Writing Now!</button>
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
                <span className="band-label">
                  Grammatical Range & Accuracy
                </span>
                <div className="band-score blue">7.0</div>
              </div>
              <div className="band-item">
                <span className="band-label">Overall Band</span>
                <div className="band-score gray">7.0</div>
              </div>
            </div>

            <div className="writing-section">
              <div className="author-section">
                <img
                  src="https://avatar.iran.liara.run/public/4"
                  alt="Author avatar"
                  className="author-avatar"
                />
                <span className="author-name">Jack - J97</span>
              </div>

              <div className="essay-content">
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
                  that time. Over the next two decades, both genders showed an
                  upward trend, but the increase was more pronounced for women.
                </p>
                <p>
                  By 1990, the percentage of women who passed the test rose to
                  approximately 60%, while the percentage of men slightly
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
                  nearly 80%, while men's passing rate reached around 95%.
                  Although men consistently outperformed women in the driving
                  test, the gap had decreased over the years.
                </p>
                <p>
                  In summary, the data reveals an overall improvement in the
                  driving test passing rates for both men and women from 1980 to
                  2010. While men remained the strongest gender in terms of
                  passing rate throughout this period, women made significant
                  progress, leading to a gradual reduction in the gender gap.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="feedback-section">
          <h4 className="feedback-title">Feedback</h4>
          <div className="feedback-content">
            <div className="feedback-header">
              <div className="feedback-author">
                <img
                  src="https://avatar.iran.liara.run/public/4"
                  alt="Teacher avatar"
                  className="author-avatar"
                />
                <div className="author-info">
                  <span className="author-name">Sarah Williams</span>
                  <span className="author-role">Writing Teacher</span>
                </div>
              </div>
              <div className="feedback-actions">
                <button className="icon-button">
                  <MessageSquare size={20} />
                  <span>Comment</span>
                </button>
                <button className="icon-button">
                  <ThumbsUp size={20} />
                  <span>Helpful</span>
                </button>
              </div>
            </div>
            <div className="feedback-text">
              <p>
                This is a well-structured response that effectively analyzes the
                trends in driving test pass rates between men and women. The
                introduction clearly states the main focus, and the body
                paragraphs are organized chronologically, making it easy to
                follow the changes over time.
              </p>
              <p>
                You've made good use of specific data points to support your
                analysis, and your comparisons between men's and women's pass
                rates are clear and relevant. The conclusion successfully
                summarizes the key trends and acknowledges both the persistent
                gap and the progress made by women.
              </p>
              <p>To improve further, you could:</p>
              <ul>
                <li>
                  Include more specific percentage differences between genders
                  at key points
                </li>
                <li>Analyze possible reasons for the trends observed</li>
                <li>
                  Use more complex grammatical structures to vary your writing
                  style
                </li>
              </ul>
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

export default SampleArticle;
