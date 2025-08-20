package com.examly.springapp.controller;

import com.examly.springapp.model.AcademicProgram;
import com.examly.springapp.service.AcademicProgramService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-programs")
@CrossOrigin(origins = "http://localhost:3000")
public class AcademicProgramController {

    private final AcademicProgramService programService;

    public AcademicProgramController(AcademicProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<AcademicProgram> getAllPrograms() {
        return programService.getAllPrograms();
    }
}
