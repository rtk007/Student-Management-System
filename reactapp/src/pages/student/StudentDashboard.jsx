import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const { username } = useParams(); // username is actually studentId
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/students/by-student-id/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch student data");
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🎓 Student Portal</div>
        <nav style={styles.nav}>
  <button
    style={styles.navLink}
    onClick={() => navigate(`/student/courses/${student.studentId}`)}
  >
    View Courses
  </button>

  <button
    style={styles.navLink}
    onClick={() => navigate(`/student/view-grades/${student.studentId}`)}
  >
    Grades
  </button>

  <button
    style={styles.navLink}
    onClick={() => navigate("/contact-us")}
  >
    Contact Us
  </button>

  <div
    style={styles.profileWrapper}
    onClick={() => setDropdownOpen((prev) => !prev)}
  >
    <span style={styles.profileIcon}>👤</span>
    <span style={styles.profileName}>{student.studentName}</span>
    <span
      style={{
        ...styles.dropdownArrow,
        transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      ⌄
    </span>
    {dropdownOpen && (
      <div style={styles.dropdownMenu}>
        <button
          style={styles.dropdownBtn}
          onClick={() =>
            navigate(`/student/update-profile/${student.studentId}`)
          }
        >
          Update Profile
        </button>
        <button style={styles.dropdownBtn}>Settings</button>
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
        {/* Profile Card */}
        <div style={styles.card}>
          <div style={styles.profileCardHeader}>Student Profile</div>
          <div style={styles.profileContent}>
            <img src="https://via.placeholder.com/100" alt="Profile" style={styles.profileImage} />
            <div style={styles.profileDetails}>
              <p><strong>Name:</strong> {student.studentName}</p>
              <p><strong>ID:</strong> {student.studentId}</p>
              <p><strong>Birthdate:</strong> {student.birthdate || "N/A"}</p>
              <p><strong>Course:</strong> {student.enrolledIn}</p>
              <p><strong>Phone</strong> {student.phone|| "N/A"}</p>
              <p><strong>Batch:</strong> {student.expectedGraduation || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Announcements Card */}
        <div style={styles.card}>
          <div style={styles.announcementHeader}>📢 Recent Announcements / Shortcuts</div>
          <ul style={styles.announcementList}>
            <li style={styles.announcementItem}>📝 Assignment 3 due next week</li>
            <li style={styles.announcementItem}>📅 Mid-term exams start from 25th Aug</li>
            <li style={styles.announcementItem}>📚 Library will remain open till 9 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Styling
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom right, #e0f7fa, #e1bee7)",
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
  navLink: { color: "white", textDecoration: "none", fontWeight: "500", padding: "6px 12px", borderRadius: "6px", transition: "0.3s", background: "rgba(255,255,255,0.1)" },
  profileWrapper: { position: "relative", display: "flex", alignItems: "center", cursor: "pointer" },
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
    flex: "1 1 400px",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    padding: "20px",
    minWidth: "350px",
    transition: "0.3s",
  },
  profileCardHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#3b82f6",
    borderBottom: "2px solid #dbeafe",
    paddingBottom: "5px",
  },
  profileContent: { display: "flex", gap: "20px", alignItems: "center" },
  profileImage: { width: "100px", height: "100px", borderRadius: "50%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  profileDetails: { lineHeight: "1.6", fontWeight: "500" },
  announcementHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#ef4444",
    borderBottom: "2px solid #fee2e2",
    paddingBottom: "5px",
  },
  announcementList: { listStyle: "none", padding: 0, margin: 0 },
  announcementItem: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontWeight: "500",
  },
  loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#1e40af" },
  error: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#b91c1c" },
};
