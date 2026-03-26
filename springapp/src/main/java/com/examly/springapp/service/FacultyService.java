package com.examly.springapp.service;

import com.examly.springapp.model.Faculty;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FacultyRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public FacultyService(FacultyRepository facultyRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.facultyRepository = facultyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // CREATE
    public Faculty createFaculty(Faculty faculty) {
        if (facultyRepository.existsByEmployeeId(faculty.getEmployeeId())) {
            throw new RuntimeException("Employee ID already exists");
        }
        return facultyRepository.save(faculty);
    }

    // READ
    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFacultyById(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
    }

    public Faculty getFacultyByEmployeeId(String employeeId) {
        return facultyRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
    }

    // NEW: Get by Username
    public Faculty getFacultyByUsername(String username) {
        return facultyRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
    }

    // UPDATE
    public Faculty updateFaculty(Long id, Faculty updatedFaculty) {
        Faculty faculty = getFacultyById(id);

        faculty.setName(updatedFaculty.getName());
        faculty.setPhoneNumber(updatedFaculty.getPhoneNumber());
        faculty.setDepartment(updatedFaculty.getDepartment());
        faculty.setTitle(updatedFaculty.getTitle());
        faculty.setSpecialization(updatedFaculty.getSpecialization());
        faculty.setHireDate(updatedFaculty.getHireDate());
        faculty.setOfficeLocation(updatedFaculty.getOfficeLocation());
        faculty.setOfficeHours(updatedFaculty.getOfficeHours());

        return facultyRepository.save(faculty);
    }

    // PATCH (profile update by employeeId)
    public Faculty updateFacultyProfile(String employeeId, Map<String, Object> payload) {
        Faculty faculty = getFacultyByEmployeeId(employeeId);

        if (payload.containsKey("name")) {
            faculty.setName((String) payload.get("name"));
        }
        if (payload.containsKey("phoneNumber")) {
            faculty.setPhoneNumber((String) payload.get("phoneNumber"));
        }
        if (payload.containsKey("department")) {
            faculty.setDepartment((String) payload.get("department"));
        }
        if (payload.containsKey("title")) {
            faculty.setTitle((String) payload.get("title"));
        }
        if (payload.containsKey("specialization")) {
            faculty.setSpecialization((String) payload.get("specialization"));
        }
        if (payload.containsKey("hireDate")) {
            faculty.setHireDate(java.time.LocalDate.parse((String) payload.get("hireDate")));
        }
        if (payload.containsKey("officeLocation")) {
            faculty.setOfficeLocation((String) payload.get("officeLocation"));
        }
        if (payload.containsKey("officeHours")) {
            faculty.setOfficeHours((String) payload.get("officeHours"));
        }

        // Update linked User too
        User user = faculty.getUser();
        if (payload.containsKey("email")) {
            user.setEmail((String) payload.get("email"));
        }
        if (payload.containsKey("password")) {
            String rawPassword = (String) payload.get("password");
            user.setPasswordHash(passwordEncoder.encode(rawPassword));
        }

        userRepository.save(user);
        return facultyRepository.save(faculty);
    }
    public Faculty updateFacultyProfile(String username, Faculty updatedFaculty) {
        Faculty faculty = facultyRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Update fields
        faculty.setName(updatedFaculty.getName());
        faculty.setPhoneNumber(updatedFaculty.getPhoneNumber());
        faculty.setDepartment(updatedFaculty.getDepartment());
        faculty.setTitle(updatedFaculty.getTitle());
        faculty.setSpecialization(updatedFaculty.getSpecialization());
        faculty.setHireDate(updatedFaculty.getHireDate());
        faculty.setOfficeLocation(updatedFaculty.getOfficeLocation());
        faculty.setOfficeHours(updatedFaculty.getOfficeHours());

        // update email if provided
        if (updatedFaculty.getUser() != null && updatedFaculty.getUser().getEmail() != null) {
            faculty.getUser().setEmail(updatedFaculty.getUser().getEmail());
        }

        return facultyRepository.save(faculty);
    }
    // DELETE
    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }

    public Optional<Faculty> findById(Long facultyId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }
}
