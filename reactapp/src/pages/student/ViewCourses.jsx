// ViewCourses.jsx
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
} from "@mui/material";
import StudentSidebar from "./StudentSidebar"; // ✅ Your existing sidebar

const API_BASE_URL = "http://localhost:8080";

export default function ViewCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.sub;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const getStudentIdFromToken = () => {
    const token =
      localStorage?.getItem?.("token") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

    if (token) {
      return decodeJWT(token);
    }
    return null;
  };

  const studentId = getStudentIdFromToken();
  const token =
    localStorage?.getItem?.("token") ||
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Step 1: get student entity
        const studentResponse = await axios.get(
          `${API_BASE_URL}/students/by-student-id/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const student = studentResponse.data;

        if (!student?.id) {
          throw new Error("Student not found or missing ID");
        }

        // Step 2: get enrollments
        const enrollmentResponse = await axios.get(
          `${API_BASE_URL}/enrollments/student/${student.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEnrollments(
          Array.isArray(enrollmentResponse.data)
            ? enrollmentResponse.data
            : []
        );
      } catch (err) {
        console.error("Error fetching enrollments:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Error fetching enrollments"
        );
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchEnrollments();
    } else {
      setError("Unable to extract student ID from token");
      setLoading(false);
    }
  }, [studentId, token]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      {/* ✅ Sidebar */}
      <StudentSidebar />

      {/* ✅ Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            📚 My Enrolled Courses
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : enrollments.length === 0 ? (
            <Alert severity="info">You are not enrolled in any courses yet.</Alert>
          ) : (
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f0f0f0" }}>
                    <TableCell><b>Course Name</b></TableCell>
                    <TableCell><b>Semester</b></TableCell>
                    <TableCell><b>Year</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Enrolled On</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrollments.map((enrollment, index) => (
                    <TableRow key={enrollment.id || `enroll-${index}`}>
                      <TableCell>
                        {enrollment.course?.courseName ||
                          enrollment.courseName ||
                          "N/A"}
                      </TableCell>
                      <TableCell>{enrollment.semester || "N/A"}</TableCell>
                      <TableCell>{enrollment.year || "N/A"}</TableCell>
                      <TableCell>
                        {enrollment.enrollmentStatus ||
                          enrollment.status ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {enrollment.enrollmentDate
                          ? new Date(
                              enrollment.enrollmentDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
}
