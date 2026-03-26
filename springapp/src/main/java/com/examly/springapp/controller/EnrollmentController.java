package com.examly.springapp.controller;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.Course;
import com.examly.springapp.service.EnrollmentService;
import com.examly.springapp.repository.StudentRepository;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;

    // ✅ GET all enrollments
    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        try {
            List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            System.err.println("Error fetching all enrollments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ GET enrollment by id
    @GetMapping("/{id}")
    public ResponseEntity<Enrollment> getEnrollmentById(@PathVariable Long id) {
        try {
            Optional<Enrollment> enrollment = enrollmentService.getEnrollmentById(id);
            return enrollment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error fetching enrollment by ID: " + id + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🆕 GET enrollments by student ID (THE MISSING ENDPOINT)
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStudentId(@PathVariable Long studentId) {
        try {
            System.out.println("Fetching enrollments for student ID: " + studentId);
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);
            System.out.println("Found " + enrollments.size() + " enrollments");
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            System.err.println("Error fetching enrollments for student ID: " + studentId + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 🆕 GET enrollments by course ID
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByCourseId(@PathVariable Long courseId) {
        try {
            List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourseId(courseId);
            return ResponseEntity.ok(enrollments);
        } catch (Exception e) {
            System.err.println("Error fetching enrollments for course ID: " + courseId + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ CREATE enrollment
    @PostMapping
    public ResponseEntity<Enrollment> createEnrollment(@RequestBody EnrollmentRequest request) {
        try {
            System.out.println("Creating enrollment: " + request);
            
            // Find student
            Optional<Student> studentOpt = studentRepository.findById(request.getStudentId());
            if (!studentOpt.isPresent()) {
                System.err.println("Student not found with ID: " + request.getStudentId());
                return ResponseEntity.badRequest().build();
            }
            
            // Find course
            Optional<Course> courseOpt = courseRepository.findById(request.getCourseId());
            if (!courseOpt.isPresent()) {
                System.err.println("Course not found with ID: " + request.getCourseId());
                return ResponseEntity.badRequest().build();
            }
            
            // Create enrollment
            Enrollment enrollment = new Enrollment();
            enrollment.setStudent(studentOpt.get());
            enrollment.setCourse(courseOpt.get());
            enrollment.setSemester(Enrollment.Semester.valueOf(request.getSemester()));
            enrollment.setYear(request.getYear());
            enrollment.setEnrollmentStatus(Enrollment.EnrollmentStatus.valueOf(request.getEnrollmentStatus()));
            enrollment.setEnrollmentDate(new Timestamp(System.currentTimeMillis()));
            
            Enrollment saved = enrollmentService.saveEnrollment(enrollment);
            System.out.println("Enrollment created successfully with ID: " + saved.getId());
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            System.err.println("Error creating enrollment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ UPDATE enrollment
    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> updateEnrollment(@PathVariable Long id, @RequestBody EnrollmentRequest request) {
        try {
            Optional<Enrollment> enrollmentOpt = enrollmentService.getEnrollmentById(id);
            if (!enrollmentOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Enrollment enrollment = enrollmentOpt.get();
            
            // Update fields if provided
            if (request.getStudentId() != null) {
                Optional<Student> student = studentRepository.findById(request.getStudentId());
                if (student.isPresent()) {
                    enrollment.setStudent(student.get());
                }
            }
            
            if (request.getCourseId() != null) {
                Optional<Course> course = courseRepository.findById(request.getCourseId());
                if (course.isPresent()) {
                    enrollment.setCourse(course.get());
                }
            }
            
            if (request.getSemester() != null) {
                enrollment.setSemester(Enrollment.Semester.valueOf(request.getSemester()));
            }
            if (request.getYear() != null) {
                enrollment.setYear(request.getYear());
            }
            if (request.getEnrollmentStatus() != null) {
                enrollment.setEnrollmentStatus(Enrollment.EnrollmentStatus.valueOf(request.getEnrollmentStatus()));
            }
            
            Enrollment updated = enrollmentService.saveEnrollment(enrollment);
            return ResponseEntity.ok(updated);
            
        } catch (Exception e) {
            System.err.println("Error updating enrollment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ DELETE enrollment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnrollment(@PathVariable Long id) {
        try {
            System.out.println("Deleting enrollment with ID: " + id);
            enrollmentService.deleteEnrollment(id);
            System.out.println("Enrollment deleted successfully");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting enrollment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // DTO for enrollment requests
    public static class EnrollmentRequest {
        private Long studentId;
        private Long courseId;
        private String semester;
        private Integer year;
        private String enrollmentStatus;

        // Default constructor
        public EnrollmentRequest() {}

        // Getters and Setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
        
        public String getSemester() { return semester; }
        public void setSemester(String semester) { this.semester = semester; }
        
        public Integer getYear() { return year; }
        public void setYear(Integer year) { this.year = year; }
        
        public String getEnrollmentStatus() { return enrollmentStatus; }
        public void setEnrollmentStatus(String enrollmentStatus) { this.enrollmentStatus = enrollmentStatus; }

        @Override
        public String toString() {
            return "EnrollmentRequest{" +
                    "studentId=" + studentId +
                    ", courseId=" + courseId +
                    ", semester='" + semester + '\'' +
                    ", year=" + year +
                    ", enrollmentStatus='" + enrollmentStatus + '\'' +
                    '}';
        }
    }
    
}

