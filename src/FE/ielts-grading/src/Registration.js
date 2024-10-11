import React, { useState } from "react";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
          <h2 style={styles.heading}>Lets Register Account</h2>
          <p style={{ marginBottom: "20px", fontSize: "20px" }}>
            Hello user, you have a grateful journey
          </p>
        </div>

        <div className="input-container" style={styles.inputContainer}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            style={styles.input}
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            style={styles.input}
            required
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            style={styles.input}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <a href="#" style={{ textAlign: "center" }}>
          Already have an account? <strong style={styles.strong}>Login</strong>
        </a>
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
    marginBottom: "10px",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  strong: {
    fontWeight: "bold",
  },
};
