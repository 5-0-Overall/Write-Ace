import React from "react";
import wlogo from "../assets/images/wlogo.png";
import elearning_logo from "../assets/images/elearning_logo.jpg";
import intro from "../assets/images/intro.jpg";
import facebookLogo from "../assets/images/facebook-brands-solid.svg";
import instagramLogo from "../assets/images/instagram-brands-solid.svg";
import twitterLogo from "../assets/images/twitter-brands-solid.svg";
import "../App.css";

// Component LandingPage
function LandingPage() {
  return (
    <>
      <Navigation />
      <Body />
      <Social />
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

// Component Social
function Social() {
  return (
    <div className="social">
      <span>&copy; WriteAce 2024</span>
      <div className="social-logo">
        <span>Follow us:</span>
        <img src={facebookLogo} alt="facebook" />
        <img src={twitterLogo} alt="twitter" />
        <img src={instagramLogo} alt="instagram" />
      </div>
    </div>
  );
}

// Component Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="link">
        <h3>Quick Links</h3>
        <ul>
          <li>Features</li>
          <li>Live Share</li>
          <li>Video Record</li>
        </ul>
      </div>
      <div className="contact">
        <h3>Contact Us</h3>
        <ul>
          <li>Email: writeace@gmail.com</li>
          <li>Phone: 0123456789</li>
        </ul>
      </div>
      <div className="buttons">
        <button>Register</button>
        <button>Log in</button>
        <button>ADMIN</button>
      </div>
    </footer>
  );
}

function Body4() {
  return (
    <div className="body4" id="about">
      {" "}
      {/* Add id for scrolling */}
      <h2 className="heading">About Us</h2>
      <hr />
      <br />
      <div className="intro">
        <div className="intro-text">
          <h3>The 5.0 Overall Team</h3>
          <p>
            Our team includes 4 members: Quang Thang, Tam Thanh, Tuan Thanh, and
            Huu Bang, all majoring in Software Engineering at University of
            Science.
          </p>
        </div>
        <img src={intro} alt="intro" />
      </div>
      <div className="vision">
        <h3>Our Vision</h3>
        <p>
          Our vision is to help IELTS learners access quality resources at an
          affordable price. This website offers students detailed feedback on
          their essays with band scores based on the four criteria in IELTS
          Writing, as well as suggestions on how to improve their scores.
        </p>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div className="body3" id="resources">
      {" "}
      {/* Add id for scrolling */}
      <h2 className="heading">Our Topics</h2>
      <hr />
      <br />
      <div className="task-container">
        <div className="task task1">
          <h3>IELTS Writing Task 1</h3>
          <div className="all-types">
            <div>Bar Chart</div>
            <div>Line Graph</div>
            <div>Table</div>
            <div>Pie Chart</div>
            <div>Process Diagram</div>
            <div>Map</div>
            <div>Multiple Graphs</div>
          </div>
        </div>
        <div className="task task2">
          <h3>IELTS Writing Task 2</h3>
          <div className="all-types">
            <div>Opinion</div>
            <div>Advantages and Disadvantages</div>
            <div>Problem and Solution</div>
            <div>Discussion</div>
            <div>Two-part Questions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body2() {
  return (
    <div className="body2" id="steps">
      {" "}
      {/* Add id for scrolling */}
      <div className="step">Correct Grammar Mistakes</div>
      <div className="step">Vocabulary Enhancement</div>
      <div className="step">Evaluate on 4 Criteria</div>
    </div>
  );
}

function Body1() {
  return (
    <div className="body1" id="home">
      {" "}
      {/* Add id for scrolling */}
      <div>
        <h1>Elevate Your IELTS Writing with AI Precision</h1>
        <p>Improve your writing skills with GPT</p>
      </div>
      <img src={elearning_logo} alt="e-learning logo" />
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

export default LandingPage;
