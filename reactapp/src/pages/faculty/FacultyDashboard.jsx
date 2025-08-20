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
        <div style={styles.card} onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
          <div style={styles.profileCardHeader}>
            👨‍🏫 Faculty Profile
          </div>
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
        <div style={styles.card} onMouseEnter={(e) => e.target.style.transform = "translateY(-4px)"} onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}>
          <div style={styles.announcementHeader}>
            📌 Quick Actions
          </div>
          <ul style={styles.announcementList}>
            <li style={styles.announcementItem}>
              <button 
                onClick={() => navigate(`/faculty/manage-courses/${username}`)} 
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
                Manage / Enroll Students
              </button>
            </li>
            <li style={styles.announcementItem}>
              <button 
                onClick={() => navigate(`/faculty/assign-grades/${username}`)} 
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
                Assign Grades
              </button>
            </li>
            <li style={styles.announcementItem}>
              <button 
                onClick={() => navigate(`/faculty/create-notifications/${username}`)} 
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
  announcementItem: { padding: "10px 0", borderBottom: "1px solid #eee", fontWeight: "500" },
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
