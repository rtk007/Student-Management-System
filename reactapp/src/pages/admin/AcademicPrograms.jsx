import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Typography, CircularProgress, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const degreeOptions = ["ASSOCIATE", "BACHELOR", "MASTER", "DOCTORAL", "CERTIFICATE"];
const API_BASE = "http://localhost:8080/api/academic-programs";

export default function AccessAcademicPrograms() {
  const { username } = useParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const fetchPrograms = async () => {
    try {
      const { data } = await axios.get(API_BASE);
      setPrograms(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load programs");
      setLoading(false);
    }
  };

  useEffect(() => { fetchPrograms(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this program?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setPrograms(programs.filter(p => p.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleOpenDialog = (program = null) => {
    setEditingProgram(program ?? {
      programCode: "", programName: "", degreeType: "", department: "",
      creditHoursRequired: "", programDescription: "", admissionRequirements: "", isActive: true
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleChange = (e) => {
    setEditingProgram({ ...editingProgram, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if(editingProgram.id) await axios.put(`${API_BASE}/${editingProgram.id}`, editingProgram);
      else await axios.post(API_BASE, editingProgram);
      fetchPrograms();
      handleCloseDialog();
    } catch (err) {
      alert("Save failed");
    }
  };

  const getDegreeColor = (degree) => {
    switch(degree) {
      case "ASSOCIATE": return "default";
      case "BACHELOR": return "primary";
      case "MASTER": return "success";
      case "DOCTORAL": return "warning";
      case "CERTIFICATE": return "info";
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
        <Typography variant="h4" gutterBottom>
          Academic Programs
        </Typography>

        <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
          Add Program
        </Button>

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
                  <TableCell>Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Degree</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programs.map((p) => (
                  <TableRow key={p.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#e3f2fd" } }}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.programCode}</TableCell>
                    <TableCell>{p.programName}</TableCell>
                    <TableCell>
                      <Chip label={p.degreeType} color={getDegreeColor(p.degreeType)} size="small"/>
                    </TableCell>
                    <TableCell>{p.department}</TableCell>
                    <TableCell>{p.creditHoursRequired}</TableCell>
                    <TableCell>{p.isActive ? "Yes" : "No"}</TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} startIcon={<EditIcon />} onClick={() => handleOpenDialog(p)}>
                        Edit
                      </Button>
                      <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editingProgram?.id ? "Edit Program" : "Add Program"}</DialogTitle>
          <DialogContent>
            <TextField label="Program Code" name="programCode" value={editingProgram?.programCode || ""} onChange={handleChange} fullWidth margin="dense"/>
            <TextField label="Program Name" name="programName" value={editingProgram?.programName || ""} onChange={handleChange} fullWidth margin="dense"/>
            <TextField select label="Degree Type" name="degreeType" value={editingProgram?.degreeType || ""} onChange={handleChange} fullWidth margin="dense">
              {degreeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField label="Department" name="department" value={editingProgram?.department || ""} onChange={handleChange} fullWidth margin="dense"/>
            <TextField label="Credit Hours" name="creditHoursRequired" type="number" value={editingProgram?.creditHoursRequired || ""} onChange={handleChange} fullWidth margin="dense"/>
            <TextField label="Description" name="programDescription" value={editingProgram?.programDescription || ""} onChange={handleChange} fullWidth margin="dense"/>
            <TextField label="Admission Requirements" name="admissionRequirements" value={editingProgram?.admissionRequirements || ""} onChange={handleChange} fullWidth margin="dense"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>{editingProgram?.id ? "Update" : "Create"}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
