// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Card, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  Container,
  MenuItem,
  Fade,
} from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        username: formData.username,
        email: formData.email,
        passwordHash: formData.password, // ✅ backend expects passwordHash
        role: formData.role,
      };

      console.log("Sending registration data:", requestData);

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        requestData
      );

      console.log("Registration response:", response.data);

      if (response.data.message === "SUCCESS") {
        alert("Registration successful! Redirecting to login...");
        navigate("/guest/login");
      } else if (response.data.error) {
        setError(response.data.error);
      } else {
        setError("Unexpected response: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error registering user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container 
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in timeout={800}>
        <Card
          elevation={12}
          sx={{
            display: 'flex',
            width: { xs: '100%', md: 900 },
            maxWidth: 900,
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
        {/* LEFT FORM */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ 
              mb: 1,
              color: 'text.primary',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Join Studzz
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
            }}
          >
            Create your account to get started
          </Typography>
          
          <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              select
              label="Select Role"
              variant="outlined"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="STUDENT">Student</MenuItem>
              <MenuItem value="FACULTY">Faculty</MenuItem>
            </TextField>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                mb: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                '&:disabled': {
                  background: 'grey.400',
                },
              }}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/guest/login")}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'primary.50',
                },
              }}
            >
              Already have an account? Sign In
            </Button>
          </Box>
        </Box>

        {/* RIGHT IMAGE + LOGO SIDE */}
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            color: 'white',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZuD36ufCWFNP56trvf_IPHh2vzgUdHKGJxQ&s"
              alt="Studzz Logo"
              sx={{
                width: { xs: 120, md: 160 },
                height: { xs: 120, md: 160 },
                borderRadius: '50%',
                mb: 3,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '4px solid rgba(255,255,255,0.3)',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.05) rotate(5deg)',
                },
              }}
            />
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 3,
                textShadow: '0 3px 8px rgba(0,0,0,0.3)',
              }}
            >
              Studzz
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 300,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Simplifying Education, Empowering Growth
            </Typography>
          </Box>
        </Box>
        </Card>
      </Fade>
    </Container>
  );
}
