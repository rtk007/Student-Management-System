import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Student Management System</h1>
      <p>Manage programs, students, faculty, and more with ease.</p>

      <div style={{ marginTop: '30px' }}>
        <Link to="/guest/program-info">
          <button style={{ backgroundColor: 'lightblue', padding: '10px 20px', marginRight: '15px' }}>
            View Program Info
          </button>
        </Link>

        <Link to="/guest/login">
          <button style={{ backgroundColor: 'orange', padding: '10px 20px' }}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
