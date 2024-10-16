import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fb from '../assets/images/facebook_logo.svg';
import gg from '../assets/images/google_logo.svg';
import apple from '../assets/images/apple_logo.svg';
import eyeIcon from '../assets/images/eye_icon.svg';
import eyeOffIcon from '../assets/images/eye_off_icon.svg';
import '../assets/styles/LoginForm.css';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted:', { email, password, confirmPassword });
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
          <button type="submit" className="button">
            Register
          </button>
          <p className="or-text">Or Register With</p>
          <div className="logo-container">
            <a href="#"><img src={gg} alt="Google" /></a>
            <a href="#"><img src={fb} alt="Facebook" /></a>
            <a href="#"><img src={apple} alt="Apple" /></a>
          </div>
          <a href="/login" className="register-link">
            Already have an account? <strong>Sign in now</strong>
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

export default RegistrationForm;