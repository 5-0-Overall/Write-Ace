import React, { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation logic
    if (email === "") {
      setErrorMessage("Please fill in the email field.");
      return;
    }

    // Perform reset password logic here
    console.log("Resetting password for:", email);
    setErrorMessage(""); // Clear error message
  };

  return (
    <div className="reset-password-container" style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.headingContainer}>
          <h2 style={styles.heading}>Reset Password</h2>
          <p style={{ marginBottom: "20px", fontSize: "20px" }}>
            Enter your email for a password reset link.
          </p>
        </div>

        <div className="input-container" style={styles.inputContainer}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email, phone & username"
            style={styles.input}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <a href="#" style={styles.link}>
          Forgot Email?
        </a>

        <button type="submit" style={styles.button}>
          Send Reset Link
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href="#"
            style={{ color: "#2b78e4", fontSize: "20px", fontWeight: "bold" }}
          >
            Back to Sign In
          </a>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
  },
  link: {
    color: "#2b78e4",
    fontStyle: "italic",
    fontSize: "20px",
    marginBottom: "50px",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "solid 1px #000",
    marginBottom: "70px",
  },
  heading: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: "50px",
    marginBottom: "20px",
  },
  p: {
    textAlign: "center",
    color: "black",
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
  button: {
    padding: "20px",
    backgroundColor: "#2d5bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
  },
};
