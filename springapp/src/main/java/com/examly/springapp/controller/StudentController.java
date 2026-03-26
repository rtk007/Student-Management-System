package com.examly.springapp.controller;

import com.examly.springapp.model.Student;
import com.examly.springapp.service.StudentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public Student registerStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/by-student-id/{studentId}")
    public Student getStudentByStudentId(@PathVariable String studentId) {
        return studentService.getStudentByStudentId(studentId);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @PutMapping("/update-profile/{studentId}")
    public Student updateStudentProfile(
            @PathVariable String studentId,
            @RequestBody Map<String, Object> payload) {
        return studentService.updateStudentProfile(studentId, payload);
    }

    @DeleteMapping("/{id}")
public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
    try {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().body("Student deleted successfully");
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body(Map.of("error", "Internal server error"));
    }
}
}
