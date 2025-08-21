import React, { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ProgramInfo() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);

  const coursesRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/academic-programs")
      .then((res) => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        setLoading(false);
      });
  }, []);

  const filteredPrograms = programs.filter((program) =>
    program.programName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBrowseClick = () => {
    coursesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
              sx={{ textDecoration: "none", color: "white", fontWeight: "bold", letterSpacing: 1 }}
            >
              Studzz
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button color="inherit" component={RouterLink} to="/guest/program-info">
              Programs
            </Button>
            <Button color="inherit" component={RouterLink} to="/guest/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contact Us
            </Button>
            <Button color="inherit" component={RouterLink} to="/faq">
              FAQ's
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 4, md: 10 },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          gap: 6,
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Explore Our Range of Courses
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Unlock your potential with programs designed to enhance your skills,  
            boost your career prospects, and prepare you for the future.  
            From foundational courses to specialized programs, we’ve got something for every learner.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBrowseClick}
          >
            Browse Programs
          </Button>
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <DotLottieReact
            src="https://lottie.host/411c61a3-488c-4e87-9c02-2d37de674661/z1UIQkskpp.lottie"
            loop
            autoplay
            style={{ width: 400, height: 400 }}
          />
        </Box>
      </Box>

      {/* Courses Section */}
      <Box
        ref={coursesRef}
        sx={{
          flex: 1,
          p: 6,
          mt: 4,
          backgroundColor: "#f3f4f6",
          borderRadius: 3,
          width: "90%",
          mx: "auto",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: "center" }}>
          Academic Programs
        </Typography>

        <Box sx={{ width: "900px", maxWidth: "100%", mx: "auto", mb: 6 }}>
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search programs..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</Box>


        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredPrograms.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <DotLottieReact
              src="https://lottie.host/411c61a3-488c-4e87-9c02-2d37de674661/z1UIQkskpp.lottie"
              loop
              autoplay
            />
            <Typography sx={{ mt: 2, color: "gray" }}>No programs found</Typography>
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredPrograms.map((program) => (
              <Grid item key={program.id}>
                <Card
                  sx={{
                    width: 320,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 8 },
                    background: "#ffffff",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "#4a148c" }}
                    >
                      {program.programName}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {program.degreeType} | {program.department}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      {program.programDescription}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      Credits: {program.creditHoursRequired}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#4a148c",
                        "&:hover": { backgroundColor: "#6a1b9a" },
                      }}
                      onClick={() => setSelectedProgram(program)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Styled Dialog */}
      <Dialog
        open={Boolean(selectedProgram)}
        onClose={() => setSelectedProgram(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
            backgroundColor: "#f5f5f5",
            boxShadow: 12,
          },
        }}
      >
        {selectedProgram && (
          <>
            <DialogTitle sx={{ fontWeight: "bold", color: "#4a148c" }}>
              {selectedProgram.programName} ({selectedProgram.degreeType})
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText sx={{ mb: 1 }}>
                <strong>Department:</strong> {selectedProgram.department}
              </DialogContentText>
              <DialogContentText sx={{ mb: 1 }}>
                <strong>Credits Required:</strong> {selectedProgram.creditHoursRequired}
              </DialogContentText>
              <DialogContentText sx={{ mb: 1 }}>
                <strong>Description:</strong> {selectedProgram.programDescription}
              </DialogContentText>
              <DialogContentText>
                <strong>Admission Requirements:</strong> {selectedProgram.admissionRequirements}
              </DialogContentText>
            </DialogContent>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button
                onClick={() => setSelectedProgram(null)}
                variant="contained"
                sx={{ backgroundColor: "#4a148c", "&:hover": { backgroundColor: "#6a1b9a" } }}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </Dialog>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 4,
          py: 3,
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Studzz. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
