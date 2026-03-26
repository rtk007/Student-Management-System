import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress, Switch, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const API_BASE_URL = "http://localhost:8080";

export default function ProgramManagement() {
  const { username } = useParams();
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const getEmptyCourse = () => ({
    courseCode: "",
    courseName: "",
    creditHours: "",
    department: "",
    courseDescription: "",
    prerequisites: "",
    isActive: true
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      alert("Failed to fetch courses. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course.");
    } finally {
      setLoading(false);
    }
  };

  const validateCourse = (course) => {
    if (!course.courseCode.trim()) {
      alert("Course Code is required");
      return false;
    }
    if (!course.courseName.trim()) {
      alert("Course Name is required");
      return false;
    }
    if (!course.creditHours || course.creditHours < 1) {
      alert("Credit Hours must be positive");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!currentCourse || !validateCourse(currentCourse)) return;
    try {
      setLoading(true);
      const courseData = { ...currentCourse, creditHours: parseInt(currentCourse.creditHours) || 0 };

      if (currentCourse.id) {
        await axios.put(`${API_BASE_URL}/courses/${currentCourse.id}`, courseData);
      } else {
        await axios.post(`${API_BASE_URL}/courses`, courseData);
      }

      setModalOpen(false);
      setCurrentCourse(null);
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to save course. Check if the code already exists.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (course = null) => {
    if (course) setCurrentCourse({ ...course, creditHours: course.creditHours?.toString() || "" });
    else setCurrentCourse(getEmptyCourse());
    setModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setCurrentCourse(prev => ({ ...prev, [field]: value }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCourse(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? "250px" : "60px",
        transition: "all 0.3s ease",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 1000
      }}>
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} username={username} />
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? "250px" : "60px",
        padding: "30px",
        flexGrow: 1,
        transition: "margin-left 0.3s ease"
      }}>
        <Typography variant="h4" gutterBottom>
          Program Management
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal()}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Add Course
        </Button>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
          </div>
        ) : courses.length === 0 ? (
          <Typography color="textSecondary" sx={{ fontStyle: "italic" }}>No courses available.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.creditHours}</TableCell>
                    <TableCell>{course.department || "N/A"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={course.isActive}
                        disabled
                        color="success"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => openModal(course)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(course.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal */}
        {modalOpen && currentCourse && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <Paper sx={{ p: 3, width: 450, maxHeight: "80vh", overflowY: "auto" }}>
              <Typography variant="h6" gutterBottom>
                {currentCourse.id ? "Update Course" : "Add Course"}
              </Typography>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Course Code *" value={currentCourse.courseCode} onChange={(e) => handleInputChange("courseCode", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <input placeholder="Course Name *" value={currentCourse.courseName} onChange={(e) => handleInputChange("courseName", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <input placeholder="Credit Hours *" type="number" value={currentCourse.creditHours} onChange={(e) => handleInputChange("creditHours", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <input placeholder="Department" value={currentCourse.department} onChange={(e) => handleInputChange("department", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <textarea placeholder="Description" value={currentCourse.courseDescription} onChange={(e) => handleInputChange("courseDescription", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <input placeholder="Prerequisites" value={currentCourse.prerequisites} onChange={(e) => handleInputChange("prerequisites", e.target.value)} style={{ padding: 8, borderRadius: 4, border: "1px solid #ddd" }} />
                <div>
                  <Switch checked={currentCourse.isActive} onChange={(e) => handleInputChange("isActive", e.target.checked)} /> Active
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
                <Button variant="outlined" color="secondary" onClick={closeModal}>Cancel</Button>
                <Button variant="contained" color="success" onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
              </div>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
}
