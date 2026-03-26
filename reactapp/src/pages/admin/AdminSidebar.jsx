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
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function AdminSidebar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const { username } = useParams();

  const menuItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: `/admin/dashboard/${username}` },
    { label: "Student Records", icon: <PeopleIcon />, path: `/admin/student/${username}` },
    { label: "Faculty Records", icon: <ManageAccountsIcon />, path: `/admin/faculty/${username}` },
    { label: "Program Management", icon: <SchoolIcon />, path: `/admin/courses/${username}` },
    { label: "Academic Programs", icon: <MenuBookIcon />, path: `/admin/academic-programs/${username}` },
    
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Logo"
            sx={{ width: 36, height: 36, mr: 1 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Admin
          </Typography>
        </Box>

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
          <ListItem button onClick={handleLogout} sx={{ borderRadius: 1 }}>
            <ListItemIcon sx={{ color: "#f3f4f6" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
