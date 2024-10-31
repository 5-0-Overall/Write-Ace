import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  Facebook, 
  Twitter, 
  Instagram
} from "lucide-react";
import contactImg from "../assets/images/contact_us.png";
import "../styles/Contact.css";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://formcarry.com/s/jyU7SDqP7Ss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (data.code === 200) {
        setSubmitted(true);
        setEmail("");
        setMessage("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={24} />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="contact-main">
        <div className="contact-card">
          <div className="contact-image-container">
            <img 
              src={contactImg} 
              alt="Contact Us" 
              loading="lazy"
            />
          </div>
          
          <div className="contact-content">
            <h1>Get in Touch</h1>
            <p className="contact-subtitle">
              We're here to help and answer any questions you might have
            </p>
            
            <div className="contact-info">
              <div className="info-item" onClick={() => window.location.href = 'mailto:writeace@gmail.com'}>
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-text">
                  <h4>Email</h4>
                  <span>writeace@gmail.com</span>
                </div>
              </div>
              
              <div className="info-item" onClick={() => window.location.href = 'tel:0123456789'}>
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div className="info-text">
                  <h4>Phone</h4>
                  <span>0123456789</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-text">
                  <h4>Location</h4>
                  <span>Ho Chi Minh City, Vietnam</span>
                </div>
              </div>
            </div>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            
            {submitted ? (
              <div className="success-container" role="alert">
                <p className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    aria-required="true"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="How can we help you?"
                    rows={5}
                    aria-required="true"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={!email || !message}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>WriteAce</h3>
            <p className="footer-description">
              Empowering students worldwide with AI-powered IELTS writing preparation
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#resources">Resources</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="/practice">Practice Tests</a></li>
              <li><a href="/tutorials">Video Tutorials</a></li>
              <li><a href="/tips">Writing Tips</a></li>
              <li><a href="/samples">Sample Essays</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} WriteAce. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/faq">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
