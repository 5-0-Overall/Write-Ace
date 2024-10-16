import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fb from "../assets/images/facebook_logo.svg";
import gg from "../assets/images/google_logo.svg";
import apple from "../assets/images/apple_logo.svg";
import eyeIcon from "../assets/images/eye_icon.svg";
import eyeOffIcon from "../assets/images/eye_off_icon.svg";
import '../assets/styles/LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    if (email === "admin@gmail.com" && password === "123") {
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Let's Sign You In</h2>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email, phone & username"
              required
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="eye-button"
              >
                <img
                  src={showPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle Password Visibility"
                  className="eye-icon"
                />
              </button>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="button">
            Sign In
          </button>

          <p className="or-text">Or Sign in with</p>

          <div className="logo-container">
            <a href="#"><img src={gg} alt="Google" /></a>
            <a href="#"><img src={fb} alt="Facebook" /></a>
            <a href="#"><img src={apple} alt="Apple" /></a>
          </div>

          <a href="/register" className="register-link">
            Don't have an account? <strong>Register now</strong>
          </a>
          <br/>
          <div className="button">
            <Link to="/">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;