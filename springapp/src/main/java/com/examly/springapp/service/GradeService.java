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

    // Assign a grade to an enrollment
    public Grade assignGrade(Long enrollmentId, Long facultyId,
                             String gradeLetter, BigDecimal gradePoints, String comments) {

        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Faculty faculty = facultyRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

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
