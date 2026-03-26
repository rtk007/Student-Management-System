import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, CircularProgress, Chip, Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AccessStudentRecords() {
  const { username } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8080/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load students");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/admin/bulk-upload/students", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });
      alert("Students uploaded successfully!");
      setFile(null);
      // Refresh list
      const { data } = await axios.get("http://localhost:8080/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(data);
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  }
};

  const getStandingColor = (standing) => {
    switch (standing?.toLowerCase()) {
      case "good": return "success";
      case "probation": return "warning";
      case "poor": return "error";
      default: return "default";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Student Records
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              id="bulk-upload-csv"
            />
            <label htmlFor="bulk-upload-csv">
              <Button variant="outlined" component="span">
                {file ? file.name : "Select CSV File"}
              </Button>
            </label>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleUpload} 
              disabled={uploading || !file}
            >
              {uploading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Box>
        </Box>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3, boxShadow: 3 }}>
            <Table sx={{ minWidth: 750 }}>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell>Standing</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s, idx) => (
                  <TableRow
                    key={s.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#e3f2fd" }
                    }}
                  >
                    <TableCell>{s.id}</TableCell>
                    <TableCell>{s.studentId}</TableCell>
                    <TableCell>{s.studentName}</TableCell>
                    <TableCell>{s.studentCity}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>{s.enrolledIn}</TableCell>
                    <TableCell>{s.birthdate}</TableCell>
                    <TableCell>
                      <Chip label={s.academicStanding} color={getStandingColor(s.academicStanding)} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
