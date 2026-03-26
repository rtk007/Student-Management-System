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
import FacultySidebar from "./FacultySidebar";

export default function UpdateFaculty() {
  const { username } = useParams(); // faculty username
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({});
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/faculty/username/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFaculty({
          name: res.data.name || "",
          phoneNumber: res.data.phoneNumber || "",
          department: res.data.department || "",
          title: res.data.title || "",
          specialization: res.data.specialization || "",
          hireDate: res.data.hireDate ? res.data.hireDate.split("T")[0] : "",
          officeLocation: res.data.officeLocation || "",
          officeHours: res.data.officeHours || "",
          email: res.data.user?.email || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [username]);

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/faculty/username/${username}`,
        faculty,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Profile updated successfully");
      navigate(`/faculty/dashboard/${username}`);
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
      <FacultySidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            👤 Update Faculty Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Paper elevation={3} sx={{ borderRadius: 2, p: 4, bgcolor: "#ffffff" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={faculty.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    value={faculty.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={faculty.department}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={faculty.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    value={faculty.specialization}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label="Hire Date"
                    name="hireDate"
                    value={faculty.hireDate}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Office Location"
                    name="officeLocation"
                    value={faculty.officeLocation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Office Hours"
                    name="officeHours"
                    value={faculty.officeHours}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={faculty.email}
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
            <Paper elevation={3} sx={{ borderRadius: 2, p: 4, bgcolor: "#ffffff", mt: 4 }}>
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
