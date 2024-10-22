import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import fb from '../assets/images/facebook_logo.svg';
import gg from '../assets/images/google_logo.svg';
import apple from '../assets/images/apple_logo.svg';
import eyeIcon from '../assets/images/eye_icon.svg';
import eyeOffIcon from '../assets/images/eye_off_icon.svg';
import '../assets/styles/LoginForm.css';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    // Username validation: 3-20 characters, letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      setErrorMessage("Username must be 3-20 characters long and can only contain letters, numbers, and underscores.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Password validation: at least 6 characters
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
      });

      console.log('Registration successful:', response.data);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>

          <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-container">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
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

          <div className="input-container">
            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="eye-button"
              >
                <img
                  src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                  alt="Toggle Password Visibility"
                  className="eye-icon"
                />
              </button>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="button">
            Register
          </button>

          <p className="or-text">Or Register With</p>
          <div className="logo-container">
            <a href="*"><img src={gg} alt="Google" /></a>
            <a href="*"><img src={fb} alt="Facebook" /></a>
            <a href="*"><img src={apple} alt="Apple" /></a>
          </div>

          <Link to="/login" className="register-link">
            Already have an account? <strong>Sign in now</strong>
          </Link>
          <br />
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

export default RegistrationForm;