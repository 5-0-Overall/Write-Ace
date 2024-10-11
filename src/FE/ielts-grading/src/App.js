import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";
import Registration from "./Registration";
import wlogo from "./Images/wlogo.png";
import elearning_logo from "./Images/elearning_logo.jpg";
import intro from "./Images/intro.jpg";
import faFacebook from "./Images/facebook-brands-solid.svg";
import faInstagram from "./Images/instagram-brands-solid.svg";
import faTwitter from "./Images/twitter-brands-solid.svg";

function App() {
  return (
    <>
      {/* <Home /> */}
      {/* <LoginForm /> */}
      {/* <ResetPassword /> */}
      <Registration />
    </>
  );
}

function Home() {
  return (
    <>
      <Navigation />
      <Body />
    </>
  );
}

function Body() {
  return (
    <>
      <Body1 />
      <Body2 />
      <Body3 />
      <Body4 />
      <Footer />
      <Social />
    </>
  );
}

function Social() {
  return (
    <div className="social">
      <span>&copy; WriteAce 2024</span>
      <div className="social-logo">
        <span>Follow us:</span>
        <img src={faFacebook} alt="facebook" />
        <img src={faTwitter} alt="twitter" />
        <img src={faInstagram} alt="instagram" />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="link">
        <h3>Quick link</h3>
        <ul>
          <li>Features</li>
          <li>Live share</li>
          <li>Video record</li>
        </ul>
      </div>
      <div className="contact">
        <h3>Contact us</h3>
        <ul>
          <li>writeace@gmail.com</li>
          <li>0123456789</li>
        </ul>
      </div>
      <div className="button">
        <button>Register</button>
        <button>Log in</button>
        <button>ADMIN</button>
      </div>
    </footer>
  );
}

function Body4() {
  return (
    <div className="body4">
      <h2 className="heading">About us</h2>
      <div className="intro">
        <div className="intro-text">
          <h3>The 5.0 Overall team</h3>
          <p>
            Our team includes 4 members: Quang Thang, Tam Thanh, Tuan Thanh, Huu
            Bang, all of whom major in Software Engineering at University of
            Science
          </p>
        </div>
        <img src={intro} alt="intro-img" />
      </div>
      <div className="vision">
        <h3>Our vision</h3>
        <p>
          Our vision is to help IELTS learners get access to quality resources
          with minimal prize. This website helps students get detailed feedbacks
          from their essays with band score according to 4 criteria in IELTS
          Writing. In addition, it also suggests the way to get higher band base
          on students' ideas.
        </p>
      </div>
    </div>
  );
}

function Body3() {
  return (
    <div className="body3">
      <h2 className="heading">Our topics</h2>
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
    <div class="body2">
      <div class="step">Correct grammar mistakes</div>
      <div class="step">Vocabulary enhancement</div>
      <div class="step">Evaluate according to 4 criteria</div>
    </div>
  );
}

function Body1() {
  return (
    <div className="body1">
      <div>
        <h1>Elevate Your IELTS Writing with AI Precision</h1>
        <p>Improve your writing skill with GPT</p>
      </div>
      <img src={elearning_logo} alt="elearning_logo" />
    </div>
  );
}

function Navigation() {
  const [activeLink, setActiveLink] = useState(() => {
    // Retrieve the initial state from localStorage
    return localStorage.getItem("activeLink") || "Home";
  });

  useEffect(() => {
    // Save the active link to localStorage whenever it changes
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  function handleClickEvent(link) {
    setActiveLink(link);
  }
  return (
    <nav className="nav">
      <div className="logo">
        <img src={wlogo} alt="logo" />
        <span>WriteAce</span>
      </div>
      <ul className="nav-link">
        <li onClick={() => handleClickEvent("Home")}>
          <a href="/" className={activeLink === "Home" ? "active" : ""}>
            Home
          </a>
        </li>
        <li onClick={() => handleClickEvent("About")}>
          <a href="/about" className={activeLink === "About" ? "active" : ""}>
            About
          </a>
        </li>
        <li onClick={() => handleClickEvent("Resources")}>
          <a
            href="/resources"
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
            <a href="/getstarted">Get started</a>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default App;
