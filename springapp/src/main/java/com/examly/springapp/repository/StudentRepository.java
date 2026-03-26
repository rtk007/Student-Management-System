package com.examly.springapp.repository;

import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByStudentId(String studentId);

    // NEW method for lookup by studentId
    Optional<Student> findByStudentId(String studentId);

    // NEW helper for delete logic (to check if a User still has students linked)
    boolean existsByUser(User user);
}
