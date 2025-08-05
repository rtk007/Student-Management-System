package com.examly.springapp.controller;

import com.examly.springapp.model.Student;
import com.examly.springapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/addStudent")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.addStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getAllStudent")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> studentList = studentService.getAllStudents();
        if (studentList.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(studentList);
    }
}
