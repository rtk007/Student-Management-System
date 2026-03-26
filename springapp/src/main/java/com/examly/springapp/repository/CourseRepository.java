package com.examly.springapp.repository;

import com.examly.springapp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Search by courseName (case-insensitive)
    List<Course> findByCourseNameContainingIgnoreCase(String courseName);
}
