import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

// MUI Icons
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

export default function AdminDashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    totalFaculties: 0,
    totalCourses: 0,
    activeUsers: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    setDashboardStats({
      totalStudents: 1250,
      totalFaculties: 85,
      totalCourses: 42,
      activeUsers: 156,
    });
  }, []);

  const statsData = [
    { label: "Total Students", value: dashboardStats.totalStudents, icon: <SchoolIcon fontSize="large" /> },
    { label: "Faculty Members", value: dashboardStats.totalFaculties, icon: <PeopleIcon fontSize="large" /> },
    { label: "Active Courses", value: dashboardStats.totalCourses, icon: <MenuBookIcon fontSize="large" /> },
    { label: "Active Users", value: dashboardStats.activeUsers, icon: <PersonIcon fontSize="large" /> },
  ];

  const managementCards = [
    {
      header: "Faculty Management",
      description: "Manage faculty members and assign courses.",
      icon: <PeopleIcon fontSize="large" />,
      action: () => navigate(`/admin/faculty/${username}`),
    },
    {
      header: "Student Management",
      description: "View student records, enrollments, and progress.",
      icon: <SchoolIcon fontSize="large" />,
      action: () => navigate(`/admin/student/${username}`),
    },
    {
      header: "Course Management",
      description: "Create, modify, and organize courses.",
      icon: <MenuBookIcon fontSize="large" />,
      action: () => navigate(`/admin/courses/${username}`),
    },
    {
      header: "System Management",
      description: "Configure system settings and monitor performance.",
      icon: <SettingsIcon fontSize="large" />,
      action: () => navigate(`/admin/settings/${username}`),
    },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div
        style={{
          ...styles.sidebarContainer,
          width: sidebarOpen ? "250px" : "60px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-190px)",
        }}
      >
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} username={username} />
      </div>

      {/* Main Content */}
      <div
        style={{
          ...styles.mainContent,
          marginLeft: sidebarOpen ? "250px" : "60px",
        }}
      >
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.menuToggle} onClick={toggleSidebar}>☰</button>
            <div style={styles.logo}>Admin Dashboard</div>
          </div>

          <div style={styles.nav}>
            <div
              style={styles.profileWrapper}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <div style={styles.profileAvatar}></div>
              <div style={styles.profileInfo}>
                <span style={styles.profileName}>admin@{username}</span>
                <span style={styles.profileRole}>Administrator</span>
              </div>
              <span
                style={{
                  ...styles.dropdownArrow,
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▼
              </span>
              {dropdownOpen && (
                <div style={styles.dropdownMenu}>
                  <button
                    style={styles.dropdownBtn}
                    onClick={() => navigate(`/admin/update/${username}`)}
                  >
                    Update Profile
                  </button>
                  <button style={styles.dropdownBtn} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>Welcome back, Admin!</h1>
          <p style={styles.welcomeSubtitle}>
            Overview of your system activities today
          </p>
        </div>

        {/* Statistics Cards */}
        <div style={styles.statsContainer}>
          {statsData.map((stat, idx) => (
            <div key={idx} style={styles.statCard}>
              <div style={{ marginBottom: "10px" }}>{stat.icon}</div>
              <div style={styles.statNumber}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Management Cards */}
        <div style={styles.cardsContainer}>
          {managementCards.map((card, idx) => (
            <div key={idx} style={styles.card}>
              <div style={{ marginBottom: "15px" }}>{card.icon}</div>
              <div style={styles.cardHeader}>{card.header}</div>
              <p style={styles.cardDescription}>{card.description}</p>
              <button style={styles.primaryBtn} onClick={card.action}>Go</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Styles (same as before)
const styles = {
  container: { fontFamily: "sans-serif", minHeight: "100vh", position: "relative" },
  sidebarContainer: { position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1000, transition: "all 0.3s ease" },
  mainContent: { transition: "margin-left 0.3s ease", minHeight: "100vh", paddingBottom: "40px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#2c3e50", color: "white", position: "sticky", top: 0, zIndex: 100 },
  headerLeft: { display: "flex", alignItems: "center", gap: "15px" },
  menuToggle: { background: "#34495e", border: "none", color: "white", padding: "8px 12px", borderRadius: "8px", cursor: "pointer" },
  logo: { fontWeight: "bold", fontSize: "24px" },
  nav: { display: "flex", alignItems: "center", gap: "15px" },
  profileWrapper: { position: "relative", display: "flex", alignItems: "center", cursor: "pointer", gap: "10px" },
  profileAvatar: { width: "40px", height: "40px", borderRadius: "50%", background: "#2980b9" },
  profileInfo: { display: "flex", flexDirection: "column" },
  profileName: { fontWeight: "600", fontSize: "14px" },
  profileRole: { fontSize: "12px", opacity: 0.8 },
  dropdownArrow: { transition: "transform 0.3s" },
  dropdownMenu: { position: "absolute", top: "50px", right: 0, backgroundColor: "white", borderRadius: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", minWidth: "180px", zIndex: 200 },
  dropdownBtn: { width: "100%", padding: "10px 15px", textAlign: "left", border: "none", background: "none", cursor: "pointer" },
  welcomeSection: { padding: "40px 30px 20px" },
  welcomeTitle: { fontSize: "32px", fontWeight: "700", marginBottom: "8px" },
  welcomeSubtitle: { fontSize: "16px", opacity: 0.8 },
  statsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", padding: "0 30px 30px" },
  statCard: { background: "#ecf0f1", borderRadius: "12px", padding: "20px", textAlign: "center" },
  statNumber: { fontSize: "28px", fontWeight: "700" },
  statLabel: { fontSize: "14px", color: "#7f8c8d" },
  cardsContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", padding: "0 30px" },
  card: { backgroundColor: "#ecf0f1", borderRadius: "16px", padding: "25px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  cardHeader: { fontSize: "20px", fontWeight: "700", marginBottom: "12px" },
  cardDescription: { fontSize: "14px", marginBottom: "15px" },
  primaryBtn: { background: "#2980b9", color: "white", border: "none", padding: "10px 16px", borderRadius: "8px", cursor: "pointer" },
};
