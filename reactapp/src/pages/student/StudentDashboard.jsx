import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";
import AcademicCalendar from "./AcademicCalendar";
import {
  Menu,
  MenuItem,
  IconButton,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Paper,
  Divider,
  Badge,
  Alert,
  Skeleton,
  Container,
  AppBar,
  Toolbar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  AccountCircle,
  School,
  Phone,
  Event,
  Assignment,
  Quiz,
  MenuBook,
  NotificationsActive,
  Person,
  Settings,
  ExitToApp,
  Dashboard as DashboardIcon,
  LibraryBooks, // Added this import to replace BookOpen
} from "@mui/icons-material";

export default function StudentDashboard() {
  const { username } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/students/by-student-id/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch student data");
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [username]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const goToProfile = () => {
    navigate(`/student/update-profile/${username}`);
    handleMenuClose();
  };

  const goToSettings = () => {
    navigate(`/student/settings/${username}`);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <StudentSidebar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <StudentSidebar />
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  const notifications = [
    { id: 1, text: "Assignment due tomorrow", type: "assignment", urgent: true },
    { id: 2, text: "Midterm exams next week", type: "exam", urgent: true },
    { id: 3, text: "New course materials uploaded", type: "material", urgent: false },
    { id: 4, text: "Faculty meeting scheduled", type: "meeting", urgent: false },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "assignment": return <Assignment color="warning" />;
      case "exam": return <Quiz color="error" />;
      case "material": return <LibraryBooks color="info" />; // Changed from BookOpen to LibraryBooks
      case "meeting": return <Event color="primary" />;
      default: return <NotificationsActive />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <StudentSidebar />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Top App Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "white",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DashboardIcon sx={{ mr: 2, color: "primary.main" }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome back, {student?.studentName}!
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Badge badgeContent={notifications.filter(n => n.urgent).length} color="error">
                <NotificationsActive color="action" />
              </Badge>
              
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  "&:hover": {
                    border: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "primary.main",
                    fontSize: "1.2rem",
                  }}
                >
                  {student?.studentName?.charAt(0) || "S"}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1,
              borderRadius: 3,
              minWidth: 220,
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1,
                borderRadius: 1,
                mx: 1,
                my: 0.5,
              },
            },
          }}
        >
          <MenuItem onClick={goToProfile}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Update Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={goToSettings}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <ListItemIcon>
              <ExitToApp fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Dashboard Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Student Profile Card */}
            <Grid item xs={12} lg={8}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "200px",
                    height: "200px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    transform: "translate(50px, -50px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    👨‍🎓 Student Profile
                  </Typography>
                  
                  <Grid container spacing={3} alignItems="center">
                    <Grid item>
                      <Avatar
                        src="https://via.placeholder.com/100"
                        sx={{
                          width: 120,
                          height: 120,
                          border: "4px solid rgba(255,255,255,0.3)",
                          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                              Full Name
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {student.studentName}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                              Student ID
                            </Typography>
                            <Chip
                              label={student.studentId}
                              size="small"
                              sx={{
                                bgcolor: "rgba(255,255,255,0.2)",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                              Course
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {student.enrolledIn}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                              Expected Graduation
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {student.expectedGraduation || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            {student.phone && (
                              <Chip
                                icon={<Phone />}
                                label={student.phone}
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderColor: "rgba(255,255,255,0.5)",
                                  color: "white",
                                  "& .MuiChip-icon": { color: "white" },
                                }}
                              />
                            )}
                            {student.birthdate && (
                              <Chip
                                icon={<Event />}
                                label={student.birthdate}
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderColor: "rgba(255,255,255,0.5)",
                                  color: "white",
                                  "& .MuiChip-icon": { color: "white" },
                                }}
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={2}>
                {[
                  { title: "Courses", value: "6", color: "primary" },
                  { title: "Assignments", value: "12", color: "warning" },
                  { title: "GPA", value: "3.8", color: "success" },
                  { title: "Credits", value: "24", color: "info" },
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: `${stat.color}.50`,
                        borderLeft: `4px solid`,
                        borderLeftColor: `${stat.color}.main`,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: `${stat.color}.main`,
                          mb: 0.5,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Notifications Card */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Badge
                      badgeContent={notifications.filter(n => n.urgent).length}
                      color="error"
                    >
                      <NotificationsActive color="primary" />
                    </Badge>
                    <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                      Recent Notifications
                    </Typography>
                  </Box>
                  
                  <List dense>
                    {notifications.map((notification, index) => (
                      <React.Fragment key={notification.id}>
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            bgcolor: notification.urgent
                              ? alpha(theme.palette.error.main, 0.05)
                              : "transparent",
                            border: notification.urgent
                              ? `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                              : "none",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {getNotificationIcon(notification.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={notification.text}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: notification.urgent ? 600 : 400,
                            }}
                          />
                          {notification.urgent && (
                            <Chip
                              label="Urgent"
                              size="small"
                              color="error"
                              variant="outlined"
                            />
                          )}
                        </ListItem>
                        {index < notifications.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    🚀 Quick Actions
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {[
                      { title: "View Grades", icon: <School />, color: "primary" },
                      { title: "Submit Assignment", icon: <Assignment />, color: "warning" },
                      { title: "Schedule Meeting", icon: <Event />, color: "info" },
                      { title: "Course Materials", icon: <MenuBook />, color: "success" },
                    ].map((action, index) => (
                      <Grid item xs={6} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: `${action.color}.50`,
                              borderColor: `${action.color}.main`,
                              transform: "translateY(-2px)",
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <Box
                            sx={{
                              color: `${action.color}.main`,
                              mb: 1,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {action.icon}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500 }}
                          >
                            {action.title}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Academic Calendar */}
            <Grid item xs={12}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <CardContent>
                  <AcademicCalendar />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}