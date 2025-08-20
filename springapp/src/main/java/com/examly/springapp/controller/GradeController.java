package com.examly.springapp.controller;

import com.examly.springapp.model.Grade;
import com.examly.springapp.model.Student;
import com.examly.springapp.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired private GradeService gradeService;

    // fetch all students with enrollments (for frontend table)
    @GetMapping("/students")
    public List<Student> getStudents() {
        return gradeService.getAllStudents();
    }

    // assign grade
    @PostMapping("/grades/assign")
    public Grade assignGrade(
            @RequestParam Long enrollmentId,
            @RequestParam Long facultyId,
            @RequestParam String gradeLetter,
            @RequestParam BigDecimal gradePoints,
            @RequestParam(required = false) String comments) {

        return gradeService.assignGrade(enrollmentId, facultyId, gradeLetter, gradePoints, comments);
    }
}
