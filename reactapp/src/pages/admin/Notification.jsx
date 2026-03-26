import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_BASE = "http://localhost:8080/notifications";

const typeOptions = ["GRADE_UPDATE", "ENROLLMENT", "SYSTEM"];
const priorityOptions = ["HIGH", "MEDIUM", "LOW"];
const categoryOptions = ["SYSTEM", "ACADEMIC", "GENERAL"];

export default function Notification() {
  const { username } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [current, setCurrent] = useState({
    message: "", type: "", priority: "", category: "", isRead: false, userId: ""
  });

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(API_BASE);
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const handleOpenDialog = (notification = null) => {
    if(notification) setCurrent(notification);
    else setCurrent({ message: "", type: "", priority: "", category: "", isRead: false, userId: "" });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = { 
        message: current.message, type: current.type, priority: current.priority,
        category: current.category, isRead: current.isRead, 
        user: { id: current.userId }
      };
      if(current.id) await axios.put(`${API_BASE}/${current.id}`, payload);
      else await axios.post(API_BASE, payload);
      fetchNotifications();
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      alert("Failed to save notification");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
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
        <Typography variant="h4" gutterBottom>Notifications</Typography>
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
          Add Notification
        </Button>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Read</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map(n => (
                  <TableRow key={n.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#e3f2fd" } }}>
                    <TableCell>{n.id}</TableCell>
                    <TableCell>{n.user?.id}</TableCell>
                    <TableCell>{n.message}</TableCell>
                    <TableCell>{n.type}</TableCell>
                    <TableCell>{n.priority}</TableCell>
                    <TableCell>{n.category}</TableCell>
                    <TableCell>{n.isRead ? "Yes" : "No"}</TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleOpenDialog(n)}>Edit</Button>
                      <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(n.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{current.id ? "Edit Notification" : "Add Notification"}</DialogTitle>
          <DialogContent>
            <TextField label="User ID" name="userId" value={current.userId} onChange={handleChange} fullWidth margin="dense" />
            <TextField label="Message" name="message" value={current.message} onChange={handleChange} fullWidth margin="dense" multiline rows={2} />
            <TextField select label="Type" name="type" value={current.type} onChange={handleChange} fullWidth margin="dense">
              {typeOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField select label="Priority" name="priority" value={current.priority} onChange={handleChange} fullWidth margin="dense">
              {priorityOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField select label="Category" name="category" value={current.category} onChange={handleChange} fullWidth margin="dense">
              {categoryOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSave}>{current.id ? "Update" : "Create"}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
