import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default function ManageEnrollments() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [enrollmentPopupOpen, setEnrollmentPopupOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [semester, setSemester] = useState("FALL");
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [enrollments, setEnrollments] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/students`);
      setStudents(res.data);

      res.data.forEach(async (student) => {
        const enrRes = await axios.get(`${API_BASE_URL}/enrollments/student/${student.id}`);
        setEnrollments((prev) => ({ ...prev, [student.id]: enrRes.data }));
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const openEnrollModal = (student) => {
    setSelectedStudent(student);
    setSelectedCourseId("");
    setSemester("FALL");
    setYear(new Date().getFullYear());
    setModalOpen(true);
  };

  const openEnrollmentPopup = (student) => {
    setSelectedStudent(student);
    setEnrollmentPopupOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const closeEnrollmentPopup = () => {
    setEnrollmentPopupOpen(false);
    setSelectedStudent(null);
  };

  const handleEnroll = async () => {
    if (!selectedCourseId) return alert("Select a course");
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/enrollments`, {
        studentId: selectedStudent.id,
        courseId: selectedCourseId,
        semester,
        year,
        enrollmentStatus: "ENROLLED",
      });
      closeModal();
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to enroll student");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEnrollment = async (enrollmentId) => {
    if (!window.confirm("Remove this enrollment?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to remove enrollment.");
    }
  };

  const styles = {
    container: {
      padding: "24px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    header: {
      color: "#343a40",
      marginBottom: "30px",
      fontSize: "32px",
      fontWeight: "600",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      overflow: "hidden",
      border: "1px solid #e9ecef",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#495057",
      color: "white",
    },
    th: {
      padding: "16px 20px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    td: {
      padding: "16px 20px",
      borderBottom: "1px solid #dee2e6",
      fontSize: "14px",
    },
    tableRow: {
      transition: "background-color 0.2s ease",
      cursor: "pointer",
    },
    showCoursesBtn: {
      backgroundColor: "#17a2b8",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(23,162,184,0.3)",
    },
    enrollBtn: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(40,167,69,0.3)",
    },
    removeBtn: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: "pointer",
      fontSize: "11px",
      marginLeft: "8px",
      transition: "all 0.2s ease",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      background: "white",
      padding: "30px",
      borderRadius: "12px",
      width: "450px",
      maxWidth: "90vw",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      animation: "modalSlideIn 0.3s ease-out",
    },
    popupContent: {
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      width: "400px",
      maxWidth: "90vw",
      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
      animation: "modalSlideIn 0.3s ease-out",
    },
    modalHeader: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "24px",
      color: "#343a40",
      borderBottom: "2px solid #e9ecef",
      paddingBottom: "12px",
    },
    popupHeader: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#343a40",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "500",
      color: "#495057",
      fontSize: "14px",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "2px solid #e9ecef",
      fontSize: "14px",
      transition: "border-color 0.2s ease",
      outline: "none",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "2px solid #e9ecef",
      fontSize: "14px",
      transition: "border-color 0.2s ease",
      outline: "none",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "24px",
    },
    cancelBtn: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    submitBtn: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    studentInfo: {
      backgroundColor: "#f8f9fa",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "16px",
      border: "1px solid #e9ecef",
    },
    studentName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#495057",
      marginBottom: "4px",
    },
    studentId: {
      fontSize: "14px",
      color: "#6c757d",
    },
    coursesList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    courseItem: {
      backgroundColor: "#ffffff",
      border: "1px solid #e9ecef",
      borderRadius: "6px",
      padding: "12px 16px",
      marginBottom: "8px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
    courseInfo: {
      flex: 1,
    },
    courseName: {
      fontWeight: "500",
      color: "#495057",
      fontSize: "14px",
    },
    courseSemester: {
      fontSize: "12px",
      color: "#6c757d",
      marginTop: "2px",
    },
    noEnrollments: {
      textAlign: "center",
      color: "#6c757d",
      fontStyle: "italic",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
      border: "1px dashed #dee2e6",
    },
  };

  // Add CSS animations
  const cssAnimations = `
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <h1 style={styles.header}>Manage Enrollments</h1>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Program</th>
                <th style={styles.th}>Enrolled Courses</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr 
                  key={student.id} 
                  style={{
                    ...styles.tableRow,
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa"
                  }}
                  onMouseEnter={(e) => e.target.closest('tr').style.backgroundColor = "#e3f2fd"}
                  onMouseLeave={(e) => e.target.closest('tr').style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f8f9fa"}
                >
                  <td style={styles.td}>{student.studentId}</td>
                  <td style={styles.td}>{student.studentName}</td>
                  <td style={styles.td}>{student.enrolledIn}</td>
                  <td style={styles.td}>
                    {enrollments[student.id]?.length > 0 ? (
                      <button
                        onClick={() => openEnrollmentPopup(student)}
                        style={styles.showCoursesBtn}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#138496";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#17a2b8";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        Show Courses ({enrollments[student.id].length})
                      </button>
                    ) : (
                      <span style={{ fontStyle: "italic", color: "#6c757d" }}>None</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => openEnrollModal(student)}
                      style={styles.enrollBtn}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#218838";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enrollment Popup */}
        {enrollmentPopupOpen && selectedStudent && (
          <div
            style={styles.modal}
            onClick={(e) => e.target === e.currentTarget && closeEnrollmentPopup()}
          >
            <div style={styles.popupContent}>
              <h2 style={styles.popupHeader}>Course Enrollments</h2>
              
              <div style={styles.studentInfo}>
                <div style={styles.studentName}>{selectedStudent.studentName}</div>
                <div style={styles.studentId}>Student ID: {selectedStudent.studentId}</div>
              </div>

              {enrollments[selectedStudent.id]?.length > 0 ? (
                <ul style={styles.coursesList}>
                  {enrollments[selectedStudent.id].map((enr) => (
                    <li key={enr.id} style={styles.courseItem}>
                      <div style={styles.courseInfo}>
                        <div style={styles.courseName}>{enr.course.courseName}</div>
                        <div style={styles.courseSemester}>{enr.semester} {enr.year}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveEnrollment(enr.id)}
                        style={styles.removeBtn}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={styles.noEnrollments}>
                  No courses enrolled
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button 
                  onClick={closeEnrollmentPopup} 
                  style={styles.cancelBtn}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6268"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#6c757d"}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enroll Modal */}
        {modalOpen && selectedStudent && (
          <div
            style={styles.modal}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <div style={styles.modalContent}>
              <h2 style={styles.modalHeader}>Enroll {selectedStudent.studentName}</h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Course</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = "#007bff"}
                  onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                >
                  <option value="">--Select Course--</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseName} ({course.courseCode})
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => e.target.style.borderColor = "#007bff"}
                  onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                >
                  <option value="FALL">Fall</option>
                  <option value="SPRING">Spring</option>
                  <option value="SUMMER">Summer</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = "#007bff"}
                  onBlur={(e) => e.target.style.borderColor = "#e9ecef"}
                />
              </div>
              
              <div style={styles.buttonGroup}>
                <button 
                  onClick={closeModal} 
                  style={styles.cancelBtn}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6268"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#6c757d"}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEnroll} 
                  style={styles.submitBtn}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
                  disabled={loading}
                >
                  {loading ? "Enrolling..." : "Enroll"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}