package com.examly.springapp.service;

import com.examly.springapp.model.Course;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        return courseRepository.findById(id).map(course -> {
            course.setCourseCode(updatedCourse.getCourseCode());
            course.setCourseName(updatedCourse.getCourseName());
            course.setCreditHours(updatedCourse.getCreditHours());
            course.setDepartment(updatedCourse.getDepartment());
            course.setCourseDescription(updatedCourse.getCourseDescription());
            course.setPrerequisites(updatedCourse.getPrerequisites());
            course.setIsActive(updatedCourse.getIsActive());
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    public List<Course> searchByName(String name) {
        return courseRepository.findByCourseNameContainingIgnoreCase(name);
    }
}
