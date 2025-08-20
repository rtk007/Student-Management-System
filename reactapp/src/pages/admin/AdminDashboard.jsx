import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🛠 Admin Portal</div>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Dashboard</a>
          <a href="#" style={styles.navLink}>Reports</a>
          <a href="#" style={styles.navLink}>Settings</a>

          <div style={styles.profileWrapper} onClick={() => setDropdownOpen(prev => !prev)}>
            <span style={styles.profileIcon}>👤</span>
            <span style={styles.profileName}>admin@{username}</span>
            <span
              style={{
                ...styles.dropdownArrow,
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            >
              ⌄
            </span>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <button
                  style={styles.dropdownBtn}
                  onClick={() => navigate(`/admin/update/${username}`)}
                >
                  Update Profile
                </button>
                <button style={styles.dropdownBtn}>System Settings</button>
                <button
                  style={{ ...styles.dropdownBtn, color: "#e53935" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.cardsContainer}>
        {/* Faculties Card */}
        <div style={styles.card} onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
          <div style={styles.cardHeader}>👨‍🏫 Manage Faculties</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/faculty/${username}`)}
                style={styles.actionBtn}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                View All Faculties
              </button>
            </li>
      
          </ul>
        </div>

        {/* Students Card */}
        <div style={styles.card} onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
          <div style={styles.cardHeader}>🎓 Manage Students</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/student/${username}`)}
                style={styles.actionBtn}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                View All Students
              </button>
            </li>
           
          </ul>
        </div>

        {/* Courses Card */}
        <div style={styles.card} onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
          <div style={styles.cardHeader}>📚 Manage Courses</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/courses/${username}`)}
                style={styles.actionBtn}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                View Courses
              </button>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}

// CSS styles (inline like FacultyDashboard)
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { 
    fontWeight: "bold", 
    fontSize: "24px",
    background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  nav: { display: "flex", alignItems: "center", gap: "15px" },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  profileWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  profileIcon: { marginRight: "8px" },
  profileName: { fontWeight: "500", marginRight: "4px" },
  dropdownArrow: { transition: "transform 0.3s" },
  dropdownMenu: {
    position: "absolute",
    top: "35px",
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    minWidth: "160px",
    overflow: "hidden",
    zIndex: 200,
  },
  dropdownBtn: {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    textAlign: "left",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    color: "#2d3748",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "30px",
    padding: "0 20px",
  },
  card: {
    flex: "1 1 350px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "20px",
    minWidth: "320px",
    transition: "all 0.3s ease",
  },
  cardHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#667eea",
    borderBottom: "2px solid rgba(102, 126, 234, 0.2)",
    paddingBottom: "5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: {
    padding: "10px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    fontWeight: "500",
  },
  actionBtn: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
};
