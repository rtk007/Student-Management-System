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
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LockIcon from "@mui/icons-material/Lock";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo + Brand */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
              alt="Studzz Logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                transition: "transform 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
            <Button color="inherit" component={RouterLink} to="/guest/program-info">
              Programs
            </Button>
            <Button color="inherit" component={RouterLink} to="/guest/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contact Us
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              FAQ's
            </Button>
            
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
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
              "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          }}
        />

        {/* Hero Content */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 800,
            px: { xs: 2, md: 3 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.2rem" },
              textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            Welcome to Studzz
          </Typography>
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{ 
              opacity: 0.95, 
              mb: 4,
              fontSize: { xs: "1rem", md: "1.25rem" },
              px: { xs: 1, md: 0 }
            }}
          >
            Your all-in-one digital platform to simplify academic management.<br />
            From students to faculty and administrators — we bring everything
            together in one place.
          </Typography>
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/guest/program-info"
              startIcon={<SchoolIcon />}
              sx={{ minWidth: { xs: "200px", sm: "auto" } }}
            >
              Explore Programs
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to="/guest/register"
              startIcon={<LockIcon />}
              sx={{
                borderColor: "white",
                color: "white",
                minWidth: { xs: "200px", sm: "auto" },
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Why Choose Us Section */}
      {/* Why Choose Us Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #f9f9ff, #eef3ff)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            {/* Left Column: Intro Text */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: "2rem", sm: "2.25rem" },
                    textAlign: { xs: "center", md: "left" }
                  }}
                >
                  Why Choose Studzz?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: "1rem", md: "1.1rem" }, 
                    lineHeight: 1.8,
                    textAlign: { xs: "center", md: "left" },
                    px: { xs: 2, md: 0 }
                  }}
                >
                  Studzz is designed to empower education with technology.<br/> We
                  provide a seamless platform for managing programs,<br/>courses,
                  grades, and records. Our mission is to connect students,<br/>
                  faculty, and administrators with powerful yet simple tools<br/>
                  that enhance learning and productivity.
                </Typography>
              </Box>
            </Grid>
            
            {/* Right Column: Logo + Name */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: "linear-gradient(145deg, #1a237e, #283593)",
                  borderRadius: 4,
                  p: { xs: 6, md: 8 },
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 15px 50px rgba(26,35,126,0.3)",
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
                    background: "radial-gradient(circle at top right, rgba(33,150,243,0.25), transparent 55%)",
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
                    alt="Studzz Logo"
                    style={{
                      width: "clamp(140px, 20vw, 180px)",
                      height: "clamp(140px, 20vw, 180px)",
                      borderRadius: "50%",
                      marginBottom: "32px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                      border: "4px solid rgba(255,255,255,0.3)",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.08) rotate(4deg)";
                      e.currentTarget.style.boxShadow = "0 14px 55px rgba(0,0,0,0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                      e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.5)";
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
                    variant="subtitle1"
                    sx={{
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "rgba(255,255,255,0.9)",
                      textAlign: "center",
                      maxWidth: "360px",
                      fontWeight: 300,
                      letterSpacing: "0.6px",
                      lineHeight: 1.6,
                    }}
                  >
                    Simplifying Education, Empowering Growth
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#111", color: "white", py: 4, textAlign: "center" }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Studzz. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}