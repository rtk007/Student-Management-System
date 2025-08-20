// src/pages/BadLogin.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BadLogin() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>⚠️ Unauthorized Access</h2>
      <p>You tried to access a page without logging in.</p>
      <Link to="/guest/login">Go to Login</Link>
    </div>
  );
}
