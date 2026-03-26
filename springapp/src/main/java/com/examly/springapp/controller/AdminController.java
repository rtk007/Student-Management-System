package com.examly.springapp.controller;

import com.examly.springapp.model.Course;
import com.examly.springapp.model.Faculty;
import com.examly.springapp.model.StudentClass;
import com.examly.springapp.repository.CourseRepository;
import com.examly.springapp.repository.FacultyRepository;
import com.examly.springapp.repository.StudentClassRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/mapping")
public class AdminController {

    private final FacultyRepository facultyRepository;
    private final CourseRepository courseRepository;
    private final StudentClassRepository studentClassRepository;

    public AdminController(FacultyRepository facultyRepository,
                           CourseRepository courseRepository,
                           StudentClassRepository studentClassRepository) {
        this.facultyRepository = facultyRepository;
        this.courseRepository = courseRepository;
        this.studentClassRepository = studentClassRepository;
    }

    // Map Faculty to Course
    @PostMapping("/faculty/{facultyId}/course/{courseId}")
    public ResponseEntity<?> mapFacultyToCourse(@PathVariable Long facultyId, @PathVariable Long courseId) {
        Optional<Faculty> facultyOpt = facultyRepository.findById(facultyId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (facultyOpt.isPresent() && courseOpt.isPresent()) {
            Faculty faculty = facultyOpt.get();
            Course course = courseOpt.get();

            List<Course> courses = faculty.getCourses();
            if (courses == null) {
                courses = new java.util.ArrayList<>();
            }
            if (!courses.contains(course)) {
                courses.add(course);
                faculty.setCourses(courses);
                facultyRepository.save(faculty);
                return ResponseEntity.ok(Map.of("message", "Successfully mapped Faculty to Course"));
            } else if (courses.contains(course)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty is already mapped to this Course"));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Error mapping Faculty to Course"));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Faculty or Course not found"));
    }

    // Get All Classes
    @GetMapping("/classes")
    public ResponseEntity<List<StudentClass>> getAllClasses() {
        return ResponseEntity.ok(studentClassRepository.findAll());
    }

    // Assign Course to StudentClass
    @PostMapping("/class/{classId}/course/{courseId}")
    public ResponseEntity<?> assignCourseToClass(@PathVariable Long classId, @PathVariable Long courseId) {
        Optional<StudentClass> classOpt = studentClassRepository.findById(classId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (classOpt.isPresent() && courseOpt.isPresent()) {
            StudentClass studentClass = classOpt.get();
            Course course = courseOpt.get();

            List<Course> assignedCourses = studentClass.getAssignedCourses();
            if (assignedCourses == null) {
                assignedCourses = new java.util.ArrayList<>();
            }
            if (!assignedCourses.contains(course)) {
                assignedCourses.add(course);
                studentClass.setAssignedCourses(assignedCourses);
                studentClassRepository.save(studentClass);
                return ResponseEntity.ok(Map.of("message", "Successfully assigned Course to Class"));
            } else if (assignedCourses.contains(course)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Course is already assigned to this Class"));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Error assigning Course to Class"));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Class or Course not found"));
    }
}
