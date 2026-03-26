import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FacultySidebar from "./FacultySidebar";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Grade as GradeIcon, Save as SaveIcon, Close as CloseIcon } from "@mui/icons-material";

const API_BASE_URL = "http://localhost:8080/api";

export default function GradeStudents() {
  const { username } = useParams();
  const [students, setStudents] = useState([]);
  const [studentEnrollments, setStudentEnrollments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [facultyId, setFacultyId] = useState(null);
  const [facultyCourses, setFacultyCourses] = useState([]);

  const gradeOptions = ["O", "A+", "A", "B+", "B", "C", "D", "F"];
  const getStudentDisplayName = (student) =>
    student?.studentName || student?.name || student?.user?.username || "N/A";

  const fetchFacultyAndStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Fetch Faculty info
      const facRes = await axios.get(`${API_BASE_URL.replace("/api", "")}/api/faculty/username/${username}`, { headers });
      setFacultyId(facRes.data.id);
      
      const mappedCourseIds = facRes.data.courses ? facRes.data.courses.map(c => c.id) : [];
      setFacultyCourses(mappedCourseIds);

      // 2. Fetch Students for this faculty
      const stdRes = await axios.get(`${API_BASE_URL}/faculty/${username}/students`, { headers });
      setStudents(stdRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Check backend.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      fetchFacultyAndStudents();
    }
  }, [username, fetchFacultyAndStudents]);

  const openModal = async (student) => {
    setSelectedStudent(student);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${API_BASE_URL.replace("/api", "")}/enrollments/student/${student.id}`, { headers });
      
      // Filter enrollments to ONLY those courses the faculty is mapped to teach
      const enrollments = res.data.filter(e => e.course && facultyCourses.includes(e.course.id));
      
      const initialGrades = {};
      enrollments.forEach((e) => {
        initialGrades[e.id] = e.grade?.gradeLetter || "";
      });
      setStudentEnrollments(enrollments);
      setGrades(initialGrades);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch enrollments for " + getStudentDisplayName(student));
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setStudentEnrollments([]);
    setGrades({});
    setModalOpen(false);
  };

  const handleGradeChange = (enrollmentId, gradeLetter) => {
    setGrades((prev) => ({ ...prev, [enrollmentId]: gradeLetter }));
  };

  const getGradePoints = (gradeLetter) => {
    const gradeMap = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, D: 4, F: 0 };
    return gradeMap[gradeLetter] || 0;
  };

  const saveGrades = async () => {
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const [enrollmentId, gradeLetter] of Object.entries(grades)) {
        if (!gradeLetter) continue;
        try {
          const gradePoints = getGradePoints(gradeLetter);
          if (!facultyId) {
            alert("Faculty ID missing!");
            return;
          }
          const token = localStorage.getItem("token");
          const url = `${API_BASE_URL}/grades/assign?enrollmentId=${enrollmentId}&facultyId=${facultyId}&gradeLetter=${encodeURIComponent(
            gradeLetter
          )}&gradePoints=${gradePoints}&comments=`;
          await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
          successCount++;
        } catch (err) {
          console.error(`Error assigning grade ${enrollmentId}:`, err);
          errorCount++;
        }
      }

      if (successCount > 0) {
        alert(`✅ Saved ${successCount} grades!`);
        await fetchFacultyAndStudents();
        closeModal();
      } else if (errorCount > 0) {
        alert(`❌ Failed to save ${errorCount} grades. Check console.`);
      } else {
        alert("⚠️ No grades selected.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save grades");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: "#ffffff" }}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={fetchFacultyAndStudents}>
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* Sidebar */}
      <FacultySidebar />

      {/* Main Content */}
      <Box sx={{ flex: 3, p: 4 }}>
        <Typography variant="h3" gutterBottom>
          <b>Student Grade Management</b>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <b>Manage grades for enrolled students</b>
        </Typography>

        <Paper sx={{ mt: 3, overflowX: "auto", bgcolor: "#ffffff" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{getStudentDisplayName(student)}</TableCell>
                    <TableCell>{student.enrolledIn || "N/A"}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        startIcon={<GradeIcon />}
                        onClick={() => openModal(student)}
                      >
                        Grade Courses
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Modal */}
        <Dialog open={modalOpen} onClose={closeModal} maxWidth="md" fullWidth>
          <DialogTitle>
            Grade Courses: {getStudentDisplayName(selectedStudent)}
            <IconButton onClick={closeModal} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: "#ffffff" }}>
            <Stack spacing={2}>
              {studentEnrollments.length > 0 ? (
                studentEnrollments.map((enrollment) => (
                  <Paper
                    key={enrollment.id}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#ffffff",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {enrollment.course?.name || enrollment.course?.courseName || "Unknown Course"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                        Code: {enrollment.course?.courseCode || "N/A"}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Enrollment ID: {enrollment.id}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {enrollment.grade && (
                        <Typography
                          sx={{
                            bgcolor: "#d0f0c0",
                            px: 1.5,
                            borderRadius: 1,
                            fontWeight: 500,
                          }}
                        >
                          Current: {enrollment.grade.gradeLetter}
                        </Typography>
                      )}
                      <Select
                        value={grades[enrollment.id] || ""}
                        onChange={(e) => handleGradeChange(enrollment.id, e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="">Select Grade</MenuItem>
                        {gradeOptions.map((g) => (
                          <MenuItem key={g} value={g}>
                            {g} ({getGradePoints(g)} pts)
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography align="center" color="textSecondary">
                  No enrollments found.
                </Typography>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<CloseIcon />} onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveGrades}
              disabled={Object.values(grades).every((g) => !g)}
            >
              Save Grades
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
