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
          <img
            src="/mnt/data/7a30a8e9-5538-4521-8dc6-62a121a16c94.png"
            alt="Login Illustration"
            style={styles.image}
          />
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
    background: '#f4f6f8',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    display: 'flex',
    width: '900px',
    maxWidth: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    background: '#fff',
  },
  formSection: {
    flex: 1,
    padding: '60px 50px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: '700',
    color: '#111',
  },
  subheading: {
    fontSize: '16px',
    marginBottom: '40px',
    color: '#666',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '14px 18px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s',
  },
  inputFocus: {
    borderColor: '#3399ff',
    boxShadow: '0 0 5px rgba(51,153,255,0.3)',
  },
  button: {
    padding: '14px',
    background: '#3399ff',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
    transition: 'background 0.3s',
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
  },
  registerButton: {
    background: 'transparent',
    border: 'none',
    color: '#3399ff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
  },
  imageSection: {
    flex: 1,
    background: '#f0f4f8',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};
