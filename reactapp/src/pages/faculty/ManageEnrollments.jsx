import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Modal, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon, Book as BookIcon } from "@mui/icons-material";
import FacultySidebar from "./FacultySidebar"; // import your existing sidebar

const API_BASE_URL = "http://localhost:8080";

export default function ManageEnrollments() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [semester, setSemester] = useState("FALL");
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/students`);
      setStudents(res.data);
      res.data.forEach(async (s) => {
        const enr = await axios.get(`${API_BASE_URL}/enrollments/student/${s.id}`);
        setEnrollments((prev) => ({ ...prev, [s.id]: enr.data }));
      });
    } catch (err) {
      alert("Failed to fetch students");
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      alert("Failed to fetch courses");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const openEnrollModal = (student) => {
    setSelectedStudent(student);
    setSelectedCourseId("");
    setSemester("FALL");
    setYear(new Date().getFullYear());
    setModalOpen(true);
  };

  const openPopup = (student) => {
    setSelectedStudent(student);
    setPopupOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const closePopup = () => setPopupOpen(false);

  const handleEnroll = async () => {
    if (!selectedCourseId) return alert("Select a course");
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/enrollments`, {
        studentId: selectedStudent.id,
        courseId: selectedCourseId,
        semester,
        year,
        enrollmentStatus: "ENROLLED",
      });
      closeModal();
      fetchStudents();
    } catch (err) {
      alert("Failed to enroll student");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEnrollment = async (id) => {
    if (!window.confirm("Remove this enrollment?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/enrollments/${id}`);
      fetchStudents();
    } catch (err) {
      alert("Failed to remove enrollment");
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Integrate your existing FacultySidebar */}
      <FacultySidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, bgcolor: "#f5f5f5" }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Manage Enrollments
        </Typography>

        <Box sx={{ bgcolor: "#fff", borderRadius: 2, p: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Student ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Program</TableCell>
                <TableCell sx={{ color: "#fff" }}>Courses</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} sx={{ "&:hover": { bgcolor: "#e3f2fd" } }}>
                  <TableCell>{s.studentId}</TableCell>
                  <TableCell>{s.studentName}</TableCell>
                  <TableCell>{s.enrolledIn}</TableCell>
                  <TableCell>
                    {enrollments[s.id]?.length > 0 ? (
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        onClick={() => openPopup(s)}
                        startIcon={<BookIcon />}
                      >
                        Show ({enrollments[s.id].length})
                      </Button>
                    ) : (
                      <Typography sx={{ fontStyle: "italic", color: "#6c757d" }}>None</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => openEnrollModal(s)}
                      startIcon={<AddIcon />}
                    >
                      Enroll
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Enrollment Popup */}
        <Modal open={popupOpen} onClose={closePopup}>
          <Box sx={{ bgcolor: "#fff", p: 4, borderRadius: 2, width: 400, mx: "auto", mt: 10 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedStudent?.studentName}'s Courses
            </Typography>
            {enrollments[selectedStudent?.id]?.length > 0 ? (
              enrollments[selectedStudent.id].map((enr) => (
                <Box
                  key={enr.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1,
                    mb: 1,
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                  }}
                >
                  <Typography>
                    {enr.course.courseName} ({enr.semester} {enr.year})
                  </Typography>
                  <Button
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleRemoveEnrollment(enr.id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            ) : (
              <Typography sx={{ fontStyle: "italic" }}>No courses enrolled</Typography>
            )}
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button variant="contained" color="secondary" onClick={closePopup}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Enroll Modal */}
        <Modal open={modalOpen} onClose={closeModal}>
          <Box sx={{ bgcolor: "#fff", p: 4, borderRadius: 2, width: 400, mx: "auto", mt: 10 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Enroll {selectedStudent?.studentName}
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Course</InputLabel>
              <Select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                {courses.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.courseName} ({c.courseCode})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Semester</InputLabel>
              <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
                <MenuItem value="FALL">Fall</MenuItem>
                <MenuItem value="SPRING">Spring</MenuItem>
                <MenuItem value="SUMMER">Summer</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Year</InputLabel>
              <Select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                {[...Array(5)].map((_, i) => {
                  const y = new Date().getFullYear() + i;
                  return (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button sx={{ mr: 1 }} variant="contained" color="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="contained" color="success" onClick={handleEnroll} disabled={loading}>
                {loading ? "Enrolling..." : "Enroll"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
