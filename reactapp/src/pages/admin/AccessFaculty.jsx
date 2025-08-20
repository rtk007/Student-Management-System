import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccessFaculty() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8080/api/faculty", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculties(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load faculties");
        setLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/faculty/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculties(faculties.filter((f) => f.id !== id));
      } catch (err) {
        alert(err.response?.data?.error || "Delete failed");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Access All Faculty Records</h1>
      <button style={{ backgroundColor: "slateblue", padding: "8px", color: "white" }}>
        Faculty Records
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Title</th>
            <th>Specialization</th>
            <th>Hire Date</th>
            <th>Office Location</th>
            <th>Office Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.employeeId}</td>
              <td>{f.name}</td>
              <td>{f.phoneNumber}</td>
              <td>{f.department}</td>
              <td>{f.title}</td>
              <td>{f.specialization}</td>
              <td>{f.hireDate}</td>
              <td>{f.officeLocation}</td>
              <td>{f.officeHours}</td>
              <td>
                <button
                  onClick={() => handleDelete(f.id)}
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
