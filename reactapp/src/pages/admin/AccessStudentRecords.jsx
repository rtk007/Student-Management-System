import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccessStudentRecords() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8080/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load students");
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(students.filter((s) => s.id !== id));
      } catch (err) {
        alert(err.response?.data?.error || "Delete failed");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Access All Student Records</h1>
      <button style={{ backgroundColor: "teal", padding: "8px", color: "white" }}>
        Student Records
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Type</th>
            <th>Standing</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.studentId}</td>
              <td>{s.studentName}</td>
              <td>{s.studentCity}</td>
              <td>{s.phone}</td>
              <td>{s.enrolledIn}</td>
              <td>{s.birthdate}</td>
              <td>{s.studentType}</td>
              <td>{s.academicStanding}</td>
              <td>{s.currentGpa}</td>
              <td>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={{ backgroundColor: "red", color: "white", padding: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
