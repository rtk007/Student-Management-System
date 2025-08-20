import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // 🔧 FIXED: Added /api prefix

export default function ManageEnrollments() {
  const [students, setStudents] = useState([]);
  const [studentEnrollments, setStudentEnrollments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Grade options
  const gradeOptions = ["O", "A+", "A", "B+", "B", "C", "D", "F"];

  // Fetch students only (without enrollments)
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/students`); // 🔧 FIXED: Using /api/students
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Open modal and fetch enrollments separately
  const openModal = async (student) => {
    setSelectedStudent(student);
    try {
      // 🔧 FIXED: Using correct API base URL
      const res = await axios.get(`http://localhost:8080/enrollments/student/${student.id}`);
      const enrollments = res.data;

      // preload grades
      const initialGrades = {};
      enrollments.forEach((enrollment) => {
        initialGrades[enrollment.id] = enrollment.grade?.gradeLetter || "";
      });

      setStudentEnrollments(enrollments);
      setGrades(initialGrades);
      setModalOpen(true);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      alert("Failed to fetch enrollments for " + student.name);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setStudentEnrollments([]);
    setGrades({});
    setModalOpen(false);
  };

  const handleGradeChange = (enrollmentId, gradeLetter) => {
    setGrades((prev) => ({
      ...prev,
      [enrollmentId]: gradeLetter,
    }));
  };

  const getGradePoints = (gradeLetter) => {
    const gradeMap = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      D: 4,
      F: 0,
    };
    return gradeMap[gradeLetter] || 0;
  };

 const saveGrades = async () => {
  try {
    let successCount = 0;
    let errorCount = 0;

    // 🔑 Iterate through enrollmentId → gradeLetter
    for (const [enrollmentId, gradeLetter] of Object.entries(grades)) {
      if (!gradeLetter || gradeLetter.trim() === "") continue;

      try {
        const gradePoints = getGradePoints(gradeLetter);

        // ✅ Build API URL exactly as expected
        const url =
          `${API_BASE_URL}/grades/assign` +
          `?enrollmentId=${enrollmentId}` +   // 🔥 Correctly using enrollmentId
          `&facultyId=1` +                    // (hardcoded faculty for now)
          `&gradeLetter=${encodeURIComponent(gradeLetter)}` +
          `&gradePoints=${gradePoints}` +
          `&comments=`;

        console.log("Calling:", url);

        // ✅ Send request (no body, params only)
        await axios.post(url);
        successCount++;
      } catch (error) {
        console.error(`❌ Error assigning grade for enrollment ${enrollmentId}:`, error);
        const errorMsg =
          error.response?.data?.message || error.response?.data || error.message;
        console.error("Detailed error:", errorMsg);
        errorCount++;
      }
    }

    if (successCount > 0) {
      alert(`✅ Successfully saved ${successCount} grades!`);
      await fetchStudents(); // refresh list
      closeModal();
    } else if (errorCount > 0) {
      alert(`❌ Failed to save ${errorCount} grades. Check console.`);
    } else {
      alert("⚠️ No grades to save.");
    }
  } catch (err) {
    console.error("Global error saving grades:", err);
    alert("Failed to save grades: " + (err.response?.data?.message || err.message));
  }
};



  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>
            <strong>Error:</strong> {error}
          </p>
          <button
            onClick={fetchStudents}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Student Grade Management
          </h1>
          <p className="text-gray-600">Manage grades for enrolled students</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No students found. Please check your database and API
                    connection.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {student.userId || student.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {student.name || student.studentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.email || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        onClick={() => openModal(student)}
                      >
                        Grade Courses
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Grade Courses for{" "}
                {selectedStudent.name || selectedStudent.studentName}
              </h2>

              <div className="space-y-4">
                {studentEnrollments.length > 0 ? (
                  studentEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {enrollment.course?.name ||
                              enrollment.course?.courseName ||
                              "Unknown Course"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Course Code:{" "}
                            {enrollment.course?.courseCode || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Enrollment ID: {enrollment.id}
                          </p>
                        </div>
                        {enrollment.grade && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            Current: {enrollment.grade.gradeLetter}
                          </div>
                        )}
                      </div>

                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={grades[enrollment.id] || ""}
                        onChange={(e) =>
                          handleGradeChange(enrollment.id, e.target.value)
                        }
                      >
                        <option value="">Select Grade</option>
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade} ({getGradePoints(grade)} points)
                          </option>
                        ))}
                      </select>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No enrollments found for this student.</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGrades}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors duration-200"
                  disabled={Object.values(grades).every((grade) => !grade)}
                >
                  Save Grades
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}