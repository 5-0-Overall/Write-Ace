import React, { useState } from "react";
import fb from "./Images/facebook_logo.svg";
import apple from "./Images/google_logo.svg";
import  gg from "./Images/apple_logo.svg";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation logic
    if (email === "" || password === "") {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    // Perform login logic here
    console.log("Logging in with:", email, password);
    setErrorMessage(""); // Clear error message
  };

  return (
    <div className="login-container" style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Let's sign you up</h2>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Email, phone & username"
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Password"
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Re-enter Password</label>
          <input
            type="password"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
            style={styles.input}
            placeholder="Re-enter Password"
            required
          />
        </div>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" style={styles.button}>
          Sign in
        </button>

        <p style={{ textAlign: "center", padding: "10px" }}>Or</p>

        <div style={styles.logoContainer}>
          <a href="#">
            <img style={styles.img} src={gg} alt="gg" />
          </a>
          <a href="#">
            <img style={styles.img} src={fb} alt="fb" />
          </a>
          <a href="#">
            <img style={styles.img} src={apple} alt="apple" />
          </a>
        </div>

        <Link to="/register" style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <strong style={styles.strong}>Sign in</strong>
        </Link>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/">
            <button style={styles.backButton}>Back to Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  strong: {
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  img: {
    width: "30px",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "100px",
    paddingRight: "100px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "500px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  },
  backButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Registration;
