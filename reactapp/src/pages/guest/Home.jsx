import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <div className="text-center fade-in">
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="card-header" style={{ justifyContent: 'center', fontSize: '32px', marginBottom: '24px' }}>
              🎓 Student Management System
            </div>
            <div className="card-body">
              <p style={{ fontSize: '18px', marginBottom: '32px', color: '#4a5568' }}>
                Streamline your educational institution with our comprehensive management platform. 
                Manage programs, students, faculty, and academic records with ease.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/guest/program-info" className="btn btn-primary">
                  📚 View Programs
                </Link>
                <Link to="/guest/login" className="btn btn-secondary">
                  🔐 Login
                </Link>
              </div>
              
              <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
                <h3 style={{ marginBottom: '16px', color: '#2d3748' }}>✨ Key Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <strong>👨‍🎓 Student Portal</strong>
                    <p style={{ fontSize: '14px', color: '#4a5568', marginTop: '4px' }}>View grades, courses, and academic records</p>
                  </div>
                  <div>
                    <strong>👨‍🏫 Faculty Dashboard</strong>
                    <p style={{ fontSize: '14px', color: '#4a5568', marginTop: '4px' }}>Manage courses and assign grades</p>
                  </div>
                  <div>
                    <strong>🛠 Admin Panel</strong>
                    <p style={{ fontSize: '14px', color: '#4a5568', marginTop: '4px' }}>Complete system administration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
