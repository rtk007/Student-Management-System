package com.examly.springapp.repository;

import com.examly.springapp.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    boolean existsByEmployeeId(String employeeId);
    Optional<Faculty> findByEmployeeId(String employeeId);

    // NEW: get Faculty by linked User.username
    Optional<Faculty> findByUser_Username(String username);
}
