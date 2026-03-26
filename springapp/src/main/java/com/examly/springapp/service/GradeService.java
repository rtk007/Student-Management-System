package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Service
public class GradeService {

    @Autowired private GradeRepository gradeRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private EnrollmentRepository enrollmentRepository;
    @Autowired private FacultyRepository facultyRepository;

    // Fetch all students with their enrollments
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Fetch students that belong to classes assigned to courses this faculty teaches
    public List<Student> getStudentsForFaculty(String username) {
        Faculty faculty = facultyRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        List<Course> mappedCourses = faculty.getCourses();
        if (mappedCourses == null || mappedCourses.isEmpty()) {
            return java.util.Collections.emptyList();
        }

        return studentRepository.findAll().stream()
                .filter(s -> {
                    StudentClass sc = s.getStudentClass();
                    if (sc == null || sc.getAssignedCourses() == null) return false;
                    return sc.getAssignedCourses().stream().anyMatch(mappedCourses::contains);
                })
                .collect(java.util.stream.Collectors.toList());
    }

    // Assign a grade to an enrollment
    public Grade assignGrade(Long enrollmentId, Long facultyId,
                             String gradeLetter, BigDecimal gradePoints, String comments) {

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Course course = enrollment.getCourse();
        Student student = enrollment.getStudent();

        // 1. Verify Faculty teaches the Course
        List<Course> mappedCourses = faculty.getCourses();
        if (mappedCourses == null || !mappedCourses.contains(course)) {
            throw new RuntimeException("Faculty is not mapped to this course. Cannot assign grade.");
        }

        // 2. Verify Student belongs to a Class that is assigned to this Course
        StudentClass studentClass = student.getStudentClass();
        if (studentClass == null) {
            throw new RuntimeException("Student is not assigned to any class.");
        }
        
        List<Course> classCourses = studentClass.getAssignedCourses();
        if (classCourses == null || !classCourses.contains(course)) {
            throw new RuntimeException("The student's class is not assigned to this course. Cannot assign grade.");
        }

        Grade grade = enrollment.getGrade(); // assume Enrollment ↔ Grade is OneToOne
        if (grade == null) {
            grade = new Grade();
            grade.setEnrollment(enrollment);
        }

        grade.setFaculty(faculty);
        grade.setGradeLetter(gradeLetter);
        grade.setGradePoints(gradePoints);
        grade.setComments(comments);
        grade.setGradeDate(new Timestamp(System.currentTimeMillis()));

        Grade saved = gradeRepository.save(grade);

        // link back to enrollment
        enrollment.setGrade(saved); // links Grade
        enrollment.setFinalGrade(saved.getGradeLetter()); // if you want to show the grade letter!
        enrollment.setGradePoints(saved.getGradePoints()); // sync points
        enrollmentRepository.save(enrollment); // persist changes


        return saved;
    }
    
}
