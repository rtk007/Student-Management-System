package com.examly.springapp.service;

import com.examly.springapp.model.Faculty;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;
import com.examly.springapp.model.User.Role;
import com.examly.springapp.repository.FacultyRepository;
import com.examly.springapp.repository.StudentRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {

    private final StudentRepository studentRepository;
    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CsvService(StudentRepository studentRepository, 
                      FacultyRepository facultyRepository, 
                      UserRepository userRepository, 
                      PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.facultyRepository = facultyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public List<Student> processStudentCsv(MultipartFile file) throws Exception {
        List<Student> students = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isHeader = true;
            String[] headers = null;
            while ((line = br.readLine()) != null) {
                if (isHeader) {
                    headers = line.split(",");
                    isHeader = false;
                    continue;
                }
                String[] values = line.split(",");
                if (values.length < 2) continue; // skip empty or invalid lines

                Student student = new Student();
                String studentId = "";
                String email = "";

                for (int i = 0; i < headers.length; i++) {
                    if (i >= values.length) break;
                    String header = headers[i].trim();
                    String value = values[i].trim();

                    if ("studentId".equalsIgnoreCase(header)) {
                        studentId = value;
                        student.setStudentId(value);
                    } else if ("studentName".equalsIgnoreCase(header)) {
                        student.setStudentName(value);
                    } else if ("studentCity".equalsIgnoreCase(header)) {
                        student.setStudentCity(value);
                    } else if ("phone".equalsIgnoreCase(header)) {
                        student.setPhone(value);
                    } else if ("enrolledIn".equalsIgnoreCase(header)) {
                        student.setEnrolledIn(value);
                    } else if ("birthdate".equalsIgnoreCase(header)) {
                        try {
                            student.setBirthdate(LocalDate.parse(value, DateTimeFormatter.ofPattern("dd-MM-yyyy")));
                        } catch (Exception e) {}
                    } else if ("studentType".equalsIgnoreCase(header)) {
                        try {
                            student.setStudentType(Student.StudentType.valueOf(value.toUpperCase()));
                        } catch (Exception e) {}
                    } else if ("email".equalsIgnoreCase(header)) { // Allow email override
                        email = value;
                    }
                }

                if (studentId.isEmpty()) continue; // Mandatory field

                if (email.isEmpty()) {
                    email = studentId + "@student.edu";
                }

                User user = new User();
                user.setUsername(studentId);
                user.setEmail(email);
                user.setPasswordHash(passwordEncoder.encode("welcome123")); // Default password
                user.setRole(Role.STUDENT);
                user.setIsActive(true);
                user = userRepository.save(user);

                student.setUser(user);
                students.add(studentRepository.save(student));
            }
        }
        return students;
    }

    @Transactional
    public List<Faculty> processFacultyCsv(MultipartFile file) throws Exception {
        List<Faculty> faculties = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isHeader = true;
            String[] headers = null;
            while ((line = br.readLine()) != null) {
                if (isHeader) {
                    headers = line.split(",");
                    isHeader = false;
                    continue;
                }
                String[] values = line.split(",");
                if (values.length < 2) continue;

                Faculty faculty = new Faculty();
                String employeeId = "";
                String email = "";

                for (int i = 0; i < headers.length; i++) {
                    if (i >= values.length) break;
                    String header = headers[i].trim();
                    String value = values[i].trim();

                    if ("employeeId".equalsIgnoreCase(header)) {
                        employeeId = value;
                        faculty.setEmployeeId(value);
                    } else if ("name".equalsIgnoreCase(header)) {
                        faculty.setName(value);
                    } else if ("phoneNumber".equalsIgnoreCase(header)) {
                        faculty.setPhoneNumber(value);
                    } else if ("department".equalsIgnoreCase(header)) {
                        faculty.setDepartment(value);
                    } else if ("title".equalsIgnoreCase(header)) {
                        faculty.setTitle(value);
                    } else if ("specialization".equalsIgnoreCase(header)) {
                        faculty.setSpecialization(value);
                    } else if ("email".equalsIgnoreCase(header)) {
                        email = value;
                    }
                }

                if (employeeId.isEmpty()) continue;

                if (email.isEmpty()) {
                    email = employeeId + "@faculty.edu";
                }

                User user = new User();
                user.setUsername(employeeId);
                user.setEmail(email);
                user.setPasswordHash(passwordEncoder.encode("faculty123")); // Default password
                user.setRole(Role.FACULTY); // Wait, User.Role is present
                user.setIsActive(true);
                user = userRepository.save(user);

                faculty.setUser(user);
                faculties.add(facultyRepository.save(faculty));
            }
        }
        return faculties;
    }
}
