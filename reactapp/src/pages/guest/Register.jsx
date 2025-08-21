// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        username: formData.username,
        email: formData.email,
        passwordHash: formData.password, // ✅ backend expects passwordHash
        role: formData.role,
      };

      console.log("Sending registration data:", requestData);

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        requestData
      );

      console.log("Registration response:", response.data);

      if (response.data.message === "SUCCESS") {
        alert("Registration successful! Redirecting to login...");
        navigate("/guest/login");
      } else if (response.data.error) {
        setError(response.data.error);
      } else {
        setError("Unexpected response: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error registering user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* LEFT FORM */}
        <div style={styles.formSection}>
          <h1 style={styles.heading}>Register</h1>
          <p style={styles.subheading}>Create your Studzz account</p>
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              style={styles.input}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={loading}
              style={{ ...styles.input, cursor: "pointer" }}
            >
              <option value="">Select Role</option>
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>

            {error && <p style={styles.error}>{error}</p>}

            <button
              type="submit"
              style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/guest/login")}
              style={styles.registerButton}
            >
              Already have an account? Login
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE + LOGO SIDE */}
        <div style={styles.imageSection}>
          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
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
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                mb: 3,
                color: "white",
                textShadow: "0 3px 10px rgba(0,0,0,0.35)",
                letterSpacing: "2px",
              }}
            >
              Studzz
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "rgba(255,255,255,0.9)",
                textAlign: "center",
                maxWidth: "360px",
                fontWeight: 300,
                letterSpacing: "0.6px",
                lineHeight: 1.6,
                margin: "0 auto",
              }}
            >
              Simplifying Education, Empowering Growth
            </Typography>
          </Box>
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
    width: "900px",
    maxWidth: "100%",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  formSection: {
    flex: 1,
    padding: "50px 40px",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#2d3748",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subheading: {
    fontSize: "16px",
    marginBottom: "40px",
    color: "#4a5568",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "16px 20px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s",
    background: "rgba(255, 255, 255, 0.9)",
  },
  button: {
    padding: "16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "12px",
    transition: "all 0.3s ease",
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
    transition: "color 0.3s ease",
  },
  error: {
    color: "#e53e3e",
    marginBottom: "15px",
    fontSize: "14px",
    background: "rgba(229, 62, 62, 0.1)",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(229, 62, 62, 0.2)",
  },
  imageSection: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "40px",
  },
};
