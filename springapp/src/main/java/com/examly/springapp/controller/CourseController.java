package com.examly.springapp.controller;

import com.examly.springapp.model.Course;
import com.examly.springapp.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Get course by ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    // Add new course
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    // Update course
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    // Delete course
    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return "Course deleted with id " + id;
    }

    // Search courses by name
    @GetMapping("/search")
    public List<Course> searchCourses(@RequestParam String name) {
        return courseService.searchByName(name);
    }
}
