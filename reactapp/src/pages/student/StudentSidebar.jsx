import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Divider,
  Switch,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GradeIcon from "@mui/icons-material/Grade";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

export default function StudentSidebar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { username } = useParams();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: `/student/dashboard/${username}` },
    { label: "Courses", icon: <SchoolIcon />, path: `/student/courses/${username}` },
    { label: "Grades", icon: <GradeIcon />, path: `/student/view-grades/${username}` },
    { label: "Contact Us", icon: <ContactMailIcon />, path: "/contact-us" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          background: "rgba(0,0,0,0.85)",
          color: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
        


    {/* Sidebar Header */}
<Box sx={{ p: 2 }}>
  {/* Logo + Name */}
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box
      component="img"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
      alt="Studzz Logo"
      sx={{ width: 36, height: 36, borderRadius: 1, mr: 1 }}
    />
    <Box>
      <Typography variant="h5" sx={{ lineHeight: 1, fontWeight: 600 }}>
           Studzz
      </Typography>
      
    </Box>
  </Box>

  {/* Search */}
 

  {/* Menu */}
  <List>
    {menuItems.map((item) => (
      <ListItem
        button
        key={item.label}
        onClick={() => navigate(item.path)}
        sx={{
          mb: 1,
          borderRadius: 1,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        }}
      >
        <ListItemIcon sx={{ color: "#f3f4f6" }}>{item.icon}</ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItem>
    ))}
  </List>
</Box>


      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
        <List>
          <ListItem
            button
            onClick={handleLogout}
            sx={{ mt: 1, borderRadius: 1, "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
          >
            <ListItemIcon sx={{ color: "#f3f4f6" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

          <ListItem>
            <ListItemIcon sx={{ color: "#f3f4f6" }}>🌙</ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
