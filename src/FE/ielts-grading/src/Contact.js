import { useState } from "react";
import { Link } from "react-router-dom";
import contactImg from "./Images/contact_us.png";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    // Form receive endpoint API
    fetch("https://formcarry.com/s/jyU7SDqP7Ss", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, message: message }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => setError(error.message));
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img
          src={contactImg}
          alt="Contact Us"
          style={styles.image}
        />
      </div>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Contact Us</h1>
        <p style={styles.slogan}>We'd love to hear from you!</p>
        {error && <p style={styles.error}>{error}</p>}
        {submitted ? (
          <p style={styles.success}>
            We've received your message, thank you for contacting us!
          </p>
        ) : (
          <>
            <Link to="/">
              <button style={styles.backButton}>Back to Home</button>
            </Link>
            <form onSubmit={submit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={styles.textarea}
                />
              </div>
              <button type="submit" style={styles.button}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    maxWidth: "1200px",
    margin: "auto",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#007bff",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  formContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "10px",
  },
  slogan: {
    fontSize: "1.2em",
    marginBottom: "20px",
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  success: {
    color: "green",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Giúp đảm bảo biểu mẫu chiếm 100% chiều rộng
    maxWidth: "400px", // Giới hạn chiều rộng tối đa của biểu mẫu
  },
  formGroup: {
    marginBottom: "15px",
  },
  formLabel: {
    display: "block",
    marginBottom: "5px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    minHeight: "100px", // Đặt chiều cao tối thiểu cho textarea
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "center",
  },
  backButton: {
    padding: "10px 15px",
    backgroundColor: "#6c757d", // Màu nền cho nút Back to Home
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "15px", // Để tạo khoảng cách giữa nút và biểu mẫu
    transition: "background-color 0.3s ease",
  },
};
