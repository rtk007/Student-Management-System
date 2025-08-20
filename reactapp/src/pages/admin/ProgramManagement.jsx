import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set base URL for API calls
const API_BASE_URL = 'http://localhost:8080';

export default function ProgramManagement() {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEmptyCourse = () => ({
    courseCode: '',
    courseName: '',
    creditHours: '',
    department: '',
    courseDescription: '',
    prerequisites: '',
    isActive: true
  });

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      alert('Failed to fetch courses. Check backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/courses/${id}`);
      alert('Course deleted successfully!');
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Failed to delete course.');
    } finally {
      setLoading(false);
    }
  };

  const validateCourse = (course) => {
    if (!course.courseCode.trim()) return alert('Course Code is required'), false;
    if (!course.courseName.trim()) return alert('Course Name is required'), false;
    if (!course.creditHours || course.creditHours < 1) return alert('Credit Hours must be positive'), false;
    return true;
  };

  const handleSave = async () => {
    if (!currentCourse || !validateCourse(currentCourse)) return;

    try {
      setLoading(true);
      const courseData = { ...currentCourse, creditHours: parseInt(currentCourse.creditHours) || 0, isActive: currentCourse.isActive === true };

      if (currentCourse.id) {
        await axios.put(`${API_BASE_URL}/courses/${currentCourse.id}`, courseData);
        alert('Course updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/courses`, courseData);
        alert('Course added successfully!');
      }

      setModalOpen(false);
      setCurrentCourse(null);
      fetchCourses();
    } catch (err) {
      console.error('Error saving course:', err);
      alert('Failed to save course. Check if the code already exists.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (course = null) => {
    if (course) setCurrentCourse({ ...course, creditHours: course.creditHours?.toString() || '' });
    else setCurrentCourse(getEmptyCourse());
    setModalOpen(true);
  };

  const handleInputChange = (field, value) => {
    setCurrentCourse(prev => ({ ...prev, [field]: value }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCourse(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Program Management</h1>

      <button
        style={{
          backgroundColor: '#bc8f8f',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
        onClick={() => openModal()}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Add Course'}
      </button>

      {loading && <p>Loading...</p>}

      {/* List layout */}
      {courses.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No courses available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Course Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Code</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Credits</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Department</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Active</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{course.courseName}</td>
                <td style={{ padding: '8px' }}>{course.courseCode}</td>
                <td style={{ padding: '8px' }}>{course.creditHours}</td>
                <td style={{ padding: '8px' }}>{course.department || 'N/A'}</td>
                <td style={{ padding: '8px' }}>{course.isActive ? 'Yes' : 'No'}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      backgroundColor: '#87ceeb',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      flex: 1
                    }}
                    onClick={() => openModal(course)}
                    disabled={loading}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      backgroundColor: '#fa8072',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      flex: 1
                    }}
                    onClick={() => handleDelete(course.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal (unchanged) */}
      {modalOpen && currentCourse && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '450px',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>{currentCourse.id ? 'Update Course' : 'Add Course'}</h2>
            {/* Inputs unchanged */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Course Code *</label>
              <input
                type="text"
                value={currentCourse.courseCode}
                onChange={(e) => handleInputChange('courseCode', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Course Name *</label>
              <input
                type="text"
                value={currentCourse.courseName}
                onChange={(e) => handleInputChange('courseName', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Credit Hours *</label>
              <input
                type="number"
                value={currentCourse.creditHours}
                onChange={(e) => handleInputChange('creditHours', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label>Department</label>
              <input
                type="text"
                value={currentCourse.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label>Description</label>
              <textarea
                value={currentCourse.courseDescription}
                onChange={(e) => handleInputChange('courseDescription', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label>Prerequisites</label>
              <input
                type="text"
                value={currentCourse.prerequisites}
                onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={currentCourse.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                /> Active Course
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={closeModal} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
