import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default function ViewCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to decode JWT token and extract username (which is studentId)
  const decodeJWT = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log("Decoded JWT payload:", decoded);
      return decoded.sub; // 'sub' contains username from User entity
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  // Get username from JWT token (this username = studentId in Student entity)
  const getStudentIdFromToken = () => {
    // In real app, get from localStorage
    const token = localStorage?.getItem?.("token") || 
                  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";
    
    if (token) {
      return decodeJWT(token); // This returns the username which matches studentId
    }
    return null;
  };

  const studentId = getStudentIdFromToken(); // username from User = studentId in Student
  const token = localStorage?.getItem?.("token") || 
                "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Username from JWT: ${studentId}`);
        
        // Step 1: Get Student entity by studentId (username) to get the Long ID
        console.log(`Getting student by studentId: ${API_BASE_URL}/students/by-student-id/${studentId}`);
        const studentResponse = await axios.get(
          `${API_BASE_URL}/students/by-student-id/${studentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        
        const student = studentResponse.data;
        console.log("Found student:", student);
        
        if (!student || !student.id) {
          throw new Error("Student not found or missing ID");
        }
        
        // Step 2: Get enrollments using the Student's Long ID
        console.log(`Getting enrollments by student Long ID: ${API_BASE_URL}/enrollments/student/${student.id}`);
        const enrollmentResponse = await axios.get(
          `${API_BASE_URL}/enrollments/student/${student.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          }
        );
        
        console.log("API Response:", enrollmentResponse.data);
        setEnrollments(Array.isArray(enrollmentResponse.data) ? enrollmentResponse.data : []);
        
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        
        // Detailed axios error handling
        if (error.response) {
          // Server responded with error status
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
          setError(`Server error: ${error.response.status} - ${error.response.data?.message || error.response.data?.error || 'Unknown error'}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
          setError("No response from server. Check if the server is running and accessible.");
        } else {
          // Something else happened
          console.error("Error message:", error.message);
          setError(`Request error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchEnrollments();
    } else {
      setError("Unable to extract student ID from token");
      setLoading(false);
    }
  }, [studentId, token]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Loading your enrolled courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>📚 My Enrolled Courses</h2>
        <div style={{ 
          color: "red", 
          backgroundColor: "#fee", 
          padding: "10px", 
          border: "1px solid red",
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          <strong>Error:</strong> {error}
        </div>
        
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          <strong>Debug Info:</strong>
          <ul>
            <li>Username from JWT: {studentId}</li>
            <li>First API: {API_BASE_URL}/students/by-student-id/{studentId}</li>
            <li>Then API: {API_BASE_URL}/enrollments/student/[LONG_ID]</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 My Enrolled Courses</h2>
      
      <div style={{ 
        fontSize: "12px", 
        color: "#666", 
        marginBottom: "10px",
        backgroundColor: "#f8f9fa",
        padding: "8px",
        borderRadius: "4px"
      }}>
        <strong>Debug:</strong> Username from JWT (= studentId): {studentId} | Found {enrollments.length} enrollments
      </div>
      
      {enrollments.length === 0 ? (
        <div>
          <p>You are not enrolled in any courses yet.</p>
        </div>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Status</th>
              <th>Enrolled On</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment, index) => (
              <tr key={enrollment.id || `enrollment-${index}`}>
                <td>{enrollment.course?.courseName || enrollment.courseName || "N/A"}</td>
                <td>{enrollment.semester || "N/A"}</td>
                <td>{enrollment.year || "N/A"}</td>
                <td>{enrollment.enrollmentStatus || enrollment.status || "N/A"}</td>
                <td>
                  {enrollment.enrollmentDate
                    ? new Date(enrollment.enrollmentDate).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}