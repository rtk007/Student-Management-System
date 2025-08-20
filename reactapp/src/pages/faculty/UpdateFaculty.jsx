import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateFacultyProfile() {
  const { username } = useParams(); // faculty username
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/faculty/username/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFaculty({
          name: res.data.name || "",
          phoneNumber: res.data.phoneNumber || "",
          department: res.data.department || "",
          title: res.data.title || "",
          specialization: res.data.specialization || "",
          hireDate: res.data.hireDate ? res.data.hireDate.split("T")[0] : "",
          officeLocation: res.data.officeLocation || "",
          officeHours: res.data.officeHours || "",
          email: res.data.user?.email || "",
          password: ""
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [username]);

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/faculty/username/${username}`,
        faculty,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully");
      navigate(`/faculty/dashboard/${username}`);
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Faculty Profile</h2>
      <input name="name" value={faculty.name} onChange={handleChange} placeholder="Name" /><br/>
      <input name="phoneNumber" value={faculty.phoneNumber} onChange={handleChange} placeholder="Phone Number" /><br/>
      <input name="department" value={faculty.department} onChange={handleChange} placeholder="Department" /><br/>
      <input name="title" value={faculty.title} onChange={handleChange} placeholder="Title" /><br/>
      <input name="specialization" value={faculty.specialization} onChange={handleChange} placeholder="Specialization" /><br/>
      <input name="hireDate" type="date" value={faculty.hireDate} onChange={handleChange} placeholder="Hire Date" /><br/>
      <input name="officeLocation" value={faculty.officeLocation} onChange={handleChange} placeholder="Office Location" /><br/>
      <input name="officeHours" value={faculty.officeHours} onChange={handleChange} placeholder="Office Hours" /><br/>
      <input name="email" value={faculty.email} onChange={handleChange} placeholder="Email" /><br/>
      <input name="password" type="password" value={faculty.password} onChange={handleChange} placeholder="New Password" /><br/><br/>
      <button onClick={handleSubmit} style={{ backgroundColor: "lightblue", padding: "8px" }}>
        Update
      </button>
    </div>
  );
}
