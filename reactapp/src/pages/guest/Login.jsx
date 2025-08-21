// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  Container,
  Paper,
  Fade,
} from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: username.trim(),
        password: password,
      });

      const { token, role, error: serverError } = response.data;

      if (serverError) {
        setError(serverError);
        setLoading(false);
        return;
      }

      if (!token || !role) {
        setError("Invalid response from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "STUDENT") navigate(`/student/dashboard/${username}`);
      else if (role === "FACULTY") navigate(`/faculty/dashboard/${username}`);
      else if (role === "ADMIN") navigate(`/admin/dashboard/${username}`);
      else if (role === "REGISTRAR") navigate(`/registrar/dashboard/${username}`);
      else navigate("/");
    } catch (err) {
      if (err.response?.data?.error) setError(err.response.data.error);
      else setError("Login failed. Please try again.");
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
        {/* Left Section */}
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
                mb: 2,
                textShadow: '0 3px 8px rgba(0,0,0,0.3)',
                fontSize: { xs: '2rem', md: '3rem' },
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

        {/* Right Section */}
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
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
            }}
          >
            Enter your credentials to access your account
          </Typography>
          
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/guest/register")}
              sx={{
                color: 'primary.main',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'primary.50',
                },
              }}
            >
              Don't have an account? Register Now
            </Button>
          </Box>
        </Box>
        </Card>
      </Fade>
    </Container>
  );
}
