package com.examly.springapp.repository;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(Student student);
    List<Enrollment> findByCourse(Course course);

    // Force-fetch course & student to avoid LazyInitialization problems
    @Query("SELECT e FROM Enrollment e JOIN FETCH e.course c JOIN FETCH e.student s WHERE s.id = :studentId")
    List<Enrollment> findByStudentIdWithDetails(@Param("studentId") Long studentId);
}

