package com.examly.springapp.controller;

import com.examly.springapp.model.Faculty;
import com.examly.springapp.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "http://localhost:3000/")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    // ✅ Create Faculty
    @PostMapping
    public Faculty createFaculty(@RequestBody Faculty faculty) {
        return facultyService.createFaculty(faculty);
    }

    // ✅ Get all Faculty
    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    // ✅ Get Faculty by numeric ID
    @GetMapping("/id/{id}")
    public Faculty getFacultyById(@PathVariable Long id) {
        return facultyService.getFacultyById(id);
    }

    // ✅ Get Faculty by employeeId
    @GetMapping("/employee/{employeeId}")
    public Faculty getFacultyByEmployeeId(@PathVariable String employeeId) {
        return facultyService.getFacultyByEmployeeId(employeeId);
    }

    // ✅ Get Faculty by username (used for dashboard login/session)
    @GetMapping("/username/{username}")
    public Faculty getFacultyByUsername(@PathVariable String username) {
        return facultyService.getFacultyByUsername(username);
    }

    // ✅ Update Faculty
    @PutMapping("/{id}")
    public Faculty updateFaculty(@PathVariable Long id, @RequestBody Faculty facultyDetails) {
        return facultyService.updateFaculty(id, facultyDetails);
    }
    @PutMapping("/username/{username}")
    public ResponseEntity<Faculty> updateFacultyProfile(
            @PathVariable String username,
            @RequestBody Faculty updatedFaculty
    ) {
        Faculty faculty = facultyService.updateFacultyProfile(username, updatedFaculty);
        return ResponseEntity.ok(faculty);
    }
    // ✅ Delete Faculty
    @DeleteMapping("/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
    }
}
