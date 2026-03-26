// ViewGrades.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import StudentSidebar from "./StudentSidebar";

const API_BASE_URL = "http://localhost:8080";

export default function ViewGrades() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helpers
  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.sub;
    } catch {
      return null;
    }
  };

  const getStudentIdFromToken = () => {
    const token =
      localStorage?.getItem?.("token") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";
    return token ? decodeJWT(token) : null;
  };

  const studentId = getStudentIdFromToken();
  const token =
    localStorage?.getItem?.("token") ||
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

  const getGradeColor = (grade) => {
    if (!grade) return "default";
    const num = parseFloat(grade);
    if (num >= 90) return "success";
    if (num >= 80) return "primary";
    if (num >= 70) return "warning";
    if (num >= 60) return "info";
    return "error";
  };

  const getLetterGrade = (grade) => {
    if (!grade) return "N/A";
    const num = parseFloat(grade);
    if (num >= 90) return "A";
    if (num >= 80) return "B";
    if (num >= 70) return "C";
    if (num >= 60) return "D";
    return "F";
  };

  const calculateGPA = () => {
    const validGrades = enrollments.filter((e) => e.finalGrade && e.gradePoints);
    if (validGrades.length === 0) return "N/A";
    const totalPoints = validGrades.reduce(
      (sum, e) => sum + parseFloat(e.gradePoints || 0),
      0
    );
    return (totalPoints / validGrades.length).toFixed(2);
  };

  // Fetch
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);

        const studentResponse = await axios.get(
          `${API_BASE_URL}/students/by-student-id/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const student = studentResponse.data;
        if (!student?.id) throw new Error("Student not found");

        const enrollmentResponse = await axios.get(
          `${API_BASE_URL}/enrollments/student/${student.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setEnrollments(
          Array.isArray(enrollmentResponse.data)
            ? enrollmentResponse.data
            : []
        );
      } catch (err) {
        if (err.response) {
          setError(
            `Server error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("No response from server. Check backend connection.");
        } else {
          setError(`Request error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchEnrollments();
    else {
      setError("Unable to extract student ID from token");
      setLoading(false);
    }
  }, [studentId, token]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            📊 My Grades
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : enrollments.length === 0 ? (
            <Alert severity="info">You don’t have any grades yet.</Alert>
          ) : (
            <>
              {/* Academic Summary */}
              <Paper
                elevation={3}
                sx={{ borderRadius: 2, p: 3, mb: 4, bgcolor: "#fafafa" }}
              >
                <Typography variant="h6" gutterBottom>
                  📈 Academic Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">
                      <strong>Total Courses:</strong> {enrollments.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">
                      <strong>Courses with Grades:</strong>{" "}
                      {enrollments.filter((e) => e.finalGrade).length}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">
                      <strong>Current GPA:</strong> {calculateGPA()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Grades Table */}
              <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f0f0f0" }}>
                      <TableCell><b>Course</b></TableCell>
                      <TableCell><b>Semester</b></TableCell>
                      <TableCell><b>Year</b></TableCell>
                      <TableCell><b>Final Grade</b></TableCell>
                      <TableCell><b>Grade Points</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {enrollments.map((e, i) => (
                      <TableRow key={e.id || `enrollment-${i}`}>
                        <TableCell>{e.course?.courseName || "N/A"}</TableCell>
                        <TableCell>{e.semester || "N/A"}</TableCell>
                        <TableCell>{e.year || "N/A"}</TableCell>
                        <TableCell>
                          {e.finalGrade ? (
                            <Chip
                              label={`${getLetterGrade(e.finalGrade)} (${e.finalGrade})`}
                              color={getGradeColor(e.finalGrade)}
                              variant="outlined"
                            />
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>{e.gradePoints || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
