package com.examly.springapp.service;

import com.examly.springapp.model.AcademicProgram;
import com.examly.springapp.repository.AcademicProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcademicProgramService {

    private final AcademicProgramRepository programRepository;

    public AcademicProgramService(AcademicProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<AcademicProgram> getAllPrograms() {
        return programRepository.findAll();
    }
}
