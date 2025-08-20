// src/pages/Fallback.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Fallback() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}
