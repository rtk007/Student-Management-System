// UpdateProfile.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import StudentSidebar from "./StudentSidebar";

export default function UpdateProfile() {
  const { username } = useParams(); // studentId
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/students/by-student-id/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudent({
          studentName: res.data.studentName || "",
          studentCity: res.data.studentCity || "",
          phone: res.data.phone || "",
          lastAttendedSchool: res.data.lastAttendedSchool || "",
          enrolledIn: res.data.enrolledIn || "",
          birthdate: res.data.birthdate || "",
          email: res.data.user?.email || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
        setLoading(false);
      }
    };
    fetchStudent();
  }, [username]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/students/update-profile/${username}`,
        student,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Profile updated successfully");
      navigate(`/student/dashboard/${username}`);
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      if (!passwords.oldPassword || !passwords.newPassword) {
        alert("Please enter both old and new passwords");
        return;
      }
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/auth/update-password",
        {
          username: username,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Password updated successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Password update failed");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            👤 Update Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Paper
              elevation={3}
              sx={{ borderRadius: 2, p: 4, bgcolor: "#ffffff" }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="studentName"
                    value={student.studentName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="studentCity"
                    value={student.studentCity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Attended School"
                    name="lastAttendedSchool"
                    value={student.lastAttendedSchool}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Enrolled In"
                    name="enrolledIn"
                    value={student.enrolledIn}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Birthdate"
                    name="birthdate"
                    value={student.birthdate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ borderRadius: 2, px: 4, py: 1 }}
                >
                  Update Profile Info
                </Button>
              </Box>
            </Paper>
          )}

          {!loading && !error && (
            <Paper
              elevation={3}
              sx={{ borderRadius: 2, p: 4, bgcolor: "#ffffff", mt: 4 }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                🔒 Change Password
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Old Password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlePasswordSubmit}
                  sx={{ borderRadius: 2, px: 4, py: 1 }}
                >
                  Change Password
                </Button>
              </Box>
            </Paper>


          )}
        </Container>
      </Box>
    </Box>
  );
}
