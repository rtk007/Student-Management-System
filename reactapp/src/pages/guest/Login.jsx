// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: username.trim(),
        password: password,
      });

      const { token, role, error: serverError } = response.data;

      if (serverError) {
        setError(serverError);
        setLoading(false);
        return;
      }

      if (!token || !role) {
        setError("Invalid response from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "STUDENT") navigate(`/student/dashboard/${username}`);
      else if (role === "FACULTY") navigate(`/faculty/dashboard/${username}`);
      else if (role === "ADMIN") navigate(`/admin/dashboard/${username}`);
      else if (role === "REGISTRAR") navigate(`/registrar/dashboard/${username}`);
      else navigate("/");
    } catch (err) {
      if (err.response?.data?.error) setError(err.response.data.error);
      else setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Section */}
        <div style={styles.brandSection}>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
              alt="Studzz Logo"
              style={{
                width: "clamp(140px, 20vw, 180px)",
                height: "clamp(140px, 20vw, 180px)",
                borderRadius: "50%",
                marginBottom: "32px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                border: "4px solid rgba(255,255,255,0.3)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.08) rotate(4deg)";
                e.currentTarget.style.boxShadow =
                  "0 14px 55px rgba(0,0,0,0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                e.currentTarget.style.boxShadow =
                  "0 10px 40px rgba(0,0,0,0.5)";
              }}
            />
            <Typography variant="h3" fontWeight="bold" sx={styles.title}>
              Studzz
            </Typography>
            <Typography variant="subtitle1" sx={styles.tagline}>
              Simplifying Education, Empowering Growth
            </Typography>
          </Box>
        </div>

        {/* Right Section */}
        <div style={styles.formSection}>
          <h1 style={styles.heading}>Login</h1>
          <p style={styles.subheading}>Enter your credentials to access your account</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button
              type="submit"
              style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/guest/register")}
              style={styles.registerButton}
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    display: "flex",
    width: "900px", // same width as register
    height: "600px", // fixed height for consistency
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  brandSection: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  formSection: {
    flex: 1,
    padding: "50px 40px",
    background: "rgba(255,255,255,0.95)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  logo: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    marginBottom: "25px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    mb: 2,
    textShadow: "0 3px 8px rgba(0,0,0,0.35)",
  },
  tagline: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.9)",
    maxWidth: "300px",
    mx: "auto",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#2d3748",
  },
  subheading: {
    fontSize: "16px",
    marginBottom: "30px",
    color: "#4a5568",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "14px 18px",
    marginBottom: "18px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    background: "rgba(255,255,255,0.95)",
  },
  button: {
    padding: "14px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
  },
  buttonDisabled: {
    background: "#a0aec0",
    cursor: "not-allowed",
  },
  registerButton: {
    background: "transparent",
    border: "none",
    color: "#667eea",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
    fontWeight: "500",
  },
  error: {
    color: "#e53e3e",
    marginBottom: "15px",
    fontSize: "14px",
    background: "rgba(229, 62, 62, 0.1)",
    padding: "10px",
    borderRadius: "8px",
  },
};
