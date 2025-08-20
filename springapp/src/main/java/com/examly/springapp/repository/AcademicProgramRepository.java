package com.examly.springapp.repository;

import com.examly.springapp.model.AcademicProgram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicProgramRepository extends JpaRepository<AcademicProgram, Long> {
}
