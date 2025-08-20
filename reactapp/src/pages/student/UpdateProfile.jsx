import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateProfile() {
  const { username } = useParams(); // studentId
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/students/by-student-id/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent({
          studentName: res.data.studentName || "",
          studentCity: res.data.studentCity || "",
          phone: res.data.phone || "",
          lastAttendedSchool: res.data.lastAttendedSchool || "",
          enrolledIn: res.data.enrolledIn || "",
          email: res.data.user.email || "",
          password: ""
        });
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
        setLoading(false);
      }
    };
    fetchStudent();
  }, [username]);

  const handleChange = (e) => {
    setStudent({...student, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/students/update-profile/${username}`, student, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated successfully");
      navigate(`/student/dashboard/${username}`);
    } catch (err) {
      alert(err.response?.data?.error || "Update failed");
    }
  };

  if(loading) return <p>Loading...</p>;
  if(error) return <p style={{color: "red"}}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Profile</h2>
      <input name="studentName" value={student.studentName} onChange={handleChange} placeholder="Name" /><br/>
      <input name="studentCity" value={student.studentCity} onChange={handleChange} placeholder="City" /><br/>
      <input name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" /><br/>
      <input name="lastAttendedSchool" value={student.lastAttendedSchool} onChange={handleChange} placeholder="Last School" /><br/>
      <input name="enrolledIn" value={student.enrolledIn} onChange={handleChange} placeholder="Course" /><br/>
      <input name="birthdate" type="date" value={student.birthdate} onChange={handleChange} placeholder="Date of Birth" /><br/>
      <input name="email" value={student.email} onChange={handleChange} placeholder="Email" /><br/>
      <input name="password" type="password" value={student.password} onChange={handleChange} placeholder="New Password" /><br/><br/>
      <button onClick={handleSubmit} style={{ backgroundColor: 'lightpink', padding: '8px' }}>Update</button>
    </div>
  );
}
