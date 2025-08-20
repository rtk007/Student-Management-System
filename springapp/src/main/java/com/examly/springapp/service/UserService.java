package com.examly.springapp.service;

import com.examly.springapp.model.Student;
import com.examly.springapp.model.Faculty;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.StudentRepository;
import com.examly.springapp.repository.FacultyRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(User user) throws Exception {
        System.out.println("UserService: Checking if email exists: " + user.getEmail());
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email already in use");
        }

        System.out.println("UserService: Checking if username exists: " + user.getUsername());
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("Username already in use");
        }

        // ✅ Default role
        if (user.getRole() == null) {
            user.setRole(User.Role.STUDENT);
        }

        // Encode password and set metadata
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        user.setInstitutionId(1);

        // Save User
        User savedUser = userRepository.save(user);
        System.out.println("UserService: User saved with ID: " + savedUser.getId());

        // ✅ Create related entity based on role
        switch (savedUser.getRole()) {
            case STUDENT -> {
                Student student = new Student();
                student.setUser(savedUser);
                student.setStudentId(savedUser.getUsername());
                student.setStudentName("");
                student.setAdmissionDate(new java.util.Date());
                student.setCurrentGpa(BigDecimal.ZERO);
                student.setTotalCredits(0);
                student.setAcademicStanding(Student.Standing.GOOD);

                studentRepository.save(student);
                System.out.println("UserService: Student record created for user ID: " + savedUser.getId());
            }
            case FACULTY -> {
                Faculty faculty = new Faculty();
                faculty.setUser(savedUser);
                faculty.setEmployeeId(savedUser.getUsername()); // Using username as employeeId for now
                faculty.setName(""); // Placeholder
                faculty.setPhoneNumber("");
                faculty.setDepartment("");
                faculty.setTitle("");
                faculty.setSpecialization("");
                faculty.setHireDate(java.time.LocalDate.now());
                faculty.setOfficeLocation("");
                faculty.setOfficeHours("");

                facultyRepository.save(faculty);
                System.out.println("UserService: Faculty record created for user ID: " + savedUser.getId());
            }
            case ADMIN -> {
                // For admin we may not need a separate entity
                System.out.println("UserService: Admin registered, no extra entity created.");
            }
        }

        return savedUser;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
