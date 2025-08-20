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
        <div style={styles.card} onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)} onMouseLeave={(e) => Object.assign(e.target.style, {transform: "translateY(0)", boxShadow: styles.card.boxShadow})}>
          <div style={styles.profileCardHeader}>
            👨‍🎓 Student Profile
          </div>
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
        <div style={styles.card} onMouseEnter={(e) => Object.assign(e.target.style, styles.cardHover)} onMouseLeave={(e) => Object.assign(e.target.style, {transform: "translateY(0)", boxShadow: styles.card.boxShadow})}>
          <div style={styles.announcementHeader}>
            📢 Recent Announcements
          </div>
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
    cursor: "pointer",
  },
  profileWrapper: { position: "relative", display: "flex", alignItems: "center", cursor: "pointer" },
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
    flex: "1 1 400px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "20px",
    minWidth: "350px",
    transition: "all 0.3s ease",
  },
  cardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
  },
  profileCardHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#667eea",
    borderBottom: "2px solid rgba(102, 126, 234, 0.2)",
    paddingBottom: "5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  profileContent: { display: "flex", gap: "20px", alignItems: "center" },
  profileImage: { 
    width: "100px", 
    height: "100px", 
    borderRadius: "50%", 
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    border: "3px solid rgba(102, 126, 234, 0.2)",
  },
  profileDetails: { lineHeight: "1.6", fontWeight: "500" },
  announcementHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#764ba2",
    borderBottom: "2px solid rgba(118, 75, 162, 0.2)",
    paddingBottom: "5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  announcementList: { listStyle: "none", padding: 0, margin: 0 },
  announcementItem: {
    padding: "10px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    fontWeight: "500",
    color: "#4a5568",
  },
  loading: { 
    textAlign: "center", 
    marginTop: "50px", 
    fontSize: "18px", 
    color: "white",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },
  error: { 
    textAlign: "center", 
    marginTop: "50px", 
    fontSize: "18px", 
    color: "white",
    background: "rgba(229, 62, 62, 0.2)",
    padding: "20px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(229, 62, 62, 0.3)",
  },
};
