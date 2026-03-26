package com.examly.springapp.repository;

import com.examly.springapp.model.AcademicProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademicProgramRepository extends JpaRepository<AcademicProgram, Long> {
    boolean existsByProgramCode(String programCode);
}
