import React, { useState, useEffect } from "react";
import wlogo from "../assets/images/logo.svg";
import elearning_logo from "../assets/images/elearning_logo.jpg";
import intro from "../assets/images/intro.jpg";
import { Facebook, Twitter, Instagram, ArrowUp } from "lucide-react";
import "../styles/Landing.css";
import "../App.css";

// Component LandingPage
function LandingPage() {
  return (
    <>
      <Navigation />
      <Body />
      <BackToTop />
    </>
  );
}

// Component Body
function Body() {
  return (
    <>
      <Body1 />
      <Body2 />
      <Body3 />
      <Body4 />
      <Footer />
    </>
  );
}

// Component Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>WriteAce</h3>
          <p className="footer-description">
            Empowering students worldwide with AI-powered IELTS writing
            preparation
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="/practice">Practice Tests</a>
            </li>
            <li>
              <a href="/tutorials">Video Tutorials</a>
            </li>
            <li>
              <a href="/tips">Writing Tips</a>
            </li>
            <li>
              <a href="/samples">Sample Essays</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 WriteAce. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/faq">FAQ</a>
        </div>
      </div>
    </footer>
  );
}

function Body4() {
  return (
    <div className="section" id="about">
      <div className="section-container">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">
          Meet the team behind WriteAce and learn about our mission
        </p>
        <div className="about-container">
          <div className="card">
            <div className="intro">
              <div className="intro-text">
                <span className="highlight">The 5.0 Overall Team</span>
                <hr />
                <br />
                <p className="italic-text">
                  Our team consists of passionate Software Engineering students
                  from the University of Science who understand the challenges
                  of IELTS preparation.
                </p>

                <br />
                <ul className="team-list">
                  <li>
                    <strong>Quang Thang</strong>
                    <span>Backend Developer</span>
                  </li>
                  <li>
                    <strong>Tam Thanh</strong>
                    <span>Frontend Developer</span>
                  </li>
                  <li>
                    <strong>Tuan Thanh</strong>
                    <span>Frontend Developer</span>
                  </li>
                  <li>
                    <strong>Huu Bang</strong>
                    <span>Tester</span>
                  </li>
                  <li>
                    <strong>Van Quan</strong>
                    <span>Frontend Developer</span>
                  </li>
                </ul>
                <div className="team-stats">
                  <div className="stat-item">
                    <h4>1000+</h4>
                    <p>Essays Graded</p>
                  </div>
                  <div className="stat-item">
                    <h4>98%</h4>
                    <p>Accuracy Rate</p>
                  </div>
                  <div className="stat-item">
                    <h4>24/7</h4>
                    <p>Support</p>
                  </div>
                </div>
              </div>
              <div className="image-wrapper">
                <img src={intro} alt="Our Team" className="team-image" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
          <div className="card">
            <span className="highlight">Our Mission</span>
            <hr />
            <br />
            <div className="vision-content">
              <p className="italic-text">
                We believe that quality IELTS preparation should be accessible
                to everyone. Our platform combines cutting-edge AI technology
                with proven educational methods to help you achieve your target
                score.
              </p>
              <ul className="vision-list">
                <li>
                  <strong>Affordable Learning</strong>
                  <p>High-quality resources at student-friendly prices</p>
                </li>
                <li>
                  <strong>AI-Powered Feedback</strong>
                  <p>Instant, detailed essay evaluation</p>
                </li>
                <li>
                  <strong>Accurate Scoring</strong>
                  <p>Band score predictions aligned with IELTS criteria</p>
                </li>
                <li>
                  <strong>Personalized Growth</strong>
                  <p>Tailored improvement suggestions for each student</p>
                </li>
              </ul>
              <div className="cta-container">
                <button className="cta-button">Start Free Trial</button>
                <button className="secondary-button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div className="section" id="resources">
      <div className="section-container">
        <h2 className="section-title">Practice Resources</h2>
        <p className="section-subtitle">
          Comprehensive practice materials covering all IELTS Writing topics
        </p>
        <div className="task-container">
          <div className="card">
            <h3 className="highlight">IELTS Writing Task 1</h3>
            <p className="task-description italic-text">
              Master the art of describing visual information in academic
              settings
            </p>
            <div className="all-types">
              <div className="topic-item">
                <h4 className="highlight">Bar Charts</h4>
                <p>Compare data across categories</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Line Graphs</h4>
                <p>Analyze trends over time</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Pie Charts</h4>
                <p>Understand proportions and percentages</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Maps</h4>
                <p>Describe geographical changes</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Process Diagrams</h4>
                <p>Explain steps and cycles</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="highlight">IELTS Writing Task 2</h3>
            <p className="task-description italic-text">
              Develop your essay writing skills with various question types
            </p>
            <div className="all-types">
              <div className="topic-item">
                <h4 className="highlight">Opinion Essays</h4>
                <p>Express and support your views</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Discussion Essays</h4>
                <p>Analyze different perspectives</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Problem Solution</h4>
                <p>Address issues and propose solutions</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Advantages Disadvantages</h4>
                <p>Evaluate pros and cons</p>
              </div>
              <div className="topic-item">
                <h4 className="highlight">Double Question</h4>
                <p>Handle multiple question types</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body2() {
  return (
    <div className="section" id="steps">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Our AI-powered platform makes IELTS writing practice efficient and
          effective
        </p>
        <div className="steps-timeline">
          <div className="card step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Grammar Check</h3>
              <p>Advanced AI detects and corrects grammar mistakes instantly</p>
              <ul className="feature-list">
                <li>Real-time error detection</li>
                <li>Contextual corrections</li>
                <li>Explanation of mistakes</li>
              </ul>
            </div>
          </div>
          <div className="card step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Vocabulary Enhancement</h3>
              <p>Get suggestions for better word choices and collocations</p>
              <ul className="feature-list">
                <li>Academic word suggestions</li>
                <li>Collocation improvements</li>
                <li>Vocabulary level analysis</li>
              </ul>
            </div>
          </div>
          <div className="card step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>IELTS Evaluation</h3>
              <p>Receive detailed feedback on all 4 IELTS criteria</p>
              <ul className="feature-list">
                <li>Band score prediction</li>
                <li>Detailed feedback</li>
                <li>Improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body1() {
  return (
    <div className="body1" id="home">
      <div className="hero-content">
        <h1>Elevate Your IELTS Writing</h1>
        <h2 className="subtitle">with AI Precision</h2>
        <p className="italic-text">Improve your writing skills with GPT-powered feedback</p>
        <button className="cta-button">Start Writing Now</button>
      </div>
      <div className="hero-image">
        <img src={elearning_logo} alt="e-learning logo" />
      </div>
    </div>
  );
}

function Navigation() {
  const [activeLink, setActiveLink] = React.useState(() => {
    return localStorage.getItem("activeLink") || "Home";
  });

  React.useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  function handleClickEvent(link) {
    setActiveLink(link);
    const element = document.getElementById(link.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav className="nav">
      <div className="logo">
        <img src={wlogo} alt="logo" />
        <span>WriteAce</span>
      </div>
      <ul className="nav-link">
        <li onClick={() => handleClickEvent("Home")}>
          <a href="#home" className={activeLink === "Home" ? "active" : ""}>
            Home
          </a>
        </li>
        <li onClick={() => handleClickEvent("About")}>
          <a href="#about" className={activeLink === "About" ? "active" : ""}>
            About
          </a>
        </li>
        <li onClick={() => handleClickEvent("Resources")}>
          <a
            href="#resources"
            className={activeLink === "Resources" ? "active" : ""}
          >
            Resources
          </a>
        </li>
        <li onClick={() => handleClickEvent("Contact")}>
          <a
            href="/contact"
            className={activeLink === "Contact" ? "active" : ""}
          >
            Contact
          </a>
        </li>
        <li>
          <button className="btn-login">
            <a href="/login">Login</a>
          </button>
        </li>
        <li>
          <button className="btn-started">
            <a href="/register">Get Started</a>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <ArrowUp size={24} />
    </button>
  );
}

export default LandingPage;
