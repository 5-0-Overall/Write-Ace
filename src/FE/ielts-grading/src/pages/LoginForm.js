import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fb from "../assets/images/facebook_logo.svg";
import gg from "../assets/images/google_logo.svg";
import apple from "../assets/images/apple_logo.svg";
import eyeIcon from "../assets/images/eye_icon.svg";
import eyeOffIcon from "../assets/images/eye_off_icon.svg";
import "../styles/LoginForm.css";
import AuthService from "../services/AuthService";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    // Username: characters, numbers, underscores, 3-20 characters long
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    // Password: at least 6 characters long
    const passwordRegex = /^.{6,}$/;

    if (!username) {
      setErrorMessage("Username is required.");
      return false;
    }

    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
      );
      return false;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login(username, password);
      if (response.access_token) {
        const dashboardRoute = AuthService.getDashboardRoute();
        navigate(dashboardRoute);
      }
    } catch (error) {
      let errorMsg = "Login failed";
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMsg = "Invalid username or password";
            break;
          default:
            errorMsg = error.response.data?.message || errorMsg;
        }
      }
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
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
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
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

          <a href="*" className="forgot-password">
            Forgot Password?
          </a>

          <button
            type="submit"
            disabled={loading}
            className={`button ${loading ? 'loading' : ''}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="or-text">Or Sign in with</p>

          <div className="logo-container">
            <a href="*">
              <img src={gg} alt="Google" />
            </a>
            <a href="*">
              <img src={fb} alt="Facebook" />
            </a>
            <a href="*">
              <img src={apple} alt="Apple" />
            </a>
          </div>

          <Link to="/register" className="register-link">
            Don't have an account? <strong>Register now</strong>
          </Link>
          <br />
          <div className="button">
            <Link to="/">Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
