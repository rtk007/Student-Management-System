// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
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
        setError('Invalid response from server');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'STUDENT') navigate(`/student/dashboard/${username}`);
      else if (role === 'FACULTY') navigate(`/faculty/dashboard/${username}`);
      else if (role === 'ADMIN') navigate(`/admin/dashboard/${username}`);
      else if (role === 'REGISTRAR') navigate(`/registrar/dashboard/${username}`);
      else navigate('/');
      
    } catch (err) {
      if (err.response?.data?.error) setError(err.response.data.error);
      else setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.formSection}>
          <h1 style={styles.heading}>Login</h1>
          <p style={styles.subheading}>Enter your credentials to access your account</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={{ ...styles.button, ...(loading && styles.buttonDisabled) }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/guest/register')}
              style={styles.registerButton}
            >
              Register Now
            </button>
          </form>
        </div>
        <div style={styles.imageSection}>
          <div style={styles.image}>🎓</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    display: 'flex',
    width: '900px',
    maxWidth: '100%',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  formSection: {
    flex: 1,
    padding: '50px 40px',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '10px',
    fontWeight: '700',
    color: '#2d3748',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subheading: {
    fontSize: '16px',
    marginBottom: '40px',
    color: '#4a5568',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '16px 20px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s',
    background: 'rgba(255, 255, 255, 0.9)',
  },
  inputFocus: {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
  },
  button: {
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  },
  buttonDisabled: {
    background: '#a0aec0',
    cursor: 'not-allowed',
  },
  registerButton: {
    background: 'transparent',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  error: {
    color: '#e53e3e',
    marginBottom: '15px',
    fontSize: '14px',
    background: 'rgba(229, 62, 62, 0.1)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(229, 62, 62, 0.2)',
  },
  imageSection: {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    fontSize: '120px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
};
