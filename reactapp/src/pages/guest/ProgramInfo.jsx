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
  Container,
  Paper,
  Chip,
  Fade,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
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

          <Stack direction="row" spacing={2}>
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
              to="/faq"
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
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 4, md: 10 },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          gap: 6,
          borderRadius: 0,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography 
                    variant="h2" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      textShadow: '0 3px 12px rgba(0,0,0,0.3)',
                      mb: 3,
                    }}
                  >
                    Explore Our Academic Programs
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4,
                      opacity: 0.95,
                      lineHeight: 1.6,
                      textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    Unlock your potential with programs designed to enhance your skills,  
                    boost your career prospects, and prepare you for the future.  
                    From foundational courses to specialized programs, we've got something for every learner.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleBrowseClick}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      bgcolor: 'white',
                      color: 'primary.main',
                      boxShadow: 3,
                      '&:hover': {
                        bgcolor: 'grey.100',
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Browse Programs
                  </Button>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Fade in timeout={1200}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DotLottieReact
                    src="https://lottie.host/411c61a3-488c-4e87-9c02-2d37de674661/z1UIQkskpp.lottie"
                    loop
                    autoplay
                    style={{ width: 400, height: 400 }}
                  />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Courses Section */}
      <Container
        maxWidth="xl"
        ref={coursesRef}
        sx={{
          py: 8,
        }}
      >
        <Fade in timeout={800}>
          <Box>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                mb: 2, 
                textAlign: "center",
                color: 'text.primary',
              }}
            >
              Academic Programs
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 6, 
                textAlign: "center",
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Discover our comprehensive range of academic programs designed to shape your future
            </Typography>
          </Box>
        </Fade>

        <Fade in timeout={1000}>
          <Box sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSearchQuery("")}
                      edge="end"
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'white',
                  boxShadow: 2,
                },
              }}
            />
          </Box>
        </Fade>


        {loading ? (
          <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Loading programs...
            </Typography>
          </Box>
        ) : filteredPrograms.length === 0 ? (
          <Paper
            elevation={2}
            sx={{ 
              textAlign: "center", 
              py: 8,
              px: 4,
              borderRadius: 3,
              bgcolor: 'white',
            }}
          >
            <DotLottieReact
              src="https://lottie.host/411c61a3-488c-4e87-9c02-2d37de674661/z1UIQkskpp.lottie"
              loop
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <Typography variant="h5" sx={{ mt: 2, color: "text.secondary" }}>
              No programs found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search criteria
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {filteredPrograms.map((program) => (
              <Grid item xs={12} sm={6} md={4} key={program.id}>
                <Fade in timeout={800 + index * 100}>
                  <Card
                    elevation={4}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": { 
                        transform: "translateY(-8px)", 
                        boxShadow: 8,
                      },
                      bgcolor: "white",
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: 8,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ 
                            color: "primary.main",
                            lineHeight: 1.3,
                          }}
                        >
                          {program.programName}
                        </Typography>
                        <Chip
                          label={program.degreeType}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Department:</strong> {program.department}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 2,
                          lineHeight: 1.5,
                        }}
                      >
                        {program.programDescription}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Chip
                          label={`${program.creditHoursRequired} Credits`}
                          color="secondary"
                          size="small"
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setSelectedProgram(program)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Styled Dialog */}
      <Dialog
        open={Boolean(selectedProgram)}
        onClose={() => setSelectedProgram(null)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        {selectedProgram && (
          <>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                p: 3,
              }}
            >
              <DialogTitle sx={{ 
                fontWeight: "bold", 
                fontSize: '1.5rem',
                p: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                {selectedProgram.programName}
                <IconButton
                  onClick={() => setSelectedProgram(null)}
                  sx={{ color: 'white' }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
                {selectedProgram.degreeType} • {selectedProgram.department}
              </Typography>
            </Box>
            
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Program Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Credits Required:</strong> {selectedProgram.creditHoursRequired}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Department:</strong> {selectedProgram.department}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Status
                  </Typography>
                  <Chip
                    label={selectedProgram.isActive ? "Active Program" : "Inactive"}
                    color={selectedProgram.isActive ? "success" : "error"}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {selectedProgram.programDescription}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    Admission Requirements
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {selectedProgram.admissionRequirements}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            
            <Box sx={{ p: 3, bgcolor: 'grey.50', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setSelectedProgram(null)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/guest/register"
              >
                Apply Now
              </Button>
            </Box>
          </>
        )}
      </Dialog>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students who have transformed their careers with our programs
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
              Get Started Today
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              component={RouterLink}
              to="/guest/login"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { 
                  borderColor: "white", 
                  bgcolor: "rgba(255,255,255,0.1)" 
                },
              }}
            >
              Already Enrolled? Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

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
      </Paper>
    </Box>
  );
}
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
