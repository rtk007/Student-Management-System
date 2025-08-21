import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  Grid,
  Card,
  CardContent,
  Paper,
  Fade,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import GroupIcon from "@mui/icons-material/Group";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Home() {
  const theme = useTheme();

  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          backdropFilter: "blur(6px)",
          boxShadow: 3,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Brand */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
              alt="Studzz Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                letterSpacing: 1,
                '&:hover': {
                  color: 'primary.light',
                },
              }}
            >
              Studzz
            </Typography>
          </Stack>

          {/* Nav Links */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2}
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/guest/program-info"
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                } 
              }}
            >
              Programs
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/guest/login"
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                } 
              }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                } 
              }}
            >
              Contact Us
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/contact"
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                } 
              }}
            >
              FAQ's
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          minHeight: { xs: "70vh", md: "85vh" },
          position: "relative",
          backgroundImage:
            "url(https://www.crimsoneducation.org/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F64062%2F2000x1500%2Fdbc24c9039%2Fblack-ivy-league.jpg&w=1080&q=75)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          borderRadius: 0,
        }}
      >
        {/* Glossy Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(25,118,210,0.4))",
          }}
        />

        {/* Hero Content */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 2,
            px: { xs: 2, md: 3 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Fade in timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                  textShadow: "0px 3px 12px rgba(0,0,0,0.7)",
                  mb: 3,
                }}
              >
                Welcome to Studzz
              </Typography>
              <Typography
                variant="h5"
                component="p"
                gutterBottom
                sx={{ 
                  opacity: 0.95, 
                  mb: 4,
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  px: { xs: 1, md: 0 },
                  textShadow: "0px 2px 8px rgba(0,0,0,0.5)",
                  lineHeight: 1.6,
                }}
              >
                Your all-in-one digital platform to simplify academic management.<br />
                From students to faculty and administrators — we bring everything
                together in one place.
              </Typography>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={3} 
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/guest/program-info"
                  startIcon={<SchoolIcon />}
                  sx={{ 
                    minWidth: { xs: "220px", sm: "auto" },
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Explore Programs
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/guest/register"
                  startIcon={<LockIcon />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    minWidth: { xs: "220px", sm: "auto" },
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    borderWidth: 2,
                    "&:hover": { 
                      borderColor: "primary.main", 
                      bgcolor: "primary.main",
                      color: "white",
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Studzz?
        </Typography>
        
        <Grid container spacing={4}>
          {[
            {
              icon: <AutoStoriesIcon sx={{ fontSize: 48 }} />,
              title: "Comprehensive Learning",
              description: "Access all your courses, materials, and assignments in one centralized platform designed for modern education."
            },
            {
              icon: <GroupIcon sx={{ fontSize: 48 }} />,
              title: "Seamless Collaboration",
              description: "Connect students, faculty, and administrators with powerful communication and management tools."
            },
            {
              icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
              title: "Track Progress",
              description: "Monitor academic performance with detailed analytics, grade tracking, and progress reports."
            }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={1000 + index * 200}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            {/* Left Column: Intro Text */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1200}>
                <Box sx={{ pr: { md: 4 } }}>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ 
                      mb: 3,
                      fontSize: { xs: "2rem", sm: "2.5rem" },
                      textAlign: { xs: "center", md: "left" }
                    }}
                  >
                    About Studzz
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: "1rem", md: "1.2rem" }, 
                      lineHeight: 1.8,
                      textAlign: { xs: "center", md: "left" },
                      px: { xs: 2, md: 0 }
                    }}
                  >
                    Studzz is designed to empower education with technology. We
                    provide a seamless platform for managing programs, courses,
                    grades, and records. Our mission is to connect students,
                    faculty, and administrators with powerful yet simple tools
                    that enhance learning and productivity.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            
            {/* Right Column: Logo + Name */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1400}>
                <Card
                  elevation={8}
                  sx={{
                    background: "linear-gradient(145deg, #1976d2, #1565c0)",
                    borderRadius: 4,
                    p: { xs: 6, md: 8 },
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 60%)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      component="img"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
                      alt="Studzz Logo"
                      sx={{
                        width: { xs: 140, md: 180 },
                        height: { xs: 140, md: 180 },
                        borderRadius: "50%",
                        mb: 4,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                        border: "4px solid rgba(255,255,255,0.3)",
                        transition: "transform 0.4s ease",
                        "&:hover": {
                          transform: "scale(1.05) rotate(5deg)",
                        },
                      }}
                    />
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                        mb: 3,
                        color: "white",
                        textShadow: "0 3px 10px rgba(0,0,0,0.35)",
                        letterSpacing: "2px",
                      }}
                    >
                      Studzz
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        color: "rgba(255,255,255,0.9)",
                        maxWidth: "360px",
                        mx: "auto",
                        fontWeight: 300,
                        letterSpacing: "0.6px",
                        lineHeight: 1.6,
                      }}
                    >
                      Simplifying Education, Empowering Growth
                    </Typography>
                  </Box>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Card
          elevation={4}
          sx={{
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students and educators already using Studzz
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/guest/register"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              component={RouterLink}
              to="/guest/program-info"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { 
                  borderColor: "white", 
                  bgcolor: "rgba(255,255,255,0.1)" 
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Card>
      </Container>

      {/* Footer */}
      <Paper
        elevation={0}
        sx={{ 
          bgcolor: "grey.900", 
          color: "white", 
          py: 4, 
          textAlign: "center",
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" sx={{ mb: 2 }}>
            © {new Date().getFullYear()} Studzz. All rights reserved.
          </Typography>
          <Typography variant="body2" color="grey.400">
            Empowering education through innovative technology solutions.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}