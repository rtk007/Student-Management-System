import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default function ViewGrades() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Decode JWT to get studentId (username)
  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.sub;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const getStudentIdFromToken = () => {
    const token =
      localStorage?.getItem?.("token") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

    if (token) return decodeJWT(token);
    return null;
  };

  const studentId = getStudentIdFromToken();
  const token =
    localStorage?.getItem?.("token") ||
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBU0RGR0hKIiwiaWF0IjoxNzU1NTc0NTgzLCJleHAiOjE3NTU2NjA5ODN9.xncRZkqTWl9UgnkSC-tekGgNbdq5Kq0sMBTpBgg7iNQ";

  // Helpers
  const getGradeColor = (grade) => {
    if (!grade) return "#666";
    const num = parseFloat(grade);
    if (num >= 90) return "#28a745"; // Green
    if (num >= 80) return "#007bff"; // Blue
    if (num >= 70) return "#ffc107"; // Yellow
    if (num >= 60) return "#fd7e14"; // Orange
    return "#dc3545"; // Red
  };

  const getLetterGrade = (grade) => {
    if (!grade) return "N/A";
    const num = parseFloat(grade);
    if (num >= 90) return "A";
    if (num >= 80) return "B";
    if (num >= 70) return "C";
    if (num >= 60) return "D";
    return "F";
  };

  const calculateGPA = () => {
    const validGrades = enrollments.filter(
      (e) => e.finalGrade && e.gradePoints
    );
    if (validGrades.length === 0) return "N/A";
    const totalPoints = validGrades.reduce(
      (sum, e) => sum + parseFloat(e.gradePoints || 0),
      0
    );
    return (totalPoints / validGrades.length).toFixed(2);
  };

  // Fetch data
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Get student by studentId
        const studentResponse = await axios.get(
          `${API_BASE_URL}/students/by-student-id/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const student = studentResponse.data;
        if (!student || !student.id) throw new Error("Student not found");

        // 2. Get enrollments
        const enrollmentResponse = await axios.get(
          `${API_BASE_URL}/enrollments/student/${student.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEnrollments(
          Array.isArray(enrollmentResponse.data)
            ? enrollmentResponse.data
            : []
        );
      } catch (err) {
        if (err.response) {
          setError(
            `Server error: ${err.response.status} - ${
              err.response.data?.message || "Unknown error"
            }`
          );
        } else if (err.request) {
          setError("No response from server. Check backend connection.");
        } else {
          setError(`Request error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchEnrollments();
    else {
      setError("Unable to extract student ID from token");
      setLoading(false);
    }
  }, [studentId, token]);

  // UI
  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>📊 My Grades</h2>
        <p>Loading your grades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>📊 My Grades</h2>
        <div
          style={{
            color: "red",
            backgroundColor: "#fee",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 My Grades</h2>

      {enrollments.length > 0 && (
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>📈 Academic Summary</h3>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <strong>Total Courses:</strong> {enrollments.length}
            </div>
            <div>
              <strong>Courses with Grades:</strong>{" "}
              {enrollments.filter((e) => e.finalGrade).length}
            </div>
            <div>
              <strong>Current GPA:</strong> {calculateGPA()}
            </div>
          </div>
        </div>
      )}

      {enrollments.length === 0 ? (
        <p>You don’t have any grades yet.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Course</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Final Grade</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((e, i) => (
              <tr key={e.id || `enrollment-${i}`}>
                <td>{e.course?.courseName || "N/A"}</td>
                <td>{e.semester || "N/A"}</td>
                <td>{e.year || "N/A"}</td>
                <td style={{ color: getGradeColor(e.finalGrade) }}>
                  {e.finalGrade
                    ? `${getLetterGrade(e.finalGrade)} (${e.finalGrade})`
                    : "N/A"}
                </td>
                <td>{e.gradePoints || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
