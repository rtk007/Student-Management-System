package com.examly.springapp.service;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.Course;
import com.examly.springapp.repository.EnrollmentRepository;
import com.examly.springapp.repository.StudentRepository;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Optional<Enrollment> getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id);
    }

    // 🆕 GET enrollments by student ID (MISSING METHOD - ADDED)
    public List<Enrollment> getEnrollmentsByStudentId(Long studentId) {
        try {
            Optional<Student> student = studentRepository.findById(studentId);
            if (student.isPresent()) {
                return enrollmentRepository.findByStudent(student.get());
            }
            return List.of(); // Return empty list if student not found
        } catch (Exception e) {
            System.err.println("Error fetching enrollments for student ID: " + studentId + " - " + e.getMessage());
            return List.of();
        }
    }

    // 🆕 GET enrollments by course ID (ADDITIONAL USEFUL METHOD)
    public List<Enrollment> getEnrollmentsByCourseId(Long courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isPresent()) {
            return enrollmentRepository.findByCourse(course.get());
        }
        return List.of(); // Return empty list if course not found
    }

    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }
   

}