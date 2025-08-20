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
        <div style={styles.card}>
          <div style={styles.cardHeader}>👨‍🏫 Manage Faculties</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/faculty/${username}`)}
                style={styles.actionBtn}
              >
                View All Faculties
              </button>
            </li>
      
          </ul>
        </div>

        {/* Students Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>🎓 Manage Students</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/student/${username}`)}
                style={styles.actionBtn}
              >
                View All Students
              </button>
            </li>
           
          </ul>
        </div>

        {/* Courses Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>📚 Manage Courses</div>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <button
                onClick={() => navigate(`/admin/courses/${username}`)}
                style={styles.actionBtn}
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
    background: "linear-gradient(to bottom right, #fdf2f8, #e0f2fe)",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: { fontWeight: "bold", fontSize: "20px" },
  nav: { display: "flex", alignItems: "center", gap: "15px" },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "0.3s",
    background: "rgba(255,255,255,0.1)",
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
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
    transition: "0.2s",
    borderBottom: "1px solid #eee",
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
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    padding: "20px",
    minWidth: "320px",
    transition: "0.3s",
  },
  cardHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#1d4ed8",
    borderBottom: "2px solid #bfdbfe",
    paddingBottom: "5px",
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  listItem: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontWeight: "500",
  },
  actionBtn: {
    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
    transition: "0.3s",
  },
};
