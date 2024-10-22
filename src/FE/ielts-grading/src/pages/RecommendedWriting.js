// Recommended.js
import React from "react";
import "../assets/styles/WritingPage.css";
import chart from "../assets/images/task1-img.png";

function Recommended() {
  return (
    <div className="recommended-container">
      <header className="recommended-header">
        <h1>Recommended Writing</h1>
        <button className="dashboard-btn">Dashboard</button>
      </header>

      <h2 className="section-title">Writing #1</h2>
      <div className="writing-card">
        <div className="task-content">
          <div className="task-description">
            <h3>Task 1</h3>
            <p>
              The chart shows the percentage of women and men in one Asian
              country who passed when they took their driving test between 1980
              and 2010.
            </p>
            <p>
              Summarise the information by selecting and reporting the main
              features, and make comparisons where relevant.
            </p>
            <p>You should spend about 20 minutes on this task.</p>
          </div>
          <div className="task-image">
            <img
              src={chart}
              alt="Chart showing driving test pass rates"
            />
          </div>
        </div>
        <div className="task-footer">
          <div className="task-buttons">
            <button className="task-btn">Task1</button>
            <button className="chart-btn">Chart</button>
          </div>
          <button className="writing-now-btn">Writing Now!</button>
        </div>
      </div>

      <h2 className="section-title">Detail band</h2>
      <div className="detail-band">
        <div className="band-scores">
          <div className="score-item">
            <span>Task achievement</span>
            <div className="score-bubble task-achievement">7.0</div>
          </div>
          <div className="score-item">
            <span>Coherence & Cohesion</span>
            <div className="score-bubble coherence">7.0</div>
          </div>
          <div className="score-item">
            <span>Lexical Resource</span>
            <div className="score-bubble lexical">7.0</div>
          </div>
          <div className="score-item">
            <span>Grammatical Range and Accuracy</span>
            <div className="score-bubble grammatical">7.0</div>
          </div>
          <div className="score-item">
            <span>Overall</span>
            <div className="score-bubble overall">7.0</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">Writing</h2>
      <div className="writing-section">
        <div className="user-info">
          <img
            src="https://avatar.iran.liara.run/public/4"
            alt="User avatar"
            className="user-avatar"
          />
          <span>Jack - J97</span>
        </div>
        <p className="writing-content">
          The chart illustrates the percentage of women and men who passed their
          driving tests in a specific Asian country between 1980 and 2010.
          Overall, it is evident that there were notable changes in the passing
          rates for both genders during this period.
        </p>
        <p className="writing-content">
          In 1980, the percentage of men who passed the driving test was
          significantly higher than that of women, with around 80% of men
          passing compared to about 50% of women. This gap indicates that men
          were more successful
        </p>
      </div>
    </div>
  );
}

export default Recommended;