import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", // ✅ Changed from passwordHash to password
    role: "", // no default
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      alert("Please select a role.");
      return;
    }
    
    try {
      // Send password as passwordHash to match backend expectation
      const requestData = {
        username: formData.username,
        email: formData.email,
        passwordHash: formData.password, // ✅ Map password to passwordHash for backend
        role: formData.role
      };
      
      console.log("Sending registration data:", requestData); // Debug log
      
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        requestData
      );
      
      console.log("Registration response:", response.data); // Debug log
      
      // ✅ Check for the correct response structure
      if (response.data.message === "SUCCESS") {
        alert("Registration successful! Redirecting to login...");
        navigate("/guest/login");
      } else if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Unexpected response: " + JSON.stringify(response.data));
      }
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response?.data);
      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Error registering user");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password" // ✅ This matches the state field name
          placeholder="Password"
          value={formData.password} // ✅ This now matches
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          {/* <option value="REGISTRAR">Registrar</option>
          <option value="ADMIN">Admin</option> */}
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}