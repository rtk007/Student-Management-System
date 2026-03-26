// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/guest/Login";

// Guest Pages
import ProgramInfo from "./pages/guest/ProgramInfo";
import Home from "./pages/guest/Home";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import ViewRecords from "./pages/student/ViewRecords";
import UpdateProfile from "./pages/student/UpdateProfile";
import ViewGrades from "./pages/student/ViewGrades";
import AcademicCalendar from "./pages/student/AcademicCalendar";
import ViewCourses from "./pages/student/ViewCourses";

// Faculty Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ManageCourses from "./pages/faculty/ManageEnrollments";
import GradeStudents from "./pages/faculty/GradeStudents";
import UpdateFaculty from "./pages/faculty/UpdateFaculty";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AccessStudentRecords from "./pages/admin/AccessStudentRecords";
import AuditLogs from "./pages/admin/AuditLogs";
import ProgramManagement from "./pages/admin/ProgramManagement";
import AccessFaculty from "./pages/admin/AccessFaculty";
// Fallback + Unauthorized
import Fallback from "./pages/error/fallback.jsx";
import BadLogin from "./pages/error/BadLogin.jsx";
import AcademicPrograms from "./pages/admin/AcademicPrograms.jsx";
import Notification from "./pages/admin/Notification.jsx";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== roleRequired) {
    return <BadLogin />; // Unauthorized attempt
  }
  return children;
};

// 🔹 Animated Routes Wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    
        <Routes location={location} key={location.pathname}>
          {/* Guest pages */}
          
          <Route path="/" element={<Home />} />
          <Route path="/guest/program-info" element={<ProgramInfo />} />
          
          <Route path="/guest/login" element={<Login />} />
         

          {/* Student pages */}
          <Route
            path="/student/dashboard/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/view-records/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <ViewRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/update-profile/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/courses/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <ViewCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/view-grades/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <ViewGrades />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/academic-calendar/:username"
            element={
              <PrivateRoute roleRequired="STUDENT">
                <AcademicCalendar />
              </PrivateRoute>
            }
          />

          {/* Faculty pages */}
          <Route
            path="/faculty/dashboard/:username"
            element={
              <PrivateRoute roleRequired="FACULTY">
                <FacultyDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty/manage-courses/:username"
            element={
              <PrivateRoute roleRequired="FACULTY">
                <ManageCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty/assign-grades/:username"
            element={
              <PrivateRoute roleRequired="FACULTY">
                <GradeStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty/update/:username"
            element={
              <PrivateRoute roleRequired="FACULTY">
                <UpdateFaculty />
              </PrivateRoute>
            }
          />
          

          {/* Admin pages */}
          <Route
            path="/admin/dashboard/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/student/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <AccessStudentRecords />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/faculty/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <AccessFaculty />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/audit-logs/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <AuditLogs />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/courses/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <ProgramManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/academic-programs/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <AcademicPrograms />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/notification/:username"
            element={
              <PrivateRoute roleRequired="ADMIN">
                <Notification />
              </PrivateRoute>
            }
          />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<Fallback />} />
        </Routes>
      
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
