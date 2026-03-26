package com.examly.springapp.service;

import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.StudentRepository;
import com.examly.springapp.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public StudentService(StudentRepository studentRepository, UserRepository userRepository, 
                         PasswordEncoder passwordEncoder, JdbcTemplate jdbcTemplate) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    public Student createStudent(Student student) {
        if (studentRepository.existsByStudentId(student.getStudentId())) {
            throw new RuntimeException("Student ID already exists");
        }

        // Auto-calculate expected graduation year
        if (student.getAdmissionDate() != null) {
            int duration = getCourseDuration(student.getEnrolledIn());
            LocalDate admissionLocalDate = student.getAdmissionDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            student.setExpectedGraduation(admissionLocalDate.getYear() + duration);
        }

        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student getStudentByStudentId(String studentId) {
        return studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        Student student = getStudentById(id);

        student.setStudentName(updatedStudent.getStudentName());
        student.setStudentCity(updatedStudent.getStudentCity());
        student.setPhone(updatedStudent.getPhone());
        student.setEnrolledIn(updatedStudent.getEnrolledIn());
        student.setStudentType(updatedStudent.getStudentType());
        student.setLastAttendedSchool(updatedStudent.getLastAttendedSchool());

        if (updatedStudent.getAdmissionDate() != null) {
            student.setAdmissionDate(updatedStudent.getAdmissionDate());
            // Recalculate graduation year
            int duration = getCourseDuration(updatedStudent.getEnrolledIn());
            LocalDate admissionLocalDate = updatedStudent.getAdmissionDate()
                    .toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            student.setExpectedGraduation(admissionLocalDate.getYear() + duration);
        }

        if (updatedStudent.getBirthdate() != null) {
            student.setBirthdate(updatedStudent.getBirthdate());
        }

        student.setCurrentGpa(updatedStudent.getCurrentGpa());
        student.setTotalCredits(updatedStudent.getTotalCredits());
        student.setAcademicStanding(updatedStudent.getAcademicStanding());

        return studentRepository.save(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        User user = student.getUser();

        try {
            // Step 1: Delete grades linked through this student's enrollments
            jdbcTemplate.update(
                "DELETE FROM grade WHERE eid IN (SELECT id FROM enrollments WHERE student_id = ?)",
                id
            );

            // Step 2: Delete all enrollments for this student
            jdbcTemplate.update("DELETE FROM enrollments WHERE student_id = ?", id);
            
            // Step 3: Delete any other related records if they exist
            // Add more delete statements here if you have other tables referencing students
            // Examples (uncomment and modify as needed):
            // jdbcTemplate.update("DELETE FROM grades WHERE student_id = ?", id);
            // jdbcTemplate.update("DELETE FROM attendance WHERE student_id = ?", id);
            // jdbcTemplate.update("DELETE FROM assignments WHERE student_id = ?", id);
            
            // Step 4: Delete the student
            studentRepository.delete(student);

            // Step 5: Delete the user if no other students are linked to it
            if (!studentRepository.existsByUser(user)) {
                userRepository.delete(user);
            }
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete student and related records: " + e.getMessage(), e);
        }
    }

    public Student updateStudentProfile(String studentId, Map<String, Object> payload) {
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (payload.containsKey("studentName")) {
            student.setStudentName((String) payload.get("studentName"));
        }
        if (payload.containsKey("studentCity")) {
            student.setStudentCity((String) payload.get("studentCity"));
        }
        if (payload.containsKey("phone")) {
            student.setPhone((String) payload.get("phone"));
        }
        if (payload.containsKey("lastAttendedSchool")) {
            student.setLastAttendedSchool((String) payload.get("lastAttendedSchool"));
        }
        if (payload.containsKey("enrolledIn")) {
            student.setEnrolledIn((String) payload.get("enrolledIn"));
        }
        if (payload.containsKey("birthdate")) {
            try {
                LocalDate localDate = LocalDate.parse((String) payload.get("birthdate"), DATE_FORMATTER);
                student.setBirthdate(localDate);
            } catch (Exception e) {
                throw new RuntimeException("Invalid birthdate format. Expected yyyy-MM-dd");
            }
        }
        if (payload.containsKey("admissionDate")) {
            try {
                LocalDate admissionLocalDate = LocalDate.parse((String) payload.get("admissionDate"), DATE_FORMATTER);
                student.setAdmissionDate(java.sql.Date.valueOf(admissionLocalDate));
                // Calculate expected graduation year
                int duration = getCourseDuration(student.getEnrolledIn());
                student.setExpectedGraduation(admissionLocalDate.getYear() + duration);
            } catch (Exception e) {
                throw new RuntimeException("Invalid admissionDate format. Expected yyyy-MM-dd");
            }
        }

        // Update User (linked account)
        User user = student.getUser();
        if (payload.containsKey("email")) {
            user.setEmail((String) payload.get("email"));
        }
        if (payload.containsKey("password")) {
            String rawPassword = (String) payload.get("password");
            user.setPasswordHash(passwordEncoder.encode(rawPassword));
        }

        userRepository.save(user);
        return studentRepository.save(student);
    }

    private int getCourseDuration(String course) {
        if (course == null) return 4;
        switch (course.toUpperCase()) {
            case "B.E": return 4;
            case "B.TECH": return 4;
            case "M.TECH": return 5;
            case "M.E": return 2;
            default: return 4;
        }
    }
}
