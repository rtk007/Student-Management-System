import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FacultyDashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:8080/api/faculty/username/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFaculty(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch faculty data");
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <p style={styles.loading}>Loading faculty dashboard...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>👨‍🏫 Faculty Portal</div>
        <nav style={styles.nav}>
          <a href="#" style={styles.navLink}>Manage Courses</a>
          <a href="#" style={styles.navLink}>Assign Grades</a>
          <a href="#" style={styles.navLink}>Notifications</a>

          <div style={styles.profileWrapper} onClick={() => setDropdownOpen(prev => !prev)}>
            <span style={styles.profileIcon}>👤</span>
            <span style={styles.profileName}>{faculty.name}</span>
            <span style={{ ...styles.dropdownArrow, transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</span>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <button
                  style={styles.dropdownBtn}
                  onClick={() => navigate(`/faculty/update/${username}`)}
                >
                  Update Profile
                </button>
                <button style={styles.dropdownBtn}>Settings</button>
                <button style={{ ...styles.dropdownBtn, color: "#e53935" }} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.cardsContainer}>
        {/* Profile Card */}
        <div style={styles.card}>
          <div style={styles.profileCardHeader}>Faculty Profile</div>
          <div style={styles.profileContent}>
            <img src="https://via.placeholder.com/100" alt="Profile" style={styles.profileImage} />
            <div style={styles.profileDetails}>
              <p><strong>Name:</strong> {faculty.name}</p>
              <p><strong>ID:</strong> {faculty.employeeId}</p>
              <p><strong>Department:</strong> {faculty.department || "N/A"}</p>
              <p><strong>Title:</strong> {faculty.title || "N/A"}</p>
              <p><strong>Specialization:</strong> {faculty.specialization || "N/A"}</p>
              <p><strong>Hire Date:</strong> {faculty.hireDate || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Actions Card */}
        <div style={styles.card}>
          <div style={styles.announcementHeader}>📌 Quick Actions</div>
          <ul style={styles.announcementList}>
            <li style={styles.announcementItem}>
              <button onClick={() => navigate(`/faculty/manage-courses/${username}`)} style={styles.actionBtn}>
                Manage / Enroll Students
              </button>
            </li>
            <li style={styles.announcementItem}>
              <button onClick={() => navigate(`/faculty/assign-grades/${username}`)} style={styles.actionBtn}>
                Assign Grades
              </button>
            </li>
            <li style={styles.announcementItem}>
              <button onClick={() => navigate(`/faculty/create-notifications/${username}`)} style={styles.actionBtn}>
                Create Notifications
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Reusing styles from student dashboard
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(to bottom right, #f0fdf4, #dbeafe)",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    background: "linear-gradient(90deg, #047857, #10b981)",
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
    color: "#047857",
    borderBottom: "2px solid #bbf7d0",
    paddingBottom: "5px",
  },
  profileContent: { display: "flex", gap: "20px", alignItems: "center" },
  profileImage: { width: "100px", height: "100px", borderRadius: "50%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  profileDetails: { lineHeight: "1.6", fontWeight: "500" },
  announcementHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#059669",
    borderBottom: "2px solid #d1fae5",
    paddingBottom: "5px",
  },
  announcementList: { listStyle: "none", padding: 0, margin: 0 },
  announcementItem: { padding: "10px 0", borderBottom: "1px solid #eee", fontWeight: "500" },
  actionBtn: {
    background: "linear-gradient(90deg, #10b981, #34d399)",
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
  loading: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#065f46" },
  error: { textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#b91c1c" },
};
